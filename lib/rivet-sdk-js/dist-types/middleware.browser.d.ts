import { HttpHandler } from '@aws-sdk/protocol-http';
export declare function requestHandlerMiddleware(token?: string | (() => string) | (() => Promise<string>), init?: RequestInit): HttpHandler;
