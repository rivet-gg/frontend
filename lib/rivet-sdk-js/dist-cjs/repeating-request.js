"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepeatingRequest = void 0;
class RepeatingRequest {
    constructor(cb, opts) {
        this.active = true;
        this.watchIndex = null;
        this.abortController = new AbortController();
        this.messageHandlers = [];
        this.errorHandlers = [];
        this.delay = 0;
        this.cb = cb;
        this.opts = Object.assign({
            cancelOnError: true,
            cancelOnNoWatchIndex: true,
            noWatchIndexDelay: 2000,
            watchIndex: undefined,
            pauseOnCreation: false
        }, opts);
        if (this.opts.watchIndex !== undefined && this.opts.watchIndex !== null)
            this.parseWatchResponse(this.opts.watchIndex);
        if (!this.opts.pauseOnCreation)
            this.repeat();
    }
    async repeat() {
        var _a;
        while (this.active) {
            if (this.delay)
                await this.wait();
            try {
                let res = await this.cb(this.abortController.signal, (_a = this.watchIndex) !== null && _a !== void 0 ? _a : undefined);
                this.handleMessage(res);
                this.parseWatchResponse(res.watch);
            }
            catch (e) {
                if (e instanceof DOMException && e.name == 'AbortError')
                    return;
                if (this.opts.cancelOnError)
                    this.cancel();
                this.handleErrors(e);
            }
        }
    }
    async wait() {
        let delay = this.delay;
        this.delay = 0;
        await new Promise(resolve => setTimeout(resolve, delay));
    }
    onMessage(cb) {
        this.messageHandlers.push(cb);
    }
    onError(cb) {
        this.errorHandlers.push(cb);
    }
    cancel() {
        this.abortController.abort();
        this.active = false;
    }
    start() {
        if (!this.active) {
            this.abortController = new AbortController();
            this.active = true;
            this.repeat();
        }
    }
    removeMessageHandler(cb) {
        let index = this.messageHandlers.indexOf(cb);
        if (index != -1)
            this.messageHandlers.splice(index, 1);
    }
    handleMessage(message) {
        this.messageHandlers.forEach(cb => cb(message));
    }
    handleErrors(e) {
        this.errorHandlers.forEach(cb => cb(e));
        if (this.errorHandlers.length == 0)
            console.error('Unhandled repeating request error', e);
    }
    parseWatchResponse(watchResponse) {
        if (!(watchResponse === null || watchResponse === void 0 ? void 0 : watchResponse.index)) {
            if (this.opts.cancelOnNoWatchIndex) {
                console.error('Blocking request has no watch response');
                this.cancel();
            }
            else
                this.delay = this.opts.noWatchIndexDelay;
        }
        else {
            this.watchIndex = watchResponse.index;
        }
    }
}
exports.RepeatingRequest = RepeatingRequest;
