import Phaser from 'phaser';

export class InteractableObject extends Phaser.Physics.Arcade.Sprite {
  private interactionHint: Phaser.GameObjects.Text;
  private canInteract: boolean = false;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    scale?: number,
    isAnimated?: boolean,
  ) {
    super(scene, x, y, texture);

    scale && this.setScale(scale);

    // Add the object to the scene
    scene.add.existing(this);
    scene.physics.add.existing(this, true);
    isAnimated && this.play(texture, true);

    scene.physics.add.collider(scene.player, this, undefined, undefined, scene);

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
  }

  handleExitProximity() {
    this.interactionHint.setVisible(false);
    this.canInteract = false;
  }
}
