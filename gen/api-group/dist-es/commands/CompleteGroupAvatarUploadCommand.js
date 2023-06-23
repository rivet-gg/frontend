import { __extends } from "tslib";
import { CompleteGroupAvatarUploadInput, CompleteGroupAvatarUploadOutput, } from "../models/models_0";
import { deserializeAws_restJson1CompleteGroupAvatarUploadCommand, serializeAws_restJson1CompleteGroupAvatarUploadCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var CompleteGroupAvatarUploadCommand = (function (_super) {
    __extends(CompleteGroupAvatarUploadCommand, _super);
    function CompleteGroupAvatarUploadCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    CompleteGroupAvatarUploadCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "GroupServiceClient";
        var commandName = "CompleteGroupAvatarUploadCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: CompleteGroupAvatarUploadInput.filterSensitiveLog,
            outputFilterSensitiveLog: CompleteGroupAvatarUploadOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    CompleteGroupAvatarUploadCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1CompleteGroupAvatarUploadCommand(input, context);
    };
    CompleteGroupAvatarUploadCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1CompleteGroupAvatarUploadCommand(output, context);
    };
    return CompleteGroupAvatarUploadCommand;
}($Command));
export { CompleteGroupAvatarUploadCommand };
