import { Scene } from 'phaser';
import { background } from '../commons';

export class Game extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera;
  background: Phaser.GameObjects.Image;
  msg_text: Phaser.GameObjects.Text;

  private player!: Phaser.Physics.Arcade.Sprite;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

  private obstacle!: Phaser.GameObjects.Rectangle; // The obstacle

  constructor() {
    super('Game');
  }

  preload() {
    // Load assets
    this.load.image('player', 'assets/tz_logo.png');
  }

  create() {
    this.camera = this.cameras.main;
    this.camera.setBackgroundColor(0x00ff00);

    this.background = this.add.image(0, 0, 'background').setOrigin(0, 0);
    this.physics.world.setBounds(0, 0, background.width, background.height);
    this.cameras.main.setBounds(0, 0, background.width, background.height);
    // this.background.setAlpha(0.5);

    // Add player to the scene
    this.player = this.physics.add.sprite(400, 300, 'player');
    this.player.setScale(1.5);
    this.player.setCollideWorldBounds(true);

    this.camera.startFollow(this.player);

    // Create an obstacle rectangle
    this.obstacle = this.add.rectangle(400, 450, 200, 50, 0xff0000); // Red rectangle
    this.physics.add.existing(this.obstacle, true); // Add physics to the rectangle

    // Add collision between the player and the obstacle
    this.physics.add.collider(this.player, this.obstacle);

    // Set up cursor keys for movement
    this.cursors = this.input.keyboard.createCursorKeys();

    this.input.once('pointerdown', () => {
      this.scene.start('GameOver');
    });
  }

  update() {
    if (!this.cursors) return;

    const speed = 200;

    // Reset player velocity
    this.player.setVelocity(0);

    // Horizontal movement
    if (this.cursors.left?.isDown) {
      this.player.setVelocityX(-speed);
    } else if (this.cursors.right?.isDown) {
      this.player.setVelocityX(speed);
    }

    // Vertical movement
    if (this.cursors.up?.isDown) {
      this.player.setVelocityY(-speed);
    } else if (this.cursors.down?.isDown) {
      this.player.setVelocityY(speed);
    }

    // Normalize velocity to maintain constant speed diagonally
    this.player.body.velocity.normalize().scale(speed);
  }
}
