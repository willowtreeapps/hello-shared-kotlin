"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Player object
 */
class Match {
    get everyoneGuessed() {
        return this.players.filter(obj => obj.guess).length === this.players.length;
    }
    constructor(selected) {
        this.selected = selected;
        this.players = [];
    }
}
exports.Match = Match;
