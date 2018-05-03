/**
 * player.ts
 *
 * @file Spies player object
 * @author Brendan Lensink <brendan@steamclock.com>
 */

/**
 * Player object
 */
export class Match {
  selected: string;
  players: string[];
  guesses: string[];

  get everyoneGuessed(): boolean { return this.players.length === this.guesses.length }

  constructor(selected: string) {
    this.selected = selected;
    this.players = [];
    this.guesses = [];
  }
}