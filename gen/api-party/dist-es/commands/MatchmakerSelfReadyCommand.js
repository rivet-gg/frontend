import { __extends } from "tslib";
import { MatchmakerSelfReadyInput, MatchmakerSelfReadyOutput, } from "../models/models_0";
import { deserializeAws_restJson1MatchmakerSelfReadyCommand, serializeAws_restJson1MatchmakerSelfReadyCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var MatchmakerSelfReadyCommand = (function (_super) {
    __extends(MatchmakerSelfReadyCommand, _super);
    function MatchmakerSelfReadyCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    MatchmakerSelfReadyCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "PartyServiceClient";
        var commandName = "MatchmakerSelfReadyCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: MatchmakerSelfReadyInput.filterSensitiveLog,
            outputFilterSensitiveLog: MatchmakerSelfReadyOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    MatchmakerSelfReadyCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1MatchmakerSelfReadyCommand(input, context);
    };
    MatchmakerSelfReadyCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1MatchmakerSelfReadyCommand(output, context);
    };
    return MatchmakerSelfReadyCommand;
}($Command));
export { MatchmakerSelfReadyCommand };
