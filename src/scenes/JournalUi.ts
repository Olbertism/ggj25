import { Scene } from 'phaser';
import { journalDossiers, journalNews, journalReports } from '../data/store';
import eventsCenter from './EventsCenter';

export class JournalUi extends Scene {
  journalKey: Phaser.Input.Keyboard.Key;
  journal: Phaser.GameObjects.Container;
  journalContent: Phaser.GameObjects.Container;

  reportContainer: Phaser.GameObjects.Container;
  reports: Phaser.GameObjects.Container[];
  newsContainer: Phaser.GameObjects.Container;
  news: Phaser.GameObjects.Container[];
  dossierContainer: Phaser.GameObjects.Container;
  dossiers: Phaser.GameObjects.Container[];

  currentPage: number = 1;
  currentContents: Phaser.GameObjects.Container[] = [];
  reportsPaginationText: Phaser.GameObjects.Text;
  newsPaginationText: Phaser.GameObjects.Text;
  dossiersPaginationText: Phaser.GameObjects.Text;

  isJournalOpen: boolean = false; // State to track journal visibility

  constructor() {
    super({ key: 'JournalUi', active: false });
  }

  create() {
    //  Listen for events from it
    eventsCenter.on('toggleJournal', this.toggleJournal, this);

    // clean up when Scene is shutdown
    this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
      eventsCenter.off('toggleJournal', this.toggleJournal, this);
    });

    // initialise arrays
    this.reports = [];
    this.news = [];
    this.dossiers = [];

    // Create a journal UI container
    this.journal = this.add.container(514, 394);
    this.journal.setVisible(false);

    // Background of the journal
    const journalBg = this.add
      .rectangle(0, -36, 996, 680, 0x222222)
      .setOrigin(0.5);
    journalBg.setStrokeStyle(3, 0xffffff);

    // Title of the journal
    const journalTitle = this.add
      .text(0, -320, 'Journal', {
        fontSize: '32px',
        color: '#ffffff',
      })
      .setOrigin(0.5);

    // Tab buttons
    const tabs = ['Reports', 'News', 'Dossiers'];
    const tabButtons: Phaser.GameObjects.Text[] = [];

    // Create tab buttons dynamically
    tabs.forEach((tab, index) => {
      const tabButton = this.add
        .text(-180 + index * 200, -268, tab, {
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
    });

    // Create content containers for each section
    this.reportContainer = this.add.container(0, -190);
    journalReports.forEach((entry, index) => {
      this.reports.push(
        this.add
          .container(0, 0, [
            this.add
              .text(0, 25, entry.title, {
                fontSize: '18px',
                color: '#ffffff',
              })
              .setOrigin(0.5),
            this.add
              .text(0, 70, entry.author, {
                fontSize: '14px',
                color: '#aaaaaa',
              })
              .setOrigin(0.5),
            this.add
              .text(0, 240, entry.text, {
                fontSize: '16px',
                color: '#cccccc',
                wordWrap: { width: 700 },
                lineSpacing: 5,
              })
              .setOrigin(0.5),
          ])
          .setVisible(index === 0 ? true : false),
      );
    });

    this.reportContainer.add(
      this.add
        .text(-50, -20, '<', { fontSize: 32 })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () =>
          this.goPageDown(
            this.reports,
            this.currentPage - 1,
            this.reportsPaginationText,
          ),
        ),
    );

    this.reportsPaginationText = this.add
      .text(
        0,
        -20,
        this.currentPage.toString() + '/' + this.reports.length.toString(),
        { fontSize: 32 },
      )
      .setOrigin(0.5);

    this.reportContainer.add(this.reportsPaginationText);

    this.reportContainer.add(
      this.add
        .text(50, -20, '>', { fontSize: 32 })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () =>
          this.goPageUp(
            this.reports,
            this.currentPage + 1,
            this.reportsPaginationText,
          ),
        ),
    );

    this.reportContainer.add(this.reports);

    this.newsContainer = this.add.container(0, -190);
    journalNews.forEach((entry) => {
      this.news.push(
        this.add
          .container(0, 0, [
            this.add
              .text(0, 25, entry.title, {
                fontSize: '18px',
                color: '#ffffff',
              })
              .setOrigin(0.5),
            this.add
              .text(0, 170, entry.text, {
                fontSize: '16px',
                color: '#cccccc',
                wordWrap: { width: 700 },
                lineSpacing: 8,
              })
              .setOrigin(0.5),
          ])
          .setVisible(false),
      );
    });

    this.newsContainer.add(
      this.add
        .text(-50, -20, '<', { fontSize: 32 })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () =>
          this.goPageDown(
            this.news,
            this.currentPage - 1,
            this.newsPaginationText,
          ),
        ),
    );

    this.newsPaginationText = this.add
      .text(
        0,
        -20,
        this.currentPage.toString() + '/' + this.news.length.toString(),
        { fontSize: 32 },
      )
      .setOrigin(0.5);

    this.newsContainer.add(this.newsPaginationText);

    this.newsContainer.add(
      this.add
        .text(50, -20, '>', { fontSize: 32 })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () =>
          this.goPageUp(
            this.news,
            this.currentPage + 1,
            this.newsPaginationText,
          ),
        ),
    );

    this.newsContainer.add(this.news).setVisible(false);

    this.dossierContainer = this.add.container(0, -190);
    journalDossiers.forEach((entry) => {
      this.dossiers.push(
        this.add
          .container(0, 0, [
            this.add
              .text(0, 25, entry.name, {
                fontSize: '18px',
                color: '#ffffff',
              })
              .setOrigin(0.5),
            this.add
              .text(0, 50, entry.field, {
                fontSize: '16px',
                color: '#aaaaaa',
              })
              .setOrigin(0.5),
            this.add
              .text(0, 125, entry.affiliation, {
                fontSize: '16px',
                color: '#aaaaaa',
              })
              .setOrigin(0.5),
            this.add
              .text(0, 200, entry.background, {
                fontSize: '16px',
                color: '#cccccc',
                wordWrap: { width: 700 },
                lineSpacing: 8,
              })
              .setOrigin(0.5),
            this.add
              .text(0, 275, entry.publications, {
                fontSize: '16px',
                color: '#cccccc',
                wordWrap: { width: 700 },
              })
              .setOrigin(0.5),
          ])
          .setVisible(false),
      );
    });

    this.dossierContainer.add(
      this.add
        .text(-50, -20, '<', { fontSize: 32 })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () =>
          this.goPageDown(
            this.dossiers,
            this.currentPage - 1,
            this.dossiersPaginationText,
          ),
        ),
    );

    this.dossiersPaginationText = this.add
      .text(
        0,
        -20,
        this.currentPage.toString() + '/' + this.dossiers.length.toString(),
        { fontSize: 32 },
      )
      .setOrigin(0.5);

    this.dossierContainer.add(this.dossiersPaginationText);

    this.dossierContainer.add(
      this.add
        .text(50, -20, '>', { fontSize: 32 })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () =>
          this.goPageUp(
            this.dossiers,
            this.currentPage + 1,
            this.dossiersPaginationText,
          ),
        ),
    );

    this.dossierContainer.add(this.dossiers).setVisible(false);

    // Add content containers to the journal content area
    this.journalContent = this.add.container(0, 0);
    this.journalContent.add([
      this.reportContainer,
      this.newsContainer,
      this.dossierContainer,
    ]);

    this.journal.add([
      journalBg,
      journalTitle,
      ...tabButtons,
      this.journalContent,
    ]);

    // Start on the first tab
    this.switchJournalTab('Reports');
  }

  private switchJournalTab(tab: string) {
    console.log('switch tab');
    // Update journal content based on the selected tab
    const tabContent: Record<string, string> = {
      Reports: 'This is the Notes tab. Write your thoughts here.',
      News: 'This is the Quests tab. Track your progress here.',
      Dossiers: 'This is the Lore tab. Read about the world here.',
    };

    // Hide all tab content
    this.reportContainer.setVisible(false);
    this.newsContainer.setVisible(false);
    this.dossierContainer.setVisible(false);

    // Show the selected tab's content
    if (tab === 'Reports') {
      this.reportContainer.setVisible(true);
      this.goPageUp(this.reports, 1, this.reportsPaginationText);
    } else if (tab === 'News') {
      this.newsContainer.setVisible(true);
      this.goPageUp(this.news, 1, this.newsPaginationText);
    } else if (tab === 'Dossiers') {
      this.dossierContainer.setVisible(true);
      this.goPageUp(this.dossiers, 1, this.dossiersPaginationText);
    }

    // Highlight the active tab
    this.journal.each((child) => {
      if (child instanceof Phaser.GameObjects.Text && tabContent[child.text]) {
        child.setBackgroundColor(child.text === tab ? '#888888' : '#444444');
      }
    });
  }

  goPageDown(
    contentsArray: Phaser.GameObjects.Container[],
    nextPage: number,
    text,
  ) {
    console.log('pageDown');
    if (nextPage <= 0) return;
    contentsArray.forEach((entry, index) => {
      if (index === nextPage - 1) {
        entry.setVisible(true);
      } else {
        entry.setVisible(false);
      }
    });
    this.currentPage = nextPage;
    text.setText(nextPage.toString() + '/' + contentsArray.length.toString());
  }

  goPageUp(
    contentsArray: Phaser.GameObjects.Container[],
    nextPage: number,
    text,
  ) {
    console.log('pageUp', nextPage);
    if (nextPage > contentsArray.length) return;
    contentsArray.forEach((entry, index) => {
      if (index === nextPage - 1) {
        entry.setVisible(true);
      } else {
        entry.setVisible(false);
      }
    });
    this.currentPage = nextPage;
    text.setText(nextPage.toString() + '/' + contentsArray.length.toString());
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
      this.journalContent.setVisible(true);
      this.isJournalOpen = true;
    }
  }
}
