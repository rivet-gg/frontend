import { __extends } from "tslib";
import { RemoveNamespaceCdnAuthUserInput, RemoveNamespaceCdnAuthUserOutput, } from "../models/models_0";
import { deserializeAws_restJson1RemoveNamespaceCdnAuthUserCommand, serializeAws_restJson1RemoveNamespaceCdnAuthUserCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var RemoveNamespaceCdnAuthUserCommand = (function (_super) {
    __extends(RemoveNamespaceCdnAuthUserCommand, _super);
    function RemoveNamespaceCdnAuthUserCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    RemoveNamespaceCdnAuthUserCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "CloudServiceClient";
        var commandName = "RemoveNamespaceCdnAuthUserCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: RemoveNamespaceCdnAuthUserInput.filterSensitiveLog,
            outputFilterSensitiveLog: RemoveNamespaceCdnAuthUserOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    RemoveNamespaceCdnAuthUserCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1RemoveNamespaceCdnAuthUserCommand(input, context);
    };
    RemoveNamespaceCdnAuthUserCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1RemoveNamespaceCdnAuthUserCommand(output, context);
    };
    return RemoveNamespaceCdnAuthUserCommand;
}($Command));
export { RemoveNamespaceCdnAuthUserCommand };
