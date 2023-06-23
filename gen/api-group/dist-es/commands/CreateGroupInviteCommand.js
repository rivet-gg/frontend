import { __extends } from "tslib";
import { CreateGroupInviteInput, CreateGroupInviteOutput, } from "../models/models_0";
import { deserializeAws_restJson1CreateGroupInviteCommand, serializeAws_restJson1CreateGroupInviteCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var CreateGroupInviteCommand = (function (_super) {
    __extends(CreateGroupInviteCommand, _super);
    function CreateGroupInviteCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    CreateGroupInviteCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "GroupServiceClient";
        var commandName = "CreateGroupInviteCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: CreateGroupInviteInput.filterSensitiveLog,
            outputFilterSensitiveLog: CreateGroupInviteOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    CreateGroupInviteCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1CreateGroupInviteCommand(input, context);
    };
    CreateGroupInviteCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1CreateGroupInviteCommand(output, context);
    };
    return CreateGroupInviteCommand;
}($Command));
export { CreateGroupInviteCommand };
