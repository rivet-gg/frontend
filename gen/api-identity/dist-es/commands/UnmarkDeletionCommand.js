import { __extends } from "tslib";
import { UnmarkDeletionInput, UnmarkDeletionOutput, } from "../models/models_0";
import { deserializeAws_restJson1UnmarkDeletionCommand, serializeAws_restJson1UnmarkDeletionCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var UnmarkDeletionCommand = (function (_super) {
    __extends(UnmarkDeletionCommand, _super);
    function UnmarkDeletionCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    UnmarkDeletionCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "IdentityServiceClient";
        var commandName = "UnmarkDeletionCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: UnmarkDeletionInput.filterSensitiveLog,
            outputFilterSensitiveLog: UnmarkDeletionOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    UnmarkDeletionCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1UnmarkDeletionCommand(input, context);
    };
    UnmarkDeletionCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1UnmarkDeletionCommand(output, context);
    };
    return UnmarkDeletionCommand;
}($Command));
export { UnmarkDeletionCommand };
