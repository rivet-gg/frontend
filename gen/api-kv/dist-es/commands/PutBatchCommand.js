import { __extends } from "tslib";
import { PutBatchOutput, PutBatchRequest, } from "../models/models_0";
import { deserializeAws_restJson1PutBatchCommand, serializeAws_restJson1PutBatchCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var PutBatchCommand = (function (_super) {
    __extends(PutBatchCommand, _super);
    function PutBatchCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    PutBatchCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "KvServiceClient";
        var commandName = "PutBatchCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: PutBatchRequest.filterSensitiveLog,
            outputFilterSensitiveLog: PutBatchOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    PutBatchCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1PutBatchCommand(input, context);
    };
    PutBatchCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1PutBatchCommand(output, context);
    };
    return PutBatchCommand;
}($Command));
export { PutBatchCommand };
