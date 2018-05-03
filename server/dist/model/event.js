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
    IncomingEvents["connection"] = "connection";
    IncomingEvents["reconnected"] = "reconnected";
    IncomingEvents["disconnect"] = "disconnect";
})(IncomingEvents = exports.IncomingEvents || (exports.IncomingEvents = {}));
var OutGoingEvents;
(function (OutGoingEvents) {
    OutGoingEvents["response"] = "response";
    OutGoingEvents["error"] = "error";
})(OutGoingEvents = exports.OutGoingEvents || (exports.OutGoingEvents = {}));
