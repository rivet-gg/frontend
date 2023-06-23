"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortalService = void 0;
const PortalServiceClient_1 = require("./PortalServiceClient");
const GetGameProfileCommand_1 = require("./commands/GetGameProfileCommand");
const GetSuggestedGamesCommand_1 = require("./commands/GetSuggestedGamesCommand");
const RegisterNotificationsCommand_1 = require("./commands/RegisterNotificationsCommand");
const ResolveBetaJoinRequestCommand_1 = require("./commands/ResolveBetaJoinRequestCommand");
const UnregisterNotificationsCommand_1 = require("./commands/UnregisterNotificationsCommand");
class PortalService extends PortalServiceClient_1.PortalServiceClient {
    getGameProfile(args, optionsOrCb, cb) {
        const command = new GetGameProfileCommand_1.GetGameProfileCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    getSuggestedGames(args, optionsOrCb, cb) {
        const command = new GetSuggestedGamesCommand_1.GetSuggestedGamesCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    registerNotifications(args, optionsOrCb, cb) {
        const command = new RegisterNotificationsCommand_1.RegisterNotificationsCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    resolveBetaJoinRequest(args, optionsOrCb, cb) {
        const command = new ResolveBetaJoinRequestCommand_1.ResolveBetaJoinRequestCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    unregisterNotifications(args, optionsOrCb, cb) {
        const command = new UnregisterNotificationsCommand_1.UnregisterNotificationsCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
}
exports.PortalService = PortalService;
