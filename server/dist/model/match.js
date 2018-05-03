"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Player object
 */
class Match {
    get everyoneGuessed() {
        const guesses = this.players.filter(obj => obj.guess !== undefined);
        return guesses.length === (this.players.length - 1); // subtract one for the selector
    }
    constructor() {
        this.players = [];
    }
}
exports.Match = Match;
