/**
 * player.ts
 *
 * @file Spies player object
 * @author Brendan Lensink <brendan@steamclock.com>
 */
import { Player } from "./player";

/**
 * Player object
 */
export class Match {
  selected: string;
  players: Player[];

  get everyoneGuessed(): boolean { 
    const guesses = this.players.filter(obj => obj.guess !== undefined)
    return guesses.length === (this.players.length - 1) // subtract one for the selector
  }

  constructor() {
    this.players = [];
  }
}