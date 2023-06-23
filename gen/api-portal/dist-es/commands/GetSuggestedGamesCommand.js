import { __extends } from "tslib";
import { GetSuggestedGamesInput, GetSuggestedGamesOutput, } from "../models/models_0";
import { deserializeAws_restJson1GetSuggestedGamesCommand, serializeAws_restJson1GetSuggestedGamesCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var GetSuggestedGamesCommand = (function (_super) {
    __extends(GetSuggestedGamesCommand, _super);
    function GetSuggestedGamesCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    GetSuggestedGamesCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "PortalServiceClient";
        var commandName = "GetSuggestedGamesCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: GetSuggestedGamesInput.filterSensitiveLog,
            outputFilterSensitiveLog: GetSuggestedGamesOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    GetSuggestedGamesCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1GetSuggestedGamesCommand(input, context);
    };
    GetSuggestedGamesCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1GetSuggestedGamesCommand(output, context);
    };
    return GetSuggestedGamesCommand;
}($Command));
export { GetSuggestedGamesCommand };
