"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const AuthServiceClient_1 = require("./AuthServiceClient");
const CompleteEmailVerificationCommand_1 = require("./commands/CompleteEmailVerificationCommand");
const RefreshIdentityTokenCommand_1 = require("./commands/RefreshIdentityTokenCommand");
const StartEmailVerificationCommand_1 = require("./commands/StartEmailVerificationCommand");
class AuthService extends AuthServiceClient_1.AuthServiceClient {
    completeEmailVerification(args, optionsOrCb, cb) {
        const command = new CompleteEmailVerificationCommand_1.CompleteEmailVerificationCommand(args);
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
    refreshIdentityToken(args, optionsOrCb, cb) {
        const command = new RefreshIdentityTokenCommand_1.RefreshIdentityTokenCommand(args);
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
    startEmailVerification(args, optionsOrCb, cb) {
        const command = new StartEmailVerificationCommand_1.StartEmailVerificationCommand(args);
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
exports.AuthService = AuthService;
