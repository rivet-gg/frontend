import { __extends } from "tslib";
import { CompleteCustomAvatarUploadInput, CompleteCustomAvatarUploadOutput, } from "../models/models_0";
import { deserializeAws_restJson1CompleteCustomAvatarUploadCommand, serializeAws_restJson1CompleteCustomAvatarUploadCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var CompleteCustomAvatarUploadCommand = (function (_super) {
    __extends(CompleteCustomAvatarUploadCommand, _super);
    function CompleteCustomAvatarUploadCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    CompleteCustomAvatarUploadCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "CloudServiceClient";
        var commandName = "CompleteCustomAvatarUploadCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: CompleteCustomAvatarUploadInput.filterSensitiveLog,
            outputFilterSensitiveLog: CompleteCustomAvatarUploadOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    CompleteCustomAvatarUploadCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1CompleteCustomAvatarUploadCommand(input, context);
    };
    CompleteCustomAvatarUploadCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1CompleteCustomAvatarUploadCommand(output, context);
    };
    return CompleteCustomAvatarUploadCommand;
}($Command));
export { CompleteCustomAvatarUploadCommand };
