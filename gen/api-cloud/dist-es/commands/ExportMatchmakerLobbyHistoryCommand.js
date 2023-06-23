import { __extends } from "tslib";
import { ExportMatchmakerLobbyHistoryInput, ExportMatchmakerLobbyHistoryOutput, } from "../models/models_0";
import { deserializeAws_restJson1ExportMatchmakerLobbyHistoryCommand, serializeAws_restJson1ExportMatchmakerLobbyHistoryCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var ExportMatchmakerLobbyHistoryCommand = (function (_super) {
    __extends(ExportMatchmakerLobbyHistoryCommand, _super);
    function ExportMatchmakerLobbyHistoryCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    ExportMatchmakerLobbyHistoryCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "CloudServiceClient";
        var commandName = "ExportMatchmakerLobbyHistoryCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: ExportMatchmakerLobbyHistoryInput.filterSensitiveLog,
            outputFilterSensitiveLog: ExportMatchmakerLobbyHistoryOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    ExportMatchmakerLobbyHistoryCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1ExportMatchmakerLobbyHistoryCommand(input, context);
    };
    ExportMatchmakerLobbyHistoryCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1ExportMatchmakerLobbyHistoryCommand(output, context);
    };
    return ExportMatchmakerLobbyHistoryCommand;
}($Command));
export { ExportMatchmakerLobbyHistoryCommand };
