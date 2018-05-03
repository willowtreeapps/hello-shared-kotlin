import { Match } from "./match";
// import { Player } from "./player";
// import { log } from "../log";

/**
 * Keeps track of all matches currently being played
 */
class MatchManager {
	match: Match;
}

export const matchManager = new MatchManager();