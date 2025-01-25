import Phaser from 'phaser';
import { InteractableObject } from './InteractableObject';

export class ObjectManager {
  private objects: {
    object: InteractableObject;
    rect: Phaser.GameObjects.Rectangle;
  }[] = [];
  objectsInProximity: InteractableObject[] = [];

  constructor(private scene: Phaser.Scene) {}

  createObject(x: number, y: number, texture: string, onInteract: () => void) {
    const object = new InteractableObject(this.scene, x, y, texture);
    const { width, height } = object.getBounds();
    const rect = new Phaser.GameObjects.Rectangle(
      this.scene,
      x,
      y,
      width + 30,
      height + 30,
    ).setOrigin(0.5);
    this.scene.physics.add.existing(rect);
    console.log(object.getBounds());
    this.objects.push({ object: object, rect: rect });

    // Add overlap detection
    this.scene.physics.add.overlap(
      this.scene.player, // Assuming 'player' is defined on the scene
      rect,
      () => object.handleProximity(this.scene.player, onInteract), // Pass the callback to handle proximity
      undefined, // Default process callback
      this.scene,
    );

    return object;
  }

  update() {
    this.runProximityCheck();
  }

  runProximityCheck() {
    this.objectsInProximity = [];
    this.objects.forEach(({ object, rect }) => {
      if (object.body && !this.scene.physics.overlap(this.scene.player, rect)) {
        object.handleExitProximity();
      } else {
        this.objectsInProximity.push(object);
      }
    });
    if (this.objectsInProximity.length === 0) {
      this.scene.input.keyboard?.off('keydown-E');
    }
  }
}
