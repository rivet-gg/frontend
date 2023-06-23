import { __extends } from "tslib";
import { ResolveBetaJoinRequestInput, ResolveBetaJoinRequestOutput, } from "../models/models_0";
import { deserializeAws_restJson1ResolveBetaJoinRequestCommand, serializeAws_restJson1ResolveBetaJoinRequestCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var ResolveBetaJoinRequestCommand = (function (_super) {
    __extends(ResolveBetaJoinRequestCommand, _super);
    function ResolveBetaJoinRequestCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    ResolveBetaJoinRequestCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "PortalServiceClient";
        var commandName = "ResolveBetaJoinRequestCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: ResolveBetaJoinRequestInput.filterSensitiveLog,
            outputFilterSensitiveLog: ResolveBetaJoinRequestOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    ResolveBetaJoinRequestCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1ResolveBetaJoinRequestCommand(input, context);
    };
    ResolveBetaJoinRequestCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1ResolveBetaJoinRequestCommand(output, context);
    };
    return ResolveBetaJoinRequestCommand;
}($Command));
export { ResolveBetaJoinRequestCommand };
