import Phaser from 'phaser';

export class InteractableObject extends Phaser.Physics.Arcade.Sprite {
  private interactionHint: Phaser.GameObjects.Text;
  private canInteract: boolean = false;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);

    // Add the object to the scene
    scene.add.existing(this);
    scene.physics.add.existing(this, true);

    scene.physics.add.collider(scene.player, this, undefined, undefined, scene);

    // Create an interaction hint
    this.interactionHint = scene.add
      .text(x, y - 20, 'Press E to interact', {
        fontSize: '12px',
        color: '#ffffff',
      })
      .setVisible(false);
  }

  // Logic for handling proximity
  handleProximity(
    player: Phaser.Physics.Arcade.Sprite,
    onInteract: () => void,
  ) {
    console.log('handleProximity');
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
