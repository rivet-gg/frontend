import { __extends } from "tslib";
import { UnregisterNotificationsInput, UnregisterNotificationsOutput, } from "../models/models_0";
import { deserializeAws_restJson1UnregisterNotificationsCommand, serializeAws_restJson1UnregisterNotificationsCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var UnregisterNotificationsCommand = (function (_super) {
    __extends(UnregisterNotificationsCommand, _super);
    function UnregisterNotificationsCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    UnregisterNotificationsCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "PortalServiceClient";
        var commandName = "UnregisterNotificationsCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: UnregisterNotificationsInput.filterSensitiveLog,
            outputFilterSensitiveLog: UnregisterNotificationsOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    UnregisterNotificationsCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1UnregisterNotificationsCommand(input, context);
    };
    UnregisterNotificationsCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1UnregisterNotificationsCommand(output, context);
    };
    return UnregisterNotificationsCommand;
}($Command));
export { UnregisterNotificationsCommand };
