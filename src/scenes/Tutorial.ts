import { GameObjects, Scene } from 'phaser';

export class Tutorial extends Scene {
  background: GameObjects.Image;
  title: GameObjects.Text;

  constructor() {
    super('Tutorial');
  }

  create() {
    this.background = this.add.image(512, 384, 'background');

    this.add
      .text(
        512,
        140,
        'Your task is to research the anomaly and find out new things about it. You have been supplied with some materials about it and are free to take various kinds of actions. It is up to you to discern, which information or action makes sense, and which not. Some interactions will open up new options, some might lead you astray.',
        {
          wordWrap: { width: 900 },
          fontSize: 20,
          align: 'left',
          lineSpacing: 5,
          padding: { left: 5, right: 5, top: 5, bottom: 5 },
        },
      )
      .setOrigin(0.5)
      .setBackgroundColor('grey');

    this.add
      .text(
        512,
        275,
        'These "bubbles" defied all known science. They emitted no energy, consumed nothing, and served no apparent purpose. The scientific community was in chaos, grasping for answers.',
        {
          wordWrap: { width: 900 },
          fontSize: 20,
          align: 'left',
          lineSpacing: 5,
        },
      )
      .setOrigin(0.5)
      .setVisible(false);

    this.add
      .text(
        512,
        375,
        'You’ve been tasked to investigate one of these anomalies. With a summary of what little is known and the latest reports in hand, it’s up to you to uncover the truth.',
        {
          wordWrap: { width: 900 },
          fontSize: 20,
          align: 'left',
          lineSpacing: 5,
        },
      )
      .setOrigin(0.5)
      .setVisible(false);

    this.add
      .text(850, 750, 'Click to continue...', {
        fontSize: 24,
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 6,
        align: 'left',
      })
      .setOrigin(0.5);

    this.input.once('pointerdown', () => {
      this.scene.start('Game');
    });
  }
}
