import { CloudServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudServiceClient";
import { CreateGameInput, CreateGameOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface CreateGameCommandInput extends CreateGameInput {
}
export interface CreateGameCommandOutput extends CreateGameOutput, __MetadataBearer {
}
/**
 * Creates a new game.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { CloudServiceClient, CreateGameCommand } from "@rivet-gg/cloud"; // ES Modules import
 * // const { CloudServiceClient, CreateGameCommand } = require("@rivet-gg/cloud"); // CommonJS import
 * const client = new CloudServiceClient(config);
 * const command = new CreateGameCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link CreateGameCommandInput} for command's `input` shape.
 * @see {@link CreateGameCommandOutput} for command's `response` shape.
 * @see {@link CloudServiceClientResolvedConfig | config} for CloudServiceClient's `config` shape.
 *
 */
export declare class CreateGameCommand extends $Command<CreateGameCommandInput, CreateGameCommandOutput, CloudServiceClientResolvedConfig> {
    readonly input: CreateGameCommandInput;
    constructor(input: CreateGameCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: CloudServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<CreateGameCommandInput, CreateGameCommandOutput>;
    private serialize;
    private deserialize;
}
