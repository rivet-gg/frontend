import { __extends } from "tslib";
import { PutInput, PutOutput, } from "../models/models_0";
import { deserializeAws_restJson1PutCommand, serializeAws_restJson1PutCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var PutCommand = (function (_super) {
    __extends(PutCommand, _super);
    function PutCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    PutCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "KvServiceClient";
        var commandName = "PutCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: PutInput.filterSensitiveLog,
            outputFilterSensitiveLog: PutOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    PutCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1PutCommand(input, context);
    };
    PutCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1PutCommand(output, context);
    };
    return PutCommand;
}($Command));
export { PutCommand };
