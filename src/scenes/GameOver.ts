import { Scene } from 'phaser';

export class GameOver extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    gameover_text : Phaser.GameObjects.Text;

    constructor ()
    {
        super('GameOver');
    }

    create (data: any)
    {
        this.camera = this.cameras.main
        this.camera.setBackgroundColor(0xff0000);

        this.background = this.add.image(512, 384, 'background');
        this.background.setAlpha(0.5);

        this.gameover_text = this.add.text(512, 100, 'Game Over', {
            fontFamily: 'Arial Black', fontSize: 64, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        });

        const actionsTaken = data.actionsTaken || [];
        const totalScore = data.totalScore || 0;

        // Add total score
        this.add.text(150, 200, 'Total Score', {
            font: '28px Arial',
        });

        this.add.text(800, 200, totalScore.toString(), {
            font: '28px Arial',
        });

        //Show scores for each action
        actionsTaken.forEach((action: any, index: number) => {
            // Label (left)
            this.add.text(200, 250 + index * 30, action.label, {
                font: '20px Arial',
            });

            // Points (right)
            this.add.text(800, 250 + index * 30, action.points.toString(), {
                font: '20px Arial',
            }).setOrigin(1, 0); // Align text to the right
        });
        this.gameover_text.setOrigin(0.5);

        this.input.once('pointerdown', () => {

            this.scene.start('MainMenu');

        });
    }
}
