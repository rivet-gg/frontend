import { __extends } from "tslib";
import { CancelGameLinkInput, CancelGameLinkOutput, } from "../models/models_0";
import { deserializeAws_restJson1CancelGameLinkCommand, serializeAws_restJson1CancelGameLinkCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var CancelGameLinkCommand = (function (_super) {
    __extends(CancelGameLinkCommand, _super);
    function CancelGameLinkCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    CancelGameLinkCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "IdentityServiceClient";
        var commandName = "CancelGameLinkCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: CancelGameLinkInput.filterSensitiveLog,
            outputFilterSensitiveLog: CancelGameLinkOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    CancelGameLinkCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1CancelGameLinkCommand(input, context);
    };
    CancelGameLinkCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1CancelGameLinkCommand(output, context);
    };
    return CancelGameLinkCommand;
}($Command));
export { CancelGameLinkCommand };
