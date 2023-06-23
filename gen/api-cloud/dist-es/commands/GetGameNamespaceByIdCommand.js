import { __extends } from "tslib";
import { GetGameNamespaceByIdInput, GetGameNamespaceByIdOutput, } from "../models/models_0";
import { deserializeAws_restJson1GetGameNamespaceByIdCommand, serializeAws_restJson1GetGameNamespaceByIdCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var GetGameNamespaceByIdCommand = (function (_super) {
    __extends(GetGameNamespaceByIdCommand, _super);
    function GetGameNamespaceByIdCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    GetGameNamespaceByIdCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "CloudServiceClient";
        var commandName = "GetGameNamespaceByIdCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: GetGameNamespaceByIdInput.filterSensitiveLog,
            outputFilterSensitiveLog: GetGameNamespaceByIdOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    GetGameNamespaceByIdCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1GetGameNamespaceByIdCommand(input, context);
    };
    GetGameNamespaceByIdCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1GetGameNamespaceByIdCommand(output, context);
    };
    return GetGameNamespaceByIdCommand;
}($Command));
export { GetGameNamespaceByIdCommand };
