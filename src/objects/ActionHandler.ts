import { actionObject } from '../data/store.ts';
import eventsCenter from '../scenes/EventsCenter.ts';

export class ActionHandler {
  private totalScore: number;
  private actionsTaken: Array<actionsTaken>;
  private maxActions: number;
  private positiveThreshold: number;
  private negativeThreshold: number;

  constructor() {
    this.totalScore = 0; // Initialize totalScore
    this.actionsTaken = []; // Initialize actionsTaken
    this.maxActions = Math.floor(
      Math.random() * (Math.floor(11) - Math.ceil(8)) + Math.ceil(8),
    );
    this.positiveThreshold = Math.floor(
      Math.random() * (Math.floor(12) - Math.ceil(6)) + Math.ceil(6),
    );
    this.negativeThreshold = Math.floor(
      Math.random() * (Math.floor(-7) - Math.ceil(-4)) + Math.ceil(-4),
    );

    eventsCenter.on('action-event', this.handleAction, this);

    eventsCenter.on(Phaser.Scenes.Events.SHUTDOWN, () => {
      eventsCenter.off('action-event', this.handleAction, this);
    });
  }

  handleAction(action: actionObject) {
    let points = 0;
    if (action.isBubble) {
      const requireds = ['emit-music', 'heat-bubble'];
      let amountOfTakenActions = 0;
      points = -6;
      this.actionsTaken.forEach((action) => {
        if (requireds.includes(action.key)) {
          amountOfTakenActions += 1;
        }
      });
      if (amountOfTakenActions >= 2) {
        points = 6;
        this.totalScore += points;
        if (this.totalScore >= 11) {
          eventsCenter.emit(
            'gameOver',
            'You made your step. A bright light surrounds you. Suddenly, you find yourself in the bubble. You can hear faint music and a feeling of warmth surrounds you. You cannot really explain it, but you feel like the bubble signals you, that you made the right choices.',
          );
        } else {
          this.totalScore += points;
          eventsCenter.emit(
            'gameOver',
            'You made your step. A bright light surrounds you. You loose all connection with your body. You disappear...',
          );
        }
      } else {
        this.totalScore += points;
        eventsCenter.emit(
          'gameOver',
          'You made your step. A bright light surrounds you. You loose all connection with your body. You disappear...',
        );
      }
      amountOfTakenActions = 0;
    } else {
      points = Math.floor(
        Math.random() *
          (Math.floor(action.pointRange[1]) - Math.ceil(action.pointRange[0])) +
          Math.ceil(action.pointRange[0]),
      );
      this.totalScore += points;
    }
    this.actionsTaken.push({
      key: action.key,
      label: action.label,
      points: points,
      repeatable: action.repeatable,
    });

    console.log(this.actionsTaken);

    if (action.key === 'cat-videos') {
      window.open('https://www.youtube.com/watch?v=VRvmn2WA0Q8', '_blank');
    }

    if (this.actionsTaken.length === this.maxActions) {
      eventsCenter.emit('gameOver', 'You took to long and focused on the wrong things. You are pulled from this assignment...');
    }
    console.log(this.actionsTaken);
  }

  getActionsTaken() {
    return this.actionsTaken;
  }

  getResults() {
    if (
      this.actionsTaken.filter((action) => action.key === 'pet-the-cat')
        .length < 1
    ) {
      this.totalScore += -4;
      this.actionsTaken.push({
        key: 'did-not-pet-cat',
        label: 'You did not pet cat. Shame on you!',
        points: -4,
      });
    }
    console.log(this.negativeThreshold, this.positiveThreshold);

    return {
      totalScore: this.totalScore,
      negativeThreshold: this.negativeThreshold,
      positiveThreshold: this.positiveThreshold,
    };
  }
}

export interface actionsTaken {
  key: string;
  label: string;
  points: number;
  repeatable?: boolean;
}
