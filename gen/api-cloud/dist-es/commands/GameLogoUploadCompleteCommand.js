import { __extends } from "tslib";
import { GameLogoUploadCompleteInput, GameLogoUploadCompleteOutput, } from "../models/models_0";
import { deserializeAws_restJson1GameLogoUploadCompleteCommand, serializeAws_restJson1GameLogoUploadCompleteCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var GameLogoUploadCompleteCommand = (function (_super) {
    __extends(GameLogoUploadCompleteCommand, _super);
    function GameLogoUploadCompleteCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    GameLogoUploadCompleteCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "CloudServiceClient";
        var commandName = "GameLogoUploadCompleteCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: GameLogoUploadCompleteInput.filterSensitiveLog,
            outputFilterSensitiveLog: GameLogoUploadCompleteOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    GameLogoUploadCompleteCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1GameLogoUploadCompleteCommand(input, context);
    };
    GameLogoUploadCompleteCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1GameLogoUploadCompleteCommand(output, context);
    };
    return GameLogoUploadCompleteCommand;
}($Command));
export { GameLogoUploadCompleteCommand };
