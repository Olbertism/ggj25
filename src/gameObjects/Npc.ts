export class Npc extends Phaser.Physics.Arcade.Sprite {
    private npcName: string;
    private isMoving: boolean;
    private path: Phaser.Curves.Path | null = null;
    private moveTween: Phaser.Tweens.Tween;
    private idleAnimation: string;
    private walkAnimation: string;


    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        texture: string,
        npcName: string,
        scale: number,
        idleAnimation: string,
        walkAnimation: string,
        isMoving: boolean = false) {

        super(scene, x, y, texture);
        this.npcName = npcName;
        this.isMoving = isMoving;
        this.idleAnimation = idleAnimation;
        this.walkAnimation = walkAnimation;

        scene.add.existing(this);
        this.setScale(scale);

        if (isMoving) {
            this.startBehavior(scene);
            scene.physics.world.enable(this);
            this.setCollideWorldBounds(true);
            this.setImmovable(true);
        }
        else{
            this.play(this.idleAnimation, true);
        }
    }

    // Method to start the NPC's behavior of idling and moving on random paths
    private startBehavior(scene: Phaser.Scene) {
        this.play(this.idleAnimation, true);
        scene.time.addEvent({
            delay: Phaser.Math.Between(4000, 7000),
            callback: () => {
                this.moveAlongRandomPath(scene);
            },
            loop: false
        });
    }

    // Function to generate a random path with a given number of points
    private generateRandomPath(numPoints: number): Phaser.Curves.Path {
        const path = new Phaser.Curves.Path(this.x, this.y);

        for (let i = 0; i < numPoints; i++) {
            const x = Phaser.Math.Between(100, 800);
            const y = Phaser.Math.Between(100, 600);
            path.lineTo(x, y);
        }
        return path;
    }

    // Method to move the NPC along a random path
    private moveAlongRandomPath(scene: Phaser.Scene) {
        this.path = this.generateRandomPath(5);
        this.play(this.walkAnimation, true);
        this.moveTween = scene.tweens.add({
            targets: this,
            ease: 'Linear',
            duration: 5000,
            x: this.path.getPoint(1).x,
            y: this.path.getPoint(1).y,
            repeat: 0,
            onComplete: () => {
                this.play(this.idleAnimation, true);
                scene.time.addEvent({
                    delay: Phaser.Math.Between(1000, 3000),  // Random delay before moving again
                    callback: () => {
                        this.moveAlongRandomPath(scene);  // Repeat move after idle
                    },
                    loop: false
                });
            },
            onUpdate: () => {
                if (this.path.getPoint(1).x < this.x) {
                    this.setFlipX(true);
                } else {
                    this.setFlipX(false);
                }
            },
        });
    }
}
