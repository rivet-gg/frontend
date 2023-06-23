import { __extends } from "tslib";
import { PortalServiceClient } from "./PortalServiceClient";
import { GetGameProfileCommand, } from "./commands/GetGameProfileCommand";
import { GetSuggestedGamesCommand, } from "./commands/GetSuggestedGamesCommand";
import { RegisterNotificationsCommand, } from "./commands/RegisterNotificationsCommand";
import { ResolveBetaJoinRequestCommand, } from "./commands/ResolveBetaJoinRequestCommand";
import { UnregisterNotificationsCommand, } from "./commands/UnregisterNotificationsCommand";
var PortalService = (function (_super) {
    __extends(PortalService, _super);
    function PortalService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PortalService.prototype.getGameProfile = function (args, optionsOrCb, cb) {
        var command = new GetGameProfileCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get ".concat(typeof optionsOrCb));
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    PortalService.prototype.getSuggestedGames = function (args, optionsOrCb, cb) {
        var command = new GetSuggestedGamesCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get ".concat(typeof optionsOrCb));
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    PortalService.prototype.registerNotifications = function (args, optionsOrCb, cb) {
        var command = new RegisterNotificationsCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get ".concat(typeof optionsOrCb));
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    PortalService.prototype.resolveBetaJoinRequest = function (args, optionsOrCb, cb) {
        var command = new ResolveBetaJoinRequestCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get ".concat(typeof optionsOrCb));
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    PortalService.prototype.unregisterNotifications = function (args, optionsOrCb, cb) {
        var command = new UnregisterNotificationsCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get ".concat(typeof optionsOrCb));
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    return PortalService;
}(PortalServiceClient));
export { PortalService };
