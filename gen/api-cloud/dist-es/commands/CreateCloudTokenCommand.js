import { __extends } from "tslib";
import { CreateCloudTokenInput, CreateCloudTokenOutput, } from "../models/models_0";
import { deserializeAws_restJson1CreateCloudTokenCommand, serializeAws_restJson1CreateCloudTokenCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var CreateCloudTokenCommand = (function (_super) {
    __extends(CreateCloudTokenCommand, _super);
    function CreateCloudTokenCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    CreateCloudTokenCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "CloudServiceClient";
        var commandName = "CreateCloudTokenCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: CreateCloudTokenInput.filterSensitiveLog,
            outputFilterSensitiveLog: CreateCloudTokenOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    CreateCloudTokenCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1CreateCloudTokenCommand(input, context);
    };
    CreateCloudTokenCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1CreateCloudTokenCommand(output, context);
    };
    return CreateCloudTokenCommand;
}($Command));
export { CreateCloudTokenCommand };
