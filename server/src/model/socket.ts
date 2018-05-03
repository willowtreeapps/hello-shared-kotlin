/**
 * socketManager.ts
 *
 * @file Manages instance of socket.io
 * @author Brendan Lensink <brendan@steamclock.com>
 */

import { IncomingEvents } from "./event";
import { log } from "../log";

// Catch unhandled errors
(process as NodeJS.EventEmitter).on("uncaughtException", (error) => {
  log.error("Uncaught Exception", error, error.stack);
  process.exit(1);
});

export class Socket {
  private socket: any;
  numUsers = 0;

  constructor(socket: any) {
    this.socket = socket;
    this.socket.join("test");
  }

  // Computed properties for socket.io

  get username(): string { return this.socket.username; }
  set username(newValue: string) { this.socket.username = newValue; }
  get id(): string { return this.socket.id; }

  /**
   * Connect a socket to a match, adding a bunch of meta-data
   *
   * @param username     The client's username
   */
  connect(username: string): void {
    this.username = username;
  }

  leave(): void {
    this.username = "";
  }

  /**
   * Emit that a user disconnected from a match
   */
  public emitDisconnected() {
    
  }

  // Event handlers

  /**
   * Called when a users sends an action to a match
   *
   * @param handler    The function used to process their request
   */
  public onSendSelection(handler: (selection: string) => void): void {
    this.socket.on(IncomingEvents.selection, handler);
  }

  /**
   * Called when a users sends an action to a match
   *
   * @param handler    The function used to process their request
   */
  public onSendGuess(handler: (guess: string) => void): void {
    this.socket.on(IncomingEvents.guess, handler);
  }

  /**
   * Called when a users sends an action to a match
   *
   * @param handler    The function used to process their request
   */
  public onJoinGame(handler: (username: string) => void): void {
    this.socket.on(IncomingEvents.join, handler);
  }

    /**
   * Called when a users sends an action to a match
   *
   * @param handler    The function used to process their request
   */
  public onLeaveGame(handler: (username: string) => void): void {
    this.socket.on(IncomingEvents.leave, handler);
  }

  /**
   * Called when a user reconnects to a match
   *
   * @param handler    The function used to process their request
   */
  public onReconnected(handler: (deviceId: string, matchName: string) => void): void {
    this.socket.on(IncomingEvents.reconnected, handler);
  }

  /**
   * Called when a user disconnects from a match
   *
   * @param handler    The function used to process their request
   */
  public onDisconnect(handler: (reason: any) => void): void {
    this.socket.on(IncomingEvents.disconnect, handler);
  }
}