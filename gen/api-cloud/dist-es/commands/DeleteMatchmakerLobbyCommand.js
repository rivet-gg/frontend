import { __extends } from "tslib";
import { DeleteMatchmakerLobbyInput, DeleteMatchmakerLobbyOutput, } from "../models/models_0";
import { deserializeAws_restJson1DeleteMatchmakerLobbyCommand, serializeAws_restJson1DeleteMatchmakerLobbyCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var DeleteMatchmakerLobbyCommand = (function (_super) {
    __extends(DeleteMatchmakerLobbyCommand, _super);
    function DeleteMatchmakerLobbyCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    DeleteMatchmakerLobbyCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "CloudServiceClient";
        var commandName = "DeleteMatchmakerLobbyCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: DeleteMatchmakerLobbyInput.filterSensitiveLog,
            outputFilterSensitiveLog: DeleteMatchmakerLobbyOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    DeleteMatchmakerLobbyCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1DeleteMatchmakerLobbyCommand(input, context);
    };
    DeleteMatchmakerLobbyCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1DeleteMatchmakerLobbyCommand(output, context);
    };
    return DeleteMatchmakerLobbyCommand;
}($Command));
export { DeleteMatchmakerLobbyCommand };
