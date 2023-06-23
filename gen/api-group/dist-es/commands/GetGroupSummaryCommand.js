import { __extends } from "tslib";
import { GetGroupSummaryInput, GetGroupSummaryOutput, } from "../models/models_0";
import { deserializeAws_restJson1GetGroupSummaryCommand, serializeAws_restJson1GetGroupSummaryCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var GetGroupSummaryCommand = (function (_super) {
    __extends(GetGroupSummaryCommand, _super);
    function GetGroupSummaryCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    GetGroupSummaryCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "GroupServiceClient";
        var commandName = "GetGroupSummaryCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: GetGroupSummaryInput.filterSensitiveLog,
            outputFilterSensitiveLog: GetGroupSummaryOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    GetGroupSummaryCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1GetGroupSummaryCommand(input, context);
    };
    GetGroupSummaryCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1GetGroupSummaryCommand(output, context);
    };
    return GetGroupSummaryCommand;
}($Command));
export { GetGroupSummaryCommand };
