/**
 * event.ts
 *
 * @file Event enumeration
 * @author Brendan Lensink <brendan@steamclock.com>
 */

/**
 * Events received by the socket client
 */
export enum Event {
  sendSelection = "sendSelection",
  sendGuess = "sendGuess",
  guessResponse = "guessResponse",
  connection = "connection",
  reconnected = "reconnected",
  disconnect = "disconnect"
}