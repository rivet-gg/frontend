import { __extends } from "tslib";
import { ReportIdentityInput, ReportIdentityOutput, } from "../models/models_0";
import { deserializeAws_restJson1ReportIdentityCommand, serializeAws_restJson1ReportIdentityCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var ReportIdentityCommand = (function (_super) {
    __extends(ReportIdentityCommand, _super);
    function ReportIdentityCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    ReportIdentityCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "IdentityServiceClient";
        var commandName = "ReportIdentityCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: ReportIdentityInput.filterSensitiveLog,
            outputFilterSensitiveLog: ReportIdentityOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    ReportIdentityCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1ReportIdentityCommand(input, context);
    };
    ReportIdentityCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1ReportIdentityCommand(output, context);
    };
    return ReportIdentityCommand;
}($Command));
export { ReportIdentityCommand };
