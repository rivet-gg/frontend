import { __extends } from "tslib";
import { MarkDeletionInput, MarkDeletionOutput, } from "../models/models_0";
import { deserializeAws_restJson1MarkDeletionCommand, serializeAws_restJson1MarkDeletionCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var MarkDeletionCommand = (function (_super) {
    __extends(MarkDeletionCommand, _super);
    function MarkDeletionCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    MarkDeletionCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "IdentityServiceClient";
        var commandName = "MarkDeletionCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: MarkDeletionInput.filterSensitiveLog,
            outputFilterSensitiveLog: MarkDeletionOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    MarkDeletionCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1MarkDeletionCommand(input, context);
    };
    MarkDeletionCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1MarkDeletionCommand(output, context);
    };
    return MarkDeletionCommand;
}($Command));
export { MarkDeletionCommand };
