import { __extends } from "tslib";
import { GetGroupInviteInput, GetGroupInviteOutput, } from "../models/models_0";
import { deserializeAws_restJson1GetGroupInviteCommand, serializeAws_restJson1GetGroupInviteCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var GetGroupInviteCommand = (function (_super) {
    __extends(GetGroupInviteCommand, _super);
    function GetGroupInviteCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    GetGroupInviteCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "GroupServiceClient";
        var commandName = "GetGroupInviteCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: GetGroupInviteInput.filterSensitiveLog,
            outputFilterSensitiveLog: GetGroupInviteOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    GetGroupInviteCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1GetGroupInviteCommand(input, context);
    };
    GetGroupInviteCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1GetGroupInviteCommand(output, context);
    };
    return GetGroupInviteCommand;
}($Command));
export { GetGroupInviteCommand };
