/**
 * index.ts
 *
 * @file Entry point and manager for socket connections for Spies
 * @author Brendan Lensink <brendan@steamclock.com>
 */

// Imports

// const moment = require("moment");

import { Event } from "./model/event";
// import { Player } from "./model/player";

import { log } from "./log";
// import { matchManager } from "./model/matchManager";
import { socketManager } from "./model/socketManager";
import { Socket } from "./model/socket";



(process as NodeJS.EventEmitter).on("uncaughtException", (error) => {
	log.error("Uncaught Exception", error, error.stack);
	process.exit(1);
});

// This should match the latest dataFormatVersion in the Spies app
// const supportedGameVersion = 12;

// Check every hour if the current time is beween 2 and 3 am, if it is restart the server
// setInterval(() => {
//   console.log(moment().format("H"));
//   if (moment().isBetween(moment("10", "H"), moment("11", "H"))) {
//       log.info("RestartInterval", "Restarting server for cycling.");
//       process.exit(0);
//   }
// }, 3600000);


// ----------------------------------
//
// CONNECTION
//
// ----------------------------------
socketManager.io.on(Event.connection, (s: any) => {
  const socket = new Socket(s);

  log.verbose(Event.connection, "Number of connected users: " + ++socket.numUsers);

  // ----------------------------------
  // SEND ACTION
  // ----------------------------------
  socket.onSendSelection((data: any) => {
    // socket.emitGotAction(data);//
    data;
    log.verbose(Event.sendSelection, socket.userId + " sent an action to match ");
  });

  socket.onSendGuess((data: any) => {
    // socket.emitGotAction(data);//
    data;
    log.verbose(Event.sendGuess, socket.userId + " sent an action to match ");
  });


  // ----------------------------------
  // RECONNECT
  // ----------------------------------
  socket.onReconnected((deviceId: string, matchName: string) => {
    // const matchToJoin = matchManager.matches.get(matchName);

    // if (matchToJoin === undefined) {
    //   // if this happens the server lost the match, probably due to a crash and the app should abandon
    //   socket.emitServerError("Could not reconnect to " + matchName + " as it no longer exists.");
    //   log.warn(Event.reconnected, socket.userId + " tried to reconnect to " + matchName + ". No room with that code found");
    //   return;
    // }

    // // find the old refence to the disconnected player
    // const oldPlayer = matchToJoin.players.find((player: Player) => {
    //   return player.deviceId === deviceId;
    // });
    deviceId == deviceId;

    // if (oldPlayer === undefined) {
    //   socket.emitServerError("Could not reconnect to a room as that player was not in that game.");
    //   log.warn(Event.reconnected, socket.userId + " tried to reconnect to " + matchName + " but they were not in that room to begin with.");
    //   return;
    // }

    // // first disconnect the old socket used by the player
    // const oldSocket = socketManager.getSocketById(oldPlayer.socketId);
    // if (oldSocket !== undefined) {
    //   oldSocket.disconnect();
    // }

    // // then reconnect our new "player" with a new socket and set their status back to connected
    // oldPlayer.disconnected = false;
    // socket.connect(oldPlayer.username, deviceId, matchName, oldPlayer.isHost);
    // socket.emitReconnected(oldPlayer.username);
    log.reconnected(matchName, socket.userId);
  });

  // ----------------------------------
  // DISCONNECT
  // ----------------------------------
	socket.onDisconnect((reason: any) => {
    log.info(Event.disconnect, "Number of connected users: " + --socket.numUsers);
	  // if (!socket.inMatch) {
	  //   log.verbose(Event.disconnect, "Non-added user disconnected with reason " + reason);
	  //   return;
	  // }
	  log.disconnected(socket.userId, socket.matchName, reason);

	  // const match = matchManager.matches.get(socket.matchName);
	  // if (match === undefined) {
	    // TODO: I think we"re going to want to send an error back to the app here
    log.verbose(Event.disconnect, "Ignored disconnect for player " + socket.userId + ", could not find match " + socket.matchName);
    return;
	  // }

	  // // if they were in a match, set them to disconnected
	  // const player = match.players.find((player: Player) => {
	  //   return player.username === socket.username;
	  // });

	  // if (player === undefined) {
	  //   log.verbose(Event.disconnect, "Ignored disconnect for player " + socket.userId + ", could not find that player in match " + socket.matchName);
	  //   return;
	  // }
	  // player.disconnected = true;

	  // const connectedPlayers = match.players.filter((player: Player) => {
	  //   return player.disconnected !== true;
	  // });

	  // // if there are no connected users left in the match, trigger the stale match scrub. otherwise send the disconnect to the other player
	  // if (connectedPlayers.length !== 0) {
   //    socket.emitDisconnected();
	  //   log.info(Event.disconnect, socket.userId + " disconnected from usermatch " + socket.matchName);
	  // }
	});
});