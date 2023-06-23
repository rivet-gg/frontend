import { __extends } from "tslib";
import { GetInput, GetOutput, } from "../models/models_0";
import { deserializeAws_restJson1GetCommand, serializeAws_restJson1GetCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var GetCommand = (function (_super) {
    __extends(GetCommand, _super);
    function GetCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    GetCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "KvServiceClient";
        var commandName = "GetCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: GetInput.filterSensitiveLog,
            outputFilterSensitiveLog: GetOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    GetCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1GetCommand(input, context);
    };
    GetCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1GetCommand(output, context);
    };
    return GetCommand;
}($Command));
export { GetCommand };
