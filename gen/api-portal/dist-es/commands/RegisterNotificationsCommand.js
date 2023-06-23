import { __extends } from "tslib";
import { RegisterNotificationsInput, RegisterNotificationsOutput, } from "../models/models_0";
import { deserializeAws_restJson1RegisterNotificationsCommand, serializeAws_restJson1RegisterNotificationsCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var RegisterNotificationsCommand = (function (_super) {
    __extends(RegisterNotificationsCommand, _super);
    function RegisterNotificationsCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    RegisterNotificationsCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "PortalServiceClient";
        var commandName = "RegisterNotificationsCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: RegisterNotificationsInput.filterSensitiveLog,
            outputFilterSensitiveLog: RegisterNotificationsOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    RegisterNotificationsCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1RegisterNotificationsCommand(input, context);
    };
    RegisterNotificationsCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1RegisterNotificationsCommand(output, context);
    };
    return RegisterNotificationsCommand;
}($Command));
export { RegisterNotificationsCommand };
