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
    IncomingEvents["join"] = "join";
    IncomingEvents["selection"] = "selection";
    IncomingEvents["guess"] = "guess";
    IncomingEvents["leave"] = "leave";
    IncomingEvents["connection"] = "connection";
    IncomingEvents["reconnected"] = "reconnected";
    IncomingEvents["disconnect"] = "disconnect";
})(IncomingEvents = exports.IncomingEvents || (exports.IncomingEvents = {}));
var OutGoingEvents;
(function (OutGoingEvents) {
    OutGoingEvents["response"] = "response";
    OutGoingEvents["selectionSet"] = "selectionSet";
    OutGoingEvents["guessSet"] = "guessSet";
    OutGoingEvents["users"] = "users";
    OutGoingEvents["error"] = "errorSent"; // gotta use a name that isn't just error
})(OutGoingEvents = exports.OutGoingEvents || (exports.OutGoingEvents = {}));
