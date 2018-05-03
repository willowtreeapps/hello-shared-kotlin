/**
 * socketManager.ts
 *
 * @file Manages instance of socket.io
 * @author Brendan Lensink <brendan@steamclock.com>
 */

import { Event } from "./event";
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
    this.socket.inMatch = false;
  }

  // Computed properties for socket.io

  // get inMatch(): boolean { return this.socket.inMatch; }
  // set inMatch(newValue: boolean) { this.socket.inMatch = newValue; }

  get username(): string { return this.socket.username; }
  set username(newValue: string) { this.socket.username = newValue; }

  get deviceId(): string { return this.socket.deviceId; }
  set deviceId(newValue: string) { this.socket.deviceId = newValue; }

  get matchName(): string { return this.socket.matchName; }
  set matchName(newValue: string) { this.socket.matchName = newValue; }

  get isHost(): boolean { return this.socket.isHost; }
  set isHost(newValue: boolean) { this.socket.isHost = newValue; }

  get userId(): string { return this.socket.username + ":" + this.socket.deviceId; }

  get id(): string { return this.socket.id; }

  /**
   * Adds a socket to match, so it will hear any messages emitted to that match
   *
   * @param matchName    The name of the match to connect to
   */
  // join(matchName: string): void { this.socket.join(matchName); }

  /**
   * Removes a socket from a match, so it will no longer hear any messages emitted to it
   *
   * @param matchName    The name of the match to connect to
   */
  leave(matchName: string): void { this.socket.leave(matchName); }

  /**
   * Connect a socket to a match, adding a bunch of meta-data
   *
   * @param username     The client's username
   * @param deviceId     The id of the device connected to the match
   * @param matchName    The name of the match the client is connected to
   * @param isHost       True if they are the host, false if not
   */
  connect(username: string, deviceId: string, isHost: boolean): void {
    // this.join();
    this.username = username;
    this.deviceId = deviceId;
    this.isHost = isHost;
    // this.inMatch = true;
  }

  // Emit handlers

  /**
   * Send a client error message back to the client
   *
   * @param message    The error message to pass on
   */
  public emitClientError(message: string): void {
    this.socket.emit("clientError", { message });
  }

  /**
   * Send a server error message back to the client
   *
   * @param message    The error message to pass on
   */
  public emitServerError(message: string): void {
    this.socket.emit("serverError", { message });
  }

  /**
   * Tell a client that they have joined a match
   *
   * @param username      The name of the user if they are joining an existing game, undefined if they are creating a new game
   */
  // public emitMatchEntered(username?: string): void {
  //   if (this.matchName === undefined) {
  //     this.socket.emitServerError("Tried to enter a match but matchName was undefined");
  //     log.warn("EmitReconnected", "Client " + this.username + ":" + this.deviceId + " tried to enter a match but matchName was undefined");
  //     return;
  //   }

  //   this.socket.emit("matchEntered", {
  //     matchName: this.matchName,
  //     username
  //   });
  // }

  /**
   * Pass an action from one client to the rest of the room
   *
   * @param message      The action sent
   */
  public emitGotAction(message: any): void {
    if (this.matchName === undefined || this.username === undefined) {
      const message = "Tried to emit gotAction but matchName or username was undefined";
      // this.socket.emitServerError(message);
      log.warn("EmitReconnected", "Client " + this.username + " in " + this.matchName + " " + message);
      return;
    }

    this.socket.to(this.matchName).emit("gotAction", {
      username: this.username,
      message
    });
  }

  // /**
  //  * Pass back an acknowledgement that an action was received
  //  */
  // public emitGotActionAck(): void {
  //   this.socket.emit("sendActionAck", {"": ""});
  // }

  /**
  //  * Emit that the user left a match to the other clients in the match
  //  *
  //  * @param matchName    The name of the match they left
  //  */
  // public emitUserLeftMatch(matchName: string): void {
  //   this.socket.to(matchName).emit("userLeftMatch", {
  //     username: this.username
  //   });
  // }

  /**
   * Emit that a user reconnected to a match
   *
   * @param username     The name of the reconnected user
   */
  public emitReconnected(username: string) {
    const message = "Tried to emit reconnected but matchName was undefined";
    if (this.matchName === undefined) {
      // this.socket.emitServerError(message);
      log.warn("EmitReconnected", this.username + " " + message);
      return;
    }

    this.socket.to(this.matchName).emit("userReconnected", {
      username
    });
  }

  /**
   * Emit that a user disconnected from a match
   */
  public emitDisconnected() {
    if (this.matchName === undefined || this.username === undefined) {
      const message = "Tried to emit disconnected but username or matchName was undefined";
      // this.socket.emitServerError(message);
      log.warn("EmitDisconnected", "Client " + this.username + " in " + this.matchName + " " + message);
      return;
    }

    this.socket.to(this.matchName).emit("userDisconnected", {
      username: this.username
    });
  }

  // Event handlers

  /**
   * Called when a user request to either create or join a new match
   *
   * @param handler    The function used to process their request
   */
  // public onEnterMatch(handler: (deviceId: string, username: string, gameVersion: number, matchName?: string) => void): void {
  //   this.socket.on(Event.enterMatch, handler);
  // }

  /**
   * Called when both users are ready and a match starts
   *
   * @param handler    The function used to process their request
   */
  // public onMatchStarted(handler: () => void): void {
  //   this.socket.on(Event.matchStarted, handler);
  // }

  /**
   * Called when a match is completed
   *
   * @param handler    The function used to process their request
   */
  // public onMatchComplete(handler: () => void): void {
  //   this.socket.on(Event.matchComplete, handler);
  // }

  /**
   * Called when a users sends an action to a match
   *
   * @param handler    The function used to process their request
   */
  public onSendSelection(handler: (data: any) => void): void {
    this.socket.on(Event.sendSelection, handler);
  }

  /**
   * Called when a users sends an action to a match
   *
   * @param handler    The function used to process their request
   */
  public onSendGuess(handler: (data: any) => void): void {
    this.socket.on(Event.sendGuess, handler);
  }

  /**
   * Called when a user sends a got action ack
   *
   * @param handler    The function used to process their request
   */
  // public onGotActionAck(handler: () => void): void {
  //   this.socket.on(Event.gotActionAck, handler);
  // }

  /**
   * Called when a user leaves a match
   *
   * @param handler    The function used to process their request
   */
  // public onLeaveMatch(handler: (username: string, matchName: string) => void): void {
  //   this.socket.on(Event.leaveMatch, handler);
  // }

  /**
   * Called when a user reconnects to a match
   *
   * @param handler    The function used to process their request
   */
  public onReconnected(handler: (deviceId: string, matchName: string) => void): void {
    this.socket.on(Event.reconnected, handler);
  }

  /**
   * Called when a user disconnects from a match
   *
   * @param handler    The function used to process their request
   */
  public onDisconnect(handler: (reason: any) => void): void {
    this.socket.on(Event.disconnect, handler);
  }
}