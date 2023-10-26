// TODO: Docs

import { HttpRequest, HttpHandler } from '@aws-sdk/protocol-http';
import { HttpHandlerOptions, HeaderBag } from '@aws-sdk/types';
import { AbortSignal as __AbortSignal } from '@aws-sdk/types';
import { default as nodeFetch } from 'node-fetch';

export function requestHandlerMiddleware(
	token: string | (() => string) | (() => Promise<string>) = undefined,
	init: RequestInit = { credentials: 'omit' }
): HttpHandler {
	if (typeof window !== 'undefined') {
		console.warn('Using NodeJs handler middleware in a browser environment');
	}

	return {
		handle: async (req: HttpRequest, opts?: HttpHandlerOptions) => {
			let auth: string;

			// Parse bearer token
			if (typeof token == 'string') {
				auth = token;
			} else if (typeof token == 'function') {
				let res = token();

				if (res instanceof Promise) auth = await res;
				else auth = res;
			}

			// Clear AWS headers
			req.headers = Object.fromEntries(
				Object.entries(req.headers).filter(
					([key]) => !key.startsWith('amz-') && !key.startsWith('x-amz-')
				)
			);

			if (auth) req.headers.Authorization = `Bearer ${auth}`;

			// Default body
			if (!req.body) {
				if (req.method == 'GET' || req.method == 'HEAD') req.body = undefined;
				else if (req.method == 'POST') req.body = '{}';
			}

			let queryParameters = req.query ? Object.entries(req.query) : [];
			let query = queryParameters
				.flatMap(([k, v]) => {
					// List: ?list=1&list=2&list=3
					if (v instanceof Array) {
						return v.map(vi => `${k}=${encodeURIComponent(vi)}`);
					}
					// Single item: ?item1=1&item2=2
					else {
						return [`${k}=${encodeURIComponent(v)}`];
					}
				})
				.join('&');
			let uri = `${req.protocol}//${req.hostname}${req.port ? `:${req.port}` : ''}${req.path}${
				query ? `?${query}` : ''
			}`;

			let res = await nodeFetch(
				uri,
				Object.assign(req, init, {
					// MARK: see abort controller mark in repeating-request.ts
					signal: opts.abortSignal as any
				})
			);

			return {
				response: {
					statusCode: res.status,
					// Needs a Readable stream. node-fetch already provides a Readable stream by default.
					body: await res.body,
					headers: Array.from(res.headers.entries()).reduce((s, [k, v]) => {
						s[k] = v;
						return s;
					}, {} as HeaderBag)
				}
			};
		}
	};
}
