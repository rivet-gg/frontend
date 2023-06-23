"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupService = void 0;
const GroupServiceClient_1 = require("./GroupServiceClient");
const BanGroupIdentityCommand_1 = require("./commands/BanGroupIdentityCommand");
const CompleteGroupAvatarUploadCommand_1 = require("./commands/CompleteGroupAvatarUploadCommand");
const ConsumeGroupInviteCommand_1 = require("./commands/ConsumeGroupInviteCommand");
const CreateGroupCommand_1 = require("./commands/CreateGroupCommand");
const CreateGroupInviteCommand_1 = require("./commands/CreateGroupInviteCommand");
const CreateGroupJoinRequestCommand_1 = require("./commands/CreateGroupJoinRequestCommand");
const GetGroupBansCommand_1 = require("./commands/GetGroupBansCommand");
const GetGroupInviteCommand_1 = require("./commands/GetGroupInviteCommand");
const GetGroupJoinRequestsCommand_1 = require("./commands/GetGroupJoinRequestsCommand");
const GetGroupMembersCommand_1 = require("./commands/GetGroupMembersCommand");
const GetGroupProfileCommand_1 = require("./commands/GetGroupProfileCommand");
const GetGroupSummaryCommand_1 = require("./commands/GetGroupSummaryCommand");
const KickGroupMemberCommand_1 = require("./commands/KickGroupMemberCommand");
const LeaveGroupCommand_1 = require("./commands/LeaveGroupCommand");
const ListSuggestedGroupsCommand_1 = require("./commands/ListSuggestedGroupsCommand");
const PrepareGroupAvatarUploadCommand_1 = require("./commands/PrepareGroupAvatarUploadCommand");
const ResolveGroupJoinRequestCommand_1 = require("./commands/ResolveGroupJoinRequestCommand");
const SearchGroupsCommand_1 = require("./commands/SearchGroupsCommand");
const TransferGroupOwnershipCommand_1 = require("./commands/TransferGroupOwnershipCommand");
const UnbanGroupIdentityCommand_1 = require("./commands/UnbanGroupIdentityCommand");
const UpdateGroupProfileCommand_1 = require("./commands/UpdateGroupProfileCommand");
const ValidateGroupProfileCommand_1 = require("./commands/ValidateGroupProfileCommand");
class GroupService extends GroupServiceClient_1.GroupServiceClient {
    banGroupIdentity(args, optionsOrCb, cb) {
        const command = new BanGroupIdentityCommand_1.BanGroupIdentityCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    completeGroupAvatarUpload(args, optionsOrCb, cb) {
        const command = new CompleteGroupAvatarUploadCommand_1.CompleteGroupAvatarUploadCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    consumeGroupInvite(args, optionsOrCb, cb) {
        const command = new ConsumeGroupInviteCommand_1.ConsumeGroupInviteCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    createGroup(args, optionsOrCb, cb) {
        const command = new CreateGroupCommand_1.CreateGroupCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    createGroupInvite(args, optionsOrCb, cb) {
        const command = new CreateGroupInviteCommand_1.CreateGroupInviteCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    createGroupJoinRequest(args, optionsOrCb, cb) {
        const command = new CreateGroupJoinRequestCommand_1.CreateGroupJoinRequestCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    getGroupBans(args, optionsOrCb, cb) {
        const command = new GetGroupBansCommand_1.GetGroupBansCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    getGroupInvite(args, optionsOrCb, cb) {
        const command = new GetGroupInviteCommand_1.GetGroupInviteCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    getGroupJoinRequests(args, optionsOrCb, cb) {
        const command = new GetGroupJoinRequestsCommand_1.GetGroupJoinRequestsCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    getGroupMembers(args, optionsOrCb, cb) {
        const command = new GetGroupMembersCommand_1.GetGroupMembersCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    getGroupProfile(args, optionsOrCb, cb) {
        const command = new GetGroupProfileCommand_1.GetGroupProfileCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    getGroupSummary(args, optionsOrCb, cb) {
        const command = new GetGroupSummaryCommand_1.GetGroupSummaryCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    kickGroupMember(args, optionsOrCb, cb) {
        const command = new KickGroupMemberCommand_1.KickGroupMemberCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    leaveGroup(args, optionsOrCb, cb) {
        const command = new LeaveGroupCommand_1.LeaveGroupCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    listSuggestedGroups(args, optionsOrCb, cb) {
        const command = new ListSuggestedGroupsCommand_1.ListSuggestedGroupsCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    prepareGroupAvatarUpload(args, optionsOrCb, cb) {
        const command = new PrepareGroupAvatarUploadCommand_1.PrepareGroupAvatarUploadCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    resolveGroupJoinRequest(args, optionsOrCb, cb) {
        const command = new ResolveGroupJoinRequestCommand_1.ResolveGroupJoinRequestCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    searchGroups(args, optionsOrCb, cb) {
        const command = new SearchGroupsCommand_1.SearchGroupsCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    transferGroupOwnership(args, optionsOrCb, cb) {
        const command = new TransferGroupOwnershipCommand_1.TransferGroupOwnershipCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    unbanGroupIdentity(args, optionsOrCb, cb) {
        const command = new UnbanGroupIdentityCommand_1.UnbanGroupIdentityCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    updateGroupProfile(args, optionsOrCb, cb) {
        const command = new UpdateGroupProfileCommand_1.UpdateGroupProfileCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    validateGroupProfile(args, optionsOrCb, cb) {
        const command = new ValidateGroupProfileCommand_1.ValidateGroupProfileCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
}
exports.GroupService = GroupService;
