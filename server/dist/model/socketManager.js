"use strict";
/**
 * socketManager.ts
 *
 * @file Manages instance of socket.io
 * @author Brendan Lensink <brendan@steamclock.com>
 */
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("../log");
const event_1 = require("./event");
// import { Player } from "./player";
const express = require("express");
const path = require("path");
// Catch unhandled errors
process.on("uncaughtException", (error) => {
    log_1.log.error("Uncaught Exception", error.stack);
    process.exit(1);
});
/**
 * Manage socket.io client and provide a safe wrapper for emit events
 */
class SocketManager {
    constructor() {
        this.app = express();
        this.server = require("http").createServer(this.app);
        this.io = require("socket.io")(this.server);
        this.port = process.env.PORT || 3000;
        this.server.listen(this.port, () => {
            log_1.log.info("App", "Server listening at port " + this.port);
        });
        // Routing
        this.app.use(express.static(path.join(__dirname, "public")));
    }
    // Emit handlers
    /**
     * Send a client error message back to the client
     *
     * @param message    The error message to pass on
     */
    sendError(message) {
        this.io.to("test").emit(event_1.OutGoingEvents.error, { message });
    }
    /**
     * Send a client error message back to the client
     *
     * @param message    The error message to pass on
     */
    sendResponse(message) {
        this.io.to("test").emit(event_1.OutGoingEvents.response, { message });
    }
    /**
     * Send a client error message back to the client
     *
     * @param message    The error message to pass on
     */
    sendUsers(users) {
        this.io.to("test").emit(event_1.OutGoingEvents.users, { users });
    }
    /**
       * Send a client error message back to the client
       *
       * @param message    The error message to pass on
       */
    sendSelectionSet(username) {
        this.io.to("test").emit(event_1.OutGoingEvents.selectionSet, { username });
    }
    /**
     * Send a client error message back to the client
     *
     * @param message    The error message to pass on
     */
    sendGuessSet(username) {
        this.io.to("test").emit(event_1.OutGoingEvents.guessSet, { username });
    }
}
/**
 * Enforce singleton
 */
exports.socketManager = new SocketManager();
