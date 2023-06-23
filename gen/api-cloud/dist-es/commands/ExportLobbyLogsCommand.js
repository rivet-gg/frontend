import { __extends } from "tslib";
import { ExportLobbyLogsInput, ExportLobbyLogsOutput, } from "../models/models_0";
import { deserializeAws_restJson1ExportLobbyLogsCommand, serializeAws_restJson1ExportLobbyLogsCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var ExportLobbyLogsCommand = (function (_super) {
    __extends(ExportLobbyLogsCommand, _super);
    function ExportLobbyLogsCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    ExportLobbyLogsCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "CloudServiceClient";
        var commandName = "ExportLobbyLogsCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: ExportLobbyLogsInput.filterSensitiveLog,
            outputFilterSensitiveLog: ExportLobbyLogsOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    ExportLobbyLogsCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1ExportLobbyLogsCommand(input, context);
    };
    ExportLobbyLogsCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1ExportLobbyLogsCommand(output, context);
    };
    return ExportLobbyLogsCommand;
}($Command));
export { ExportLobbyLogsCommand };
