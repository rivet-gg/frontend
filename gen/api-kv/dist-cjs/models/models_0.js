"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedError = exports.RateLimitError = exports.NotFoundError = exports.InternalError = exports.ForbiddenError = exports.BadRequestError = exports.PutOutput = exports.PutInput = exports.GetOutput = exports.GetInput = exports.DeleteOutput = exports.DeleteInput = exports.PutBatchRequest = exports.PutEntry = exports.PutBatchOutput = exports.GetBatchRequest = exports.GetBatchOutput = exports.WatchResponse = exports.KvEntry = exports.DeleteBatchRequest = exports.DeleteBatchOutput = void 0;
const KvServiceServiceException_1 = require("./KvServiceServiceException");
var DeleteBatchOutput;
(function (DeleteBatchOutput) {
    DeleteBatchOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteBatchOutput = exports.DeleteBatchOutput || (exports.DeleteBatchOutput = {}));
var DeleteBatchRequest;
(function (DeleteBatchRequest) {
    DeleteBatchRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteBatchRequest = exports.DeleteBatchRequest || (exports.DeleteBatchRequest = {}));
var KvEntry;
(function (KvEntry) {
    KvEntry.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(KvEntry = exports.KvEntry || (exports.KvEntry = {}));
var WatchResponse;
(function (WatchResponse) {
    WatchResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(WatchResponse = exports.WatchResponse || (exports.WatchResponse = {}));
var GetBatchOutput;
(function (GetBatchOutput) {
    GetBatchOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetBatchOutput = exports.GetBatchOutput || (exports.GetBatchOutput = {}));
var GetBatchRequest;
(function (GetBatchRequest) {
    GetBatchRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetBatchRequest = exports.GetBatchRequest || (exports.GetBatchRequest = {}));
var PutBatchOutput;
(function (PutBatchOutput) {
    PutBatchOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PutBatchOutput = exports.PutBatchOutput || (exports.PutBatchOutput = {}));
var PutEntry;
(function (PutEntry) {
    PutEntry.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PutEntry = exports.PutEntry || (exports.PutEntry = {}));
var PutBatchRequest;
(function (PutBatchRequest) {
    PutBatchRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PutBatchRequest = exports.PutBatchRequest || (exports.PutBatchRequest = {}));
var DeleteInput;
(function (DeleteInput) {
    DeleteInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteInput = exports.DeleteInput || (exports.DeleteInput = {}));
var DeleteOutput;
(function (DeleteOutput) {
    DeleteOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteOutput = exports.DeleteOutput || (exports.DeleteOutput = {}));
var GetInput;
(function (GetInput) {
    GetInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetInput = exports.GetInput || (exports.GetInput = {}));
var GetOutput;
(function (GetOutput) {
    GetOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetOutput = exports.GetOutput || (exports.GetOutput = {}));
var PutInput;
(function (PutInput) {
    PutInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PutInput = exports.PutInput || (exports.PutInput = {}));
var PutOutput;
(function (PutOutput) {
    PutOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PutOutput = exports.PutOutput || (exports.PutOutput = {}));
class BadRequestError extends KvServiceServiceException_1.KvServiceServiceException {
    constructor(opts) {
        super({
            name: "BadRequestError",
            $fault: "client",
            ...opts
        });
        this.name = "BadRequestError";
        this.$fault = "client";
        Object.setPrototypeOf(this, BadRequestError.prototype);
        this.code = opts.code;
        this.documentation = opts.documentation;
        this.metadata = opts.metadata;
    }
}
exports.BadRequestError = BadRequestError;
class ForbiddenError extends KvServiceServiceException_1.KvServiceServiceException {
    constructor(opts) {
        super({
            name: "ForbiddenError",
            $fault: "client",
            ...opts
        });
        this.name = "ForbiddenError";
        this.$fault = "client";
        Object.setPrototypeOf(this, ForbiddenError.prototype);
        this.code = opts.code;
        this.documentation = opts.documentation;
        this.metadata = opts.metadata;
    }
}
exports.ForbiddenError = ForbiddenError;
class InternalError extends KvServiceServiceException_1.KvServiceServiceException {
    constructor(opts) {
        super({
            name: "InternalError",
            $fault: "server",
            ...opts
        });
        this.name = "InternalError";
        this.$fault = "server";
        this.$retryable = {};
        Object.setPrototypeOf(this, InternalError.prototype);
        this.code = opts.code;
        this.documentation = opts.documentation;
        this.metadata = opts.metadata;
    }
}
exports.InternalError = InternalError;
class NotFoundError extends KvServiceServiceException_1.KvServiceServiceException {
    constructor(opts) {
        super({
            name: "NotFoundError",
            $fault: "client",
            ...opts
        });
        this.name = "NotFoundError";
        this.$fault = "client";
        Object.setPrototypeOf(this, NotFoundError.prototype);
        this.code = opts.code;
        this.documentation = opts.documentation;
        this.metadata = opts.metadata;
    }
}
exports.NotFoundError = NotFoundError;
class RateLimitError extends KvServiceServiceException_1.KvServiceServiceException {
    constructor(opts) {
        super({
            name: "RateLimitError",
            $fault: "client",
            ...opts
        });
        this.name = "RateLimitError";
        this.$fault = "client";
        Object.setPrototypeOf(this, RateLimitError.prototype);
        this.code = opts.code;
        this.documentation = opts.documentation;
        this.metadata = opts.metadata;
    }
}
exports.RateLimitError = RateLimitError;
class UnauthorizedError extends KvServiceServiceException_1.KvServiceServiceException {
    constructor(opts) {
        super({
            name: "UnauthorizedError",
            $fault: "client",
            ...opts
        });
        this.name = "UnauthorizedError";
        this.$fault = "client";
        this.$retryable = {};
        Object.setPrototypeOf(this, UnauthorizedError.prototype);
        this.code = opts.code;
        this.documentation = opts.documentation;
        this.metadata = opts.metadata;
    }
}
exports.UnauthorizedError = UnauthorizedError;
