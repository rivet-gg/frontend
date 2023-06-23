import { __extends } from "tslib";
import { SendChatMessageInput, SendChatMessageOutput, } from "../models/models_0";
import { deserializeAws_restJson1SendChatMessageCommand, serializeAws_restJson1SendChatMessageCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var SendChatMessageCommand = (function (_super) {
    __extends(SendChatMessageCommand, _super);
    function SendChatMessageCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    SendChatMessageCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "ChatServiceClient";
        var commandName = "SendChatMessageCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: SendChatMessageInput.filterSensitiveLog,
            outputFilterSensitiveLog: SendChatMessageOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    SendChatMessageCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1SendChatMessageCommand(input, context);
    };
    SendChatMessageCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1SendChatMessageCommand(output, context);
    };
    return SendChatMessageCommand;
}($Command));
export { SendChatMessageCommand };
