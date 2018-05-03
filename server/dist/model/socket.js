"use strict";
/**
 * socketManager.ts
 *
 * @file Manages instance of socket.io
 * @author Brendan Lensink <brendan@steamclock.com>
 */
Object.defineProperty(exports, "__esModule", { value: true });
const event_1 = require("./event");
const event_2 = require("./event");
const log_1 = require("../log");
// Catch unhandled errors
process.on("uncaughtException", (error) => {
    log_1.log.error("Uncaught Exception", error, error.stack);
    process.exit(1);
});
class Socket {
    constructor(socket) {
        this.numUsers = 0;
        this.socket = socket;
    }
    // Computed properties for socket.io
    get username() { return this.socket.username; }
    set username(newValue) { this.socket.username = newValue; }
    get userId() { return this.socket.username; }
    get id() { return this.socket.id; }
    /**
     * Connect a socket to a match, adding a bunch of meta-data
     *
     * @param username     The client's username
     */
    connect(username) {
        this.username = username;
        // this.deviceId = deviceId;
    }
    // Emit handlers
    /**
     * Send a client error message back to the client
     *
     * @param message    The error message to pass on
     */
    sendError(message) {
        this.socket.emit(event_2.OutGoingEvents.error, { message });
    }
    /**
     * Send a client error message back to the client
     *
     * @param message    The error message to pass on
     */
    sendResponse(message) {
        this.socket.emit(event_2.OutGoingEvents.response, { message });
    }
    /**
     * Emit that a user disconnected from a match
     */
    emitDisconnected() {
    }
    // Event handlers
    /**
     * Called when a users sends an action to a match
     *
     * @param handler    The function used to process their request
     */
    onSendSelection(handler) {
        this.socket.on(event_1.IncomingEvents.selection, handler);
    }
    /**
     * Called when a users sends an action to a match
     *
     * @param handler    The function used to process their request
     */
    onSendGuess(handler) {
        this.socket.on(event_1.IncomingEvents.guess, handler);
    }
    /**
     * Called when a users sends an action to a match
     *
     * @param handler    The function used to process their request
     */
    onJoinGame(handler) {
        this.socket.on(event_1.IncomingEvents.join, handler);
    }
    /**
     * Called when a user reconnects to a match
     *
     * @param handler    The function used to process their request
     */
    onReconnected(handler) {
        this.socket.on(event_1.IncomingEvents.reconnected, handler);
    }
    /**
     * Called when a user disconnects from a match
     *
     * @param handler    The function used to process their request
     */
    onDisconnect(handler) {
        this.socket.on(event_1.IncomingEvents.disconnect, handler);
    }
}
exports.Socket = Socket;
