import { Match } from "./match";

/**
 * Keeps track of all matches currently being played
 */
class MatchManager {
	match: Match;
}

export const matchManager = new MatchManager();