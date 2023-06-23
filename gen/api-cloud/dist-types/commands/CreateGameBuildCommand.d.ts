import { CloudServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudServiceClient";
import { CreateGameBuildInput, CreateGameBuildOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface CreateGameBuildCommandInput extends CreateGameBuildInput {
}
export interface CreateGameBuildCommandOutput extends CreateGameBuildOutput, __MetadataBearer {
}
/**
 * Creates a new game build for the given game.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { CloudServiceClient, CreateGameBuildCommand } from "@rivet-gg/cloud"; // ES Modules import
 * // const { CloudServiceClient, CreateGameBuildCommand } = require("@rivet-gg/cloud"); // CommonJS import
 * const client = new CloudServiceClient(config);
 * const command = new CreateGameBuildCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link CreateGameBuildCommandInput} for command's `input` shape.
 * @see {@link CreateGameBuildCommandOutput} for command's `response` shape.
 * @see {@link CloudServiceClientResolvedConfig | config} for CloudServiceClient's `config` shape.
 *
 */
export declare class CreateGameBuildCommand extends $Command<CreateGameBuildCommandInput, CreateGameBuildCommandOutput, CloudServiceClientResolvedConfig> {
    readonly input: CreateGameBuildCommandInput;
    constructor(input: CreateGameBuildCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: CloudServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<CreateGameBuildCommandInput, CreateGameBuildCommandOutput>;
    private serialize;
    private deserialize;
}
