import { Scene } from 'phaser';
import eventsCenter from './EventsCenter';

export class JournalUi extends Scene {
  journalKey: Phaser.Input.Keyboard.Key;
  journal: Phaser.GameObjects.Container;
  journalContent;
  isJournalOpen: boolean = false; // State to track journal visibility

  constructor() {
    super({ key: 'JournalUi', active: false });
  }

  create() {
    console.log('create journal');
    //  Grab a reference to the Game Scene
    // const mainGame = this.scene.get('Game');

    //  Listen for events from it
    eventsCenter.on('toggleJournal', this.toggleJournal, this);

    // clean up when Scene is shutdown
    this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
      eventsCenter.off('toggleJournal', this.toggleJournal, this);
    });

    // Create a journal UI container
    this.journal = this.add.container(500, 400);
    this.journal.setVisible(false);

    // Background of the journal
    const journalBg = this.add
      .rectangle(0, 0, 900, 600, 0x222222)
      .setOrigin(0.5);
    journalBg.setStrokeStyle(3, 0xffffff);

    // Title of the journal
    const journalTitle = this.add
      .text(0, -150, 'Journal', {
        fontSize: '32px',
        color: '#ffffff',
      })
      .setOrigin(0.5);

    // Tab buttons
    const tabs = ['Notes', 'Quests', 'Lore'];
    const tabButtons: Phaser.GameObjects.Text[] = [];

    // Create tab buttons dynamically
    tabs.forEach((tab, index) => {
      const tabButton = this.add
        .text(-250 + index * 200, -120, tab, {
          fontSize: '18px',
          color: '#ffffff',
          backgroundColor: '#444444',
          padding: { left: 10, right: 10, top: 5, bottom: 5 },
        })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true })
        .setDepth(99)
        .on('pointerdown', () => this.switchJournalTab(tab)); // Add tab click behavior

      tabButtons.push(tabButton);
      // this.journal.add(tabButton);
    });

    // Placeholder content area
    const journalContent = this.add
      .text(0, 0, '', {
        fontSize: '18px',
        color: '#ffffff',
        align: 'center',
        wordWrap: { width: 550 },
      })
      .setOrigin(0.5);

    this.journal.add([journalBg, journalTitle, ...tabButtons, journalContent]);

    // Store the journal content text object for dynamic updates
    this.journalContent = journalContent;

    // Start on the first tab
    this.switchJournalTab('Notes');
  }

  private switchJournalTab(tab: string) {
    // Update journal content based on the selected tab
    const tabContent: Record<string, string> = {
      Notes: 'This is the Notes tab. Write your thoughts here.',
      Quests: 'This is the Quests tab. Track your progress here.',
      Lore: 'This is the Lore tab. Read about the world here.',
    };

    // Highlight the active tab
    this.journal.each((child) => {
      if (child instanceof Phaser.GameObjects.Text && tabContent[child.text]) {
        child.setBackgroundColor(child.text === tab ? '#888888' : '#444444');
      }
    });

    // Update the content text
    this.journalContent?.setText(tabContent[tab] || 'No content available.');
  }

  private toggleJournal() {
    console.log('toggle');
    if (this.isJournalOpen) {
      // Close the journal
      this.journal.setVisible(false);
      this.isJournalOpen = false;
    } else {
      // Open the journal
      this.journal.setVisible(true);
      this.isJournalOpen = true;
    }
  }
}
