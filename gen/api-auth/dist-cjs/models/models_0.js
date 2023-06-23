"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedError = exports.RateLimitError = exports.NotFoundError = exports.InternalError = exports.ForbiddenError = exports.BadRequestError = exports.RefreshIdentityTokenOutput = exports.RefreshIdentityTokenInput = exports.StartEmailVerificationOutput = exports.StartEmailVerificationInput = exports.CaptchaConfig = exports.CaptchaConfigTurnstile = exports.CaptchaConfigHcaptcha = exports.CompleteEmailVerificationOutput = exports.CompleteStatus = exports.CompleteEmailVerificationInput = void 0;
const AuthServiceServiceException_1 = require("./AuthServiceServiceException");
const smithy_client_1 = require("@aws-sdk/smithy-client");
var CompleteEmailVerificationInput;
(function (CompleteEmailVerificationInput) {
    CompleteEmailVerificationInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CompleteEmailVerificationInput = exports.CompleteEmailVerificationInput || (exports.CompleteEmailVerificationInput = {}));
var CompleteStatus;
(function (CompleteStatus) {
    CompleteStatus["ALREADY_COMPLETE"] = "already_complete";
    CompleteStatus["EXPIRED"] = "expired";
    CompleteStatus["INCORRECT"] = "incorrect";
    CompleteStatus["LINKED_ACCOUNT_ADDED"] = "linked_account_added";
    CompleteStatus["SWITCH_IDENTITY"] = "switch_identity";
    CompleteStatus["TOO_MANY_ATTEMPTS"] = "too_many_attempts";
})(CompleteStatus = exports.CompleteStatus || (exports.CompleteStatus = {}));
var CompleteEmailVerificationOutput;
(function (CompleteEmailVerificationOutput) {
    CompleteEmailVerificationOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CompleteEmailVerificationOutput = exports.CompleteEmailVerificationOutput || (exports.CompleteEmailVerificationOutput = {}));
var CaptchaConfigHcaptcha;
(function (CaptchaConfigHcaptcha) {
    CaptchaConfigHcaptcha.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CaptchaConfigHcaptcha = exports.CaptchaConfigHcaptcha || (exports.CaptchaConfigHcaptcha = {}));
var CaptchaConfigTurnstile;
(function (CaptchaConfigTurnstile) {
    CaptchaConfigTurnstile.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CaptchaConfigTurnstile = exports.CaptchaConfigTurnstile || (exports.CaptchaConfigTurnstile = {}));
var CaptchaConfig;
(function (CaptchaConfig) {
    CaptchaConfig.visit = (value, visitor) => {
        if (value.hcaptcha !== undefined)
            return visitor.hcaptcha(value.hcaptcha);
        if (value.turnstile !== undefined)
            return visitor.turnstile(value.turnstile);
        return visitor._(value.$unknown[0], value.$unknown[1]);
    };
    CaptchaConfig.filterSensitiveLog = (obj) => {
        if (obj.hcaptcha !== undefined)
            return { hcaptcha: CaptchaConfigHcaptcha.filterSensitiveLog(obj.hcaptcha)
            };
        if (obj.turnstile !== undefined)
            return { turnstile: CaptchaConfigTurnstile.filterSensitiveLog(obj.turnstile)
            };
        if (obj.$unknown !== undefined)
            return { [obj.$unknown[0]]: 'UNKNOWN' };
    };
})(CaptchaConfig = exports.CaptchaConfig || (exports.CaptchaConfig = {}));
var StartEmailVerificationInput;
(function (StartEmailVerificationInput) {
    StartEmailVerificationInput.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.captcha && { captcha: CaptchaConfig.filterSensitiveLog(obj.captcha)
        }),
    });
})(StartEmailVerificationInput = exports.StartEmailVerificationInput || (exports.StartEmailVerificationInput = {}));
var StartEmailVerificationOutput;
(function (StartEmailVerificationOutput) {
    StartEmailVerificationOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StartEmailVerificationOutput = exports.StartEmailVerificationOutput || (exports.StartEmailVerificationOutput = {}));
var RefreshIdentityTokenInput;
(function (RefreshIdentityTokenInput) {
    RefreshIdentityTokenInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(RefreshIdentityTokenInput = exports.RefreshIdentityTokenInput || (exports.RefreshIdentityTokenInput = {}));
var RefreshIdentityTokenOutput;
(function (RefreshIdentityTokenOutput) {
    RefreshIdentityTokenOutput.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.token && { token: smithy_client_1.SENSITIVE_STRING
        }),
    });
})(RefreshIdentityTokenOutput = exports.RefreshIdentityTokenOutput || (exports.RefreshIdentityTokenOutput = {}));
class BadRequestError extends AuthServiceServiceException_1.AuthServiceServiceException {
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
class ForbiddenError extends AuthServiceServiceException_1.AuthServiceServiceException {
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
class InternalError extends AuthServiceServiceException_1.AuthServiceServiceException {
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
class NotFoundError extends AuthServiceServiceException_1.AuthServiceServiceException {
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
class RateLimitError extends AuthServiceServiceException_1.AuthServiceServiceException {
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
class UnauthorizedError extends AuthServiceServiceException_1.AuthServiceServiceException {
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
