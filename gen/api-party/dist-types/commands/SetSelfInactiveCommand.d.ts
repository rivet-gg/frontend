import { PartyServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../PartyServiceClient";
import { SetSelfInactiveInput, SetSelfInactiveOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface SetSelfInactiveCommandInput extends SetSelfInactiveInput {
}
export interface SetSelfInactiveCommandOutput extends SetSelfInactiveOutput, __MetadataBearer {
}
export declare class SetSelfInactiveCommand extends $Command<SetSelfInactiveCommandInput, SetSelfInactiveCommandOutput, PartyServiceClientResolvedConfig> {
    readonly input: SetSelfInactiveCommandInput;
    constructor(input: SetSelfInactiveCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: PartyServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<SetSelfInactiveCommandInput, SetSelfInactiveCommandOutput>;
    private serialize;
    private deserialize;
}
