import { __extends } from "tslib";
import { ResolveGroupJoinRequestInput, ResolveGroupJoinRequestOutput, } from "../models/models_0";
import { deserializeAws_restJson1ResolveGroupJoinRequestCommand, serializeAws_restJson1ResolveGroupJoinRequestCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var ResolveGroupJoinRequestCommand = (function (_super) {
    __extends(ResolveGroupJoinRequestCommand, _super);
    function ResolveGroupJoinRequestCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    ResolveGroupJoinRequestCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "GroupServiceClient";
        var commandName = "ResolveGroupJoinRequestCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: ResolveGroupJoinRequestInput.filterSensitiveLog,
            outputFilterSensitiveLog: ResolveGroupJoinRequestOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    ResolveGroupJoinRequestCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1ResolveGroupJoinRequestCommand(input, context);
    };
    ResolveGroupJoinRequestCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1ResolveGroupJoinRequestCommand(output, context);
    };
    return ResolveGroupJoinRequestCommand;
}($Command));
export { ResolveGroupJoinRequestCommand };
