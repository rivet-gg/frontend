"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
const ChatServiceClient_1 = require("./ChatServiceClient");
const GetDirectThreadCommand_1 = require("./commands/GetDirectThreadCommand");
const GetThreadHistoryCommand_1 = require("./commands/GetThreadHistoryCommand");
const GetThreadTopicCommand_1 = require("./commands/GetThreadTopicCommand");
const SendChatMessageCommand_1 = require("./commands/SendChatMessageCommand");
const SetThreadReadCommand_1 = require("./commands/SetThreadReadCommand");
const SetTypingStatusCommand_1 = require("./commands/SetTypingStatusCommand");
const WatchThreadCommand_1 = require("./commands/WatchThreadCommand");
class ChatService extends ChatServiceClient_1.ChatServiceClient {
    getDirectThread(args, optionsOrCb, cb) {
        const command = new GetDirectThreadCommand_1.GetDirectThreadCommand(args);
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
    getThreadHistory(args, optionsOrCb, cb) {
        const command = new GetThreadHistoryCommand_1.GetThreadHistoryCommand(args);
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
    getThreadTopic(args, optionsOrCb, cb) {
        const command = new GetThreadTopicCommand_1.GetThreadTopicCommand(args);
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
    sendChatMessage(args, optionsOrCb, cb) {
        const command = new SendChatMessageCommand_1.SendChatMessageCommand(args);
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
    setThreadRead(args, optionsOrCb, cb) {
        const command = new SetThreadReadCommand_1.SetThreadReadCommand(args);
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
    setTypingStatus(args, optionsOrCb, cb) {
        const command = new SetTypingStatusCommand_1.SetTypingStatusCommand(args);
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
    watchThread(args, optionsOrCb, cb) {
        const command = new WatchThreadCommand_1.WatchThreadCommand(args);
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
exports.ChatService = ChatService;
