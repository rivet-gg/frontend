import { __assign, __extends } from "tslib";
import { KvServiceServiceException as __BaseException } from "./KvServiceServiceException";
export var DeleteBatchOutput;
(function (DeleteBatchOutput) {
    DeleteBatchOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(DeleteBatchOutput || (DeleteBatchOutput = {}));
export var DeleteBatchRequest;
(function (DeleteBatchRequest) {
    DeleteBatchRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(DeleteBatchRequest || (DeleteBatchRequest = {}));
export var KvEntry;
(function (KvEntry) {
    KvEntry.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(KvEntry || (KvEntry = {}));
export var WatchResponse;
(function (WatchResponse) {
    WatchResponse.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(WatchResponse || (WatchResponse = {}));
export var GetBatchOutput;
(function (GetBatchOutput) {
    GetBatchOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetBatchOutput || (GetBatchOutput = {}));
export var GetBatchRequest;
(function (GetBatchRequest) {
    GetBatchRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetBatchRequest || (GetBatchRequest = {}));
export var PutBatchOutput;
(function (PutBatchOutput) {
    PutBatchOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(PutBatchOutput || (PutBatchOutput = {}));
export var PutEntry;
(function (PutEntry) {
    PutEntry.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(PutEntry || (PutEntry = {}));
export var PutBatchRequest;
(function (PutBatchRequest) {
    PutBatchRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(PutBatchRequest || (PutBatchRequest = {}));
export var DeleteInput;
(function (DeleteInput) {
    DeleteInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(DeleteInput || (DeleteInput = {}));
export var DeleteOutput;
(function (DeleteOutput) {
    DeleteOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(DeleteOutput || (DeleteOutput = {}));
export var GetInput;
(function (GetInput) {
    GetInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetInput || (GetInput = {}));
export var GetOutput;
(function (GetOutput) {
    GetOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetOutput || (GetOutput = {}));
export var PutInput;
(function (PutInput) {
    PutInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(PutInput || (PutInput = {}));
export var PutOutput;
(function (PutOutput) {
    PutOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(PutOutput || (PutOutput = {}));
var BadRequestError = (function (_super) {
    __extends(BadRequestError, _super);
    function BadRequestError(opts) {
        var _this = _super.call(this, __assign({ name: "BadRequestError", $fault: "client" }, opts)) || this;
        _this.name = "BadRequestError";
        _this.$fault = "client";
        Object.setPrototypeOf(_this, BadRequestError.prototype);
        _this.code = opts.code;
        _this.documentation = opts.documentation;
        _this.metadata = opts.metadata;
        return _this;
    }
    return BadRequestError;
}(__BaseException));
export { BadRequestError };
var ForbiddenError = (function (_super) {
    __extends(ForbiddenError, _super);
    function ForbiddenError(opts) {
        var _this = _super.call(this, __assign({ name: "ForbiddenError", $fault: "client" }, opts)) || this;
        _this.name = "ForbiddenError";
        _this.$fault = "client";
        Object.setPrototypeOf(_this, ForbiddenError.prototype);
        _this.code = opts.code;
        _this.documentation = opts.documentation;
        _this.metadata = opts.metadata;
        return _this;
    }
    return ForbiddenError;
}(__BaseException));
export { ForbiddenError };
var InternalError = (function (_super) {
    __extends(InternalError, _super);
    function InternalError(opts) {
        var _this = _super.call(this, __assign({ name: "InternalError", $fault: "server" }, opts)) || this;
        _this.name = "InternalError";
        _this.$fault = "server";
        _this.$retryable = {};
        Object.setPrototypeOf(_this, InternalError.prototype);
        _this.code = opts.code;
        _this.documentation = opts.documentation;
        _this.metadata = opts.metadata;
        return _this;
    }
    return InternalError;
}(__BaseException));
export { InternalError };
var NotFoundError = (function (_super) {
    __extends(NotFoundError, _super);
    function NotFoundError(opts) {
        var _this = _super.call(this, __assign({ name: "NotFoundError", $fault: "client" }, opts)) || this;
        _this.name = "NotFoundError";
        _this.$fault = "client";
        Object.setPrototypeOf(_this, NotFoundError.prototype);
        _this.code = opts.code;
        _this.documentation = opts.documentation;
        _this.metadata = opts.metadata;
        return _this;
    }
    return NotFoundError;
}(__BaseException));
export { NotFoundError };
var RateLimitError = (function (_super) {
    __extends(RateLimitError, _super);
    function RateLimitError(opts) {
        var _this = _super.call(this, __assign({ name: "RateLimitError", $fault: "client" }, opts)) || this;
        _this.name = "RateLimitError";
        _this.$fault = "client";
        Object.setPrototypeOf(_this, RateLimitError.prototype);
        _this.code = opts.code;
        _this.documentation = opts.documentation;
        _this.metadata = opts.metadata;
        return _this;
    }
    return RateLimitError;
}(__BaseException));
export { RateLimitError };
var UnauthorizedError = (function (_super) {
    __extends(UnauthorizedError, _super);
    function UnauthorizedError(opts) {
        var _this = _super.call(this, __assign({ name: "UnauthorizedError", $fault: "client" }, opts)) || this;
        _this.name = "UnauthorizedError";
        _this.$fault = "client";
        _this.$retryable = {};
        Object.setPrototypeOf(_this, UnauthorizedError.prototype);
        _this.code = opts.code;
        _this.documentation = opts.documentation;
        _this.metadata = opts.metadata;
        return _this;
    }
    return UnauthorizedError;
}(__BaseException));
export { UnauthorizedError };
