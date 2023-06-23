// smithy-typescript generated code
import { KvServiceClient } from "./KvServiceClient";
import {
  DeleteBatchCommand,
  DeleteBatchCommandInput,
  DeleteBatchCommandOutput,
} from "./commands/DeleteBatchCommand";
import {
  DeleteCommand,
  DeleteCommandInput,
  DeleteCommandOutput,
} from "./commands/DeleteCommand";
import {
  GetBatchCommand,
  GetBatchCommandInput,
  GetBatchCommandOutput,
} from "./commands/GetBatchCommand";
import {
  GetCommand,
  GetCommandInput,
  GetCommandOutput,
} from "./commands/GetCommand";
import {
  PutBatchCommand,
  PutBatchCommandInput,
  PutBatchCommandOutput,
} from "./commands/PutBatchCommand";
import {
  PutCommand,
  PutCommandInput,
  PutCommandOutput,
} from "./commands/PutCommand";
import { HttpHandlerOptions as __HttpHandlerOptions } from "@aws-sdk/types";

export class KvService extends KvServiceClient {
  /**
   * Deletes a key-value entry by key.
   */
  public delete(
    args: DeleteCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<DeleteCommandOutput>;
  public delete(
    args: DeleteCommandInput,
    cb: (err: any, data?: DeleteCommandOutput) => void
  ): void;
  public delete(
    args: DeleteCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DeleteCommandOutput) => void
  ): void;
  public delete(
    args: DeleteCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: DeleteCommandOutput) => void),
    cb?: (err: any, data?: DeleteCommandOutput) => void
  ): Promise<DeleteCommandOutput> | void {
    const command = new DeleteCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb)
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object")
        throw new Error(`Expect http options but get ${typeof optionsOrCb}`)
      this.send(command, optionsOrCb || {}, cb)
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * Deletes multiple key-value entries by key(s).
   */
  public deleteBatch(
    args: DeleteBatchCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<DeleteBatchCommandOutput>;
  public deleteBatch(
    args: DeleteBatchCommandInput,
    cb: (err: any, data?: DeleteBatchCommandOutput) => void
  ): void;
  public deleteBatch(
    args: DeleteBatchCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DeleteBatchCommandOutput) => void
  ): void;
  public deleteBatch(
    args: DeleteBatchCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: DeleteBatchCommandOutput) => void),
    cb?: (err: any, data?: DeleteBatchCommandOutput) => void
  ): Promise<DeleteBatchCommandOutput> | void {
    const command = new DeleteBatchCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb)
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object")
        throw new Error(`Expect http options but get ${typeof optionsOrCb}`)
      this.send(command, optionsOrCb || {}, cb)
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * Returns a specific key-value entry by key.
   */
  public get(
    args: GetCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<GetCommandOutput>;
  public get(
    args: GetCommandInput,
    cb: (err: any, data?: GetCommandOutput) => void
  ): void;
  public get(
    args: GetCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetCommandOutput) => void
  ): void;
  public get(
    args: GetCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetCommandOutput) => void),
    cb?: (err: any, data?: GetCommandOutput) => void
  ): Promise<GetCommandOutput> | void {
    const command = new GetCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb)
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object")
        throw new Error(`Expect http options but get ${typeof optionsOrCb}`)
      this.send(command, optionsOrCb || {}, cb)
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * Gets multiple key-value entries by key(s).
   */
  public getBatch(
    args: GetBatchCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<GetBatchCommandOutput>;
  public getBatch(
    args: GetBatchCommandInput,
    cb: (err: any, data?: GetBatchCommandOutput) => void
  ): void;
  public getBatch(
    args: GetBatchCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetBatchCommandOutput) => void
  ): void;
  public getBatch(
    args: GetBatchCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetBatchCommandOutput) => void),
    cb?: (err: any, data?: GetBatchCommandOutput) => void
  ): Promise<GetBatchCommandOutput> | void {
    const command = new GetBatchCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb)
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object")
        throw new Error(`Expect http options but get ${typeof optionsOrCb}`)
      this.send(command, optionsOrCb || {}, cb)
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * Puts (sets or overwrites) a key-value entry by key.
   */
  public put(
    args: PutCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<PutCommandOutput>;
  public put(
    args: PutCommandInput,
    cb: (err: any, data?: PutCommandOutput) => void
  ): void;
  public put(
    args: PutCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: PutCommandOutput) => void
  ): void;
  public put(
    args: PutCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: PutCommandOutput) => void),
    cb?: (err: any, data?: PutCommandOutput) => void
  ): Promise<PutCommandOutput> | void {
    const command = new PutCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb)
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object")
        throw new Error(`Expect http options but get ${typeof optionsOrCb}`)
      this.send(command, optionsOrCb || {}, cb)
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * Puts (sets or overwrites) multiple key-value entries by key(s).
   */
  public putBatch(
    args: PutBatchCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<PutBatchCommandOutput>;
  public putBatch(
    args: PutBatchCommandInput,
    cb: (err: any, data?: PutBatchCommandOutput) => void
  ): void;
  public putBatch(
    args: PutBatchCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: PutBatchCommandOutput) => void
  ): void;
  public putBatch(
    args: PutBatchCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: PutBatchCommandOutput) => void),
    cb?: (err: any, data?: PutBatchCommandOutput) => void
  ): Promise<PutBatchCommandOutput> | void {
    const command = new PutBatchCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb)
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object")
        throw new Error(`Expect http options but get ${typeof optionsOrCb}`)
      this.send(command, optionsOrCb || {}, cb)
    } else {
      return this.send(command, optionsOrCb);
    }
  }

}
