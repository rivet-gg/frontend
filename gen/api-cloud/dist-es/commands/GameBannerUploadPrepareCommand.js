import { __extends } from "tslib";
import { GameBannerUploadPrepareInput, GameBannerUploadPrepareOutput, } from "../models/models_0";
import { deserializeAws_restJson1GameBannerUploadPrepareCommand, serializeAws_restJson1GameBannerUploadPrepareCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var GameBannerUploadPrepareCommand = (function (_super) {
    __extends(GameBannerUploadPrepareCommand, _super);
    function GameBannerUploadPrepareCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    GameBannerUploadPrepareCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "CloudServiceClient";
        var commandName = "GameBannerUploadPrepareCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: GameBannerUploadPrepareInput.filterSensitiveLog,
            outputFilterSensitiveLog: GameBannerUploadPrepareOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    GameBannerUploadPrepareCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1GameBannerUploadPrepareCommand(input, context);
    };
    GameBannerUploadPrepareCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1GameBannerUploadPrepareCommand(output, context);
    };
    return GameBannerUploadPrepareCommand;
}($Command));
export { GameBannerUploadPrepareCommand };
