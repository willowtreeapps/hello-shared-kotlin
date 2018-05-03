/**
 * index.ts
 *
 * @file Entry point and manager for socket connections for Spies
 * @author Brendan Lensink <brendan@steamclock.com>
 */

// Imports
import { IncomingEvents } from "./model/event";
import { log } from "./log";
import { socketManager } from "./model/socketManager";
import { Socket } from "./model/socket";
import { Match } from "./model/match";
import { matchManager} from "./model/matchManager";
import { Player} from "./model/player";


(process as NodeJS.EventEmitter).on("uncaughtException", (error) => {
	log.error("Uncaught Exception", error, error.stack);
	process.exit(1);
});

// ----------------------------------
//
// CONNECTION
//
// ----------------------------------
socketManager.io.on(IncomingEvents.connection, (s: any) => {
  const socket = new Socket(s);

  log.verbose(IncomingEvents.connection, "Number of connected users: " + ++socket.numUsers);

  // ----------------------------------
  // SEND ACTION
  // ----------------------------------
  socket.onSendSelection((selection: string) => {
    if (socket.username === undefined || socket.username === "") {
      log.verbose(IncomingEvents.selection, "user attempted to set selection before joining");
      socket.sendError("Must join game before setting selection");
      return;
    }

    log.verbose(IncomingEvents.selection, socket.username + " selected " + selection);
    matchManager.match.selected = selection;
    socket.sendSelectionSet();
  });

  socket.onSendGuess((guess: string) => {
    if (socket.username === undefined || socket.username === "") {
      log.verbose(IncomingEvents.guess, "user attempted to guess before joining");
      socket.sendError("Must join game before guessing");
      return;
    }

    log.verbose(IncomingEvents.guess, socket.username + " guessed " + guess);
    socket.sendGuessSet(socket.username);
    if (matchManager.match === undefined) {
      log.verbose(IncomingEvents.guess, "must select word first!");
      socket.sendError("Can't guess yet, nothing has been selected!");
      return;
    }

    const player = matchManager.match.players.find(player => player.name === socket.username);

    if (player === undefined) {
      log.verbose(IncomingEvents.guess, "Couldn't find player with name " + socket.username);
      return;
    }

    player.guess = guess;
    log.verbose(IncomingEvents.guess, socket.username + " guessed correctly: " + (matchManager.match.selected === guess));

    if (!matchManager.match.everyoneGuessed) {
      log.verbose(IncomingEvents.guess, "Not everyone has guessed yet.");
      return;
    }

    log.verbose(IncomingEvents.guess, "Everyone has guessed!");

    const correctPlayers = matchManager.match.players.filter(player => player.guess === matchManager.match.selected) 

    if (correctPlayers === undefined || correctPlayers.length === 0) {
      log.verbose(IncomingEvents.guess, "No winner");
      socket.sendResponse("No one guessed correctly! Correct answer was " + matchManager.match.selected);
      return;
    } 

    const playerNames = correctPlayers.map(player => player.name);

    log.verbose(IncomingEvents.guess, "winners: " + playerNames);
    socket.sendResponse("These players guessed " + matchManager.match.selected + " correctly: " + playerNames);
  });

  socket.onJoinGame((username: string) => {
    log.verbose(IncomingEvents.join, username + " joined game" );
    socket.connect(username);
    if (matchManager.match === undefined) {
      matchManager.match = new Match();
    }

    matchManager.match.players.push(new Player(username))

    var playernames = matchManager.match.players.map(obj => obj.name);
    log.verbose(IncomingEvents.join, "sending users out: " + playernames);
    socket.sendUsers(playernames);
  });

  socket.onLeaveGame((username: string) => {
    log.verbose(IncomingEvents.leave, socket.username + " leaving game" )
    socket.leave();
    if (matchManager.match === undefined) {
      return;
    }

    matchManager.match.players = matchManager.match.players.filter(obj => obj.name !== username);
  });

  // ----------------------------------
  // RECONNECT
  // ----------------------------------
  socket.onReconnected((deviceId: string, matchName: string) => {
    deviceId == deviceId;
    log.reconnected(matchName, socket.username);
  });

  // ----------------------------------
  // DISCONNECT
  // ----------------------------------
	socket.onDisconnect((reason: any) => {
    log.info(IncomingEvents.disconnect, "Number of connected users: " + --socket.numUsers);
    reason;
    return;
	});
});