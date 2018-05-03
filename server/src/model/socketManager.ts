/**
 * socketManager.ts
 *
 * @file Manages instance of socket.io
 * @author Brendan Lensink <brendan@steamclock.com>
 */

import { log } from "../log";
import { OutGoingEvents } from "./event";
// import { Player } from "./player";

import express = require("express");
import path = require("path");

// Catch unhandled errors
(process as NodeJS.EventEmitter).on("uncaughtException", (error) => {
  log.error("Uncaught Exception", error.stack);
  process.exit(1);
});

/**
 * Manage socket.io client and provide a safe wrapper for emit events
 */
class SocketManager {
  app = express();
  server = require("http").createServer(this.app);
  io = require("socket.io")(this.server);
  port = process.env.PORT || 3000;

  constructor() {
    this.server.listen(this.port, () => {
      log.info("App", "Server listening at port " + this.port);
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
  public sendError(message: string): void {
    this.io.to("test").emit(OutGoingEvents.error, { message });
  }

  /**
   * Send a client error message back to the client
   *
   * @param message    The error message to pass on
   */
  public sendResponse(message: string): void {
    this.io.to("test").emit(OutGoingEvents.response, { message });
  }

  /**
   * Send a client error message back to the client
   *
   * @param message    The error message to pass on
   */
  public sendUsers(users: string[]): void {
    this.io.to("test").emit(OutGoingEvents.users, { users });
  }

/**
   * Send a client error message back to the client
   *
   * @param message    The error message to pass on
   */
  public sendSelectionSet(username: string): void {
    this.io.to("test").emit(OutGoingEvents.selectionSet, { username });
  }

  /**
   * Send a client error message back to the client
   *
   * @param message    The error message to pass on
   */
  public sendGuessSet(username: string): void {
    this.io.to("test").emit(OutGoingEvents.guessSet, { username });
  }


  // Helpers

  // *
  //  * Get a reference to a socket connection by its id
  //  *
  //  * @param id    The id of the socket to search for
  //  *
  //  * @returns The socket if it exists, or undefined
   
  // public getSocketById(id: string): any | undefined {
  //   return this.io.sockets.connected[id];
  // }
}

/**
 * Enforce singleton
 */
export const socketManager = new SocketManager();