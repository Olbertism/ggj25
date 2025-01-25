import eventsCenter from "../scenes/EventsCenter.ts";
import {Scene} from "phaser";

export class ActionHandler {
    private totalScore : number;
    private actionsTaken : Array<any>;
    private maxActions : number;


    constructor() {
        this.totalScore = 0; // Initialize totalScore
        this.actionsTaken = []; // Initialize actionsTaken
        this.maxActions = 1//Math.floor(Math.random() * (Math.floor(11) - Math.ceil(8)) + Math.ceil(8));

        eventsCenter.on('action-event', this.handleAction , this)
    }

    handleAction(action: Action) {
        const points = Math.floor(
                Math.random() * (Math.floor(action.pointRange[1]) - Math.ceil(action.pointRange[0])) + Math.ceil(action.pointRange[0])
        );
        this.totalScore += points;
        this.actionsTaken.push({
            key: action.key,
            label: action.label,
            points: points,
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

interface Action {
    key: string,
    label: string,
    pointRange: [number, number],
    effect: string,
}