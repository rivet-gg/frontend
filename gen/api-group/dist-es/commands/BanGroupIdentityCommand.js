import { __extends } from "tslib";
import { BanGroupIdentityInput, BanGroupIdentityOutput, } from "../models/models_0";
import { deserializeAws_restJson1BanGroupIdentityCommand, serializeAws_restJson1BanGroupIdentityCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var BanGroupIdentityCommand = (function (_super) {
    __extends(BanGroupIdentityCommand, _super);
    function BanGroupIdentityCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    BanGroupIdentityCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "GroupServiceClient";
        var commandName = "BanGroupIdentityCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: BanGroupIdentityInput.filterSensitiveLog,
            outputFilterSensitiveLog: BanGroupIdentityOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    BanGroupIdentityCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1BanGroupIdentityCommand(input, context);
    };
    BanGroupIdentityCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1BanGroupIdentityCommand(output, context);
    };
    return BanGroupIdentityCommand;
}($Command));
export { BanGroupIdentityCommand };
