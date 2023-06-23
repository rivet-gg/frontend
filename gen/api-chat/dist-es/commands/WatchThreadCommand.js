import { __extends } from "tslib";
import { WatchThreadInput, WatchThreadOutput, } from "../models/models_0";
import { deserializeAws_restJson1WatchThreadCommand, serializeAws_restJson1WatchThreadCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var WatchThreadCommand = (function (_super) {
    __extends(WatchThreadCommand, _super);
    function WatchThreadCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    WatchThreadCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "ChatServiceClient";
        var commandName = "WatchThreadCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: WatchThreadInput.filterSensitiveLog,
            outputFilterSensitiveLog: WatchThreadOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    WatchThreadCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1WatchThreadCommand(input, context);
    };
    WatchThreadCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1WatchThreadCommand(output, context);
    };
    return WatchThreadCommand;
}($Command));
export { WatchThreadCommand };
