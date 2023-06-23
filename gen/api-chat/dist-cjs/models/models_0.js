"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatIdentityTypingStatus = exports.WatchThreadInput = exports.SetTypingStatusOutput = exports.SetTypingStatusInput = exports.ChatTypingStatus = exports.Unit = exports.SetThreadReadOutput = exports.SetThreadReadInput = exports.SendChatMessageOutput = exports.SendChatMessageInput = exports.SendChatTopic = exports.SendMessageBody = exports.SendMessageBodyText = exports.SendMessageBodyPartyInvite = exports.GetThreadTopicOutput = exports.ChatSimpleTopic = exports.ChatSimpleTopicParty = exports.ChatSimpleTopicGroup = exports.ChatSimpleTopicDirect = exports.GetThreadTopicInput = exports.GetThreadHistoryOutput = exports.ChatMessage = exports.ChatMessageBody = exports.ChatMessageBodyText = exports.ChatMessageBodyPartyLeave = exports.ChatMessageBodyPartyJoinRequest = exports.ChatMessageBodyPartyJoin = exports.ChatMessageBodyPartyInvite = exports.ChatMessageBodyPartyActivityChange = exports.ChatMessageBodyIdentityFollow = exports.ChatMessageBodyGroupMemberKick = exports.ChatMessageBodyGroupLeave = exports.ChatMessageBodyGroupJoin = exports.ChatMessageBodyDeleted = exports.IdentityHandle = exports.IdentityPresence = exports.IdentityStatus = exports.IdentityGameActivity = exports.PartyHandle = exports.PartyExternalLinks = exports.PartyActivity = exports.PartyActivityMatchmakerLobby = exports.PartyMatchmakerLobby = exports.PartyActivityMatchmakerFindingLobby = exports.GameHandle = exports.PartyActivityIdle = exports.IdentityExternalLinks = exports.ChatMessageBodyChatCreate = exports.GetThreadHistoryInput = exports.QueryDirection = void 0;
exports.UnauthorizedError = exports.RateLimitError = exports.NotFoundError = exports.InternalError = exports.ForbiddenError = exports.BadRequestError = exports.GetDirectThreadOutput = exports.GetDirectThreadInput = exports.WatchThreadOutput = exports.WatchResponse = void 0;
const ChatServiceServiceException_1 = require("./ChatServiceServiceException");
const smithy_client_1 = require("@aws-sdk/smithy-client");
var QueryDirection;
(function (QueryDirection) {
    QueryDirection["AFTER"] = "after";
    QueryDirection["BEFORE"] = "before";
    QueryDirection["BEFORE_AND_AFTER"] = "before_and_after";
})(QueryDirection = exports.QueryDirection || (exports.QueryDirection = {}));
var GetThreadHistoryInput;
(function (GetThreadHistoryInput) {
    GetThreadHistoryInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetThreadHistoryInput = exports.GetThreadHistoryInput || (exports.GetThreadHistoryInput = {}));
var ChatMessageBodyChatCreate;
(function (ChatMessageBodyChatCreate) {
    ChatMessageBodyChatCreate.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ChatMessageBodyChatCreate = exports.ChatMessageBodyChatCreate || (exports.ChatMessageBodyChatCreate = {}));
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
var ChatMessageBodyDeleted;
(function (ChatMessageBodyDeleted) {
    ChatMessageBodyDeleted.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.sender && { sender: IdentityHandle.filterSensitiveLog(obj.sender)
        }),
    });
})(ChatMessageBodyDeleted = exports.ChatMessageBodyDeleted || (exports.ChatMessageBodyDeleted = {}));
var ChatMessageBodyGroupJoin;
(function (ChatMessageBodyGroupJoin) {
    ChatMessageBodyGroupJoin.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.identity && { identity: IdentityHandle.filterSensitiveLog(obj.identity)
        }),
    });
})(ChatMessageBodyGroupJoin = exports.ChatMessageBodyGroupJoin || (exports.ChatMessageBodyGroupJoin = {}));
var ChatMessageBodyGroupLeave;
(function (ChatMessageBodyGroupLeave) {
    ChatMessageBodyGroupLeave.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.identity && { identity: IdentityHandle.filterSensitiveLog(obj.identity)
        }),
    });
})(ChatMessageBodyGroupLeave = exports.ChatMessageBodyGroupLeave || (exports.ChatMessageBodyGroupLeave = {}));
var ChatMessageBodyGroupMemberKick;
(function (ChatMessageBodyGroupMemberKick) {
    ChatMessageBodyGroupMemberKick.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.identity && { identity: IdentityHandle.filterSensitiveLog(obj.identity)
        }),
    });
})(ChatMessageBodyGroupMemberKick = exports.ChatMessageBodyGroupMemberKick || (exports.ChatMessageBodyGroupMemberKick = {}));
var ChatMessageBodyIdentityFollow;
(function (ChatMessageBodyIdentityFollow) {
    ChatMessageBodyIdentityFollow.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ChatMessageBodyIdentityFollow = exports.ChatMessageBodyIdentityFollow || (exports.ChatMessageBodyIdentityFollow = {}));
var ChatMessageBodyPartyActivityChange;
(function (ChatMessageBodyPartyActivityChange) {
    ChatMessageBodyPartyActivityChange.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.activity && { activity: PartyActivity.filterSensitiveLog(obj.activity)
        }),
    });
})(ChatMessageBodyPartyActivityChange = exports.ChatMessageBodyPartyActivityChange || (exports.ChatMessageBodyPartyActivityChange = {}));
var ChatMessageBodyPartyInvite;
(function (ChatMessageBodyPartyInvite) {
    ChatMessageBodyPartyInvite.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.sender && { sender: IdentityHandle.filterSensitiveLog(obj.sender)
        }),
        ...(obj.party && { party: PartyHandle.filterSensitiveLog(obj.party)
        }),
        ...(obj.inviteToken && { inviteToken: smithy_client_1.SENSITIVE_STRING
        }),
    });
})(ChatMessageBodyPartyInvite = exports.ChatMessageBodyPartyInvite || (exports.ChatMessageBodyPartyInvite = {}));
var ChatMessageBodyPartyJoin;
(function (ChatMessageBodyPartyJoin) {
    ChatMessageBodyPartyJoin.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.identity && { identity: IdentityHandle.filterSensitiveLog(obj.identity)
        }),
    });
})(ChatMessageBodyPartyJoin = exports.ChatMessageBodyPartyJoin || (exports.ChatMessageBodyPartyJoin = {}));
var ChatMessageBodyPartyJoinRequest;
(function (ChatMessageBodyPartyJoinRequest) {
    ChatMessageBodyPartyJoinRequest.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.sender && { sender: IdentityHandle.filterSensitiveLog(obj.sender)
        }),
    });
})(ChatMessageBodyPartyJoinRequest = exports.ChatMessageBodyPartyJoinRequest || (exports.ChatMessageBodyPartyJoinRequest = {}));
var ChatMessageBodyPartyLeave;
(function (ChatMessageBodyPartyLeave) {
    ChatMessageBodyPartyLeave.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.identity && { identity: IdentityHandle.filterSensitiveLog(obj.identity)
        }),
    });
})(ChatMessageBodyPartyLeave = exports.ChatMessageBodyPartyLeave || (exports.ChatMessageBodyPartyLeave = {}));
var ChatMessageBodyText;
(function (ChatMessageBodyText) {
    ChatMessageBodyText.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.sender && { sender: IdentityHandle.filterSensitiveLog(obj.sender)
        }),
    });
})(ChatMessageBodyText = exports.ChatMessageBodyText || (exports.ChatMessageBodyText = {}));
var ChatMessageBody;
(function (ChatMessageBody) {
    ChatMessageBody.visit = (value, visitor) => {
        if (value.text !== undefined)
            return visitor.text(value.text);
        if (value.chatCreate !== undefined)
            return visitor.chatCreate(value.chatCreate);
        if (value.deleted !== undefined)
            return visitor.deleted(value.deleted);
        if (value.identityFollow !== undefined)
            return visitor.identityFollow(value.identityFollow);
        if (value.groupJoin !== undefined)
            return visitor.groupJoin(value.groupJoin);
        if (value.groupLeave !== undefined)
            return visitor.groupLeave(value.groupLeave);
        if (value.groupMemberKick !== undefined)
            return visitor.groupMemberKick(value.groupMemberKick);
        if (value.partyInvite !== undefined)
            return visitor.partyInvite(value.partyInvite);
        if (value.partyJoinRequest !== undefined)
            return visitor.partyJoinRequest(value.partyJoinRequest);
        if (value.partyJoin !== undefined)
            return visitor.partyJoin(value.partyJoin);
        if (value.partyLeave !== undefined)
            return visitor.partyLeave(value.partyLeave);
        if (value.partyActivityChange !== undefined)
            return visitor.partyActivityChange(value.partyActivityChange);
        return visitor._(value.$unknown[0], value.$unknown[1]);
    };
    ChatMessageBody.filterSensitiveLog = (obj) => {
        if (obj.text !== undefined)
            return { text: ChatMessageBodyText.filterSensitiveLog(obj.text)
            };
        if (obj.chatCreate !== undefined)
            return { chatCreate: ChatMessageBodyChatCreate.filterSensitiveLog(obj.chatCreate)
            };
        if (obj.deleted !== undefined)
            return { deleted: ChatMessageBodyDeleted.filterSensitiveLog(obj.deleted)
            };
        if (obj.identityFollow !== undefined)
            return { identityFollow: ChatMessageBodyIdentityFollow.filterSensitiveLog(obj.identityFollow)
            };
        if (obj.groupJoin !== undefined)
            return { groupJoin: ChatMessageBodyGroupJoin.filterSensitiveLog(obj.groupJoin)
            };
        if (obj.groupLeave !== undefined)
            return { groupLeave: ChatMessageBodyGroupLeave.filterSensitiveLog(obj.groupLeave)
            };
        if (obj.groupMemberKick !== undefined)
            return { groupMemberKick: ChatMessageBodyGroupMemberKick.filterSensitiveLog(obj.groupMemberKick)
            };
        if (obj.partyInvite !== undefined)
            return { partyInvite: ChatMessageBodyPartyInvite.filterSensitiveLog(obj.partyInvite)
            };
        if (obj.partyJoinRequest !== undefined)
            return { partyJoinRequest: ChatMessageBodyPartyJoinRequest.filterSensitiveLog(obj.partyJoinRequest)
            };
        if (obj.partyJoin !== undefined)
            return { partyJoin: ChatMessageBodyPartyJoin.filterSensitiveLog(obj.partyJoin)
            };
        if (obj.partyLeave !== undefined)
            return { partyLeave: ChatMessageBodyPartyLeave.filterSensitiveLog(obj.partyLeave)
            };
        if (obj.partyActivityChange !== undefined)
            return { partyActivityChange: ChatMessageBodyPartyActivityChange.filterSensitiveLog(obj.partyActivityChange)
            };
        if (obj.$unknown !== undefined)
            return { [obj.$unknown[0]]: 'UNKNOWN' };
    };
})(ChatMessageBody = exports.ChatMessageBody || (exports.ChatMessageBody = {}));
var ChatMessage;
(function (ChatMessage) {
    ChatMessage.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.body && { body: ChatMessageBody.filterSensitiveLog(obj.body)
        }),
    });
})(ChatMessage = exports.ChatMessage || (exports.ChatMessage = {}));
var GetThreadHistoryOutput;
(function (GetThreadHistoryOutput) {
    GetThreadHistoryOutput.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.chatMessages && { chatMessages: obj.chatMessages.map(item => ChatMessage.filterSensitiveLog(item))
        }),
    });
})(GetThreadHistoryOutput = exports.GetThreadHistoryOutput || (exports.GetThreadHistoryOutput = {}));
var GetThreadTopicInput;
(function (GetThreadTopicInput) {
    GetThreadTopicInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetThreadTopicInput = exports.GetThreadTopicInput || (exports.GetThreadTopicInput = {}));
var ChatSimpleTopicDirect;
(function (ChatSimpleTopicDirect) {
    ChatSimpleTopicDirect.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ChatSimpleTopicDirect = exports.ChatSimpleTopicDirect || (exports.ChatSimpleTopicDirect = {}));
var ChatSimpleTopicGroup;
(function (ChatSimpleTopicGroup) {
    ChatSimpleTopicGroup.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ChatSimpleTopicGroup = exports.ChatSimpleTopicGroup || (exports.ChatSimpleTopicGroup = {}));
var ChatSimpleTopicParty;
(function (ChatSimpleTopicParty) {
    ChatSimpleTopicParty.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ChatSimpleTopicParty = exports.ChatSimpleTopicParty || (exports.ChatSimpleTopicParty = {}));
var ChatSimpleTopic;
(function (ChatSimpleTopic) {
    ChatSimpleTopic.visit = (value, visitor) => {
        if (value.group !== undefined)
            return visitor.group(value.group);
        if (value.party !== undefined)
            return visitor.party(value.party);
        if (value.direct !== undefined)
            return visitor.direct(value.direct);
        return visitor._(value.$unknown[0], value.$unknown[1]);
    };
    ChatSimpleTopic.filterSensitiveLog = (obj) => {
        if (obj.group !== undefined)
            return { group: ChatSimpleTopicGroup.filterSensitiveLog(obj.group)
            };
        if (obj.party !== undefined)
            return { party: ChatSimpleTopicParty.filterSensitiveLog(obj.party)
            };
        if (obj.direct !== undefined)
            return { direct: ChatSimpleTopicDirect.filterSensitiveLog(obj.direct)
            };
        if (obj.$unknown !== undefined)
            return { [obj.$unknown[0]]: 'UNKNOWN' };
    };
})(ChatSimpleTopic = exports.ChatSimpleTopic || (exports.ChatSimpleTopic = {}));
var GetThreadTopicOutput;
(function (GetThreadTopicOutput) {
    GetThreadTopicOutput.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.topic && { topic: ChatSimpleTopic.filterSensitiveLog(obj.topic)
        }),
    });
})(GetThreadTopicOutput = exports.GetThreadTopicOutput || (exports.GetThreadTopicOutput = {}));
var SendMessageBodyPartyInvite;
(function (SendMessageBodyPartyInvite) {
    SendMessageBodyPartyInvite.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.token && { token: smithy_client_1.SENSITIVE_STRING
        }),
    });
})(SendMessageBodyPartyInvite = exports.SendMessageBodyPartyInvite || (exports.SendMessageBodyPartyInvite = {}));
var SendMessageBodyText;
(function (SendMessageBodyText) {
    SendMessageBodyText.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(SendMessageBodyText = exports.SendMessageBodyText || (exports.SendMessageBodyText = {}));
var SendMessageBody;
(function (SendMessageBody) {
    SendMessageBody.visit = (value, visitor) => {
        if (value.text !== undefined)
            return visitor.text(value.text);
        if (value.partyInvite !== undefined)
            return visitor.partyInvite(value.partyInvite);
        return visitor._(value.$unknown[0], value.$unknown[1]);
    };
    SendMessageBody.filterSensitiveLog = (obj) => {
        if (obj.text !== undefined)
            return { text: SendMessageBodyText.filterSensitiveLog(obj.text)
            };
        if (obj.partyInvite !== undefined)
            return { partyInvite: SendMessageBodyPartyInvite.filterSensitiveLog(obj.partyInvite)
            };
        if (obj.$unknown !== undefined)
            return { [obj.$unknown[0]]: 'UNKNOWN' };
    };
})(SendMessageBody = exports.SendMessageBody || (exports.SendMessageBody = {}));
var SendChatTopic;
(function (SendChatTopic) {
    SendChatTopic.visit = (value, visitor) => {
        if (value.threadId !== undefined)
            return visitor.threadId(value.threadId);
        if (value.groupId !== undefined)
            return visitor.groupId(value.groupId);
        if (value.partyId !== undefined)
            return visitor.partyId(value.partyId);
        if (value.identityId !== undefined)
            return visitor.identityId(value.identityId);
        return visitor._(value.$unknown[0], value.$unknown[1]);
    };
    SendChatTopic.filterSensitiveLog = (obj) => {
        if (obj.threadId !== undefined)
            return { threadId: obj.threadId
            };
        if (obj.groupId !== undefined)
            return { groupId: obj.groupId
            };
        if (obj.partyId !== undefined)
            return { partyId: obj.partyId
            };
        if (obj.identityId !== undefined)
            return { identityId: obj.identityId
            };
        if (obj.$unknown !== undefined)
            return { [obj.$unknown[0]]: 'UNKNOWN' };
    };
})(SendChatTopic = exports.SendChatTopic || (exports.SendChatTopic = {}));
var SendChatMessageInput;
(function (SendChatMessageInput) {
    SendChatMessageInput.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.topic && { topic: SendChatTopic.filterSensitiveLog(obj.topic)
        }),
        ...(obj.messageBody && { messageBody: SendMessageBody.filterSensitiveLog(obj.messageBody)
        }),
    });
})(SendChatMessageInput = exports.SendChatMessageInput || (exports.SendChatMessageInput = {}));
var SendChatMessageOutput;
(function (SendChatMessageOutput) {
    SendChatMessageOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(SendChatMessageOutput = exports.SendChatMessageOutput || (exports.SendChatMessageOutput = {}));
var SetThreadReadInput;
(function (SetThreadReadInput) {
    SetThreadReadInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(SetThreadReadInput = exports.SetThreadReadInput || (exports.SetThreadReadInput = {}));
var SetThreadReadOutput;
(function (SetThreadReadOutput) {
    SetThreadReadOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(SetThreadReadOutput = exports.SetThreadReadOutput || (exports.SetThreadReadOutput = {}));
var Unit;
(function (Unit) {
    Unit.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(Unit = exports.Unit || (exports.Unit = {}));
var ChatTypingStatus;
(function (ChatTypingStatus) {
    ChatTypingStatus.visit = (value, visitor) => {
        if (value.idle !== undefined)
            return visitor.idle(value.idle);
        if (value.typing !== undefined)
            return visitor.typing(value.typing);
        return visitor._(value.$unknown[0], value.$unknown[1]);
    };
    ChatTypingStatus.filterSensitiveLog = (obj) => {
        if (obj.idle !== undefined)
            return { idle: Unit.filterSensitiveLog(obj.idle)
            };
        if (obj.typing !== undefined)
            return { typing: Unit.filterSensitiveLog(obj.typing)
            };
        if (obj.$unknown !== undefined)
            return { [obj.$unknown[0]]: 'UNKNOWN' };
    };
})(ChatTypingStatus = exports.ChatTypingStatus || (exports.ChatTypingStatus = {}));
var SetTypingStatusInput;
(function (SetTypingStatusInput) {
    SetTypingStatusInput.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.status && { status: ChatTypingStatus.filterSensitiveLog(obj.status)
        }),
    });
})(SetTypingStatusInput = exports.SetTypingStatusInput || (exports.SetTypingStatusInput = {}));
var SetTypingStatusOutput;
(function (SetTypingStatusOutput) {
    SetTypingStatusOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(SetTypingStatusOutput = exports.SetTypingStatusOutput || (exports.SetTypingStatusOutput = {}));
var WatchThreadInput;
(function (WatchThreadInput) {
    WatchThreadInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(WatchThreadInput = exports.WatchThreadInput || (exports.WatchThreadInput = {}));
var ChatIdentityTypingStatus;
(function (ChatIdentityTypingStatus) {
    ChatIdentityTypingStatus.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.identity && { identity: IdentityHandle.filterSensitiveLog(obj.identity)
        }),
        ...(obj.status && { status: ChatTypingStatus.filterSensitiveLog(obj.status)
        }),
    });
})(ChatIdentityTypingStatus = exports.ChatIdentityTypingStatus || (exports.ChatIdentityTypingStatus = {}));
var WatchResponse;
(function (WatchResponse) {
    WatchResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(WatchResponse = exports.WatchResponse || (exports.WatchResponse = {}));
var WatchThreadOutput;
(function (WatchThreadOutput) {
    WatchThreadOutput.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.chatMessages && { chatMessages: obj.chatMessages.map(item => ChatMessage.filterSensitiveLog(item))
        }),
        ...(obj.typingStatuses && { typingStatuses: obj.typingStatuses.map(item => ChatIdentityTypingStatus.filterSensitiveLog(item))
        }),
    });
})(WatchThreadOutput = exports.WatchThreadOutput || (exports.WatchThreadOutput = {}));
var GetDirectThreadInput;
(function (GetDirectThreadInput) {
    GetDirectThreadInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetDirectThreadInput = exports.GetDirectThreadInput || (exports.GetDirectThreadInput = {}));
var GetDirectThreadOutput;
(function (GetDirectThreadOutput) {
    GetDirectThreadOutput.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.identity && { identity: IdentityHandle.filterSensitiveLog(obj.identity)
        }),
    });
})(GetDirectThreadOutput = exports.GetDirectThreadOutput || (exports.GetDirectThreadOutput = {}));
class BadRequestError extends ChatServiceServiceException_1.ChatServiceServiceException {
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
class ForbiddenError extends ChatServiceServiceException_1.ChatServiceServiceException {
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
class InternalError extends ChatServiceServiceException_1.ChatServiceServiceException {
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
class NotFoundError extends ChatServiceServiceException_1.ChatServiceServiceException {
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
class RateLimitError extends ChatServiceServiceException_1.ChatServiceServiceException {
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
class UnauthorizedError extends ChatServiceServiceException_1.ChatServiceServiceException {
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
