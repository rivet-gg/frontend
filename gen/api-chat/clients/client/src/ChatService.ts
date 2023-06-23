// smithy-typescript generated code
import { ChatServiceClient } from "./ChatServiceClient";
import {
  GetDirectThreadCommand,
  GetDirectThreadCommandInput,
  GetDirectThreadCommandOutput,
} from "./commands/GetDirectThreadCommand";
import {
  GetThreadHistoryCommand,
  GetThreadHistoryCommandInput,
  GetThreadHistoryCommandOutput,
} from "./commands/GetThreadHistoryCommand";
import {
  GetThreadTopicCommand,
  GetThreadTopicCommandInput,
  GetThreadTopicCommandOutput,
} from "./commands/GetThreadTopicCommand";
import {
  SendChatMessageCommand,
  SendChatMessageCommandInput,
  SendChatMessageCommandOutput,
} from "./commands/SendChatMessageCommand";
import {
  SetThreadReadCommand,
  SetThreadReadCommandInput,
  SetThreadReadCommandOutput,
} from "./commands/SetThreadReadCommand";
import {
  SetTypingStatusCommand,
  SetTypingStatusCommandInput,
  SetTypingStatusCommandOutput,
} from "./commands/SetTypingStatusCommand";
import {
  WatchThreadCommand,
  WatchThreadCommandInput,
  WatchThreadCommandOutput,
} from "./commands/WatchThreadCommand";
import { HttpHandlerOptions as __HttpHandlerOptions } from "@aws-sdk/types";

export class ChatService extends ChatServiceClient {
  /**
   * Returns a thread ID with a given identity.
   */
  public getDirectThread(
    args: GetDirectThreadCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<GetDirectThreadCommandOutput>;
  public getDirectThread(
    args: GetDirectThreadCommandInput,
    cb: (err: any, data?: GetDirectThreadCommandOutput) => void
  ): void;
  public getDirectThread(
    args: GetDirectThreadCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetDirectThreadCommandOutput) => void
  ): void;
  public getDirectThread(
    args: GetDirectThreadCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetDirectThreadCommandOutput) => void),
    cb?: (err: any, data?: GetDirectThreadCommandOutput) => void
  ): Promise<GetDirectThreadCommandOutput> | void {
    const command = new GetDirectThreadCommand(args);
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
   * Returns message history for a given thread in a certain direction.
   *
   * Defaults to querying messages before ts.
   */
  public getThreadHistory(
    args: GetThreadHistoryCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<GetThreadHistoryCommandOutput>;
  public getThreadHistory(
    args: GetThreadHistoryCommandInput,
    cb: (err: any, data?: GetThreadHistoryCommandOutput) => void
  ): void;
  public getThreadHistory(
    args: GetThreadHistoryCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetThreadHistoryCommandOutput) => void
  ): void;
  public getThreadHistory(
    args: GetThreadHistoryCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetThreadHistoryCommandOutput) => void),
    cb?: (err: any, data?: GetThreadHistoryCommandOutput) => void
  ): Promise<GetThreadHistoryCommandOutput> | void {
    const command = new GetThreadHistoryCommand(args);
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
   * Fetches the topic of a thread.
   */
  public getThreadTopic(
    args: GetThreadTopicCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<GetThreadTopicCommandOutput>;
  public getThreadTopic(
    args: GetThreadTopicCommandInput,
    cb: (err: any, data?: GetThreadTopicCommandOutput) => void
  ): void;
  public getThreadTopic(
    args: GetThreadTopicCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetThreadTopicCommandOutput) => void
  ): void;
  public getThreadTopic(
    args: GetThreadTopicCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetThreadTopicCommandOutput) => void),
    cb?: (err: any, data?: GetThreadTopicCommandOutput) => void
  ): Promise<GetThreadTopicCommandOutput> | void {
    const command = new GetThreadTopicCommand(args);
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
   * Sends a chat message to a given topic.
   */
  public sendChatMessage(
    args: SendChatMessageCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<SendChatMessageCommandOutput>;
  public sendChatMessage(
    args: SendChatMessageCommandInput,
    cb: (err: any, data?: SendChatMessageCommandOutput) => void
  ): void;
  public sendChatMessage(
    args: SendChatMessageCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: SendChatMessageCommandOutput) => void
  ): void;
  public sendChatMessage(
    args: SendChatMessageCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: SendChatMessageCommandOutput) => void),
    cb?: (err: any, data?: SendChatMessageCommandOutput) => void
  ): Promise<SendChatMessageCommandOutput> | void {
    const command = new SendChatMessageCommand(args);
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
   * Updates the current identity's last read timestamp in the given thread.
   */
  public setThreadRead(
    args: SetThreadReadCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<SetThreadReadCommandOutput>;
  public setThreadRead(
    args: SetThreadReadCommandInput,
    cb: (err: any, data?: SetThreadReadCommandOutput) => void
  ): void;
  public setThreadRead(
    args: SetThreadReadCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: SetThreadReadCommandOutput) => void
  ): void;
  public setThreadRead(
    args: SetThreadReadCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: SetThreadReadCommandOutput) => void),
    cb?: (err: any, data?: SetThreadReadCommandOutput) => void
  ): Promise<SetThreadReadCommandOutput> | void {
    const command = new SetThreadReadCommand(args);
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
   * Updates the current identity's typing status in the given thread.
   */
  public setTypingStatus(
    args: SetTypingStatusCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<SetTypingStatusCommandOutput>;
  public setTypingStatus(
    args: SetTypingStatusCommandInput,
    cb: (err: any, data?: SetTypingStatusCommandOutput) => void
  ): void;
  public setTypingStatus(
    args: SetTypingStatusCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: SetTypingStatusCommandOutput) => void
  ): void;
  public setTypingStatus(
    args: SetTypingStatusCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: SetTypingStatusCommandOutput) => void),
    cb?: (err: any, data?: SetTypingStatusCommandOutput) => void
  ): Promise<SetTypingStatusCommandOutput> | void {
    const command = new SetTypingStatusCommand(args);
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
   * Fetches all relevant changes from a thread that have happened since the
   * given watch index.
   */
  public watchThread(
    args: WatchThreadCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<WatchThreadCommandOutput>;
  public watchThread(
    args: WatchThreadCommandInput,
    cb: (err: any, data?: WatchThreadCommandOutput) => void
  ): void;
  public watchThread(
    args: WatchThreadCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: WatchThreadCommandOutput) => void
  ): void;
  public watchThread(
    args: WatchThreadCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: WatchThreadCommandOutput) => void),
    cb?: (err: any, data?: WatchThreadCommandOutput) => void
  ): Promise<WatchThreadCommandOutput> | void {
    const command = new WatchThreadCommand(args);
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
