import { __extends } from "tslib";
import { KvServiceClient } from "./KvServiceClient";
import { DeleteBatchCommand, } from "./commands/DeleteBatchCommand";
import { DeleteCommand, } from "./commands/DeleteCommand";
import { GetBatchCommand, } from "./commands/GetBatchCommand";
import { GetCommand, } from "./commands/GetCommand";
import { PutBatchCommand, } from "./commands/PutBatchCommand";
import { PutCommand, } from "./commands/PutCommand";
var KvService = (function (_super) {
    __extends(KvService, _super);
    function KvService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    KvService.prototype.delete = function (args, optionsOrCb, cb) {
        var command = new DeleteCommand(args);
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
    KvService.prototype.deleteBatch = function (args, optionsOrCb, cb) {
        var command = new DeleteBatchCommand(args);
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
    KvService.prototype.get = function (args, optionsOrCb, cb) {
        var command = new GetCommand(args);
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
    KvService.prototype.getBatch = function (args, optionsOrCb, cb) {
        var command = new GetBatchCommand(args);
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
    KvService.prototype.put = function (args, optionsOrCb, cb) {
        var command = new PutCommand(args);
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
    KvService.prototype.putBatch = function (args, optionsOrCb, cb) {
        var command = new PutBatchCommand(args);
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
    return KvService;
}(KvServiceClient));
export { KvService };
