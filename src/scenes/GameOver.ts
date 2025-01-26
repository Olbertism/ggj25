import { Scene } from 'phaser';

export class GameOver extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera;
  background: Phaser.GameObjects.Image;
  gameover_text: Phaser.GameObjects.Text;

  constructor() {
    super('GameOver');
  }

  create(data: any) {
    this.sound.stopAll();
    console.log(data);
    // Camera Setup
    this.camera = this.cameras.main;
    if (data.outcome.victory) {
      this.camera.setBackgroundColor(0x0000ff);
    } else {
      this.camera.setBackgroundColor(0xff0000);
    }

    // Background Image
    this.background = this.add.image(
      this.camera.centerX,
      this.camera.centerY,
      'background',
    );
    this.background.setAlpha(0.5);

    // Game Over Title
    this.gameover_text = this.add.text(
      this.camera.centerX,
      100,
      data.outcome.victory ? 'Congratulations!' : 'Game Over',
      {
        fontFamily: 'Arial Black',
        fontSize: 48,
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 8,
        align: 'center',
      },
    );
    this.gameover_text.setOrigin(0.5);

    // Extract Data
    const actionsTaken = data.actionsTaken || [];
    const totalScore = data.results?.totalScore || 0;
    const negativeThreshold = data.results?.negativeThreshold || 0;
    const positiveThreshold = data.results?.positiveThreshold || 0;

    //this.add.text(0, 0, data.text ?? '', { font: '28px Arial' });

    // Total Score Display
    this.add.text(150, 150, 'Total Score', { font: '28px Arial' });
    this.add
      .text(800, 150, totalScore.toString(), { font: '28px Arial' })
      .setOrigin(1, 0);

    // Action Labels and Points
    actionsTaken.forEach((action: any, index: number) => {
      const yPosition = 200 + index * 30;

      // Label (left)
      this.add.text(200, yPosition, action.label, { font: '20px Arial' });

      // Points (right, aligned)
      this.add
        .text(800, yPosition, action.points.toString(), { font: '20px Arial' })
        .setOrigin(1, 0);
    });

    this.add
      .text(this.camera.centerX, 550, data.message, {
        font: '24px Arial',
        color: '#ffffff',
        wordWrap: { width: 700 },
      })
      .setOrigin(0.5);

    // Thresholds
    this.add
      .text(
        this.camera.centerX - 200,
        700,
        `Positive threshold: ${positiveThreshold}`,
        {
          font: '24px Arial',
        },
      )
      .setOrigin(0.5);

    this.add
      .text(
        this.camera.centerX + 200,
        700,
        `Negative threshold: ${negativeThreshold}`,
        {
          font: '24px Arial',
        },
      )
      .setOrigin(0.5);

    // Return to Main Menu on Pointer Down
    this.input.once('pointerdown', () => {
      this.scene.start('MainMenu');
    });
  }
}
