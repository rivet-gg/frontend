import { __extends } from "tslib";
import { SetNamespaceCdnAuthTypeInput, SetNamespaceCdnAuthTypeOutput, } from "../models/models_0";
import { deserializeAws_restJson1SetNamespaceCdnAuthTypeCommand, serializeAws_restJson1SetNamespaceCdnAuthTypeCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var SetNamespaceCdnAuthTypeCommand = (function (_super) {
    __extends(SetNamespaceCdnAuthTypeCommand, _super);
    function SetNamespaceCdnAuthTypeCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    SetNamespaceCdnAuthTypeCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "CloudServiceClient";
        var commandName = "SetNamespaceCdnAuthTypeCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: SetNamespaceCdnAuthTypeInput.filterSensitiveLog,
            outputFilterSensitiveLog: SetNamespaceCdnAuthTypeOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    SetNamespaceCdnAuthTypeCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1SetNamespaceCdnAuthTypeCommand(input, context);
    };
    SetNamespaceCdnAuthTypeCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1SetNamespaceCdnAuthTypeCommand(output, context);
    };
    return SetNamespaceCdnAuthTypeCommand;
}($Command));
export { SetNamespaceCdnAuthTypeCommand };
