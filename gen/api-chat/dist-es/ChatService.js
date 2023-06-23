import { __extends } from "tslib";
import { ChatServiceClient } from "./ChatServiceClient";
import { GetDirectThreadCommand, } from "./commands/GetDirectThreadCommand";
import { GetThreadHistoryCommand, } from "./commands/GetThreadHistoryCommand";
import { GetThreadTopicCommand, } from "./commands/GetThreadTopicCommand";
import { SendChatMessageCommand, } from "./commands/SendChatMessageCommand";
import { SetThreadReadCommand, } from "./commands/SetThreadReadCommand";
import { SetTypingStatusCommand, } from "./commands/SetTypingStatusCommand";
import { WatchThreadCommand, } from "./commands/WatchThreadCommand";
var ChatService = (function (_super) {
    __extends(ChatService, _super);
    function ChatService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChatService.prototype.getDirectThread = function (args, optionsOrCb, cb) {
        var command = new GetDirectThreadCommand(args);
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
    ChatService.prototype.getThreadHistory = function (args, optionsOrCb, cb) {
        var command = new GetThreadHistoryCommand(args);
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
    ChatService.prototype.getThreadTopic = function (args, optionsOrCb, cb) {
        var command = new GetThreadTopicCommand(args);
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
    ChatService.prototype.sendChatMessage = function (args, optionsOrCb, cb) {
        var command = new SendChatMessageCommand(args);
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
    ChatService.prototype.setThreadRead = function (args, optionsOrCb, cb) {
        var command = new SetThreadReadCommand(args);
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
    ChatService.prototype.setTypingStatus = function (args, optionsOrCb, cb) {
        var command = new SetTypingStatusCommand(args);
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
    ChatService.prototype.watchThread = function (args, optionsOrCb, cb) {
        var command = new WatchThreadCommand(args);
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
    return ChatService;
}(ChatServiceClient));
export { ChatService };
