import { KvServiceServiceException as __BaseException } from "./KvServiceServiceException";
import { ExceptionOptionType as __ExceptionOptionType } from "@aws-sdk/smithy-client";
import { DocumentType as __DocumentType } from "@aws-sdk/types";
export interface DeleteBatchOutput {
}
export declare namespace DeleteBatchOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: DeleteBatchOutput) => any;
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
export declare namespace DeleteBatchRequest {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: DeleteBatchRequest) => any;
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
export declare namespace KvEntry {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: KvEntry) => any;
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
export declare namespace WatchResponse {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: WatchResponse) => any;
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
export declare namespace GetBatchOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: GetBatchOutput) => any;
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
export declare namespace GetBatchRequest {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: GetBatchRequest) => any;
}
export interface PutBatchOutput {
}
export declare namespace PutBatchOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: PutBatchOutput) => any;
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
export declare namespace PutEntry {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: PutEntry) => any;
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
export declare namespace PutBatchRequest {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: PutBatchRequest) => any;
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
export declare namespace DeleteInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: DeleteInput) => any;
}
export interface DeleteOutput {
}
export declare namespace DeleteOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: DeleteOutput) => any;
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
export declare namespace GetInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: GetInput) => any;
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
export declare namespace GetOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: GetOutput) => any;
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
export declare namespace PutInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: PutInput) => any;
}
export interface PutOutput {
}
export declare namespace PutOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: PutOutput) => any;
}
/**
 * An error thrown when the requestee has sent an invalid or malformed request.
 */
export declare class BadRequestError extends __BaseException {
    readonly name: "BadRequestError";
    readonly $fault: "client";
    code: string | undefined;
    documentation?: string;
    /**
     * Unstructured metadata relating to an error. Must be manually parsed.
     */
    metadata?: __DocumentType;
    /**
     * @internal
     */
    constructor(opts: __ExceptionOptionType<BadRequestError, __BaseException>);
}
/**
 * An error thrown when the requestee requests a resource they do not have access to.
 */
export declare class ForbiddenError extends __BaseException {
    readonly name: "ForbiddenError";
    readonly $fault: "client";
    code: string | undefined;
    documentation?: string;
    /**
     * Unstructured metadata relating to an error. Must be manually parsed.
     */
    metadata?: __DocumentType;
    /**
     * @internal
     */
    constructor(opts: __ExceptionOptionType<ForbiddenError, __BaseException>);
}
/**
 * An error caused by internal server problems.
 */
export declare class InternalError extends __BaseException {
    readonly name: "InternalError";
    readonly $fault: "server";
    $retryable: {};
    code: string | undefined;
    documentation?: string;
    /**
     * Unstructured metadata relating to an error. Must be manually parsed.
     */
    metadata?: __DocumentType;
    /**
     * @internal
     */
    constructor(opts: __ExceptionOptionType<InternalError, __BaseException>);
}
/**
 * An error thrown when the requestee requests a non existant resource.
 */
export declare class NotFoundError extends __BaseException {
    readonly name: "NotFoundError";
    readonly $fault: "client";
    code: string | undefined;
    documentation?: string;
    /**
     * Unstructured metadata relating to an error. Must be manually parsed.
     */
    metadata?: __DocumentType;
    /**
     * @internal
     */
    constructor(opts: __ExceptionOptionType<NotFoundError, __BaseException>);
}
/**
 * An error thrown when the requestee has hit a rate limit. You are sending too many requests too quickly.
 */
export declare class RateLimitError extends __BaseException {
    readonly name: "RateLimitError";
    readonly $fault: "client";
    code: string | undefined;
    documentation?: string;
    /**
     * Unstructured metadata relating to an error. Must be manually parsed.
     */
    metadata?: __DocumentType;
    /**
     * @internal
     */
    constructor(opts: __ExceptionOptionType<RateLimitError, __BaseException>);
}
/**
 * An error thrown when the requestee is not authenticated.
 */
export declare class UnauthorizedError extends __BaseException {
    readonly name: "UnauthorizedError";
    readonly $fault: "client";
    $retryable: {};
    code: string | undefined;
    documentation?: string;
    /**
     * Unstructured metadata relating to an error. Must be manually parsed.
     */
    metadata?: __DocumentType;
    /**
     * @internal
     */
    constructor(opts: __ExceptionOptionType<UnauthorizedError, __BaseException>);
}
