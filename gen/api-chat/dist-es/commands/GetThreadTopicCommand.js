import { __extends } from "tslib";
import { GetThreadTopicInput, GetThreadTopicOutput, } from "../models/models_0";
import { deserializeAws_restJson1GetThreadTopicCommand, serializeAws_restJson1GetThreadTopicCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var GetThreadTopicCommand = (function (_super) {
    __extends(GetThreadTopicCommand, _super);
    function GetThreadTopicCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    GetThreadTopicCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "ChatServiceClient";
        var commandName = "GetThreadTopicCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: GetThreadTopicInput.filterSensitiveLog,
            outputFilterSensitiveLog: GetThreadTopicOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    GetThreadTopicCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1GetThreadTopicCommand(input, context);
    };
    GetThreadTopicCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1GetThreadTopicCommand(output, context);
    };
    return GetThreadTopicCommand;
}($Command));
export { GetThreadTopicCommand };
