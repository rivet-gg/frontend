import { __extends } from "tslib";
import { DeleteBatchOutput, DeleteBatchRequest, } from "../models/models_0";
import { deserializeAws_restJson1DeleteBatchCommand, serializeAws_restJson1DeleteBatchCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var DeleteBatchCommand = (function (_super) {
    __extends(DeleteBatchCommand, _super);
    function DeleteBatchCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    DeleteBatchCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "KvServiceClient";
        var commandName = "DeleteBatchCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: DeleteBatchRequest.filterSensitiveLog,
            outputFilterSensitiveLog: DeleteBatchOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    DeleteBatchCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1DeleteBatchCommand(input, context);
    };
    DeleteBatchCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1DeleteBatchCommand(output, context);
    };
    return DeleteBatchCommand;
}($Command));
export { DeleteBatchCommand };
