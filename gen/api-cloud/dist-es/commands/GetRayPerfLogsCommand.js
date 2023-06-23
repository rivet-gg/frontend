import { __extends } from "tslib";
import { GetRayPerfLogsInput, GetRayPerfLogsOutput, } from "../models/models_0";
import { deserializeAws_restJson1GetRayPerfLogsCommand, serializeAws_restJson1GetRayPerfLogsCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var GetRayPerfLogsCommand = (function (_super) {
    __extends(GetRayPerfLogsCommand, _super);
    function GetRayPerfLogsCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    GetRayPerfLogsCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "CloudServiceClient";
        var commandName = "GetRayPerfLogsCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: GetRayPerfLogsInput.filterSensitiveLog,
            outputFilterSensitiveLog: GetRayPerfLogsOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    GetRayPerfLogsCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1GetRayPerfLogsCommand(input, context);
    };
    GetRayPerfLogsCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1GetRayPerfLogsCommand(output, context);
    };
    return GetRayPerfLogsCommand;
}($Command));
export { GetRayPerfLogsCommand };
