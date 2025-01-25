import {Scene} from 'phaser';
import {basicDataObject} from '../data/store';
import eventsCenter from './EventsCenter';
import {ActionHandler} from "../objects/ActionHandler.ts";

export class InteractionUi extends Scene {
  uiBox: Phaser.GameObjects.Container;
  uiTitle: Phaser.GameObjects.Text;
  uiMessage: Phaser.GameObjects.Text;
  uiActionLabel: Phaser.GameObjects.Text;
  uiEffect: Phaser.GameObjects.Text;
  actionButtons: Phaser.GameObjects.Text[] = [];
  isInteractionOpen: boolean = false;
  actionHandler: ActionHandler;

  constructor() {
    super({ key: 'InteractionUi', active: false });
  }

  create() {
    this.actionHandler = this.registry.get('actionHandler');

    //  Listen for events from it
    eventsCenter.on('toggleInteraction', this.toggleInteraction, this);

    // clean up when Scene is shutdown
    this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
      eventsCenter.off('toggleInteraction', this.toggleInteraction, this);
    });

    this.initDialogBox();

    this.uiBox.setVisible(false);
  }

  private initDialogBox() {
    // Create a container for the dialog box
    this.uiBox = this.add.container(400, 500);

    // Create the background of the dialog box
    const dialogBg = this.add
        .rectangle(150, -100, 800, 400, 0x000000)
        .setOrigin(0.5);
    dialogBg.setStrokeStyle(2, 0xffffff);

    // Create the text for the dialog
    this.uiTitle = this.add
        .text(150, -200, '', {
          fontSize: '24px',
          color: '#ffffff',
        })
        .setOrigin(0.5);

    this.uiMessage = this.add
        .text(150, -150, '', {
          fontSize: '16px',
          color: '#ffffff',
          wordWrap: { width: 280 },
        })
        .setOrigin(0.5);

    this.uiActionLabel = this.add
        .text(150, -75, '', {
          fontSize: '16px',
          color: '#ffffff',
          wordWrap: { width: 280 },
        })
        .setOrigin(0.5);

    this.uiEffect = this.add
        .text(150, 0, '', {
          fontSize: '16px',
          color: '#ffffff',
          wordWrap: { width: 280 },
        })
        .setOrigin(0.5);

    // Add the background and text to the container
    this.uiBox.add([dialogBg, this.uiTitle, this.uiMessage, this.uiActionLabel, this.uiEffect]);

    this.uiTitle.setText('');
    this.uiMessage.setText('');
    this.uiActionLabel.setText('');
    this.uiEffect.setText('');
  }

  private toggleInteraction(data: basicDataObject) {
    console.log('toggle', data);
    if (this.isInteractionOpen) {
      eventsCenter.emit('enableMovement');
      // Close
      this.uiBox.setVisible(false);
      this.isInteractionOpen = false;

    this.actionButtons.forEach(button => button.destroy());
    this.actionButtons = [];
    } else {
      // Open dialog box
      eventsCenter.emit('disableMovement');
      this.initDialogBox();
      this.uiTitle.setText(data.title);
      this.uiMessage.setText(data.message);
      data.actions.length > 0 &&
        data.actions.forEach((action, index) => {
          const actionButton = this.add
            .text(150, -20 + index * 40, action.label, {
              fontSize: '18px',
              color: '#ffffff',
              backgroundColor: '#444444',
              padding: { left: 10, right: 10, top: 5, bottom: 5 },
            })
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.takeAction(action));
          this.actionButtons.push(actionButton);
        });


      this.uiBox.add(this.actionButtons);

      this.uiBox.setVisible(true);
      this.isInteractionOpen = true;
    }
  }

  private takeAction (action: any) {
    eventsCenter.emit('action-event', action );
    this.actionButtons.forEach(button => button.destroy());
    this.actionButtons = []; // Clear the array
    this.uiActionLabel.setText(action.label || '');
    this.uiEffect.setText(action.effect || '');
  }
}
