import { __assign, __extends } from "tslib";
import { AuthServiceServiceException as __BaseException } from "./AuthServiceServiceException";
import { SENSITIVE_STRING, } from "@aws-sdk/smithy-client";
export var CompleteEmailVerificationInput;
(function (CompleteEmailVerificationInput) {
    CompleteEmailVerificationInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(CompleteEmailVerificationInput || (CompleteEmailVerificationInput = {}));
export var CompleteStatus;
(function (CompleteStatus) {
    CompleteStatus["ALREADY_COMPLETE"] = "already_complete";
    CompleteStatus["EXPIRED"] = "expired";
    CompleteStatus["INCORRECT"] = "incorrect";
    CompleteStatus["LINKED_ACCOUNT_ADDED"] = "linked_account_added";
    CompleteStatus["SWITCH_IDENTITY"] = "switch_identity";
    CompleteStatus["TOO_MANY_ATTEMPTS"] = "too_many_attempts";
})(CompleteStatus || (CompleteStatus = {}));
export var CompleteEmailVerificationOutput;
(function (CompleteEmailVerificationOutput) {
    CompleteEmailVerificationOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(CompleteEmailVerificationOutput || (CompleteEmailVerificationOutput = {}));
export var CaptchaConfigHcaptcha;
(function (CaptchaConfigHcaptcha) {
    CaptchaConfigHcaptcha.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(CaptchaConfigHcaptcha || (CaptchaConfigHcaptcha = {}));
export var CaptchaConfigTurnstile;
(function (CaptchaConfigTurnstile) {
    CaptchaConfigTurnstile.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(CaptchaConfigTurnstile || (CaptchaConfigTurnstile = {}));
export var CaptchaConfig;
(function (CaptchaConfig) {
    CaptchaConfig.visit = function (value, visitor) {
        if (value.hcaptcha !== undefined)
            return visitor.hcaptcha(value.hcaptcha);
        if (value.turnstile !== undefined)
            return visitor.turnstile(value.turnstile);
        return visitor._(value.$unknown[0], value.$unknown[1]);
    };
    CaptchaConfig.filterSensitiveLog = function (obj) {
        var _a;
        if (obj.hcaptcha !== undefined)
            return { hcaptcha: CaptchaConfigHcaptcha.filterSensitiveLog(obj.hcaptcha)
            };
        if (obj.turnstile !== undefined)
            return { turnstile: CaptchaConfigTurnstile.filterSensitiveLog(obj.turnstile)
            };
        if (obj.$unknown !== undefined)
            return _a = {}, _a[obj.$unknown[0]] = 'UNKNOWN', _a;
    };
})(CaptchaConfig || (CaptchaConfig = {}));
export var StartEmailVerificationInput;
(function (StartEmailVerificationInput) {
    StartEmailVerificationInput.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.captcha && { captcha: CaptchaConfig.filterSensitiveLog(obj.captcha)
    }))); };
})(StartEmailVerificationInput || (StartEmailVerificationInput = {}));
export var StartEmailVerificationOutput;
(function (StartEmailVerificationOutput) {
    StartEmailVerificationOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(StartEmailVerificationOutput || (StartEmailVerificationOutput = {}));
export var RefreshIdentityTokenInput;
(function (RefreshIdentityTokenInput) {
    RefreshIdentityTokenInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(RefreshIdentityTokenInput || (RefreshIdentityTokenInput = {}));
export var RefreshIdentityTokenOutput;
(function (RefreshIdentityTokenOutput) {
    RefreshIdentityTokenOutput.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.token && { token: SENSITIVE_STRING
    }))); };
})(RefreshIdentityTokenOutput || (RefreshIdentityTokenOutput = {}));
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
