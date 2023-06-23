import { __extends } from "tslib";
import { CompleteEmailVerificationInput, CompleteEmailVerificationOutput, } from "../models/models_0";
import { deserializeAws_restJson1CompleteEmailVerificationCommand, serializeAws_restJson1CompleteEmailVerificationCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var CompleteEmailVerificationCommand = (function (_super) {
    __extends(CompleteEmailVerificationCommand, _super);
    function CompleteEmailVerificationCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    CompleteEmailVerificationCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "AuthServiceClient";
        var commandName = "CompleteEmailVerificationCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: CompleteEmailVerificationInput.filterSensitiveLog,
            outputFilterSensitiveLog: CompleteEmailVerificationOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    CompleteEmailVerificationCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1CompleteEmailVerificationCommand(input, context);
    };
    CompleteEmailVerificationCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1CompleteEmailVerificationCommand(output, context);
    };
    return CompleteEmailVerificationCommand;
}($Command));
export { CompleteEmailVerificationCommand };
