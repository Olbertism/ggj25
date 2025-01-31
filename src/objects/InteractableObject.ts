import Phaser from 'phaser';

export class InteractableObject extends Phaser.Physics.Arcade.Sprite {
  private interactionHint: Phaser.GameObjects.Text;
  private canInteract: boolean = false;
  private collisionSound: Phaser.Sound.BaseSound;
  private soundPlayed: boolean = false;
  walkAnim?: string;
  idleAnim?: string;
  private path: Phaser.Curves.Path | null = null;
  private moveTween: Phaser.Tweens.Tween;
  public isInteracting: boolean = false;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    scale?: number,
    isAnimated?: boolean,
    collisionSoundKey?: string,
    idleAnim?: string,
    walkAnim?: string,
  ) {
    super(scene, x, y, texture);

    this.walkAnim = walkAnim;
    this.idleAnim = idleAnim;

    scale && this.setScale(scale);

    // Add the object to the scene
    scene.add.existing(this);
    if (walkAnim) {
      scene.physics.add.existing(this, false);
    } else {
      scene.physics.add.existing(this, true);
    }
    isAnimated && this.play(idleAnim ? idleAnim : texture, true);

    if (isAnimated && idleAnim) {
      if (walkAnim) {
        this.startBehavior(scene);
        scene.physics.world.enable(this);
        // this.setCollideWorldBounds(true);
        this.setImmovable(true);
      } else {
        this.play(idleAnim, true);
      }
    }

    scene.physics.add.collider(scene.player, this, undefined, undefined, scene);
    if (collisionSoundKey) {
      this.collisionSound = scene.sound.add(collisionSoundKey);
    }

    // Create an interaction hint
    this.interactionHint = scene.add
      .text(x - 40, y - 10, 'Press E to interact', {
        fontSize: '20px',
        color: '#ffffff',
        backgroundColor: 'grey',
      })
      .setVisible(false);
  }

  // Logic for handling proximity
  handleProximity(
    player: Phaser.Physics.Arcade.Sprite,
    onInteract: () => void,
  ) {
    if (!this.canInteract) {
      this.interactionHint.setVisible(true);
      this.canInteract = true;

      // Listen for interaction key
      this.scene.input.keyboard.on('keydown-E', () => {
        this.handleInteraction(onInteract);
      });
    }
  }

  updateHintPosition() {
    if (this.interactionHint) {
      this.interactionHint.setPosition(this.x - 40, this.y - 10);
    }
  }

  handleInteraction(onInteract: () => void) {
    this.isInteracting = true;
    if (this.canInteract) {
      onInteract();
    }
    if (this.collisionSound && !this.soundPlayed) {
      this.collisionSound.play();
      this.soundPlayed = true;
    }
    if (this.scene.tweens.isTweening(this)) {
      this.moveTween.pause();
      this.play(this.idleAnim, true);
    }
  }

  handleExitProximity() {
    this.isInteracting = false;
    this.interactionHint.setVisible(false);
    this.canInteract = false;
    this.soundPlayed = false;
    if (this.moveTween && this.moveTween.isPaused()) {
      this.moveAlongRandomPath(this.scene); // Resume the movement
    }
  }

  private startBehavior(scene: Phaser.Scene) {
    this.play(this.idleAnim, true);
    if (!this.walkAnim) return;
    scene.time.addEvent({
      delay: Phaser.Math.Between(2000, 4000),
      callback: () => {
        this.moveAlongRandomPath(scene);
      },
      loop: false,
    });
  }

  // Function to generate a random path with a given number of points
  private generateRandomPath(numPoints: number): Phaser.Curves.Path {
    const path = new Phaser.Curves.Path(this.x, this.y);

    console.log("random path generated");
    for (let i = 0; i < numPoints; i++) {
      const x = Phaser.Math.Between(this.x - 300, this.x + 300);
      const y = Phaser.Math.Between(this.y - 300, this.y + 300);
      path.lineTo(x, y);
    }
    return path;
  }

  // Method to move the NPC along a random path
  private moveAlongRandomPath(scene: Phaser.Scene) {
    this.path = this.generateRandomPath(5);
    if (!this.walkAnim) return;
    this.play(this.walkAnim, true);
    if (!this.isInteracting) {
      this.moveTween = scene.tweens.add({
        targets: this,
        ease: 'Linear',
        duration: 5000,
        x: this.path.getPoint(1).x,
        y: this.path.getPoint(1).y,
        repeat: 0,
        onComplete: () => {
          //this.isInteracting = false;
          this.play(this.idleAnim, true);
          scene.time.addEvent({
            delay: Phaser.Math.Between(20000, 40000), // Random delay before moving again
            callback: () => {
              this.moveAlongRandomPath(scene); // Repeat move after idle
            },
            loop: true,
          });
        },
        onUpdate: () => {
          this.updateHintPosition();
          if (this.path && this.path.getPoint(1).x < this.x) {
            this.setFlipX(true);
          } else {
            this.setFlipX(false);
          }
        },
      });
    }
  }

  update() {
    if (this.walkAnim) {
      this.updateHintPosition();
    }
  }
}
