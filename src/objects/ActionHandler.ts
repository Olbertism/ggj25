import eventsCenter from "../scenes/EventsCenter.ts";
import {Scene} from "phaser";
import {actionObject} from "../data/store.ts";

export class ActionHandler {
    private totalScore : number;
    private actionsTaken : Array<any>;
    private maxActions : number;


    constructor() {
        this.totalScore = 0; // Initialize totalScore
        this.actionsTaken = []; // Initialize actionsTaken
        this.maxActions = Math.floor(Math.random() * (Math.floor(11) - Math.ceil(8)) + Math.ceil(8));

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

    getTotalPoints() {
        return this.totalScore;
    }
}
