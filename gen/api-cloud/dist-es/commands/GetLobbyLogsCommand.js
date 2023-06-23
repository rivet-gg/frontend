import { __extends } from "tslib";
import { GetLobbyLogsInput, GetLobbyLogsOutput, } from "../models/models_0";
import { deserializeAws_restJson1GetLobbyLogsCommand, serializeAws_restJson1GetLobbyLogsCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var GetLobbyLogsCommand = (function (_super) {
    __extends(GetLobbyLogsCommand, _super);
    function GetLobbyLogsCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    GetLobbyLogsCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "CloudServiceClient";
        var commandName = "GetLobbyLogsCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: GetLobbyLogsInput.filterSensitiveLog,
            outputFilterSensitiveLog: GetLobbyLogsOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    GetLobbyLogsCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1GetLobbyLogsCommand(input, context);
    };
    GetLobbyLogsCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1GetLobbyLogsCommand(output, context);
    };
    return GetLobbyLogsCommand;
}($Command));
export { GetLobbyLogsCommand };
