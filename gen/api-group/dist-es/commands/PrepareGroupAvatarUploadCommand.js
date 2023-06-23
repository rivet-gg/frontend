import { __extends } from "tslib";
import { PrepareGroupAvatarUploadInput, PrepareGroupAvatarUploadOutput, } from "../models/models_0";
import { deserializeAws_restJson1PrepareGroupAvatarUploadCommand, serializeAws_restJson1PrepareGroupAvatarUploadCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var PrepareGroupAvatarUploadCommand = (function (_super) {
    __extends(PrepareGroupAvatarUploadCommand, _super);
    function PrepareGroupAvatarUploadCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    PrepareGroupAvatarUploadCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "GroupServiceClient";
        var commandName = "PrepareGroupAvatarUploadCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: PrepareGroupAvatarUploadInput.filterSensitiveLog,
            outputFilterSensitiveLog: PrepareGroupAvatarUploadOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    PrepareGroupAvatarUploadCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1PrepareGroupAvatarUploadCommand(input, context);
    };
    PrepareGroupAvatarUploadCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1PrepareGroupAvatarUploadCommand(output, context);
    };
    return PrepareGroupAvatarUploadCommand;
}($Command));
export { PrepareGroupAvatarUploadCommand };
