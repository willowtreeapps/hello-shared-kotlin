"use strict";
/**
 * player.ts
 *
 * @file Spies player object
 * @author Brendan Lensink <brendan@steamclock.com>
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Player object
 */
class Player {
    constructor(socketId, deviceId, username, isHost) {
        this.timeJoined = (new Date()).getTime();
        this.disconnected = false;
        this.socketId = socketId;
        this.deviceId = deviceId;
        this.username = username;
        this.isHost = isHost;
    }
}
exports.Player = Player;
