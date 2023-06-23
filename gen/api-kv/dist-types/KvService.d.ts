import { KvServiceClient } from "./KvServiceClient";
import { DeleteBatchCommandInput, DeleteBatchCommandOutput } from "./commands/DeleteBatchCommand";
import { DeleteCommandInput, DeleteCommandOutput } from "./commands/DeleteCommand";
import { GetBatchCommandInput, GetBatchCommandOutput } from "./commands/GetBatchCommand";
import { GetCommandInput, GetCommandOutput } from "./commands/GetCommand";
import { PutBatchCommandInput, PutBatchCommandOutput } from "./commands/PutBatchCommand";
import { PutCommandInput, PutCommandOutput } from "./commands/PutCommand";
import { HttpHandlerOptions as __HttpHandlerOptions } from "@aws-sdk/types";
export declare class KvService extends KvServiceClient {
    /**
     * Deletes a key-value entry by key.
     */
    delete(args: DeleteCommandInput, options?: __HttpHandlerOptions): Promise<DeleteCommandOutput>;
    delete(args: DeleteCommandInput, cb: (err: any, data?: DeleteCommandOutput) => void): void;
    delete(args: DeleteCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: DeleteCommandOutput) => void): void;
    /**
     * Deletes multiple key-value entries by key(s).
     */
    deleteBatch(args: DeleteBatchCommandInput, options?: __HttpHandlerOptions): Promise<DeleteBatchCommandOutput>;
    deleteBatch(args: DeleteBatchCommandInput, cb: (err: any, data?: DeleteBatchCommandOutput) => void): void;
    deleteBatch(args: DeleteBatchCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: DeleteBatchCommandOutput) => void): void;
    /**
     * Returns a specific key-value entry by key.
     */
    get(args: GetCommandInput, options?: __HttpHandlerOptions): Promise<GetCommandOutput>;
    get(args: GetCommandInput, cb: (err: any, data?: GetCommandOutput) => void): void;
    get(args: GetCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: GetCommandOutput) => void): void;
    /**
     * Gets multiple key-value entries by key(s).
     */
    getBatch(args: GetBatchCommandInput, options?: __HttpHandlerOptions): Promise<GetBatchCommandOutput>;
    getBatch(args: GetBatchCommandInput, cb: (err: any, data?: GetBatchCommandOutput) => void): void;
    getBatch(args: GetBatchCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: GetBatchCommandOutput) => void): void;
    /**
     * Puts (sets or overwrites) a key-value entry by key.
     */
    put(args: PutCommandInput, options?: __HttpHandlerOptions): Promise<PutCommandOutput>;
    put(args: PutCommandInput, cb: (err: any, data?: PutCommandOutput) => void): void;
    put(args: PutCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: PutCommandOutput) => void): void;
    /**
     * Puts (sets or overwrites) multiple key-value entries by key(s).
     */
    putBatch(args: PutBatchCommandInput, options?: __HttpHandlerOptions): Promise<PutBatchCommandOutput>;
    putBatch(args: PutBatchCommandInput, cb: (err: any, data?: PutBatchCommandOutput) => void): void;
    putBatch(args: PutBatchCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: PutBatchCommandOutput) => void): void;
}
