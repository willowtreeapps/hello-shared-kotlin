"use strict";
/**
 * socketManager.ts
 *
 * @file Manages instance of socket.io
 * @author Brendan Lensink <brendan@steamclock.com>
 */
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("../log");
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
}
/**
 * Enforce singleton
 */
exports.socketManager = new SocketManager();
