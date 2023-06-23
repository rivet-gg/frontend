import { __assign, __extends } from "tslib";
import { PortalServiceServiceException as __BaseException } from "./PortalServiceServiceException";
export var ResolveBetaJoinRequestInput;
(function (ResolveBetaJoinRequestInput) {
    ResolveBetaJoinRequestInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ResolveBetaJoinRequestInput || (ResolveBetaJoinRequestInput = {}));
export var ResolveBetaJoinRequestOutput;
(function (ResolveBetaJoinRequestOutput) {
    ResolveBetaJoinRequestOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ResolveBetaJoinRequestOutput || (ResolveBetaJoinRequestOutput = {}));
export var GetGameProfileInput;
(function (GetGameProfileInput) {
    GetGameProfileInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetGameProfileInput || (GetGameProfileInput = {}));
export var GroupExternalLinks;
(function (GroupExternalLinks) {
    GroupExternalLinks.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GroupExternalLinks || (GroupExternalLinks = {}));
export var GroupPublicity;
(function (GroupPublicity) {
    GroupPublicity["CLOSED"] = "closed";
    GroupPublicity["OPEN"] = "open";
})(GroupPublicity || (GroupPublicity = {}));
export var GroupSummary;
(function (GroupSummary) {
    GroupSummary.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GroupSummary || (GroupSummary = {}));
export var GameLeaderboardCategory;
(function (GameLeaderboardCategory) {
    GameLeaderboardCategory.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GameLeaderboardCategory || (GameLeaderboardCategory = {}));
export var GamePlatformLink;
(function (GamePlatformLink) {
    GamePlatformLink.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GamePlatformLink || (GamePlatformLink = {}));
export var GameProfile;
(function (GameProfile) {
    GameProfile.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GameProfile || (GameProfile = {}));
export var WatchResponse;
(function (WatchResponse) {
    WatchResponse.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(WatchResponse || (WatchResponse = {}));
export var GetGameProfileOutput;
(function (GetGameProfileOutput) {
    GetGameProfileOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetGameProfileOutput || (GetGameProfileOutput = {}));
export var GetSuggestedGamesInput;
(function (GetSuggestedGamesInput) {
    GetSuggestedGamesInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetSuggestedGamesInput || (GetSuggestedGamesInput = {}));
export var GroupHandle;
(function (GroupHandle) {
    GroupHandle.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GroupHandle || (GroupHandle = {}));
export var GameSummary;
(function (GameSummary) {
    GameSummary.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GameSummary || (GameSummary = {}));
export var GetSuggestedGamesOutput;
(function (GetSuggestedGamesOutput) {
    GetSuggestedGamesOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetSuggestedGamesOutput || (GetSuggestedGamesOutput = {}));
export var NotificationRegisterFirebaseService;
(function (NotificationRegisterFirebaseService) {
    NotificationRegisterFirebaseService.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(NotificationRegisterFirebaseService || (NotificationRegisterFirebaseService = {}));
export var NotificationRegisterService;
(function (NotificationRegisterService) {
    NotificationRegisterService.visit = function (value, visitor) {
        if (value.firebase !== undefined)
            return visitor.firebase(value.firebase);
        return visitor._(value.$unknown[0], value.$unknown[1]);
    };
    NotificationRegisterService.filterSensitiveLog = function (obj) {
        var _a;
        if (obj.firebase !== undefined)
            return { firebase: NotificationRegisterFirebaseService.filterSensitiveLog(obj.firebase)
            };
        if (obj.$unknown !== undefined)
            return _a = {}, _a[obj.$unknown[0]] = 'UNKNOWN', _a;
    };
})(NotificationRegisterService || (NotificationRegisterService = {}));
export var RegisterNotificationsInput;
(function (RegisterNotificationsInput) {
    RegisterNotificationsInput.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.service && { service: NotificationRegisterService.filterSensitiveLog(obj.service)
    }))); };
})(RegisterNotificationsInput || (RegisterNotificationsInput = {}));
export var RegisterNotificationsOutput;
(function (RegisterNotificationsOutput) {
    RegisterNotificationsOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(RegisterNotificationsOutput || (RegisterNotificationsOutput = {}));
export var NotificationUnregisterService;
(function (NotificationUnregisterService) {
    NotificationUnregisterService["FIREBASE"] = "firebase";
})(NotificationUnregisterService || (NotificationUnregisterService = {}));
export var UnregisterNotificationsInput;
(function (UnregisterNotificationsInput) {
    UnregisterNotificationsInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(UnregisterNotificationsInput || (UnregisterNotificationsInput = {}));
export var UnregisterNotificationsOutput;
(function (UnregisterNotificationsOutput) {
    UnregisterNotificationsOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(UnregisterNotificationsOutput || (UnregisterNotificationsOutput = {}));
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
