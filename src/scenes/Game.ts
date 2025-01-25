import { Scene } from 'phaser';
import { background } from '../commons';
import eventsCenter from './EventsCenter';

export class Game extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera;
  background: Phaser.GameObjects.Image;
  msg_text: Phaser.GameObjects.Text;

  private player: Phaser.Physics.Arcade.Sprite;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  private obstacle: Phaser.GameObjects.Rectangle; // The obstacle

  private interactionKey!: Phaser.Input.Keyboard.Key;
  private dialogBox: Phaser.GameObjects.Container;
  private dialogText!: Phaser.GameObjects.Text;

  private journalKey!: Phaser.Input.Keyboard.Key;

  constructor() {
    super('Game');
  }

  preload() {
    // Load assets
    this.load.image('player', 'assets/player.png');
  }

  create() {
    this.camera = this.cameras.main;
    this.camera.setBackgroundColor(0x00ff00);

    this.background = this.add.image(0, 0, 'background').setOrigin(0, 0);
    this.physics.world.setBounds(0, 0, background.width, background.height);
    this.cameras.main.setBounds(0, 0, background.width, background.height);

    this.scene.run('JournalUi');
    this.scene.run('KeyLegendUi');

    // Add player to the scene
    this.player = this.physics.add.sprite(400, 200, 'player');
    this.player.setScale(0.8);
    this.player.setCollideWorldBounds(true);

    this.camera.startFollow(this.player);

    // Create an obstacle rectangle
    this.obstacle = this.add.rectangle(400, 450, 200, 50, 0xff0000); // Red rectangle
    this.physics.add.existing(this.obstacle, true); // Add physics to the rectangle

    // Add collision between the player and the obstacle
    this.physics.add.collider(
      this.player,
      this.obstacle,
      this.handleOverlap,
      undefined,
      this,
    );

    // Set up input keys
    this.cursors = this.input.keyboard.createCursorKeys();
    this.interactionKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.E,
    );
    this.journalKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.J,
    );

    // Create dialog box and journal UI
    this.createDialogBox();
    this.dialogBox.setVisible(false);

    /* this.input.once('pointerdown', () => {
      this.scene.start('GameOver');
    }); */
  }

  update() {
    if (!this.cursors) return;

    const speed = 200;

    // Reset player velocity
    this.player.setVelocity(0);

    // Horizontal movement
    if (this.cursors.left?.isDown && !this.dialogBox.visible) {
      this.player.setVelocityX(-speed);
    } else if (this.cursors.right?.isDown && !this.dialogBox.visible) {
      this.player.setVelocityX(speed);
    }

    // Vertical movement
    if (this.cursors.up?.isDown && !this.dialogBox.visible) {
      this.player.setVelocityY(-speed);
    } else if (this.cursors.down?.isDown && !this.dialogBox.visible) {
      this.player.setVelocityY(speed);
    }

    // Normalize velocity to maintain constant speed diagonally
    this.player.body && this.player.body.velocity.normalize().scale(speed);

    // Toggle journal visibility
    if (Phaser.Input.Keyboard.JustDown(this.journalKey)) {
      console.log('journal key');
      // this.events.emit('toggleJournal');
      eventsCenter.emit('toggleJournal');
      // this.toggleJournal();
    }

    // Check for interaction key press
    if (
      Phaser.Input.Keyboard.JustDown(this.interactionKey) &&
      this.dialogBox.visible
    ) {
      this.closeDialog();
    }
  }

  private displayDialog(message: string) {
    // Update the dialog text and show the dialog box
    this.dialogText.setText(message);
    this.dialogBox.setVisible(true);
  }

  private handleOverlap() {
    // Show the dialog box when the player is near the obstacle
    this.displayDialog("Hello! I'm just a placeholder rectangle.");
  }

  private createDialogBox() {
    // Create a container for the dialog box
    this.dialogBox = this.add.container(400, 500);

    // Create the background of the dialog box
    const dialogBg = this.add
      .rectangle(0, 0, 300, 100, 0x000000)
      .setOrigin(0, 0);
    dialogBg.setStrokeStyle(2, 0xffffff);

    // Create the text for the dialog
    this.dialogText = this.add
      .text(0, 0, '', {
        fontSize: '16px',
        color: '#ffffff',
        wordWrap: { width: 280 },
      })
      .setOrigin(0, 0);

    // Add the background and text to the container
    this.dialogBox.add([dialogBg, this.dialogText]);
  }

  private closeDialog() {
    // Hide the dialog box
    this.dialogBox.setVisible(false);
  }
}
