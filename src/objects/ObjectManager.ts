import Phaser from 'phaser';
import { InteractableObject } from './InteractableObject';

export class ObjectManager {
  private objects: InteractableObject[] = [];

  constructor(private scene: Phaser.Scene) {}

  createObject(x: number, y: number, texture: string, onInteract: () => void) {
    const object = new InteractableObject(this.scene, x, y, texture);
    this.objects.push(object);

    // Add overlap detection
    this.scene.physics.add.overlap(
      this.scene.player, // Assuming 'player' is defined on the scene
      object,
      () => object.handleProximity(this.scene.player, onInteract), // Pass the callback to handle proximity
      undefined, // Default process callback
      this.scene,
    );

    return object;
  }

  update() {
    // Check if objects are no longer overlapping with the player
    this.objects.forEach((object) => {
      if (
        object.body &&
        !this.scene.physics.overlap(this.scene.player, object)
      ) {
        object.handleExitProximity();
      }
    });
  }
}
