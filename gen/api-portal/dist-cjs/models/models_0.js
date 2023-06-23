"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedError = exports.RateLimitError = exports.NotFoundError = exports.InternalError = exports.ForbiddenError = exports.BadRequestError = exports.UnregisterNotificationsOutput = exports.UnregisterNotificationsInput = exports.NotificationUnregisterService = exports.RegisterNotificationsOutput = exports.RegisterNotificationsInput = exports.NotificationRegisterService = exports.NotificationRegisterFirebaseService = exports.GetSuggestedGamesOutput = exports.GameSummary = exports.GroupHandle = exports.GetSuggestedGamesInput = exports.GetGameProfileOutput = exports.WatchResponse = exports.GameProfile = exports.GamePlatformLink = exports.GameLeaderboardCategory = exports.GroupSummary = exports.GroupPublicity = exports.GroupExternalLinks = exports.GetGameProfileInput = exports.ResolveBetaJoinRequestOutput = exports.ResolveBetaJoinRequestInput = void 0;
const PortalServiceServiceException_1 = require("./PortalServiceServiceException");
var ResolveBetaJoinRequestInput;
(function (ResolveBetaJoinRequestInput) {
    ResolveBetaJoinRequestInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ResolveBetaJoinRequestInput = exports.ResolveBetaJoinRequestInput || (exports.ResolveBetaJoinRequestInput = {}));
var ResolveBetaJoinRequestOutput;
(function (ResolveBetaJoinRequestOutput) {
    ResolveBetaJoinRequestOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ResolveBetaJoinRequestOutput = exports.ResolveBetaJoinRequestOutput || (exports.ResolveBetaJoinRequestOutput = {}));
var GetGameProfileInput;
(function (GetGameProfileInput) {
    GetGameProfileInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetGameProfileInput = exports.GetGameProfileInput || (exports.GetGameProfileInput = {}));
var GroupExternalLinks;
(function (GroupExternalLinks) {
    GroupExternalLinks.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GroupExternalLinks = exports.GroupExternalLinks || (exports.GroupExternalLinks = {}));
var GroupPublicity;
(function (GroupPublicity) {
    GroupPublicity["CLOSED"] = "closed";
    GroupPublicity["OPEN"] = "open";
})(GroupPublicity = exports.GroupPublicity || (exports.GroupPublicity = {}));
var GroupSummary;
(function (GroupSummary) {
    GroupSummary.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GroupSummary = exports.GroupSummary || (exports.GroupSummary = {}));
var GameLeaderboardCategory;
(function (GameLeaderboardCategory) {
    GameLeaderboardCategory.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GameLeaderboardCategory = exports.GameLeaderboardCategory || (exports.GameLeaderboardCategory = {}));
var GamePlatformLink;
(function (GamePlatformLink) {
    GamePlatformLink.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GamePlatformLink = exports.GamePlatformLink || (exports.GamePlatformLink = {}));
var GameProfile;
(function (GameProfile) {
    GameProfile.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GameProfile = exports.GameProfile || (exports.GameProfile = {}));
var WatchResponse;
(function (WatchResponse) {
    WatchResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(WatchResponse = exports.WatchResponse || (exports.WatchResponse = {}));
var GetGameProfileOutput;
(function (GetGameProfileOutput) {
    GetGameProfileOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetGameProfileOutput = exports.GetGameProfileOutput || (exports.GetGameProfileOutput = {}));
var GetSuggestedGamesInput;
(function (GetSuggestedGamesInput) {
    GetSuggestedGamesInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetSuggestedGamesInput = exports.GetSuggestedGamesInput || (exports.GetSuggestedGamesInput = {}));
var GroupHandle;
(function (GroupHandle) {
    GroupHandle.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GroupHandle = exports.GroupHandle || (exports.GroupHandle = {}));
var GameSummary;
(function (GameSummary) {
    GameSummary.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GameSummary = exports.GameSummary || (exports.GameSummary = {}));
var GetSuggestedGamesOutput;
(function (GetSuggestedGamesOutput) {
    GetSuggestedGamesOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetSuggestedGamesOutput = exports.GetSuggestedGamesOutput || (exports.GetSuggestedGamesOutput = {}));
var NotificationRegisterFirebaseService;
(function (NotificationRegisterFirebaseService) {
    NotificationRegisterFirebaseService.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(NotificationRegisterFirebaseService = exports.NotificationRegisterFirebaseService || (exports.NotificationRegisterFirebaseService = {}));
var NotificationRegisterService;
(function (NotificationRegisterService) {
    NotificationRegisterService.visit = (value, visitor) => {
        if (value.firebase !== undefined)
            return visitor.firebase(value.firebase);
        return visitor._(value.$unknown[0], value.$unknown[1]);
    };
    NotificationRegisterService.filterSensitiveLog = (obj) => {
        if (obj.firebase !== undefined)
            return { firebase: NotificationRegisterFirebaseService.filterSensitiveLog(obj.firebase)
            };
        if (obj.$unknown !== undefined)
            return { [obj.$unknown[0]]: 'UNKNOWN' };
    };
})(NotificationRegisterService = exports.NotificationRegisterService || (exports.NotificationRegisterService = {}));
var RegisterNotificationsInput;
(function (RegisterNotificationsInput) {
    RegisterNotificationsInput.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.service && { service: NotificationRegisterService.filterSensitiveLog(obj.service)
        }),
    });
})(RegisterNotificationsInput = exports.RegisterNotificationsInput || (exports.RegisterNotificationsInput = {}));
var RegisterNotificationsOutput;
(function (RegisterNotificationsOutput) {
    RegisterNotificationsOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(RegisterNotificationsOutput = exports.RegisterNotificationsOutput || (exports.RegisterNotificationsOutput = {}));
var NotificationUnregisterService;
(function (NotificationUnregisterService) {
    NotificationUnregisterService["FIREBASE"] = "firebase";
})(NotificationUnregisterService = exports.NotificationUnregisterService || (exports.NotificationUnregisterService = {}));
var UnregisterNotificationsInput;
(function (UnregisterNotificationsInput) {
    UnregisterNotificationsInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(UnregisterNotificationsInput = exports.UnregisterNotificationsInput || (exports.UnregisterNotificationsInput = {}));
var UnregisterNotificationsOutput;
(function (UnregisterNotificationsOutput) {
    UnregisterNotificationsOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(UnregisterNotificationsOutput = exports.UnregisterNotificationsOutput || (exports.UnregisterNotificationsOutput = {}));
class BadRequestError extends PortalServiceServiceException_1.PortalServiceServiceException {
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
class ForbiddenError extends PortalServiceServiceException_1.PortalServiceServiceException {
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
class InternalError extends PortalServiceServiceException_1.PortalServiceServiceException {
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
class NotFoundError extends PortalServiceServiceException_1.PortalServiceServiceException {
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
class RateLimitError extends PortalServiceServiceException_1.PortalServiceServiceException {
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
class UnauthorizedError extends PortalServiceServiceException_1.PortalServiceServiceException {
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
