import { __extends } from "tslib";
import { GameLogoUploadPrepareInput, GameLogoUploadPrepareOutput, } from "../models/models_0";
import { deserializeAws_restJson1GameLogoUploadPrepareCommand, serializeAws_restJson1GameLogoUploadPrepareCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var GameLogoUploadPrepareCommand = (function (_super) {
    __extends(GameLogoUploadPrepareCommand, _super);
    function GameLogoUploadPrepareCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    GameLogoUploadPrepareCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "CloudServiceClient";
        var commandName = "GameLogoUploadPrepareCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: GameLogoUploadPrepareInput.filterSensitiveLog,
            outputFilterSensitiveLog: GameLogoUploadPrepareOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    GameLogoUploadPrepareCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1GameLogoUploadPrepareCommand(input, context);
    };
    GameLogoUploadPrepareCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1GameLogoUploadPrepareCommand(output, context);
    };
    return GameLogoUploadPrepareCommand;
}($Command));
export { GameLogoUploadPrepareCommand };
