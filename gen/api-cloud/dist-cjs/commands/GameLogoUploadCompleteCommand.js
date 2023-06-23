"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameLogoUploadCompleteCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_restJson1_1 = require("../protocols/Aws_restJson1");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
class GameLogoUploadCompleteCommand extends smithy_client_1.Command {
    constructor(input) {
        super();
        this.input = input;
    }
    resolveMiddleware(clientStack, configuration, options) {
        this.middlewareStack.use((0, middleware_serde_1.getSerdePlugin)(configuration, this.serialize, this.deserialize));
        const stack = clientStack.concat(this.middlewareStack);
        const { logger } = configuration;
        const clientName = "CloudServiceClient";
        const commandName = "GameLogoUploadCompleteCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.GameLogoUploadCompleteInput.filterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.GameLogoUploadCompleteOutput.filterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return (0, Aws_restJson1_1.serializeAws_restJson1GameLogoUploadCompleteCommand)(input, context);
    }
    deserialize(output, context) {
        return (0, Aws_restJson1_1.deserializeAws_restJson1GameLogoUploadCompleteCommand)(output, context);
    }
}
exports.GameLogoUploadCompleteCommand = GameLogoUploadCompleteCommand;
