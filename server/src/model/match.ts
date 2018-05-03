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
    return this.players.filter(obj => obj.guess).length === this.players.length
  }

  constructor(selected: string) {
    this.selected = selected;
    this.players = [];
  }
}