"use strict";
/**
 * event.ts
 *
 * @file Event enumeration
 * @author Brendan Lensink <brendan@steamclock.com>
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Events received by the socket client
 */
var IncomingEvents;
(function (IncomingEvents) {
    IncomingEvents["joinGame"] = "joinGame";
    IncomingEvents["sendSelection"] = "sendSelection";
    IncomingEvents["sendGuess"] = "sendGuess";
    IncomingEvents["connection"] = "connection";
    IncomingEvents["reconnected"] = "reconnected";
    IncomingEvents["disconnect"] = "disconnect";
})(IncomingEvents = exports.IncomingEvents || (exports.IncomingEvents = {}));
var OutGoingEvents;
(function (OutGoingEvents) {
    OutGoingEvents["guessResponse"] = "guessResponse";
    OutGoingEvents["error"] = "error";
})(OutGoingEvents = exports.OutGoingEvents || (exports.OutGoingEvents = {}));
