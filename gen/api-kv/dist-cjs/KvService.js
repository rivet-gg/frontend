"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KvService = void 0;
const KvServiceClient_1 = require("./KvServiceClient");
const DeleteBatchCommand_1 = require("./commands/DeleteBatchCommand");
const DeleteCommand_1 = require("./commands/DeleteCommand");
const GetBatchCommand_1 = require("./commands/GetBatchCommand");
const GetCommand_1 = require("./commands/GetCommand");
const PutBatchCommand_1 = require("./commands/PutBatchCommand");
const PutCommand_1 = require("./commands/PutCommand");
class KvService extends KvServiceClient_1.KvServiceClient {
    delete(args, optionsOrCb, cb) {
        const command = new DeleteCommand_1.DeleteCommand(args);
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
    deleteBatch(args, optionsOrCb, cb) {
        const command = new DeleteBatchCommand_1.DeleteBatchCommand(args);
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
    get(args, optionsOrCb, cb) {
        const command = new GetCommand_1.GetCommand(args);
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
    getBatch(args, optionsOrCb, cb) {
        const command = new GetBatchCommand_1.GetBatchCommand(args);
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
    put(args, optionsOrCb, cb) {
        const command = new PutCommand_1.PutCommand(args);
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
    putBatch(args, optionsOrCb, cb) {
        const command = new PutBatchCommand_1.PutBatchCommand(args);
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
exports.KvService = KvService;
