"use strict";
/**
 * index.ts
 *
 * @file Entry point and manager for socket connections for Spies
 * @author Brendan Lensink <brendan@steamclock.com>
 */
Object.defineProperty(exports, "__esModule", { value: true });
// Imports
const event_1 = require("./model/event");
const log_1 = require("./log");
const socketManager_1 = require("./model/socketManager");
const socket_1 = require("./model/socket");
process.on("uncaughtException", (error) => {
    log_1.log.error("Uncaught Exception", error, error.stack);
    process.exit(1);
});
// ----------------------------------
//
// CONNECTION
//
// ----------------------------------
socketManager_1.socketManager.io.on(event_1.IncomingEvents.connection, (s) => {
    const socket = new socket_1.Socket(s);
    log_1.log.verbose(event_1.IncomingEvents.connection, "Number of connected users: " + ++socket.numUsers);
    // ----------------------------------
    // SEND ACTION
    // ----------------------------------
    socket.onSendSelection((data) => {
        data;
        log_1.log.verbose(event_1.IncomingEvents.sendSelection, socket.userId + " sent an action to match ");
    });
    socket.onSendGuess((data) => {
        data;
        log_1.log.verbose(event_1.IncomingEvents.sendGuess, socket.userId + " sent an action to match ");
    });
    socket.onJoinGame((data) => {
        data;
        log_1.log.verbose(event_1.IncomingEvents.joinGame, socket.userId + "joined game");
    });
    // ----------------------------------
    // RECONNECT
    // ----------------------------------
    socket.onReconnected((deviceId, matchName) => {
        deviceId == deviceId;
        log_1.log.reconnected(matchName, socket.userId);
    });
    // ----------------------------------
    // DISCONNECT
    // ----------------------------------
    socket.onDisconnect((reason) => {
        log_1.log.info(event_1.IncomingEvents.disconnect, "Number of connected users: " + --socket.numUsers);
        reason;
        // log.disconnected(socket.userId, reason);
        // log.verbose(IncomingEvents.disconnect, "Ignored disconnect for player " + socket.userId + ", could not find match " + socket.matchName);
        return;
    });
});
