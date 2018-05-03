"use strict";
/**
 * matchManager.ts
 *
 * @file Keeps track of matches being played
 * @author Brendan Lensink <brendan@steamclock.com>
 */
Object.defineProperty(exports, "__esModule", { value: true });
// import { Player } from "./player";
// import { log } from "../log";
/**
 * Keeps track of all matches currently being played
 */
class MatchManager {
    // matches: Map<string, Match> = new Map();
    constructor() {
        // private staleMatchTimeout = 600000; // 10 minutes
        this.numUsers = 0;
        // setInterval(this.removeStaleMatches, this.staleMatchTimeout);
    }
}
/**
 * Enforce singleton behaviour
 */
exports.matchManager = new MatchManager();
