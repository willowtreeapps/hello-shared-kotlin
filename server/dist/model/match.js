"use strict";
/**
 * player.ts
 *
 * @file Spies player object
 * @author Brendan Lensink <brendan@steamclock.com>
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Player object
 */
class Match {
    get everyoneGuessed() { return this.players.length === this.guesses.length; }
    constructor(selected) {
        this.selected = selected;
        this.players = [];
        this.guesses = [];
    }
}
exports.Match = Match;
