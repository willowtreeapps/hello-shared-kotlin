/**
 * player.ts
 *
 * @file Spies player object
 * @author Brendan Lensink <brendan@steamclock.com>
 */

/**
 * Player object
 */
export class Player {
	socketId: string;
	deviceId: string;
	username: string;
  isHost: boolean;
	timeJoined = (new Date()).getTime();
	disconnected = false;

  constructor(socketId: string, deviceId: string, username: string, isHost: boolean) {
    this.socketId = socketId;
    this.deviceId = deviceId;
    this.username = username;
    this.isHost = isHost;
  }
}