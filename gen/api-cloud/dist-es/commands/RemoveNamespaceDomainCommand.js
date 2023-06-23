import { __extends } from "tslib";
import { RemoveNamespaceDomainInput, RemoveNamespaceDomainOutput, } from "../models/models_0";
import { deserializeAws_restJson1RemoveNamespaceDomainCommand, serializeAws_restJson1RemoveNamespaceDomainCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var RemoveNamespaceDomainCommand = (function (_super) {
    __extends(RemoveNamespaceDomainCommand, _super);
    function RemoveNamespaceDomainCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    RemoveNamespaceDomainCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "CloudServiceClient";
        var commandName = "RemoveNamespaceDomainCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: RemoveNamespaceDomainInput.filterSensitiveLog,
            outputFilterSensitiveLog: RemoveNamespaceDomainOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    RemoveNamespaceDomainCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1RemoveNamespaceDomainCommand(input, context);
    };
    RemoveNamespaceDomainCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1RemoveNamespaceDomainCommand(output, context);
    };
    return RemoveNamespaceDomainCommand;
}($Command));
export { RemoveNamespaceDomainCommand };
