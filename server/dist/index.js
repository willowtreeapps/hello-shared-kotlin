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
            socketManager_1.socketManager.sendError("Must join game before setting selection");
            return;
        }
        log_1.log.verbose(event_1.IncomingEvents.selection, socket.username + " selected " + selection);
        matchManager_1.matchManager.match.selected = selection;
        socketManager_1.socketManager.sendSelectionSet(socket.username);
    });
    socket.onSendGuess((guess) => {
        if (socket.username === undefined || socket.username === "") {
            log_1.log.verbose(event_1.IncomingEvents.guess, "user attempted to guess before joining");
            socketManager_1.socketManager.sendError("Must join game before guessing");
            return;
        }
        log_1.log.verbose(event_1.IncomingEvents.guess, socket.username + " guessed " + guess);
        socketManager_1.socketManager.sendGuessSet(socket.username);
        if (matchManager_1.matchManager.match === undefined) {
            log_1.log.verbose(event_1.IncomingEvents.guess, "must select word first!");
            socketManager_1.socketManager.sendError("Can't guess yet, nothing has been selected!");
            return;
        }
        const player = matchManager_1.matchManager.match.players.find(player => player.name === socket.username);
        if (player === undefined) {
            log_1.log.verbose(event_1.IncomingEvents.guess, "Couldn't find player with name " + socket.username);
            return;
        }
        player.guess = guess;
        log_1.log.verbose(event_1.IncomingEvents.guess, socket.username + " guessed correctly: " + (matchManager_1.matchManager.match.selected === guess));
        if (!matchManager_1.matchManager.match.everyoneGuessed) {
            log_1.log.verbose(event_1.IncomingEvents.guess, "Not everyone has guessed yet.");
            return;
        }
        log_1.log.verbose(event_1.IncomingEvents.guess, "Everyone has guessed!");
        const correctPlayers = matchManager_1.matchManager.match.players.filter(player => player.guess === matchManager_1.matchManager.match.selected);
        if (correctPlayers === undefined || correctPlayers.length === 0) {
            log_1.log.verbose(event_1.IncomingEvents.guess, "No winner");
            socketManager_1.socketManager.sendResponse("No one guessed correctly! Correct answer was " + matchManager_1.matchManager.match.selected);
            return;
        }
        const playerNames = correctPlayers.map(player => player.name);
        log_1.log.verbose(event_1.IncomingEvents.guess, "winners: " + playerNames);
        socketManager_1.socketManager.sendResponse("These players guessed " + matchManager_1.matchManager.match.selected + " correctly: " + playerNames);
    });
    socket.onJoinGame((username) => {
        log_1.log.verbose(event_1.IncomingEvents.join, username + " joined game");
        socket.connect(username);
        if (matchManager_1.matchManager.match === undefined) {
            matchManager_1.matchManager.match = new match_1.Match();
        }
        matchManager_1.matchManager.match.players.push(new player_1.Player(username));
        var playernames = matchManager_1.matchManager.match.players.map(obj => obj.name);
        log_1.log.verbose(event_1.IncomingEvents.join, "sending users out: " + playernames);
        socketManager_1.socketManager.sendUsers(playernames);
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
