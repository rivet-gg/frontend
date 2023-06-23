// smithy-typescript generated code
import { KvServiceServiceException as __BaseException } from "./KvServiceServiceException";
import { ExceptionOptionType as __ExceptionOptionType } from "@aws-sdk/smithy-client";
import { DocumentType as __DocumentType } from "@aws-sdk/types";

export interface DeleteBatchOutput {
}

export namespace DeleteBatchOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: DeleteBatchOutput): any => ({
    ...obj,
  })
}

export interface DeleteBatchRequest {
  /**
   * A list of keys.
   */
  keys: (string)[] | undefined;

  /**
   * A universally unique identifier.
   */
  namespaceId?: string;
}

export namespace DeleteBatchRequest {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: DeleteBatchRequest): any => ({
    ...obj,
  })
}

/**
 * A key-value entry.
 */
export interface KvEntry {
  /**
   * A key separated into components.
   */
  key: (string)[] | undefined;

  value?: __DocumentType;
  deleted?: boolean;
}

export namespace KvEntry {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: KvEntry): any => ({
    ...obj,
  })
}

/**
 * Provided by watchable endpoints used in blocking loops.
 */
export interface WatchResponse {
  /**
   * Index indicating the version of the data responded.
   *
   * Pas this to `rivet.common#WatchQuery` to block and wait for the next response.
   */
  index: string | undefined;
}

export namespace WatchResponse {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: WatchResponse): any => ({
    ...obj,
  })
}

export interface GetBatchOutput {
  /**
   * A list of key-value entries.
   */
  entries: (KvEntry)[] | undefined;

  /**
   * Provided by watchable endpoints used in blocking loops.
   */
  watch: WatchResponse | undefined;
}

export namespace GetBatchOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: GetBatchOutput): any => ({
    ...obj,
  })
}

export interface GetBatchRequest {
  /**
   * A list of keys.
   */
  keys: (string)[] | undefined;

  /**
   * A query parameter denoting the requests watch index.
   */
  watchIndex?: string;

  /**
   * A universally unique identifier.
   */
  namespaceId?: string;
}

export namespace GetBatchRequest {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: GetBatchRequest): any => ({
    ...obj,
  })
}

export interface PutBatchOutput {
}

export namespace PutBatchOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: PutBatchOutput): any => ({
    ...obj,
  })
}

/**
 * A new entry to insert into the key-value database.
 */
export interface PutEntry {
  /**
   * A string reprenting a key in the key-value database.
   *
   * Key path components are split by a slash (e.g. `a/b/c` has the path
   * components `["a", "b", "c"]`). Slashes can be escaped by using a forward
   * slash (e.g. `a/b\/c/d` has the path components `["a", "b/c", "d"]`).
   *
   * See `rivet.api.kv.common#KeyComponents` for the structure of a
   * `rivet.api.kv.common#Key` split by `/`.
   */
  key: string | undefined;

  value: __DocumentType | undefined;
}

export namespace PutEntry {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: PutEntry): any => ({
    ...obj,
  })
}

export interface PutBatchRequest {
  /**
   * A universally unique identifier.
   */
  namespaceId?: string;

  /**
   * A list of entries to insert.
   */
  entries: (PutEntry)[] | undefined;
}

export namespace PutBatchRequest {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: PutBatchRequest): any => ({
    ...obj,
  })
}

export interface DeleteInput {
  /**
   * A string reprenting a key in the key-value database.
   *
   * Key path components are split by a slash (e.g. `a/b/c` has the path
   * components `["a", "b", "c"]`). Slashes can be escaped by using a forward
   * slash (e.g. `a/b\/c/d` has the path components `["a", "b/c", "d"]`).
   *
   * See `rivet.api.kv.common#KeyComponents` for the structure of a
   * `rivet.api.kv.common#Key` split by `/`.
   */
  key: string | undefined;

  /**
   * A universally unique identifier.
   */
  namespaceId?: string;
}

export namespace DeleteInput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: DeleteInput): any => ({
    ...obj,
  })
}

export interface DeleteOutput {
}

export namespace DeleteOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: DeleteOutput): any => ({
    ...obj,
  })
}

export interface GetInput {
  /**
   * A string reprenting a key in the key-value database.
   *
   * Key path components are split by a slash (e.g. `a/b/c` has the path
   * components `["a", "b", "c"]`). Slashes can be escaped by using a forward
   * slash (e.g. `a/b\/c/d` has the path components `["a", "b/c", "d"]`).
   *
   * See `rivet.api.kv.common#KeyComponents` for the structure of a
   * `rivet.api.kv.common#Key` split by `/`.
   */
  key: string | undefined;

  /**
   * A query parameter denoting the requests watch index.
   */
  watchIndex?: string;

  /**
   * A universally unique identifier.
   */
  namespaceId?: string;
}

export namespace GetInput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: GetInput): any => ({
    ...obj,
  })
}

export interface GetOutput {
  /**
   * The key's JSON value.
   */
  value?: __DocumentType;

  /**
   * Whether or not the entry has been deleted. Only set when watching this endpoint.
   */
  deleted?: boolean;

  /**
   * Provided by watchable endpoints used in blocking loops.
   */
  watch: WatchResponse | undefined;
}

export namespace GetOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: GetOutput): any => ({
    ...obj,
  })
}

export interface PutInput {
  /**
   * A universally unique identifier.
   */
  namespaceId?: string;

  /**
   * Any JSON value to set the key to.
   */
  key: string | undefined;

  value: __DocumentType | undefined;
}

export namespace PutInput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: PutInput): any => ({
    ...obj,
  })
}

export interface PutOutput {
}

export namespace PutOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: PutOutput): any => ({
    ...obj,
  })
}

/**
 * An error thrown when the requestee has sent an invalid or malformed request.
 */
export class BadRequestError extends __BaseException {
  readonly name: "BadRequestError" = "BadRequestError";
  readonly $fault: "client" = "client";
  code: string | undefined;
  documentation?: string;
  /**
   * Unstructured metadata relating to an error. Must be manually parsed.
   */
  metadata?: __DocumentType;

  /**
   * @internal
   */
  constructor(opts: __ExceptionOptionType<BadRequestError, __BaseException>) {
    super({
      name: "BadRequestError",
      $fault: "client",
      ...opts
    });
    Object.setPrototypeOf(this, BadRequestError.prototype);
    this.code = opts.code;
    this.documentation = opts.documentation;
    this.metadata = opts.metadata;
  }
}

/**
 * An error thrown when the requestee requests a resource they do not have access to.
 */
export class ForbiddenError extends __BaseException {
  readonly name: "ForbiddenError" = "ForbiddenError";
  readonly $fault: "client" = "client";
  code: string | undefined;
  documentation?: string;
  /**
   * Unstructured metadata relating to an error. Must be manually parsed.
   */
  metadata?: __DocumentType;

  /**
   * @internal
   */
  constructor(opts: __ExceptionOptionType<ForbiddenError, __BaseException>) {
    super({
      name: "ForbiddenError",
      $fault: "client",
      ...opts
    });
    Object.setPrototypeOf(this, ForbiddenError.prototype);
    this.code = opts.code;
    this.documentation = opts.documentation;
    this.metadata = opts.metadata;
  }
}

/**
 * An error caused by internal server problems.
 */
export class InternalError extends __BaseException {
  readonly name: "InternalError" = "InternalError";
  readonly $fault: "server" = "server";
  $retryable = {
  };
  code: string | undefined;
  documentation?: string;
  /**
   * Unstructured metadata relating to an error. Must be manually parsed.
   */
  metadata?: __DocumentType;

  /**
   * @internal
   */
  constructor(opts: __ExceptionOptionType<InternalError, __BaseException>) {
    super({
      name: "InternalError",
      $fault: "server",
      ...opts
    });
    Object.setPrototypeOf(this, InternalError.prototype);
    this.code = opts.code;
    this.documentation = opts.documentation;
    this.metadata = opts.metadata;
  }
}

/**
 * An error thrown when the requestee requests a non existant resource.
 */
export class NotFoundError extends __BaseException {
  readonly name: "NotFoundError" = "NotFoundError";
  readonly $fault: "client" = "client";
  code: string | undefined;
  documentation?: string;
  /**
   * Unstructured metadata relating to an error. Must be manually parsed.
   */
  metadata?: __DocumentType;

  /**
   * @internal
   */
  constructor(opts: __ExceptionOptionType<NotFoundError, __BaseException>) {
    super({
      name: "NotFoundError",
      $fault: "client",
      ...opts
    });
    Object.setPrototypeOf(this, NotFoundError.prototype);
    this.code = opts.code;
    this.documentation = opts.documentation;
    this.metadata = opts.metadata;
  }
}

/**
 * An error thrown when the requestee has hit a rate limit. You are sending too many requests too quickly.
 */
export class RateLimitError extends __BaseException {
  readonly name: "RateLimitError" = "RateLimitError";
  readonly $fault: "client" = "client";
  code: string | undefined;
  documentation?: string;
  /**
   * Unstructured metadata relating to an error. Must be manually parsed.
   */
  metadata?: __DocumentType;

  /**
   * @internal
   */
  constructor(opts: __ExceptionOptionType<RateLimitError, __BaseException>) {
    super({
      name: "RateLimitError",
      $fault: "client",
      ...opts
    });
    Object.setPrototypeOf(this, RateLimitError.prototype);
    this.code = opts.code;
    this.documentation = opts.documentation;
    this.metadata = opts.metadata;
  }
}

/**
 * An error thrown when the requestee is not authenticated.
 */
export class UnauthorizedError extends __BaseException {
  readonly name: "UnauthorizedError" = "UnauthorizedError";
  readonly $fault: "client" = "client";
  $retryable = {
  };
  code: string | undefined;
  documentation?: string;
  /**
   * Unstructured metadata relating to an error. Must be manually parsed.
   */
  metadata?: __DocumentType;

  /**
   * @internal
   */
  constructor(opts: __ExceptionOptionType<UnauthorizedError, __BaseException>) {
    super({
      name: "UnauthorizedError",
      $fault: "client",
      ...opts
    });
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
    this.code = opts.code;
    this.documentation = opts.documentation;
    this.metadata = opts.metadata;
  }
}
