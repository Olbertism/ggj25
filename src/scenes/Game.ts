import { Scene } from 'phaser';
import { background } from '../commons';
import eventsCenter from './EventsCenter';
import {Npc } from "../gameObjects/npc";

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

  private npcGroup: Phaser.Physics.Arcade.StaticGroup;

  constructor() {
    super('Game');
  }

  preload() {
    // Load assets
    //this.load.image('player', 'assets/player.png');
    //player assets
    this.load.spritesheet('idleSheet', 'assets/player_new_idle_sprite.png', {
      frameWidth: 80,
      frameHeight: 120,
    });

    this.load.spritesheet('walkSheet', 'assets/player_new_walk_sprite.png', {
      frameWidth: 90,
      frameHeight: 120,
    });

    //npc assets:
    this.load.spritesheet("npcIdle", "assets/new_police_idle_sprite.png", {
      frameWidth: 80,
      frameHeight: 120,
  });
  }

  create() {
    this.camera = this.cameras.main;
    this.camera.setBackgroundColor(0x00ff00);

    this.scene.run('JournalUi');
    this.scene.run('KeyLegendUi');

    this.background = this.add.image(0, 0, 'background').setOrigin(0, 0);
    this.physics.world.setBounds(0, 0, background.width, background.height);
    this.cameras.main.setBounds(0, 0, background.width, background.height);

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

    //npc sprites:
    this.anims.create({
      key: "npcIdle",
      frames: this.anims.generateFrameNumbers("npcIdle", { frames: [0, 1, 2, 3,4,5,6,7,8,9] }),
      frameRate: 2,
      repeat: -1,
  });

    // Add player to the scene
    //this.player = this.physics.add.sprite(400, 200, 'player');
    this.player.setScale(0.8);
    this.player.setCollideWorldBounds(true);

    this.camera.startFollow(this.player);

    //add npcs to the sceene:
     // Create NPC instances
     this.npcGroup = this.physics.add.staticGroup();
     const npc1 = new Npc(this, 300, 300, "npcIdle", "Guard", "npcIdle", 0.8);
 
     // Add NPCs to a group for easier management
     this.npcGroup.add(npc1);
     //this.npcGroup.physics.add

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
    
    this.physics.add.collider(this.player, this.npcGroup,  this.handleOverlap, undefined, this);

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
      this.player.flipX = true;
    } else if (this.cursors.right?.isDown && !this.dialogBox.visible) {
      this.player.setVelocityX(speed);
      this.player.flipX = false;
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
    console.log('fgjhh');
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
