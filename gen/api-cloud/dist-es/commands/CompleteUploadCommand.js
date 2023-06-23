import { __extends } from "tslib";
import { CompleteUploadInput, CompleteUploadOutput, } from "../models/models_0";
import { deserializeAws_restJson1CompleteUploadCommand, serializeAws_restJson1CompleteUploadCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var CompleteUploadCommand = (function (_super) {
    __extends(CompleteUploadCommand, _super);
    function CompleteUploadCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    CompleteUploadCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "CloudServiceClient";
        var commandName = "CompleteUploadCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: CompleteUploadInput.filterSensitiveLog,
            outputFilterSensitiveLog: CompleteUploadOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    CompleteUploadCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1CompleteUploadCommand(input, context);
    };
    CompleteUploadCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1CompleteUploadCommand(output, context);
    };
    return CompleteUploadCommand;
}($Command));
export { CompleteUploadCommand };
