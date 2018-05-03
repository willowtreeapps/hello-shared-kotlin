"use strict";
/**
 * log.ts
 *
 * @file Handles logging to both the console and filesystem (via winson) and Keen.io
 * @author Brendan Lensink <brendan@steamclock.com>
 */
Object.defineProperty(exports, "__esModule", { value: true });
const winston = require("winston");
// const keen = require("keen-tracking");
// Set up winston for logging
winston.add(winston.transports.File, {
    filename: "log/all.log",
    level: "info",
    zippedArchive: true,
    maxSize: 5000000,
    maxFiles: 10,
    handleExceptions: true,
    humanReadableExceptions: true
});
winston.handleExceptions(new winston.transports.File({
    filename: "log/exception.log"
}));
winston.level = "verbose"; // Get more plentiful logs
/**
 * Class in charge of managing logging with Winston and Keen
 */
class Log {
    // private client = new keen({
    // projectId: "5a66236b46e0fb000143d6d3",
    //    writeKey: "304DBBC3331FB92901CB9A2AEFAA81BC35A9D05B6B65FCB84DB8E2A7C95A5E657948C604659A12664AEC33A6BFE64F0E465F61BDE631F528CBC0C181E9A9640FE56DC651DB13F9145887B2170155D01F6CAB1EEBFDFB7F72918C32B81B8252E1"
    // });
    // Logging helpers
    /**
     * Log at verbose level
     *
     * @param caller 	   The file or method name that called this function
     * @param message    The message to log
     * @param data?		   Any additional data to log
     */
    verbose(caller, message, data) {
        if (data === undefined) {
            winston.verbose("[%s]:", caller, message);
        }
        else {
            winston.verbose("[%s]:", caller, message, "\n\t Data: ", data);
        }
    }
    /**
     * Log at info level
     *
     * @param caller 	   The file or method name that called this function
     * @param message    The message to log
     * @param data?		   Any additional data to log
     */
    info(caller, message, data) {
        if (data === undefined) {
            winston.info("[%s]:", caller, message);
        }
        else {
            winston.info("[%s]:", caller, message, "\n\t Data: ", data);
        }
    }
    /**
     * Log at warn level
     *
     * @param caller     The file or method name that called this function
     * @param message    The message to log
     * @param data?      Any additional data to log
     */
    warn(caller, message, data) {
        if (data === undefined) {
            winston.warn("[%s]:", caller, message);
        }
        else {
            winston.warn("[%s]:", caller, message, "\n\t Data: ", data);
        }
    }
    /**
     * Log at error level
     *
     * @param caller 	   The file or method name that called this function
     * @param message    The message to log
     * @param data?		   Any additional data to log
     */
    error(caller, message, data) {
        // this.client.addEvent("Error", {
        //     error: message,
        //     data
        //   });
        if (data === undefined) {
            winston.error("[%s]:", caller, message);
        }
        else {
            winston.error("[%s]:", caller, message, "\n\t Data: ", data);
        }
    }
    // Specific events to be logged by Keen.io
    // /**
    //  * Record a match created event with Keen.io
    //  *
    //  * @param roomCode    The room code assigned to the match
    //  * @param id 	        The deviceid and username of the creator of the match
    //  */
    //  matchCreated(roomCode: string, id: string): void {
    //    winston.info("[CreateMatch]: Match %s created by user %s.", roomCode, id);
    //    // this.client.addEvent("matchCreated", { id, roomCode });
    //  }
    // /**
    //  * Record a match started with Keen.io
    //  *
    //  * @param ids    The users in the match formatted as username:deviceId
    //  */
    // matchStarted(ids: string[]): void {
    //   winston.info("[MatchStarted]: " + ids);
    //   // this.client.addEvent("matchStarted", { ids });
    // }
    /**
     * Record a player disconnected event with Keen.io
     *
     * @param deviceId     The device id of the disconnected player
     * @param matchName    The name of the match they were connected to
     * @param reason 			 The reason they were disconnected
     */
    disconnected(id, matchName, reason) {
        winston.info("Disconnected user %s from %s with reason %s", id, matchName, reason);
        // this.client.addEvent("disconnected", { id, matchName, reason });
    }
    /**
     * Record a player reconnected event with Keen.io
     *
     * @param matchName    The name of the match they were connected to
     * @param userId 		   The user id, in the form username:deviceId
     */
    reconnected(matchName, id) {
        winston.info("Reconnected: %s successfully reconnected to match: %s", id, matchName);
        // this.client.addEvent("reconnected", { id, matchName });
    }
}
/**
 * A singleton instance of the log class
 */
exports.log = new Log();
