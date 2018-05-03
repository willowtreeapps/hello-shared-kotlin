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
    matchManager.match = new Match(selection);
    matchManager.match.players.push(new Player(socket.username));
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
    } else  {
      if (matchManager.match.selected === guess) {
        socket.sendResponse("guessed correctly!");
      } else {
        socket.sendResponse(guess + " is wrong!");
      }
      log.verbose(IncomingEvents.guess, socket.username + " guessed correctly: " + (matchManager.match.selected === guess));
    }
  });

  socket.onJoinGame((username: string) => {
    log.verbose(IncomingEvents.join, username + " joined game" );
    socket.connect(username);
    if (matchManager.match !== undefined) {
      log.verbose(IncomingEvents.join, "sending users out");
      var playernames = matchManager.match.players.map(obj => obj.name);
      socket.sendUsers(playernames);
    }
  });

  socket.onLeaveGame((username: string) => {
    log.verbose(IncomingEvents.leave, username + " leaving game" )
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