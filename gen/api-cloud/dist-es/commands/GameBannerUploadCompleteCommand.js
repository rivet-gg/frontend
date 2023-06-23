import { __extends } from "tslib";
import { GameBannerUploadCompleteInput, GameBannerUploadCompleteOutput, } from "../models/models_0";
import { deserializeAws_restJson1GameBannerUploadCompleteCommand, serializeAws_restJson1GameBannerUploadCompleteCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var GameBannerUploadCompleteCommand = (function (_super) {
    __extends(GameBannerUploadCompleteCommand, _super);
    function GameBannerUploadCompleteCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    GameBannerUploadCompleteCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "CloudServiceClient";
        var commandName = "GameBannerUploadCompleteCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: GameBannerUploadCompleteInput.filterSensitiveLog,
            outputFilterSensitiveLog: GameBannerUploadCompleteOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    GameBannerUploadCompleteCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1GameBannerUploadCompleteCommand(input, context);
    };
    GameBannerUploadCompleteCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1GameBannerUploadCompleteCommand(output, context);
    };
    return GameBannerUploadCompleteCommand;
}($Command));
export { GameBannerUploadCompleteCommand };
