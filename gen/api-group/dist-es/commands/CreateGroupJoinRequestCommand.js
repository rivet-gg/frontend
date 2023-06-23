import { __extends } from "tslib";
import { CreateGroupJoinRequestInput, CreateGroupJoinRequestOutput, } from "../models/models_0";
import { deserializeAws_restJson1CreateGroupJoinRequestCommand, serializeAws_restJson1CreateGroupJoinRequestCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var CreateGroupJoinRequestCommand = (function (_super) {
    __extends(CreateGroupJoinRequestCommand, _super);
    function CreateGroupJoinRequestCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    CreateGroupJoinRequestCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "GroupServiceClient";
        var commandName = "CreateGroupJoinRequestCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: CreateGroupJoinRequestInput.filterSensitiveLog,
            outputFilterSensitiveLog: CreateGroupJoinRequestOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    CreateGroupJoinRequestCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1CreateGroupJoinRequestCommand(input, context);
    };
    CreateGroupJoinRequestCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1CreateGroupJoinRequestCommand(output, context);
    };
    return CreateGroupJoinRequestCommand;
}($Command));
export { CreateGroupJoinRequestCommand };
