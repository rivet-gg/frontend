import { __extends } from "tslib";
import { PrepareCustomAvatarUploadInput, PrepareCustomAvatarUploadOutput, } from "../models/models_0";
import { deserializeAws_restJson1PrepareCustomAvatarUploadCommand, serializeAws_restJson1PrepareCustomAvatarUploadCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var PrepareCustomAvatarUploadCommand = (function (_super) {
    __extends(PrepareCustomAvatarUploadCommand, _super);
    function PrepareCustomAvatarUploadCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    PrepareCustomAvatarUploadCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "CloudServiceClient";
        var commandName = "PrepareCustomAvatarUploadCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: PrepareCustomAvatarUploadInput.filterSensitiveLog,
            outputFilterSensitiveLog: PrepareCustomAvatarUploadOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    PrepareCustomAvatarUploadCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1PrepareCustomAvatarUploadCommand(input, context);
    };
    PrepareCustomAvatarUploadCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1PrepareCustomAvatarUploadCommand(output, context);
    };
    return PrepareCustomAvatarUploadCommand;
}($Command));
export { PrepareCustomAvatarUploadCommand };
