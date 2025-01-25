import { Scene } from 'phaser';
import { background } from '../commons';
import { bubbleData } from '../data/store';
import { ObjectManager } from '../objects/ObjectManager';
import eventsCenter from './EventsCenter';
import {Npc } from "../gameObjects/Npc";
import {MapObstacles} from "./MapObstacles.ts";

export class Game extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera;
  background: Phaser.GameObjects.Image;
  msg_text: Phaser.GameObjects.Text;

  private objectManager: ObjectManager;

  private player: Phaser.Physics.Arcade.Sprite;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  bubbleContainer: Phaser.GameObjects.Container;
  bubbleZone: Phaser.GameObjects.Rectangle;
  bubbleBody: Phaser.FX.Circle;

  private journalKey!: Phaser.Input.Keyboard.Key;

  private npcGroup: Phaser.Physics.Arcade.StaticGroup;

  private wKey!: Phaser.Input.Keyboard.Key;
  private sKey!: Phaser.Input.Keyboard.Key;
  private aKey!: Phaser.Input.Keyboard.Key;
  private dKey!: Phaser.Input.Keyboard.Key;

  private mapObstacles: MapObstacles;
  private obstacleGroup: Phaser.GameObjects.Group;

  movementEnabled: boolean = true; // Flag to enable/disable input

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

    //npc assets:
    this.load.spritesheet("npcIdle", "assets/new_police_idle_sprite.png", {
      frameWidth: 80,
      frameHeight: 120,
  });

  //cat assets:
    this.load.spritesheet("catIdle", "assets/cat_idle_sprite.png", {
      frameWidth: 42,
      frameHeight: 38,
   });
    this.load.spritesheet("catWalk", "assets/cat_new_walk_sprite.png", {
      frameWidth: 42,
      frameHeight: 38,
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

    //npc sprites:
    this.anims.create({
      key: "npcIdle",
      frames: this.anims.generateFrameNumbers("npcIdle", { frames: [0, 1, 2, 3,4,5,6,7,8,9] }),
      frameRate: 2,
      repeat: -1,
  });

      //cat sprites
    this.anims.create({
        key: "catIdle",
        frames: this.anims.generateFrameNumbers("catIdle", { frames: [0, 1, 2, 3,4,5,6,7,8] }),
        frameRate: 4,
        repeat: -1,
    });

    this.anims.create({
      key: "catWalk",
      frames: this.anims.generateFrameNumbers("catWalk", { frames: [0, 1, 2, 3,4,5] }),
      frameRate: 4,
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
     const npc1 = new Npc(this, 300, 300, "npcIdle", "Guard", 0.8, "npcIdle", "", false);
     const cat = new Npc(this, 500, 700, "catIdle", "cat",1.5, "catIdle", "catWalk", true);
 
     // Add NPCs to a group for easier management
     this.npcGroup.add(npc1);
     

     //ad cat to scene:
     this.add.existing(cat);
     this.physics.add.existing(cat);


    this.mapObstacles = new MapObstacles(this);
    this.obstacleGroup = this.mapObstacles.createObstacles();

    this.physics.add.collider(
      this.player,
      this.obstacleGroup,
      undefined,
      undefined,
      this,
    );

    // Add objects using ObjectManager
    this.objectManager.createObject(200, 150, 'object', () => {
      console.log('Interacted with object at (200, 150)!');
      eventsCenter.emit('toggleInteraction', this);
    });

    // Create bubble
    this.objectManager.createObject(1230, 1100, 'bubble', () => {
      console.log('Interacted with bubble at (1230, 1100)!');
      eventsCenter.emit('toggleInteraction', bubbleData);
    });
    
    this.physics.add.collider(this.player, this.npcGroup,  undefined, undefined, this);
    this.physics.add.collider(this.player, cat,  undefined, undefined, this);
    this.physics.add.collider(npc1, cat,  undefined, undefined, this);
    this.physics.add.collider(cat, this.player,  undefined, undefined, this);

    // Set up input keys
    if( this.input.keyboard != null) {
      this.cursors = this.input.keyboard.createCursorKeys();
      this.journalKey = this.input.keyboard.addKey(
          Phaser.Input.Keyboard.KeyCodes.J,
      );
      this.wKey = this.input.keyboard.addKey("w");
      this.sKey = this.input.keyboard.addKey("s");
      this.aKey = this.input.keyboard.addKey("a");
      this.dKey = this.input.keyboard.addKey("d");
    }

    /* this.input.once('pointerdown', () => {
      this.scene.start('GameOver');
    }); */

    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      const worldX = pointer.worldX;
      const worldY = pointer.worldY;

      console.log(`Clicked at world position: x: ${worldX}, y: ${worldY}`);
    });

    eventsCenter.on('disableMovement', () => {
      console.log('disableMovement');
      this.movementEnabled = false;
    });

    eventsCenter.on('enableMovement', () => {
      this.movementEnabled = true;
    });
  }

  update() {
    if (!this.cursors) return;

    if (!this.movementEnabled) {
      this.player.setVelocity(0, 0); // Stop movement if input is disabled
      return;
    }

    // Update objects
    this.objectManager.update();

    const speed = 200;

    // Reset player velocity
    this.player.setVelocity(0);

    // Horizontal movement
    if (this.cursors.left?.isDown || this.aKey.isDown) {
      this.player.setVelocityX(-speed);
      this.player.flipX = true;
    } else if (this.cursors.right?.isDown || this.dKey.isDown) {
      this.player.setVelocityX(speed);
      this.player.flipX = false;
    }

    // Vertical movement
    if (this.cursors.up?.isDown || this.wKey.isDown) {
      this.player.setVelocityY(-speed);
    } else if (this.cursors.down?.isDown || this.sKey.isDown) {
      this.player.setVelocityY(speed);
    }

    // Normalize velocity to maintain constant speed diagonally
    this.player.body && this.player.body.velocity.normalize().scale(speed);

    // Toggle journal visibility
    if (Phaser.Input.Keyboard.JustDown(this.journalKey)) {
      eventsCenter.emit('toggleJournal');
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
}
