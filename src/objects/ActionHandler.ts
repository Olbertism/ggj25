
export class ActionHandler {
    private totalScore : number;
    private actionsTaken : Array<any>;

    constructor() {
        this.totalScore = 0; // Initialize totalScore
        this.actionsTaken = []; // Initialize actionsTaken
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