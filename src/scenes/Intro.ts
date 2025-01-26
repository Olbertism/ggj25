import { GameObjects, Scene } from 'phaser';

export class Intro extends Scene {
  background: GameObjects.Image;
  title: GameObjects.Text;

  constructor() {
    super('Intro');
  }

  create() {
    this.background = this.add.image(512, 384, 'background');
    const introContainer = this.add.container(514, 394);
    const introBg = this.add
      .rectangle(0, -36, 996, 680, 0x222222)
      .setOrigin(0.5);
    introBg.setStrokeStyle(3, 0xffffff);

    const texts = [
      this.add
        .text(
          0,
          -200,
          'On May 29th, 2027, brilliant lights lit up the skies across both hemispheres, lasting only a fraction of a second. When they faded, the world was left with a profound mystery. Enormous, shimmering spheres appeared across the globe, their reflective surfaces reminiscent of soap bubbles.',
          {
            wordWrap: { width: 900 },
            fontSize: 20,
            align: 'left',
            lineSpacing: 5,
          },
        )
        .setOrigin(0.5),

      this.add
        .text(
          0,
          -50,
          'These "bubbles" defied all known science. They emitted no energy, consumed nothing, and served no apparent purpose. The scientific community was in chaos, grasping for answers.',
          {
            wordWrap: { width: 900 },
            fontSize: 20,
            align: 'left',
            lineSpacing: 5,
          },
        )
        .setOrigin(0.5),

      this.add
        .text(
          0,
          75,
          'You’ve been tasked to investigate one of these anomalies. With a summary of what little is known and the latest reports in hand, it’s up to you to uncover the truth.',
          {
            wordWrap: { width: 900 },
            fontSize: 20,
            align: 'left',
            lineSpacing: 5,
          },
        )
        .setOrigin(0.5),

      this.add
        .text(0, 175, 'Good luck, scientist.', {
          fontSize: 20,
          align: 'left',
          lineSpacing: 5,
        })
        .setOrigin(0.5),
    ];

    introContainer.add([introBg, ...texts]);

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
      this.scene.start('Tutorial');
    });
  }
}
