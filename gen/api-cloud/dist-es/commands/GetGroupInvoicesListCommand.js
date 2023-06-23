import { __extends } from "tslib";
import { GetGroupInvoicesListInput, GetGroupInvoicesListOutput, } from "../models/models_0";
import { deserializeAws_restJson1GetGroupInvoicesListCommand, serializeAws_restJson1GetGroupInvoicesListCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var GetGroupInvoicesListCommand = (function (_super) {
    __extends(GetGroupInvoicesListCommand, _super);
    function GetGroupInvoicesListCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    GetGroupInvoicesListCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "CloudServiceClient";
        var commandName = "GetGroupInvoicesListCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: GetGroupInvoicesListInput.filterSensitiveLog,
            outputFilterSensitiveLog: GetGroupInvoicesListOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    GetGroupInvoicesListCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1GetGroupInvoicesListCommand(input, context);
    };
    GetGroupInvoicesListCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1GetGroupInvoicesListCommand(output, context);
    };
    return GetGroupInvoicesListCommand;
}($Command));
export { GetGroupInvoicesListCommand };
