import eventsCenter from "../scenes/EventsCenter.ts";
import {actionObject} from "../data/store.ts";

export class ActionHandler {
    private totalScore : number;
    private actionsTaken : Array<any>;
    private maxActions : number;
    private positiveThreshold: number;
    private negativeThreshold: number;

    constructor() {
        this.totalScore = 0; // Initialize totalScore
        this.actionsTaken = []; // Initialize actionsTaken
        this.maxActions = Math.floor(Math.random() * (Math.floor(11) - Math.ceil(8)) + Math.ceil(8));
        this.positiveThreshold = Math.floor(Math.random() * (Math.floor(12) - Math.ceil(6)) + Math.ceil(6));
        this.negativeThreshold = Math.floor(Math.random() * (Math.floor(-7) - Math.ceil(-4)) + Math.ceil(-4));

        eventsCenter.on('action-event', this.handleAction , this)
    }

    handleAction(action: actionObject) {
        const points = Math.floor(
                Math.random() * (Math.floor(action.pointRange[1]) - Math.ceil(action.pointRange[0])) + Math.ceil(action.pointRange[0])
        );
        this.totalScore += points;
        this.actionsTaken.push({
            key: action.key,
            label: action.label,
            points: points,
            repeatable: action.repeatable
        })

        if (this.actionsTaken.length === this.maxActions) {
            eventsCenter.emit('gameOver');
        }
        console.log(this.actionsTaken)
    }

    getActionsTaken() {
        return this.actionsTaken
    }

    getResults() {
        if (this.actionsTaken.filter((action) => action.key === "pet-the-cat").length < 1)
        {
            this.totalScore += -4;
            this.actionsTaken.push({
                key: 'did-not-pet-cat',
                label: "You did not pet cat. Shame on you!",
                points: -4,
            })
        }
        console.log(this.negativeThreshold, this.positiveThreshold);

        return {
            totalScore: this.totalScore,
            negativeThreshold: this.negativeThreshold,
            positiveThreshold: this.positiveThreshold
        };
    }
}
