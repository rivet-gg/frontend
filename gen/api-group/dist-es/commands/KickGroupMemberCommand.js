import { __extends } from "tslib";
import { KickGroupMemberInput, KickGroupMemberOutput, } from "../models/models_0";
import { deserializeAws_restJson1KickGroupMemberCommand, serializeAws_restJson1KickGroupMemberCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var KickGroupMemberCommand = (function (_super) {
    __extends(KickGroupMemberCommand, _super);
    function KickGroupMemberCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    KickGroupMemberCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "GroupServiceClient";
        var commandName = "KickGroupMemberCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: KickGroupMemberInput.filterSensitiveLog,
            outputFilterSensitiveLog: KickGroupMemberOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    KickGroupMemberCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1KickGroupMemberCommand(input, context);
    };
    KickGroupMemberCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1KickGroupMemberCommand(output, context);
    };
    return KickGroupMemberCommand;
}($Command));
export { KickGroupMemberCommand };
