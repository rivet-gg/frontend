import { __extends } from "tslib";
import { ToggleNamespaceDomainPublicAuthInput, ToggleNamespaceDomainPublicAuthOutput, } from "../models/models_0";
import { deserializeAws_restJson1ToggleNamespaceDomainPublicAuthCommand, serializeAws_restJson1ToggleNamespaceDomainPublicAuthCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var ToggleNamespaceDomainPublicAuthCommand = (function (_super) {
    __extends(ToggleNamespaceDomainPublicAuthCommand, _super);
    function ToggleNamespaceDomainPublicAuthCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    ToggleNamespaceDomainPublicAuthCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "CloudServiceClient";
        var commandName = "ToggleNamespaceDomainPublicAuthCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: ToggleNamespaceDomainPublicAuthInput.filterSensitiveLog,
            outputFilterSensitiveLog: ToggleNamespaceDomainPublicAuthOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    ToggleNamespaceDomainPublicAuthCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1ToggleNamespaceDomainPublicAuthCommand(input, context);
    };
    ToggleNamespaceDomainPublicAuthCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1ToggleNamespaceDomainPublicAuthCommand(output, context);
    };
    return ToggleNamespaceDomainPublicAuthCommand;
}($Command));
export { ToggleNamespaceDomainPublicAuthCommand };
