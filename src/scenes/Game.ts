import { Scene } from 'phaser';
import { background } from '../commons';
import {bubbleData, cameraData} from '../data/store';
import { MapObstacles } from '../gameObjects/MapObstacles.ts';
import { Npc } from '../gameObjects/Npc';
import { ActionHandler } from '../objects/ActionHandler.ts';
import { ObjectManager } from '../objects/ObjectManager';
import eventsCenter from './EventsCenter';

export class Game extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera;
  background: Phaser.GameObjects.Image;
  msg_text: Phaser.GameObjects.Text;

  private objectManager: ObjectManager;
  private actionHandler: ActionHandler;

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

  movementEnabled: boolean; // Flag to enable/disable input

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
    this.load.spritesheet('npcIdle', 'assets/new_police_idle_sprite.png', {
      frameWidth: 80,
      frameHeight: 120,
    });

    this.load.spritesheet('oldManIdle', 'assets/old_guy_idle.png', {
      frameWidth: 90,
      frameHeight: 125,
    });
    this.load.spritesheet('oldWomanIdle', 'assets/old_woman_idle.png', {
      frameWidth: 90,
      frameHeight: 120,
    });

    //bubble:
    this.load.spritesheet('bubble', 'assets/bubble_sprite.png', {
      frameWidth:256,
      frameHeight: 280,
    });

    //cat assets:
    this.load.spritesheet('catIdle', 'assets/cat_idle_sprite.png', {
      frameWidth: 42,
      frameHeight: 38,
    });
    this.load.spritesheet('catWalk', 'assets/cat_new_walk_sprite.png', {
      frameWidth: 42,
      frameHeight: 38,
    });
  }

  create() {
    // Create ActionHandler and store it in the registry if it doesn't exist
    if (!this.registry.has('actionHandler')) {
      this.registry.set('actionHandler', new ActionHandler());
    }

    const actionHandler: ActionHandler = this.registry.get('actionHandler');

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
    this.actionHandler = new ActionHandler();

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

    this.player = this.physics.add.sprite(850, 850, 'idleSheet');
    this.player.play('idle');

    //npc sprites:
    this.anims.create({
      key: 'npcIdle',
      frames: this.anims.generateFrameNumbers('npcIdle', {
        frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      }),
      frameRate: 2,
      repeat: -1,
    });

    this.anims.create({
      key: 'oldManIdle',
      frames: this.anims.generateFrameNumbers('oldManIdle', {
        frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      }),
      frameRate: 2,
      repeat: -1,
    });

    this.anims.create({
      key: 'oldWomanIdle',
      frames: this.anims.generateFrameNumbers('oldWomanIdle', {
        frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      }),
      frameRate: 2,
      repeat: -1,
    });

    //bubble
     this.anims.create({
       key: 'bubble',
       frames: this.anims.generateFrameNumbers('bubble', {
         frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
       }),
       frameRate: 4,
       repeat: -1,
     });

    //cat sprites
    this.anims.create({
      key: 'catIdle',
      frames: this.anims.generateFrameNumbers('catIdle', {
        frames: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      }),
      frameRate: 4,
      repeat: -1,
    });

    this.anims.create({
      key: 'catWalk',
      frames: this.anims.generateFrameNumbers('catWalk', {
        frames: [0, 1, 2, 3, 4, 5],
      }),
      frameRate: 4,
      repeat: -1,
    });

    this.player.setScale(0.8);
    this.player.setCollideWorldBounds(true);

    this.camera.startFollow(this.player);

    this.movementEnabled = true;

    //add npcs to the scene:
    // Create NPC instances
    this.npcGroup = this.physics.add.staticGroup();
    const npc1 = new Npc(
      this,
      300,
      300,
      'npcIdle',
      'Guard',
      0.8,
      'npcIdle',
      '',
      false,
    );
    const cat = new Npc(
      this,
      500,
      700,
      'catIdle',
      'cat',
      1.5,
      'catIdle',
      'catWalk',
      true,
    );

    // Add NPCs to a group for easier management
    this.npcGroup.add(npc1);

    //ad cat to scene:
    this.add.existing(cat);
    this.physics.add.existing(cat);

     // add bounding boxes for map objects
    this.mapObstacles = new MapObstacles(this);
    this.obstacleGroup = this.mapObstacles.createObstacles();

    this.physics.add.collider(
      this.player,
      this.obstacleGroup,
      undefined,
      undefined,
      this,
    );

    // ### Interactable objects ####

    // Bubble
    this.objectManager.createObject(1230, 1100, 'bubble', () => {
      console.log('Interacted with bubble at (1230, 1100)!');
      eventsCenter.emit('toggleInteraction', bubbleData);
    }, 1, true);
    // .preFX?.addGlow(0x8a1adb)

    // Camera
    this.objectManager.createObject(1500, 1400, 'camera', () => {
      console.log('Interacted with camera at (1500, 1400)!');
      eventsCenter.emit('toggleInteraction', cameraData);
    });

    // Old man
    this.objectManager.createObject(1260, 630, 'old-man', () => {
      console.log('Interacted with old man at (1230, 1100)!');
      eventsCenter.emit('toggleInteraction', bubbleData);
    });

    // Old woman
    this.objectManager.createObject(1150, 630, 'old-woman', () => {
      console.log('Interacted with old woman at (1230, 1100)!');
      eventsCenter.emit('toggleInteraction', bubbleData);
    });

    // Ray installation
    this.objectManager.createObject(800, 1000, 'lamp', () => {
      console.log('Interacted with rays at (800, 1000)!');
      eventsCenter.emit('toggleInteraction', bubbleData);
    }, 1.5);

    // Lab Rat
    this.objectManager.createObject(515, 1500, 'lab-rat', () => {
      console.log('Interacted with lab rat at (800, 1000)!');
      eventsCenter.emit('toggleInteraction', bubbleData);
    });

    // Computer
    this.objectManager.createObject(570, 1350, 'computer', () => {
      console.log('Interacted with computer at (800, 1000)!');
      eventsCenter.emit('toggleInteraction', bubbleData);
    });

    // Guard 1
    this.objectManager.createObject(
      570,
      460,
      'npcIdle',
      () => {
        console.log('Interacted with guard at (800, 1000)!');
        eventsCenter.emit('toggleInteraction', bubbleData);
      },
      0.8,
      true,
    );

    // Guard 2
    this.objectManager.createObject(
      370,
      360,
      'npcIdle',
      () => {
        console.log('Interacted with guard at (800, 1000)!');
        eventsCenter.emit('toggleInteraction', bubbleData);
      },
      0.8,
      true,
      true
    );
    //oldman
    this.objectManager.createObject(
      1150,
      630,
      'oldManIdle',
      () => {
        console.log('Interacted with guard at (800, 1000)!');
        eventsCenter.emit('toggleInteraction', bubbleData);
      },
      0.9,
      true
    );
//old woman
    this.objectManager.createObject(
      1260,
      630,
      'oldWomanIdle',
      () => {
        console.log('Interacted with guard at (800, 1000)!');
        eventsCenter.emit('toggleInteraction', bubbleData);
      },
      0.9,
      true
    );

    this.physics.add.collider(
      this.player,
      this.npcGroup,
      undefined,
      undefined,
      this,
    );
    this.physics.add.collider(this.player, cat, undefined, undefined, this);
    this.physics.add.collider(npc1, cat, undefined, undefined, this);
    this.physics.add.collider(cat, this.player, undefined, undefined, this);

    // Set up input keys
    if (this.input.keyboard != null) {
      this.cursors = this.input.keyboard.createCursorKeys();
      this.journalKey = this.input.keyboard.addKey(
        Phaser.Input.Keyboard.KeyCodes.J,
      );
      this.wKey = this.input.keyboard.addKey('w');
      this.sKey = this.input.keyboard.addKey('s');
      this.aKey = this.input.keyboard.addKey('a');
      this.dKey = this.input.keyboard.addKey('d');
    }

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

    eventsCenter.on('gameOver', () => {
      this.scene.stop('Game');
      this.scene.stop('InteractionUi');
      this.scene.stop('JournalUi');
      this.scene.stop('KeyLegendUi');
      this.scene.start('GameOver', {actionsTaken: this.actionHandler.getActionsTaken(), totalPoints: this.actionHandler.getTotalPoints()});
    })
  }

  update() {
    if (!this.cursors) return;

    if (!this.movementEnabled) {
      this.player.setVelocity(0, 0); // Stop movement if input is disabled
      return;
    }

    // Update objects
    this.objectManager.update();

    const speed = 250;

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
