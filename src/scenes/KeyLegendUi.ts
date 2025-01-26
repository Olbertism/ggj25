import { Scene } from 'phaser';

export class KeyLegendUi extends Scene {
  constructor() {
    super({ key: 'KeyLegendUi', active: false });
  }

  create() {
    // Create a container for the key legend
    const keyLegend = this.add.container(0, 0);

    // Background for the legend
    const legendBg = this.add
      .rectangle(0, 0, 400, 50, 0x000000, 0.5)
      .setOrigin(0.5)
      .setStrokeStyle(2, 0xffffff);

    // Create individual keys
    const keyJ = this.add
      .rectangle(-120, 0, 40, 40, 0x444444)
      .setOrigin(0.5)
      .setStrokeStyle(2, 0xffffff);
    const keyJText = this.add
      .text(-120, 0, 'J', {
        fontSize: '20px',
        color: '#ffffff',
      })
      .setOrigin(0.5);

    const keyE = this.add
      .rectangle(40, 0, 40, 40, 0x444444)
      .setOrigin(0.5)
      .setStrokeStyle(2, 0xffffff);
    const keyEText = this.add
      .text(40, 0, 'E', {
        fontSize: '20px',
        color: '#ffffff',
      })
      .setOrigin(0.5);

    // Key descriptions
    const journalText = this.add
      .text(-55, 0, 'Journal', {
        fontSize: '16px',
        color: '#ffffff',
      })
      .setOrigin(0.5);
    const interactText = this.add
      .text(105, 0, 'Interact', {
        fontSize: '16px',
        color: '#ffffff',
      })
      .setOrigin(0.5);

    // Add all elements to the container
    keyLegend.add([
      legendBg,
      keyJ,
      keyJText,
      journalText,
      keyE,
      keyEText,
      interactText,
    ]);

    // Position the key legend at the bottom of the screen
    keyLegend.setPosition(
      this.cameras.main.width / 2,
      this.cameras.main.height - 40,
    );
  }
}
