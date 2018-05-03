/**
 * event.ts
 *
 * @file Event enumeration
 * @author Brendan Lensink <brendan@steamclock.com>
 */

/**
 * Events received by the socket client
 */
export enum IncomingEvents {
  joinGame = "joinGame",
  sendSelection = "sendSelection",
  sendGuess = "sendGuess",
  connection = "connection",
  reconnected = "reconnected",
  disconnect = "disconnect"
}

export enum OutGoingEvents {
  guessResponse = "guessResponse",
  error = "error"
}