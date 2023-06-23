import { __extends } from "tslib";
import { GetGamesInput, GetGamesOutput, } from "../models/models_0";
import { deserializeAws_restJson1GetGamesCommand, serializeAws_restJson1GetGamesCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var GetGamesCommand = (function (_super) {
    __extends(GetGamesCommand, _super);
    function GetGamesCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    GetGamesCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "CloudServiceClient";
        var commandName = "GetGamesCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: GetGamesInput.filterSensitiveLog,
            outputFilterSensitiveLog: GetGamesOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    GetGamesCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1GetGamesCommand(input, context);
    };
    GetGamesCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1GetGamesCommand(output, context);
    };
    return GetGamesCommand;
}($Command));
export { GetGamesCommand };
