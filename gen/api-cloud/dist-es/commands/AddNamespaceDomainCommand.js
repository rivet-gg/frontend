import { __extends } from "tslib";
import { AddNamespaceDomainInput, AddNamespaceDomainOutput, } from "../models/models_0";
import { deserializeAws_restJson1AddNamespaceDomainCommand, serializeAws_restJson1AddNamespaceDomainCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var AddNamespaceDomainCommand = (function (_super) {
    __extends(AddNamespaceDomainCommand, _super);
    function AddNamespaceDomainCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    AddNamespaceDomainCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "CloudServiceClient";
        var commandName = "AddNamespaceDomainCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: AddNamespaceDomainInput.filterSensitiveLog,
            outputFilterSensitiveLog: AddNamespaceDomainOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    AddNamespaceDomainCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1AddNamespaceDomainCommand(input, context);
    };
    AddNamespaceDomainCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1AddNamespaceDomainCommand(output, context);
    };
    return AddNamespaceDomainCommand;
}($Command));
export { AddNamespaceDomainCommand };
