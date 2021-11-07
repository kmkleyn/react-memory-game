export class Player {
    name: string;
    score: number;
    turn: boolean;

    constructor(name: string) {
        this.name = name;
        this.score = 0;
        this.turn = false;
    }
}