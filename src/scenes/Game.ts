import { Scene } from 'phaser';
import { background } from '../commons';
import { ObjectManager } from '../objects/ObjectManager';
import eventsCenter from './EventsCenter';

export class Game extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera;
  background: Phaser.GameObjects.Image;
  msg_text: Phaser.GameObjects.Text;

  private objectManager: ObjectManager;

  private player: Phaser.Physics.Arcade.Sprite;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  private obstacle: Phaser.GameObjects.Rectangle; // The obstacle

  bubbleContainer: Phaser.GameObjects.Container;
  bubbleZone: Phaser.GameObjects.Rectangle;
  bubbleBody: Phaser.FX.Circle;

  private interactionKey!: Phaser.Input.Keyboard.Key;

  private journalKey!: Phaser.Input.Keyboard.Key;

  isInteractionEnabled: boolean = false;
  canInteract: boolean = false;

  constructor() {
    super('Game');
  }

  preload() {
    // Load assets
    this.load.spritesheet('idleSheet', 'assets/player_new_idle_sprite.png', {
      frameWidth: 80,
      frameHeight: 120,
    });

    this.load.spritesheet('walkSheet', 'assets/player_new_walk_sprite.png', {
      frameWidth: 90,
      frameHeight: 120,
    });
  }

  create() {
    this.camera = this.cameras.main;
    this.camera.setBackgroundColor(0x00ff00);

    this.scene.run('JournalUi');
    this.scene.run('KeyLegendUi');
    this.scene.run('InteractionUi');

    this.background = this.add.image(0, 0, 'background').setOrigin(0, 0);
    this.physics.world.setBounds(0, 0, background.width, background.height);
    this.cameras.main.setBounds(0, 0, background.width, background.height);

    // Initialize ObjectManager
    this.objectManager = new ObjectManager(this);

    console.log('inited');

    //player sprites
    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('idleSheet', {
        frames: [0, 1, 2, 3, 4, 5],
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNumbers('walkSheet', {
        frames: [0, 1, 2, 3, 4, 5],
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.player = this.physics.add.sprite(400, 200, 'idleSheet');
    this.player.play('idle');

    // Add player to the scene
    //this.player = this.physics.add.sprite(400, 200, 'player');
    this.player.setScale(0.8);
    this.player.setCollideWorldBounds(true);

    this.camera.startFollow(this.player);

    // Create an obstacle rectangle
    this.obstacle = this.add.rectangle(400, 450, 200, 50, 0xff0000); // Red rectangle
    this.physics.add.existing(this.obstacle, true); // Add physics to the rectangle

    this.obstacleCircle = this.add.circle(400, 450, 40, 0xfff000);
    this.physics.add.existing(this.obstacleCircle, true);

    this.physics.add.collider(
      this.player,
      this.obstacleCircle,
      null,
      undefined,
      this,
    );

    // Add collision between the player and the obstacle
    this.physics.add.overlap(
      this.player,
      this.obstacle,
      this.handleProximity,
      undefined,
      this,
    );

    // Add objects using ObjectManager
    this.objectManager.createObject(200, 150, 'object', () => {
      console.log('Interacted with object at (200, 150)!');

      eventsCenter.emit('toggleInteraction', this);
    });
    /*
    this.objectManager.createObject(300, 250, 'object', () => {
      console.log('Interacted with object at (300, 250)!');
    }); */

    // Set up input keys
    this.cursors = this.input.keyboard.createCursorKeys();
    this.interactionKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.E,
    );
    this.journalKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.J,
    );

    /* this.input.once('pointerdown', () => {
      this.scene.start('GameOver');
    }); */

    this.bubbleContainer = this.add.container(620, 580);
    this.bubbleZone = this.add
      .rectangle(620, 580, 160, 200)
      .setStrokeStyle(2, 0xfff000);
    this.bubbleContainer.add(this.bubbleZone);

    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      const worldX = pointer.worldX;
      const worldY = pointer.worldY;

      console.log(`Clicked at world position: x: ${worldX}, y: ${worldY}`);
    });
  }

  update() {
    if (!this.cursors) return;

    // Update objects
    this.objectManager.update();

    const speed = 200;

    // Reset player velocity
    this.player.setVelocity(0);

    // Horizontal movement
    if (this.cursors.left?.isDown) {
      this.player.setVelocityX(-speed);
      this.player.flipX = true;
    } else if (this.cursors.right?.isDown) {
      this.player.setVelocityX(speed);
      this.player.flipX = false;
    }

    // Vertical movement
    if (this.cursors.up?.isDown) {
      this.player.setVelocityY(-speed);
    } else if (this.cursors.down?.isDown) {
      this.player.setVelocityY(speed);
    }

    // Normalize velocity to maintain constant speed diagonally
    this.player.body && this.player.body.velocity.normalize().scale(speed);

    // Toggle journal visibility
    if (Phaser.Input.Keyboard.JustDown(this.journalKey)) {
      eventsCenter.emit('toggleJournal');
    }

    if (
      Phaser.Input.Keyboard.JustDown(this.interactionKey) &&
      this.canInteract
    ) {
      eventsCenter.emit('toggleInteraction', 'data');
    }

    // If no longer overlapping, reset canInteract
    if (this.canInteract && !this.physics.overlap(this.player, this.obstacle)) {
      this.handleExitProximity();
    }
    if (
      this.player.body?.velocity.x !== 0 ||
      this.player.body?.velocity.y !== 0
    ) {
      // Player is moving
      if (this.player.anims.currentAnim?.key !== 'walk') {
        this.player.play('walk', true);
      }
    } else {
      // Player is idle
      if (this.player.anims.currentAnim?.key !== 'idle') {
        this.player.play('idle', true);
      }
    }
  }

  private handleExitProximity() {
    this.canInteract = false;
  }

  private handleProximity() {
    this.canInteract = true;

    // Optionally show a hint to the player
    this.add.text(
      this.obstacle.x,
      this.obstacle.y - 20,
      'Press E to interact',
      {
        fontSize: '12px',
        color: '#ffffff',
      },
    );
  }
}
