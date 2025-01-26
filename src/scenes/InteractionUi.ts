import { Scene } from 'phaser';
import { actionObject, basicDataObject } from '../data/store';
import { ActionHandler, actionsTaken } from '../objects/ActionHandler.ts';
import eventsCenter from './EventsCenter';

export class InteractionUi extends Scene {
  uiBox: Phaser.GameObjects.Container;
  uiTitle: Phaser.GameObjects.Text;
  uiMessage: Phaser.GameObjects.Text;
  uiActionLabel: Phaser.GameObjects.Text;
  uiEffect: Phaser.GameObjects.Text;
  actionButtons: Phaser.GameObjects.Text[] = [];
  isInteractionOpen: boolean = false;
  actionHandler: ActionHandler;
  actionsTaken: Array<actionsTaken>;

  constructor() {
    super({ key: 'InteractionUi', active: false });
  }

  create() {
    this.actionHandler = this.registry.get('actionHandler');
    this.actionsTaken = [];

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
        wordWrap: { width: 600 },
      })
      .setOrigin(0.5);

    this.uiActionLabel = this.add
      .text(150, -75, '', {
        fontSize: '16px',
        color: '#ffffff',
        wordWrap: { width: 600 },
      })
      .setOrigin(0.5);

    this.uiEffect = this.add
      .text(150, 0, '', {
        fontSize: '16px',
        color: '#ffffff',
        wordWrap: { width: 600 },
      })
      .setOrigin(0.5);

    // Add the background and text to the container
    this.uiBox.add([
      dialogBg,
      this.uiTitle,
      this.uiMessage,
      this.uiActionLabel,
      this.uiEffect,
    ]);

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

      this.actionButtons.forEach((button) => button.destroy());
      this.actionButtons = [];
    } else {
      // Open dialog box
      eventsCenter.emit('disableMovement');
      this.initDialogBox();
      this.uiTitle.setText(data.title);
      this.uiMessage.setText(data.message);

      // Destroy existing buttons
      this.actionButtons.forEach((button) => button.destroy());
      this.actionButtons = [];

      this.actionsTaken = this.actionHandler.getActionsTaken();
      // Filter actions for not used and repeatable ones
      const fd = data.actions.filter(
        (action) =>
          // Action is not in actionsTaken OR it is repeatable
          !this.actionsTaken.some(
            (taken) => taken.key === action.key && action.repeatable !== true,
          ) &&
          // If the action has a 'requires' field, ensure the required key exists in actionsTaken
          (!action.requires ||
            (Array.isArray(action.requires) &&
              action.requires.every((action) =>
                this.actionsTaken.find((taken) => taken.key === action),
              ))),
      );
      // Create action buttons
      fd.length > 0 &&
        fd.forEach((action, index) => {
          const actionButton = this.add
            .text(150, -100 + index * 40, action.label, {
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

  private takeAction(action: actionObject) {
    eventsCenter.emit('action-event', action);
    this.actionButtons.forEach((button) => button.destroy());
    this.actionButtons = []; // Clear the array
    this.uiActionLabel.setText(action.label || '');
    this.uiEffect.setText(action.effect || '');
  }
}
