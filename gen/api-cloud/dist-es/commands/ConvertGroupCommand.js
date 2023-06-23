import { __extends } from "tslib";
import { ConvertGroupInput, ConvertGroupOutput, } from "../models/models_0";
import { deserializeAws_restJson1ConvertGroupCommand, serializeAws_restJson1ConvertGroupCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var ConvertGroupCommand = (function (_super) {
    __extends(ConvertGroupCommand, _super);
    function ConvertGroupCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    ConvertGroupCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "CloudServiceClient";
        var commandName = "ConvertGroupCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: ConvertGroupInput.filterSensitiveLog,
            outputFilterSensitiveLog: ConvertGroupOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    ConvertGroupCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1ConvertGroupCommand(input, context);
    };
    ConvertGroupCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1ConvertGroupCommand(output, context);
    };
    return ConvertGroupCommand;
}($Command));
export { ConvertGroupCommand };
