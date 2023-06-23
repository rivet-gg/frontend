import { __extends } from "tslib";
import { UpdateNamespaceCdnAuthUserInput, UpdateNamespaceCdnAuthUserOutput, } from "../models/models_0";
import { deserializeAws_restJson1UpdateNamespaceCdnAuthUserCommand, serializeAws_restJson1UpdateNamespaceCdnAuthUserCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var UpdateNamespaceCdnAuthUserCommand = (function (_super) {
    __extends(UpdateNamespaceCdnAuthUserCommand, _super);
    function UpdateNamespaceCdnAuthUserCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    UpdateNamespaceCdnAuthUserCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "CloudServiceClient";
        var commandName = "UpdateNamespaceCdnAuthUserCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: UpdateNamespaceCdnAuthUserInput.filterSensitiveLog,
            outputFilterSensitiveLog: UpdateNamespaceCdnAuthUserOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    UpdateNamespaceCdnAuthUserCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1UpdateNamespaceCdnAuthUserCommand(input, context);
    };
    UpdateNamespaceCdnAuthUserCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1UpdateNamespaceCdnAuthUserCommand(output, context);
    };
    return UpdateNamespaceCdnAuthUserCommand;
}($Command));
export { UpdateNamespaceCdnAuthUserCommand };
