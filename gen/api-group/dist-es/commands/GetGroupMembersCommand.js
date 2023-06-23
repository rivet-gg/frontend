import { __extends } from "tslib";
import { GetGroupMembersInput, GetGroupMembersOutput, } from "../models/models_0";
import { deserializeAws_restJson1GetGroupMembersCommand, serializeAws_restJson1GetGroupMembersCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var GetGroupMembersCommand = (function (_super) {
    __extends(GetGroupMembersCommand, _super);
    function GetGroupMembersCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    GetGroupMembersCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "GroupServiceClient";
        var commandName = "GetGroupMembersCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: GetGroupMembersInput.filterSensitiveLog,
            outputFilterSensitiveLog: GetGroupMembersOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    GetGroupMembersCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1GetGroupMembersCommand(input, context);
    };
    GetGroupMembersCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1GetGroupMembersCommand(output, context);
    };
    return GetGroupMembersCommand;
}($Command));
export { GetGroupMembersCommand };
