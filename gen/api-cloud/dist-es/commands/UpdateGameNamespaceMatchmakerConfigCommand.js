import { __extends } from "tslib";
import { UpdateGameNamespaceMatchmakerConfigInput, UpdateGameNamespaceMatchmakerConfigOutput, } from "../models/models_0";
import { deserializeAws_restJson1UpdateGameNamespaceMatchmakerConfigCommand, serializeAws_restJson1UpdateGameNamespaceMatchmakerConfigCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var UpdateGameNamespaceMatchmakerConfigCommand = (function (_super) {
    __extends(UpdateGameNamespaceMatchmakerConfigCommand, _super);
    function UpdateGameNamespaceMatchmakerConfigCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    UpdateGameNamespaceMatchmakerConfigCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "CloudServiceClient";
        var commandName = "UpdateGameNamespaceMatchmakerConfigCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: UpdateGameNamespaceMatchmakerConfigInput.filterSensitiveLog,
            outputFilterSensitiveLog: UpdateGameNamespaceMatchmakerConfigOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    UpdateGameNamespaceMatchmakerConfigCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1UpdateGameNamespaceMatchmakerConfigCommand(input, context);
    };
    UpdateGameNamespaceMatchmakerConfigCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1UpdateGameNamespaceMatchmakerConfigCommand(output, context);
    };
    return UpdateGameNamespaceMatchmakerConfigCommand;
}($Command));
export { UpdateGameNamespaceMatchmakerConfigCommand };
