import { __extends } from "tslib";
import { AuthServiceClient } from "./AuthServiceClient";
import { CompleteEmailVerificationCommand, } from "./commands/CompleteEmailVerificationCommand";
import { RefreshIdentityTokenCommand, } from "./commands/RefreshIdentityTokenCommand";
import { StartEmailVerificationCommand, } from "./commands/StartEmailVerificationCommand";
var AuthService = (function (_super) {
    __extends(AuthService, _super);
    function AuthService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AuthService.prototype.completeEmailVerification = function (args, optionsOrCb, cb) {
        var command = new CompleteEmailVerificationCommand(args);
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
    AuthService.prototype.refreshIdentityToken = function (args, optionsOrCb, cb) {
        var command = new RefreshIdentityTokenCommand(args);
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
    AuthService.prototype.startEmailVerification = function (args, optionsOrCb, cb) {
        var command = new StartEmailVerificationCommand(args);
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
    return AuthService;
}(AuthServiceClient));
export { AuthService };
