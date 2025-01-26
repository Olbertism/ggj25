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
    scene.physics.add.existing(this, true);
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
    //console.log('handleProximity');
    if (!this.canInteract) {
      this.interactionHint.setVisible(true);
      this.canInteract = true;

      // Listen for interaction key
      console.log('listener...');
      this.scene.input.keyboard.on('keydown-E', () => {
        console.log('e down');
        this.handleInteraction(onInteract);
      });
    }
  }

  handleInteraction(onInteract: () => void) {
    if (this.canInteract) {
      onInteract();
    }
    if (this.collisionSound && !this.soundPlayed) {
      console.log('play: ' + this.collisionSound);
      this.collisionSound.play();
      this.soundPlayed = true;
    }
  }

  handleExitProximity() {
    this.interactionHint.setVisible(false);
    this.canInteract = false;
    this.soundPlayed = false;
  }

  // Method to start the NPC's behavior of idling and moving on random paths
  private startBehavior(scene: Phaser.Scene) {
    if (!this.walkAnim) return;
    this.play(this.walkAnim, true);
    scene.time.addEvent({
      delay: Phaser.Math.Between(4000, 7000),
      callback: () => {
        this.moveAlongRandomPath(scene);
      },
      loop: false,
    });
  }

  // Function to generate a random path with a given number of points
  private generateRandomPath(numPoints: number): Phaser.Curves.Path {
    const path = new Phaser.Curves.Path(this.x, this.y);

    for (let i = 0; i < numPoints; i++) {
      const x = Phaser.Math.Between(100, 800);
      const y = Phaser.Math.Between(100, 600);
      path.lineTo(x, y);
    }
    return path;
  }

  // Method to move the NPC along a random path
  private moveAlongRandomPath(scene: Phaser.Scene) {
    this.path = this.generateRandomPath(5);
    if (!this.walkAnim) return;
    this.play(this.walkAnim, true);
    this.moveTween = scene.tweens.add({
      targets: this,
      ease: 'Linear',
      duration: 5000,
      x: this.path.getPoint(1).x,
      y: this.path.getPoint(1).y,
      repeat: 0,
      onComplete: () => {
        this.play(this.idleAnim, true);
        scene.time.addEvent({
          delay: Phaser.Math.Between(1000, 3000), // Random delay before moving again
          callback: () => {
            this.moveAlongRandomPath(scene); // Repeat move after idle
          },
          loop: false,
        });
      },
      onUpdate: () => {
        if (this.path.getPoint(1).x < this.x) {
          this.setFlipX(true);
        } else {
          this.setFlipX(false);
        }
      },
    });
  }
}
