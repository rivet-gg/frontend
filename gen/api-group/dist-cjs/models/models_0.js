"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaveGroupOutput = exports.LeaveGroupInput = exports.KickGroupMemberOutput = exports.KickGroupMemberInput = exports.GetGroupSummaryOutput = exports.GroupSummary = exports.GetGroupSummaryInput = exports.GetGroupProfileOutput = exports.GroupProfile = exports.GroupPublicity = exports.GetGroupProfileInput = exports.GetGroupMembersOutput = exports.GroupMember = exports.GetGroupMembersInput = exports.GetGroupJoinRequestsOutput = exports.GroupJoinRequest = exports.GetGroupJoinRequestsInput = exports.GetGroupInviteOutput = exports.GroupHandle = exports.GroupExternalLinks = exports.GetGroupInviteInput = exports.GetGroupBansOutput = exports.WatchResponse = exports.GroupBannedIdentity = exports.IdentityHandle = exports.IdentityPresence = exports.IdentityStatus = exports.IdentityGameActivity = exports.PartyHandle = exports.PartyExternalLinks = exports.PartyActivity = exports.PartyActivityMatchmakerLobby = exports.PartyMatchmakerLobby = exports.PartyActivityMatchmakerFindingLobby = exports.GameHandle = exports.PartyActivityIdle = exports.IdentityExternalLinks = exports.GetGroupBansInput = exports.CreateGroupJoinRequestOutput = exports.CreateGroupJoinRequestInput = exports.CreateGroupInviteOutput = exports.CreateGroupInviteInput = exports.CreateGroupOutput = exports.CreateGroupInput = exports.ConsumeGroupInviteOutput = exports.ConsumeGroupInviteInput = exports.CompleteGroupAvatarUploadOutput = exports.CompleteGroupAvatarUploadInput = exports.BanGroupIdentityOutput = exports.BanGroupIdentityInput = void 0;
exports.UnauthorizedError = exports.RateLimitError = exports.NotFoundError = exports.InternalError = exports.ForbiddenError = exports.BadRequestError = exports.ResolveGroupJoinRequestOutput = exports.ResolveGroupJoinRequestInput = exports.ValidateGroupProfileOutput = exports.ValidationError = exports.ValidateGroupProfileInput = exports.UpdateGroupProfileOutput = exports.UpdateGroupProfileInput = exports.UnbanGroupIdentityOutput = exports.UnbanGroupIdentityInput = exports.TransferGroupOwnershipOutput = exports.TransferGroupOwnershipInput = exports.SearchGroupsOutput = exports.SearchGroupsInput = exports.PrepareGroupAvatarUploadOutput = exports.UploadPresignedRequest = exports.PrepareGroupAvatarUploadInput = exports.ListSuggestedGroupsOutput = exports.ListSuggestedGroupsInput = void 0;
const GroupServiceServiceException_1 = require("./GroupServiceServiceException");
var BanGroupIdentityInput;
(function (BanGroupIdentityInput) {
    BanGroupIdentityInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(BanGroupIdentityInput = exports.BanGroupIdentityInput || (exports.BanGroupIdentityInput = {}));
var BanGroupIdentityOutput;
(function (BanGroupIdentityOutput) {
    BanGroupIdentityOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(BanGroupIdentityOutput = exports.BanGroupIdentityOutput || (exports.BanGroupIdentityOutput = {}));
var CompleteGroupAvatarUploadInput;
(function (CompleteGroupAvatarUploadInput) {
    CompleteGroupAvatarUploadInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CompleteGroupAvatarUploadInput = exports.CompleteGroupAvatarUploadInput || (exports.CompleteGroupAvatarUploadInput = {}));
var CompleteGroupAvatarUploadOutput;
(function (CompleteGroupAvatarUploadOutput) {
    CompleteGroupAvatarUploadOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CompleteGroupAvatarUploadOutput = exports.CompleteGroupAvatarUploadOutput || (exports.CompleteGroupAvatarUploadOutput = {}));
var ConsumeGroupInviteInput;
(function (ConsumeGroupInviteInput) {
    ConsumeGroupInviteInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ConsumeGroupInviteInput = exports.ConsumeGroupInviteInput || (exports.ConsumeGroupInviteInput = {}));
var ConsumeGroupInviteOutput;
(function (ConsumeGroupInviteOutput) {
    ConsumeGroupInviteOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ConsumeGroupInviteOutput = exports.ConsumeGroupInviteOutput || (exports.ConsumeGroupInviteOutput = {}));
var CreateGroupInput;
(function (CreateGroupInput) {
    CreateGroupInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CreateGroupInput = exports.CreateGroupInput || (exports.CreateGroupInput = {}));
var CreateGroupOutput;
(function (CreateGroupOutput) {
    CreateGroupOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CreateGroupOutput = exports.CreateGroupOutput || (exports.CreateGroupOutput = {}));
var CreateGroupInviteInput;
(function (CreateGroupInviteInput) {
    CreateGroupInviteInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CreateGroupInviteInput = exports.CreateGroupInviteInput || (exports.CreateGroupInviteInput = {}));
var CreateGroupInviteOutput;
(function (CreateGroupInviteOutput) {
    CreateGroupInviteOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CreateGroupInviteOutput = exports.CreateGroupInviteOutput || (exports.CreateGroupInviteOutput = {}));
var CreateGroupJoinRequestInput;
(function (CreateGroupJoinRequestInput) {
    CreateGroupJoinRequestInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CreateGroupJoinRequestInput = exports.CreateGroupJoinRequestInput || (exports.CreateGroupJoinRequestInput = {}));
var CreateGroupJoinRequestOutput;
(function (CreateGroupJoinRequestOutput) {
    CreateGroupJoinRequestOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CreateGroupJoinRequestOutput = exports.CreateGroupJoinRequestOutput || (exports.CreateGroupJoinRequestOutput = {}));
var GetGroupBansInput;
(function (GetGroupBansInput) {
    GetGroupBansInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetGroupBansInput = exports.GetGroupBansInput || (exports.GetGroupBansInput = {}));
var IdentityExternalLinks;
(function (IdentityExternalLinks) {
    IdentityExternalLinks.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(IdentityExternalLinks = exports.IdentityExternalLinks || (exports.IdentityExternalLinks = {}));
var PartyActivityIdle;
(function (PartyActivityIdle) {
    PartyActivityIdle.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PartyActivityIdle = exports.PartyActivityIdle || (exports.PartyActivityIdle = {}));
var GameHandle;
(function (GameHandle) {
    GameHandle.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GameHandle = exports.GameHandle || (exports.GameHandle = {}));
var PartyActivityMatchmakerFindingLobby;
(function (PartyActivityMatchmakerFindingLobby) {
    PartyActivityMatchmakerFindingLobby.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PartyActivityMatchmakerFindingLobby = exports.PartyActivityMatchmakerFindingLobby || (exports.PartyActivityMatchmakerFindingLobby = {}));
var PartyMatchmakerLobby;
(function (PartyMatchmakerLobby) {
    PartyMatchmakerLobby.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PartyMatchmakerLobby = exports.PartyMatchmakerLobby || (exports.PartyMatchmakerLobby = {}));
var PartyActivityMatchmakerLobby;
(function (PartyActivityMatchmakerLobby) {
    PartyActivityMatchmakerLobby.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PartyActivityMatchmakerLobby = exports.PartyActivityMatchmakerLobby || (exports.PartyActivityMatchmakerLobby = {}));
var PartyActivity;
(function (PartyActivity) {
    PartyActivity.visit = (value, visitor) => {
        if (value.idle !== undefined)
            return visitor.idle(value.idle);
        if (value.matchmakerFindingLobby !== undefined)
            return visitor.matchmakerFindingLobby(value.matchmakerFindingLobby);
        if (value.matchmakerLobby !== undefined)
            return visitor.matchmakerLobby(value.matchmakerLobby);
        return visitor._(value.$unknown[0], value.$unknown[1]);
    };
    PartyActivity.filterSensitiveLog = (obj) => {
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
            return { [obj.$unknown[0]]: 'UNKNOWN' };
    };
})(PartyActivity = exports.PartyActivity || (exports.PartyActivity = {}));
var PartyExternalLinks;
(function (PartyExternalLinks) {
    PartyExternalLinks.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PartyExternalLinks = exports.PartyExternalLinks || (exports.PartyExternalLinks = {}));
var PartyHandle;
(function (PartyHandle) {
    PartyHandle.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.activity && { activity: PartyActivity.filterSensitiveLog(obj.activity)
        }),
    });
})(PartyHandle = exports.PartyHandle || (exports.PartyHandle = {}));
var IdentityGameActivity;
(function (IdentityGameActivity) {
    IdentityGameActivity.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(IdentityGameActivity = exports.IdentityGameActivity || (exports.IdentityGameActivity = {}));
var IdentityStatus;
(function (IdentityStatus) {
    IdentityStatus["AWAY"] = "away";
    IdentityStatus["OFFLINE"] = "offline";
    IdentityStatus["ONLINE"] = "online";
})(IdentityStatus = exports.IdentityStatus || (exports.IdentityStatus = {}));
var IdentityPresence;
(function (IdentityPresence) {
    IdentityPresence.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(IdentityPresence = exports.IdentityPresence || (exports.IdentityPresence = {}));
var IdentityHandle;
(function (IdentityHandle) {
    IdentityHandle.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.party && { party: PartyHandle.filterSensitiveLog(obj.party)
        }),
    });
})(IdentityHandle = exports.IdentityHandle || (exports.IdentityHandle = {}));
var GroupBannedIdentity;
(function (GroupBannedIdentity) {
    GroupBannedIdentity.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.identity && { identity: IdentityHandle.filterSensitiveLog(obj.identity)
        }),
    });
})(GroupBannedIdentity = exports.GroupBannedIdentity || (exports.GroupBannedIdentity = {}));
var WatchResponse;
(function (WatchResponse) {
    WatchResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(WatchResponse = exports.WatchResponse || (exports.WatchResponse = {}));
var GetGroupBansOutput;
(function (GetGroupBansOutput) {
    GetGroupBansOutput.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.bannedIdentities && { bannedIdentities: obj.bannedIdentities.map(item => GroupBannedIdentity.filterSensitiveLog(item))
        }),
    });
})(GetGroupBansOutput = exports.GetGroupBansOutput || (exports.GetGroupBansOutput = {}));
var GetGroupInviteInput;
(function (GetGroupInviteInput) {
    GetGroupInviteInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetGroupInviteInput = exports.GetGroupInviteInput || (exports.GetGroupInviteInput = {}));
var GroupExternalLinks;
(function (GroupExternalLinks) {
    GroupExternalLinks.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GroupExternalLinks = exports.GroupExternalLinks || (exports.GroupExternalLinks = {}));
var GroupHandle;
(function (GroupHandle) {
    GroupHandle.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GroupHandle = exports.GroupHandle || (exports.GroupHandle = {}));
var GetGroupInviteOutput;
(function (GetGroupInviteOutput) {
    GetGroupInviteOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetGroupInviteOutput = exports.GetGroupInviteOutput || (exports.GetGroupInviteOutput = {}));
var GetGroupJoinRequestsInput;
(function (GetGroupJoinRequestsInput) {
    GetGroupJoinRequestsInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetGroupJoinRequestsInput = exports.GetGroupJoinRequestsInput || (exports.GetGroupJoinRequestsInput = {}));
var GroupJoinRequest;
(function (GroupJoinRequest) {
    GroupJoinRequest.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.identity && { identity: IdentityHandle.filterSensitiveLog(obj.identity)
        }),
    });
})(GroupJoinRequest = exports.GroupJoinRequest || (exports.GroupJoinRequest = {}));
var GetGroupJoinRequestsOutput;
(function (GetGroupJoinRequestsOutput) {
    GetGroupJoinRequestsOutput.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.joinRequests && { joinRequests: obj.joinRequests.map(item => GroupJoinRequest.filterSensitiveLog(item))
        }),
    });
})(GetGroupJoinRequestsOutput = exports.GetGroupJoinRequestsOutput || (exports.GetGroupJoinRequestsOutput = {}));
var GetGroupMembersInput;
(function (GetGroupMembersInput) {
    GetGroupMembersInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetGroupMembersInput = exports.GetGroupMembersInput || (exports.GetGroupMembersInput = {}));
var GroupMember;
(function (GroupMember) {
    GroupMember.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.identity && { identity: IdentityHandle.filterSensitiveLog(obj.identity)
        }),
    });
})(GroupMember = exports.GroupMember || (exports.GroupMember = {}));
var GetGroupMembersOutput;
(function (GetGroupMembersOutput) {
    GetGroupMembersOutput.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.members && { members: obj.members.map(item => GroupMember.filterSensitiveLog(item))
        }),
    });
})(GetGroupMembersOutput = exports.GetGroupMembersOutput || (exports.GetGroupMembersOutput = {}));
var GetGroupProfileInput;
(function (GetGroupProfileInput) {
    GetGroupProfileInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetGroupProfileInput = exports.GetGroupProfileInput || (exports.GetGroupProfileInput = {}));
var GroupPublicity;
(function (GroupPublicity) {
    GroupPublicity["CLOSED"] = "closed";
    GroupPublicity["OPEN"] = "open";
})(GroupPublicity = exports.GroupPublicity || (exports.GroupPublicity = {}));
var GroupProfile;
(function (GroupProfile) {
    GroupProfile.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.members && { members: obj.members.map(item => GroupMember.filterSensitiveLog(item))
        }),
        ...(obj.joinRequests && { joinRequests: obj.joinRequests.map(item => GroupJoinRequest.filterSensitiveLog(item))
        }),
    });
})(GroupProfile = exports.GroupProfile || (exports.GroupProfile = {}));
var GetGroupProfileOutput;
(function (GetGroupProfileOutput) {
    GetGroupProfileOutput.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.group && { group: GroupProfile.filterSensitiveLog(obj.group)
        }),
    });
})(GetGroupProfileOutput = exports.GetGroupProfileOutput || (exports.GetGroupProfileOutput = {}));
var GetGroupSummaryInput;
(function (GetGroupSummaryInput) {
    GetGroupSummaryInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetGroupSummaryInput = exports.GetGroupSummaryInput || (exports.GetGroupSummaryInput = {}));
var GroupSummary;
(function (GroupSummary) {
    GroupSummary.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GroupSummary = exports.GroupSummary || (exports.GroupSummary = {}));
var GetGroupSummaryOutput;
(function (GetGroupSummaryOutput) {
    GetGroupSummaryOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetGroupSummaryOutput = exports.GetGroupSummaryOutput || (exports.GetGroupSummaryOutput = {}));
var KickGroupMemberInput;
(function (KickGroupMemberInput) {
    KickGroupMemberInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(KickGroupMemberInput = exports.KickGroupMemberInput || (exports.KickGroupMemberInput = {}));
var KickGroupMemberOutput;
(function (KickGroupMemberOutput) {
    KickGroupMemberOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(KickGroupMemberOutput = exports.KickGroupMemberOutput || (exports.KickGroupMemberOutput = {}));
var LeaveGroupInput;
(function (LeaveGroupInput) {
    LeaveGroupInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(LeaveGroupInput = exports.LeaveGroupInput || (exports.LeaveGroupInput = {}));
var LeaveGroupOutput;
(function (LeaveGroupOutput) {
    LeaveGroupOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(LeaveGroupOutput = exports.LeaveGroupOutput || (exports.LeaveGroupOutput = {}));
var ListSuggestedGroupsInput;
(function (ListSuggestedGroupsInput) {
    ListSuggestedGroupsInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListSuggestedGroupsInput = exports.ListSuggestedGroupsInput || (exports.ListSuggestedGroupsInput = {}));
var ListSuggestedGroupsOutput;
(function (ListSuggestedGroupsOutput) {
    ListSuggestedGroupsOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListSuggestedGroupsOutput = exports.ListSuggestedGroupsOutput || (exports.ListSuggestedGroupsOutput = {}));
var PrepareGroupAvatarUploadInput;
(function (PrepareGroupAvatarUploadInput) {
    PrepareGroupAvatarUploadInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PrepareGroupAvatarUploadInput = exports.PrepareGroupAvatarUploadInput || (exports.PrepareGroupAvatarUploadInput = {}));
var UploadPresignedRequest;
(function (UploadPresignedRequest) {
    UploadPresignedRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(UploadPresignedRequest = exports.UploadPresignedRequest || (exports.UploadPresignedRequest = {}));
var PrepareGroupAvatarUploadOutput;
(function (PrepareGroupAvatarUploadOutput) {
    PrepareGroupAvatarUploadOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PrepareGroupAvatarUploadOutput = exports.PrepareGroupAvatarUploadOutput || (exports.PrepareGroupAvatarUploadOutput = {}));
var SearchGroupsInput;
(function (SearchGroupsInput) {
    SearchGroupsInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(SearchGroupsInput = exports.SearchGroupsInput || (exports.SearchGroupsInput = {}));
var SearchGroupsOutput;
(function (SearchGroupsOutput) {
    SearchGroupsOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(SearchGroupsOutput = exports.SearchGroupsOutput || (exports.SearchGroupsOutput = {}));
var TransferGroupOwnershipInput;
(function (TransferGroupOwnershipInput) {
    TransferGroupOwnershipInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(TransferGroupOwnershipInput = exports.TransferGroupOwnershipInput || (exports.TransferGroupOwnershipInput = {}));
var TransferGroupOwnershipOutput;
(function (TransferGroupOwnershipOutput) {
    TransferGroupOwnershipOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(TransferGroupOwnershipOutput = exports.TransferGroupOwnershipOutput || (exports.TransferGroupOwnershipOutput = {}));
var UnbanGroupIdentityInput;
(function (UnbanGroupIdentityInput) {
    UnbanGroupIdentityInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(UnbanGroupIdentityInput = exports.UnbanGroupIdentityInput || (exports.UnbanGroupIdentityInput = {}));
var UnbanGroupIdentityOutput;
(function (UnbanGroupIdentityOutput) {
    UnbanGroupIdentityOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(UnbanGroupIdentityOutput = exports.UnbanGroupIdentityOutput || (exports.UnbanGroupIdentityOutput = {}));
var UpdateGroupProfileInput;
(function (UpdateGroupProfileInput) {
    UpdateGroupProfileInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(UpdateGroupProfileInput = exports.UpdateGroupProfileInput || (exports.UpdateGroupProfileInput = {}));
var UpdateGroupProfileOutput;
(function (UpdateGroupProfileOutput) {
    UpdateGroupProfileOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(UpdateGroupProfileOutput = exports.UpdateGroupProfileOutput || (exports.UpdateGroupProfileOutput = {}));
var ValidateGroupProfileInput;
(function (ValidateGroupProfileInput) {
    ValidateGroupProfileInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ValidateGroupProfileInput = exports.ValidateGroupProfileInput || (exports.ValidateGroupProfileInput = {}));
var ValidationError;
(function (ValidationError) {
    ValidationError.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ValidationError = exports.ValidationError || (exports.ValidationError = {}));
var ValidateGroupProfileOutput;
(function (ValidateGroupProfileOutput) {
    ValidateGroupProfileOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ValidateGroupProfileOutput = exports.ValidateGroupProfileOutput || (exports.ValidateGroupProfileOutput = {}));
var ResolveGroupJoinRequestInput;
(function (ResolveGroupJoinRequestInput) {
    ResolveGroupJoinRequestInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ResolveGroupJoinRequestInput = exports.ResolveGroupJoinRequestInput || (exports.ResolveGroupJoinRequestInput = {}));
var ResolveGroupJoinRequestOutput;
(function (ResolveGroupJoinRequestOutput) {
    ResolveGroupJoinRequestOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ResolveGroupJoinRequestOutput = exports.ResolveGroupJoinRequestOutput || (exports.ResolveGroupJoinRequestOutput = {}));
class BadRequestError extends GroupServiceServiceException_1.GroupServiceServiceException {
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
class ForbiddenError extends GroupServiceServiceException_1.GroupServiceServiceException {
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
class InternalError extends GroupServiceServiceException_1.GroupServiceServiceException {
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
class NotFoundError extends GroupServiceServiceException_1.GroupServiceServiceException {
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
class RateLimitError extends GroupServiceServiceException_1.GroupServiceServiceException {
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
class UnauthorizedError extends GroupServiceServiceException_1.GroupServiceServiceException {
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
