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
  socket.onSendSelection((data: any) => {
    data;
    log.verbose(IncomingEvents.sendSelection, socket.userId + " sent an action to match ");
  });

  socket.onSendGuess((data: any) => {
    data;
    log.verbose(IncomingEvents.sendGuess, socket.userId + " sent an action to match ");
  });

  socket.onJoinGame((data: any) => {
    data;
    log.verbose(IncomingEvents.joinGame, socket.userId + "joined game" );
  });

  // ----------------------------------
  // RECONNECT
  // ----------------------------------
  socket.onReconnected((deviceId: string, matchName: string) => {
    deviceId == deviceId;
    log.reconnected(matchName, socket.userId);
  });

  // ----------------------------------
  // DISCONNECT
  // ----------------------------------
	socket.onDisconnect((reason: any) => {
    log.info(IncomingEvents.disconnect, "Number of connected users: " + --socket.numUsers);
    reason;
	  // log.disconnected(socket.userId, reason);
    // log.verbose(IncomingEvents.disconnect, "Ignored disconnect for player " + socket.userId + ", could not find match " + socket.matchName);
    return;
	});
});