import { Scene } from 'phaser';
import eventsCenter from './EventsCenter';

export class InteractionUi extends Scene {
  uiBox: Phaser.GameObjects.Container;
  uiText: Phaser.GameObjects.Text;
  isInteractionOpen: boolean = false;

  constructor() {
    super({ key: 'InteractionUi', active: false });
  }

  create() {
    //  Listen for events from it
    eventsCenter.on('toggleInteraction', this.toggleInteraction, this);

    // clean up when Scene is shutdown
    this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
      eventsCenter.off('toggleInteraction', this.toggleInteraction, this);
    });

    // Create a container for the dialog box
    this.uiBox = this.add.container(400, 500);

    // Create the background of the dialog box
    const dialogBg = this.add
      .rectangle(0, 0, 600, 300, 0x000000)
      .setOrigin(0.5);
    dialogBg.setStrokeStyle(2, 0xffffff);

    // Create the text for the dialog
    this.uiText = this.add
      .text(0, 0, '', {
        fontSize: '16px',
        color: '#ffffff',
        wordWrap: { width: 280 },
      })
      .setOrigin(0.5);

    // Add the background and text to the container
    this.uiBox.add([dialogBg, this.uiText]);

    this.uiText.setText('');
    this.uiBox.setVisible(false);
  }

  private toggleInteraction(data) {
    console.log('toggle', data);
    if (this.isInteractionOpen) {
      eventsCenter.emit('enableMovement');
      console.log('close');
      // Close
      this.uiBox.setVisible(false);
      this.isInteractionOpen = false;
    } else {
      console.log('open');
      // Open
      eventsCenter.emit('disableMovement');
      this.uiText.setText('data');
      this.uiBox.setVisible(true);
      this.isInteractionOpen = true;
    }
  }
}
