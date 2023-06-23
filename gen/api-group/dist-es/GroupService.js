import { __extends } from "tslib";
import { GroupServiceClient } from "./GroupServiceClient";
import { BanGroupIdentityCommand, } from "./commands/BanGroupIdentityCommand";
import { CompleteGroupAvatarUploadCommand, } from "./commands/CompleteGroupAvatarUploadCommand";
import { ConsumeGroupInviteCommand, } from "./commands/ConsumeGroupInviteCommand";
import { CreateGroupCommand, } from "./commands/CreateGroupCommand";
import { CreateGroupInviteCommand, } from "./commands/CreateGroupInviteCommand";
import { CreateGroupJoinRequestCommand, } from "./commands/CreateGroupJoinRequestCommand";
import { GetGroupBansCommand, } from "./commands/GetGroupBansCommand";
import { GetGroupInviteCommand, } from "./commands/GetGroupInviteCommand";
import { GetGroupJoinRequestsCommand, } from "./commands/GetGroupJoinRequestsCommand";
import { GetGroupMembersCommand, } from "./commands/GetGroupMembersCommand";
import { GetGroupProfileCommand, } from "./commands/GetGroupProfileCommand";
import { GetGroupSummaryCommand, } from "./commands/GetGroupSummaryCommand";
import { KickGroupMemberCommand, } from "./commands/KickGroupMemberCommand";
import { LeaveGroupCommand, } from "./commands/LeaveGroupCommand";
import { ListSuggestedGroupsCommand, } from "./commands/ListSuggestedGroupsCommand";
import { PrepareGroupAvatarUploadCommand, } from "./commands/PrepareGroupAvatarUploadCommand";
import { ResolveGroupJoinRequestCommand, } from "./commands/ResolveGroupJoinRequestCommand";
import { SearchGroupsCommand, } from "./commands/SearchGroupsCommand";
import { TransferGroupOwnershipCommand, } from "./commands/TransferGroupOwnershipCommand";
import { UnbanGroupIdentityCommand, } from "./commands/UnbanGroupIdentityCommand";
import { UpdateGroupProfileCommand, } from "./commands/UpdateGroupProfileCommand";
import { ValidateGroupProfileCommand, } from "./commands/ValidateGroupProfileCommand";
var GroupService = (function (_super) {
    __extends(GroupService, _super);
    function GroupService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GroupService.prototype.banGroupIdentity = function (args, optionsOrCb, cb) {
        var command = new BanGroupIdentityCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get ".concat(typeof optionsOrCb));
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    GroupService.prototype.completeGroupAvatarUpload = function (args, optionsOrCb, cb) {
        var command = new CompleteGroupAvatarUploadCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get ".concat(typeof optionsOrCb));
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    GroupService.prototype.consumeGroupInvite = function (args, optionsOrCb, cb) {
        var command = new ConsumeGroupInviteCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get ".concat(typeof optionsOrCb));
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    GroupService.prototype.createGroup = function (args, optionsOrCb, cb) {
        var command = new CreateGroupCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get ".concat(typeof optionsOrCb));
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    GroupService.prototype.createGroupInvite = function (args, optionsOrCb, cb) {
        var command = new CreateGroupInviteCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get ".concat(typeof optionsOrCb));
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    GroupService.prototype.createGroupJoinRequest = function (args, optionsOrCb, cb) {
        var command = new CreateGroupJoinRequestCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get ".concat(typeof optionsOrCb));
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    GroupService.prototype.getGroupBans = function (args, optionsOrCb, cb) {
        var command = new GetGroupBansCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get ".concat(typeof optionsOrCb));
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    GroupService.prototype.getGroupInvite = function (args, optionsOrCb, cb) {
        var command = new GetGroupInviteCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get ".concat(typeof optionsOrCb));
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    GroupService.prototype.getGroupJoinRequests = function (args, optionsOrCb, cb) {
        var command = new GetGroupJoinRequestsCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get ".concat(typeof optionsOrCb));
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    GroupService.prototype.getGroupMembers = function (args, optionsOrCb, cb) {
        var command = new GetGroupMembersCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get ".concat(typeof optionsOrCb));
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    GroupService.prototype.getGroupProfile = function (args, optionsOrCb, cb) {
        var command = new GetGroupProfileCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get ".concat(typeof optionsOrCb));
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    GroupService.prototype.getGroupSummary = function (args, optionsOrCb, cb) {
        var command = new GetGroupSummaryCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get ".concat(typeof optionsOrCb));
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    GroupService.prototype.kickGroupMember = function (args, optionsOrCb, cb) {
        var command = new KickGroupMemberCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get ".concat(typeof optionsOrCb));
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    GroupService.prototype.leaveGroup = function (args, optionsOrCb, cb) {
        var command = new LeaveGroupCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get ".concat(typeof optionsOrCb));
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    GroupService.prototype.listSuggestedGroups = function (args, optionsOrCb, cb) {
        var command = new ListSuggestedGroupsCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get ".concat(typeof optionsOrCb));
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    GroupService.prototype.prepareGroupAvatarUpload = function (args, optionsOrCb, cb) {
        var command = new PrepareGroupAvatarUploadCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get ".concat(typeof optionsOrCb));
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    GroupService.prototype.resolveGroupJoinRequest = function (args, optionsOrCb, cb) {
        var command = new ResolveGroupJoinRequestCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get ".concat(typeof optionsOrCb));
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    GroupService.prototype.searchGroups = function (args, optionsOrCb, cb) {
        var command = new SearchGroupsCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get ".concat(typeof optionsOrCb));
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    GroupService.prototype.transferGroupOwnership = function (args, optionsOrCb, cb) {
        var command = new TransferGroupOwnershipCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get ".concat(typeof optionsOrCb));
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    GroupService.prototype.unbanGroupIdentity = function (args, optionsOrCb, cb) {
        var command = new UnbanGroupIdentityCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get ".concat(typeof optionsOrCb));
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    GroupService.prototype.updateGroupProfile = function (args, optionsOrCb, cb) {
        var command = new UpdateGroupProfileCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get ".concat(typeof optionsOrCb));
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    GroupService.prototype.validateGroupProfile = function (args, optionsOrCb, cb) {
        var command = new ValidateGroupProfileCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get ".concat(typeof optionsOrCb));
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    return GroupService;
}(GroupServiceClient));
export { GroupService };
