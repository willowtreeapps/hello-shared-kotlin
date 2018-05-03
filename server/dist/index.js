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
const match_1 = require("./model/match");
const matchManager_1 = require("./model/matchManager");
const player_1 = require("./model/player");
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
    socket.onSendSelection((selection) => {
        if (socket.username === undefined || socket.username === "") {
            log_1.log.verbose(event_1.IncomingEvents.selection, "user attempted to set selection before joining");
            socket.sendError("Must join game before setting selection");
            return;
        }
        log_1.log.verbose(event_1.IncomingEvents.selection, socket.username + " selected " + selection);
        matchManager_1.matchManager.match = new match_1.Match(selection);
        matchManager_1.matchManager.match.players.push(new player_1.Player(socket.username));
        socket.sendSelectionSet();
    });
    socket.onSendGuess((guess) => {
        if (socket.username === undefined || socket.username === "") {
            log_1.log.verbose(event_1.IncomingEvents.guess, "user attempted to guess before joining");
            socket.sendError("Must join game before guessing");
            return;
        }
        log_1.log.verbose(event_1.IncomingEvents.guess, socket.username + " guessed " + guess);
        socket.sendGuessSet(socket.username);
        if (matchManager_1.matchManager.match === undefined) {
            log_1.log.verbose(event_1.IncomingEvents.guess, "must select word first!");
            socket.sendError("Can't guess yet, nothing has been selected!");
        }
        else {
            if (matchManager_1.matchManager.match.selected === guess) {
                socket.sendResponse("guessed correctly!");
            }
            else {
                socket.sendResponse(guess + " is wrong!");
            }
            log_1.log.verbose(event_1.IncomingEvents.guess, socket.username + " guessed correctly: " + (matchManager_1.matchManager.match.selected === guess));
        }
    });
    socket.onJoinGame((username) => {
        log_1.log.verbose(event_1.IncomingEvents.join, username + " joined game");
        socket.connect(username);
        if (matchManager_1.matchManager.match !== undefined) {
            log_1.log.verbose(event_1.IncomingEvents.join, "sending users out");
            var playernames = matchManager_1.matchManager.match.players.map(obj => obj.name);
            socket.sendUsers(playernames);
        }
    });
    socket.onLeaveGame((username) => {
        log_1.log.verbose(event_1.IncomingEvents.leave, socket.username + " leaving game");
        socket.leave();
        if (matchManager_1.matchManager.match === undefined) {
            return;
        }
        matchManager_1.matchManager.match.players = matchManager_1.matchManager.match.players.filter(obj => obj.name !== username);
    });
    // ----------------------------------
    // RECONNECT
    // ----------------------------------
    socket.onReconnected((deviceId, matchName) => {
        deviceId == deviceId;
        log_1.log.reconnected(matchName, socket.username);
    });
    // ----------------------------------
    // DISCONNECT
    // ----------------------------------
    socket.onDisconnect((reason) => {
        log_1.log.info(event_1.IncomingEvents.disconnect, "Number of connected users: " + --socket.numUsers);
        reason;
        return;
    });
});
