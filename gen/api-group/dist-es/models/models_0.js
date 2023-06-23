import { __assign, __extends } from "tslib";
import { GroupServiceServiceException as __BaseException } from "./GroupServiceServiceException";
export var BanGroupIdentityInput;
(function (BanGroupIdentityInput) {
    BanGroupIdentityInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(BanGroupIdentityInput || (BanGroupIdentityInput = {}));
export var BanGroupIdentityOutput;
(function (BanGroupIdentityOutput) {
    BanGroupIdentityOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(BanGroupIdentityOutput || (BanGroupIdentityOutput = {}));
export var CompleteGroupAvatarUploadInput;
(function (CompleteGroupAvatarUploadInput) {
    CompleteGroupAvatarUploadInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(CompleteGroupAvatarUploadInput || (CompleteGroupAvatarUploadInput = {}));
export var CompleteGroupAvatarUploadOutput;
(function (CompleteGroupAvatarUploadOutput) {
    CompleteGroupAvatarUploadOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(CompleteGroupAvatarUploadOutput || (CompleteGroupAvatarUploadOutput = {}));
export var ConsumeGroupInviteInput;
(function (ConsumeGroupInviteInput) {
    ConsumeGroupInviteInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ConsumeGroupInviteInput || (ConsumeGroupInviteInput = {}));
export var ConsumeGroupInviteOutput;
(function (ConsumeGroupInviteOutput) {
    ConsumeGroupInviteOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ConsumeGroupInviteOutput || (ConsumeGroupInviteOutput = {}));
export var CreateGroupInput;
(function (CreateGroupInput) {
    CreateGroupInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(CreateGroupInput || (CreateGroupInput = {}));
export var CreateGroupOutput;
(function (CreateGroupOutput) {
    CreateGroupOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(CreateGroupOutput || (CreateGroupOutput = {}));
export var CreateGroupInviteInput;
(function (CreateGroupInviteInput) {
    CreateGroupInviteInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(CreateGroupInviteInput || (CreateGroupInviteInput = {}));
export var CreateGroupInviteOutput;
(function (CreateGroupInviteOutput) {
    CreateGroupInviteOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(CreateGroupInviteOutput || (CreateGroupInviteOutput = {}));
export var CreateGroupJoinRequestInput;
(function (CreateGroupJoinRequestInput) {
    CreateGroupJoinRequestInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(CreateGroupJoinRequestInput || (CreateGroupJoinRequestInput = {}));
export var CreateGroupJoinRequestOutput;
(function (CreateGroupJoinRequestOutput) {
    CreateGroupJoinRequestOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(CreateGroupJoinRequestOutput || (CreateGroupJoinRequestOutput = {}));
export var GetGroupBansInput;
(function (GetGroupBansInput) {
    GetGroupBansInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetGroupBansInput || (GetGroupBansInput = {}));
export var IdentityExternalLinks;
(function (IdentityExternalLinks) {
    IdentityExternalLinks.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(IdentityExternalLinks || (IdentityExternalLinks = {}));
export var PartyActivityIdle;
(function (PartyActivityIdle) {
    PartyActivityIdle.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(PartyActivityIdle || (PartyActivityIdle = {}));
export var GameHandle;
(function (GameHandle) {
    GameHandle.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GameHandle || (GameHandle = {}));
export var PartyActivityMatchmakerFindingLobby;
(function (PartyActivityMatchmakerFindingLobby) {
    PartyActivityMatchmakerFindingLobby.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(PartyActivityMatchmakerFindingLobby || (PartyActivityMatchmakerFindingLobby = {}));
export var PartyMatchmakerLobby;
(function (PartyMatchmakerLobby) {
    PartyMatchmakerLobby.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(PartyMatchmakerLobby || (PartyMatchmakerLobby = {}));
export var PartyActivityMatchmakerLobby;
(function (PartyActivityMatchmakerLobby) {
    PartyActivityMatchmakerLobby.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(PartyActivityMatchmakerLobby || (PartyActivityMatchmakerLobby = {}));
export var PartyActivity;
(function (PartyActivity) {
    PartyActivity.visit = function (value, visitor) {
        if (value.idle !== undefined)
            return visitor.idle(value.idle);
        if (value.matchmakerFindingLobby !== undefined)
            return visitor.matchmakerFindingLobby(value.matchmakerFindingLobby);
        if (value.matchmakerLobby !== undefined)
            return visitor.matchmakerLobby(value.matchmakerLobby);
        return visitor._(value.$unknown[0], value.$unknown[1]);
    };
    PartyActivity.filterSensitiveLog = function (obj) {
        var _a;
        if (obj.idle !== undefined)
            return { idle: PartyActivityIdle.filterSensitiveLog(obj.idle)
            };
        if (obj.matchmakerFindingLobby !== undefined)
            return { matchmakerFindingLobby: PartyActivityMatchmakerFindingLobby.filterSensitiveLog(obj.matchmakerFindingLobby)
            };
        if (obj.matchmakerLobby !== undefined)
            return { matchmakerLobby: PartyActivityMatchmakerLobby.filterSensitiveLog(obj.matchmakerLobby)
            };
        if (obj.$unknown !== undefined)
            return _a = {}, _a[obj.$unknown[0]] = 'UNKNOWN', _a;
    };
})(PartyActivity || (PartyActivity = {}));
export var PartyExternalLinks;
(function (PartyExternalLinks) {
    PartyExternalLinks.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(PartyExternalLinks || (PartyExternalLinks = {}));
export var PartyHandle;
(function (PartyHandle) {
    PartyHandle.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.activity && { activity: PartyActivity.filterSensitiveLog(obj.activity)
    }))); };
})(PartyHandle || (PartyHandle = {}));
export var IdentityGameActivity;
(function (IdentityGameActivity) {
    IdentityGameActivity.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(IdentityGameActivity || (IdentityGameActivity = {}));
export var IdentityStatus;
(function (IdentityStatus) {
    IdentityStatus["AWAY"] = "away";
    IdentityStatus["OFFLINE"] = "offline";
    IdentityStatus["ONLINE"] = "online";
})(IdentityStatus || (IdentityStatus = {}));
export var IdentityPresence;
(function (IdentityPresence) {
    IdentityPresence.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(IdentityPresence || (IdentityPresence = {}));
export var IdentityHandle;
(function (IdentityHandle) {
    IdentityHandle.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.party && { party: PartyHandle.filterSensitiveLog(obj.party)
    }))); };
})(IdentityHandle || (IdentityHandle = {}));
export var GroupBannedIdentity;
(function (GroupBannedIdentity) {
    GroupBannedIdentity.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.identity && { identity: IdentityHandle.filterSensitiveLog(obj.identity)
    }))); };
})(GroupBannedIdentity || (GroupBannedIdentity = {}));
export var WatchResponse;
(function (WatchResponse) {
    WatchResponse.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(WatchResponse || (WatchResponse = {}));
export var GetGroupBansOutput;
(function (GetGroupBansOutput) {
    GetGroupBansOutput.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.bannedIdentities && { bannedIdentities: obj.bannedIdentities.map(function (item) {
            return GroupBannedIdentity.filterSensitiveLog(item);
        })
    }))); };
})(GetGroupBansOutput || (GetGroupBansOutput = {}));
export var GetGroupInviteInput;
(function (GetGroupInviteInput) {
    GetGroupInviteInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetGroupInviteInput || (GetGroupInviteInput = {}));
export var GroupExternalLinks;
(function (GroupExternalLinks) {
    GroupExternalLinks.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GroupExternalLinks || (GroupExternalLinks = {}));
export var GroupHandle;
(function (GroupHandle) {
    GroupHandle.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GroupHandle || (GroupHandle = {}));
export var GetGroupInviteOutput;
(function (GetGroupInviteOutput) {
    GetGroupInviteOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetGroupInviteOutput || (GetGroupInviteOutput = {}));
export var GetGroupJoinRequestsInput;
(function (GetGroupJoinRequestsInput) {
    GetGroupJoinRequestsInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetGroupJoinRequestsInput || (GetGroupJoinRequestsInput = {}));
export var GroupJoinRequest;
(function (GroupJoinRequest) {
    GroupJoinRequest.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.identity && { identity: IdentityHandle.filterSensitiveLog(obj.identity)
    }))); };
})(GroupJoinRequest || (GroupJoinRequest = {}));
export var GetGroupJoinRequestsOutput;
(function (GetGroupJoinRequestsOutput) {
    GetGroupJoinRequestsOutput.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.joinRequests && { joinRequests: obj.joinRequests.map(function (item) {
            return GroupJoinRequest.filterSensitiveLog(item);
        })
    }))); };
})(GetGroupJoinRequestsOutput || (GetGroupJoinRequestsOutput = {}));
export var GetGroupMembersInput;
(function (GetGroupMembersInput) {
    GetGroupMembersInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetGroupMembersInput || (GetGroupMembersInput = {}));
export var GroupMember;
(function (GroupMember) {
    GroupMember.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.identity && { identity: IdentityHandle.filterSensitiveLog(obj.identity)
    }))); };
})(GroupMember || (GroupMember = {}));
export var GetGroupMembersOutput;
(function (GetGroupMembersOutput) {
    GetGroupMembersOutput.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.members && { members: obj.members.map(function (item) {
            return GroupMember.filterSensitiveLog(item);
        })
    }))); };
})(GetGroupMembersOutput || (GetGroupMembersOutput = {}));
export var GetGroupProfileInput;
(function (GetGroupProfileInput) {
    GetGroupProfileInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetGroupProfileInput || (GetGroupProfileInput = {}));
export var GroupPublicity;
(function (GroupPublicity) {
    GroupPublicity["CLOSED"] = "closed";
    GroupPublicity["OPEN"] = "open";
})(GroupPublicity || (GroupPublicity = {}));
export var GroupProfile;
(function (GroupProfile) {
    GroupProfile.filterSensitiveLog = function (obj) { return (__assign(__assign(__assign({}, obj), (obj.members && { members: obj.members.map(function (item) {
            return GroupMember.filterSensitiveLog(item);
        })
    })), (obj.joinRequests && { joinRequests: obj.joinRequests.map(function (item) {
            return GroupJoinRequest.filterSensitiveLog(item);
        })
    }))); };
})(GroupProfile || (GroupProfile = {}));
export var GetGroupProfileOutput;
(function (GetGroupProfileOutput) {
    GetGroupProfileOutput.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.group && { group: GroupProfile.filterSensitiveLog(obj.group)
    }))); };
})(GetGroupProfileOutput || (GetGroupProfileOutput = {}));
export var GetGroupSummaryInput;
(function (GetGroupSummaryInput) {
    GetGroupSummaryInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetGroupSummaryInput || (GetGroupSummaryInput = {}));
export var GroupSummary;
(function (GroupSummary) {
    GroupSummary.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GroupSummary || (GroupSummary = {}));
export var GetGroupSummaryOutput;
(function (GetGroupSummaryOutput) {
    GetGroupSummaryOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetGroupSummaryOutput || (GetGroupSummaryOutput = {}));
export var KickGroupMemberInput;
(function (KickGroupMemberInput) {
    KickGroupMemberInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(KickGroupMemberInput || (KickGroupMemberInput = {}));
export var KickGroupMemberOutput;
(function (KickGroupMemberOutput) {
    KickGroupMemberOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(KickGroupMemberOutput || (KickGroupMemberOutput = {}));
export var LeaveGroupInput;
(function (LeaveGroupInput) {
    LeaveGroupInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(LeaveGroupInput || (LeaveGroupInput = {}));
export var LeaveGroupOutput;
(function (LeaveGroupOutput) {
    LeaveGroupOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(LeaveGroupOutput || (LeaveGroupOutput = {}));
export var ListSuggestedGroupsInput;
(function (ListSuggestedGroupsInput) {
    ListSuggestedGroupsInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ListSuggestedGroupsInput || (ListSuggestedGroupsInput = {}));
export var ListSuggestedGroupsOutput;
(function (ListSuggestedGroupsOutput) {
    ListSuggestedGroupsOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ListSuggestedGroupsOutput || (ListSuggestedGroupsOutput = {}));
export var PrepareGroupAvatarUploadInput;
(function (PrepareGroupAvatarUploadInput) {
    PrepareGroupAvatarUploadInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(PrepareGroupAvatarUploadInput || (PrepareGroupAvatarUploadInput = {}));
export var UploadPresignedRequest;
(function (UploadPresignedRequest) {
    UploadPresignedRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(UploadPresignedRequest || (UploadPresignedRequest = {}));
export var PrepareGroupAvatarUploadOutput;
(function (PrepareGroupAvatarUploadOutput) {
    PrepareGroupAvatarUploadOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(PrepareGroupAvatarUploadOutput || (PrepareGroupAvatarUploadOutput = {}));
export var SearchGroupsInput;
(function (SearchGroupsInput) {
    SearchGroupsInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(SearchGroupsInput || (SearchGroupsInput = {}));
export var SearchGroupsOutput;
(function (SearchGroupsOutput) {
    SearchGroupsOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(SearchGroupsOutput || (SearchGroupsOutput = {}));
export var TransferGroupOwnershipInput;
(function (TransferGroupOwnershipInput) {
    TransferGroupOwnershipInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(TransferGroupOwnershipInput || (TransferGroupOwnershipInput = {}));
export var TransferGroupOwnershipOutput;
(function (TransferGroupOwnershipOutput) {
    TransferGroupOwnershipOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(TransferGroupOwnershipOutput || (TransferGroupOwnershipOutput = {}));
export var UnbanGroupIdentityInput;
(function (UnbanGroupIdentityInput) {
    UnbanGroupIdentityInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(UnbanGroupIdentityInput || (UnbanGroupIdentityInput = {}));
export var UnbanGroupIdentityOutput;
(function (UnbanGroupIdentityOutput) {
    UnbanGroupIdentityOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(UnbanGroupIdentityOutput || (UnbanGroupIdentityOutput = {}));
export var UpdateGroupProfileInput;
(function (UpdateGroupProfileInput) {
    UpdateGroupProfileInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(UpdateGroupProfileInput || (UpdateGroupProfileInput = {}));
export var UpdateGroupProfileOutput;
(function (UpdateGroupProfileOutput) {
    UpdateGroupProfileOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(UpdateGroupProfileOutput || (UpdateGroupProfileOutput = {}));
export var ValidateGroupProfileInput;
(function (ValidateGroupProfileInput) {
    ValidateGroupProfileInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ValidateGroupProfileInput || (ValidateGroupProfileInput = {}));
export var ValidationError;
(function (ValidationError) {
    ValidationError.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ValidationError || (ValidationError = {}));
export var ValidateGroupProfileOutput;
(function (ValidateGroupProfileOutput) {
    ValidateGroupProfileOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ValidateGroupProfileOutput || (ValidateGroupProfileOutput = {}));
export var ResolveGroupJoinRequestInput;
(function (ResolveGroupJoinRequestInput) {
    ResolveGroupJoinRequestInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ResolveGroupJoinRequestInput || (ResolveGroupJoinRequestInput = {}));
export var ResolveGroupJoinRequestOutput;
(function (ResolveGroupJoinRequestOutput) {
    ResolveGroupJoinRequestOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ResolveGroupJoinRequestOutput || (ResolveGroupJoinRequestOutput = {}));
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
