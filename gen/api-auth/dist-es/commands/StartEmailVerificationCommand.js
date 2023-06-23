import { __extends } from "tslib";
import { StartEmailVerificationInput, StartEmailVerificationOutput, } from "../models/models_0";
import { deserializeAws_restJson1StartEmailVerificationCommand, serializeAws_restJson1StartEmailVerificationCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var StartEmailVerificationCommand = (function (_super) {
    __extends(StartEmailVerificationCommand, _super);
    function StartEmailVerificationCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    StartEmailVerificationCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "AuthServiceClient";
        var commandName = "StartEmailVerificationCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: StartEmailVerificationInput.filterSensitiveLog,
            outputFilterSensitiveLog: StartEmailVerificationOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    StartEmailVerificationCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1StartEmailVerificationCommand(input, context);
    };
    StartEmailVerificationCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1StartEmailVerificationCommand(output, context);
    };
    return StartEmailVerificationCommand;
}($Command));
export { StartEmailVerificationCommand };
