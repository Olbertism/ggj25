import { Scene } from "phaser";

export class Npc extends Phaser.Physics.Arcade.Sprite {
    private npcName: string;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, npcName: string, animationKey: string,  scale: number = 1,) {
        super(scene, x, y, texture);
        this.npcName = npcName;
        

        // Add the NPC to the scene's physics system
        scene.add.existing(this);
        //scene.physics.add.existing(this);
        // Play the specified animation
        this.play(animationKey, true);
        this.setScale(scale);
    }

    greet(): void {
       
    }

    update(): void {
      
    }
}
