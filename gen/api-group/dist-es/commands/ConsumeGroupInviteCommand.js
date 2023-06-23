import { __extends } from "tslib";
import { ConsumeGroupInviteInput, ConsumeGroupInviteOutput, } from "../models/models_0";
import { deserializeAws_restJson1ConsumeGroupInviteCommand, serializeAws_restJson1ConsumeGroupInviteCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var ConsumeGroupInviteCommand = (function (_super) {
    __extends(ConsumeGroupInviteCommand, _super);
    function ConsumeGroupInviteCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    ConsumeGroupInviteCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "GroupServiceClient";
        var commandName = "ConsumeGroupInviteCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: ConsumeGroupInviteInput.filterSensitiveLog,
            outputFilterSensitiveLog: ConsumeGroupInviteOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    ConsumeGroupInviteCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1ConsumeGroupInviteCommand(input, context);
    };
    ConsumeGroupInviteCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1ConsumeGroupInviteCommand(output, context);
    };
    return ConsumeGroupInviteCommand;
}($Command));
export { ConsumeGroupInviteCommand };
