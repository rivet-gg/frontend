"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameLinkingContext = exports.IdentityManager = exports.IdentityManagerBuilder = void 0;
const models_1 = require("./models");
const IdentityService_1 = require("./IdentityService");
const common_1 = require("@rivet-gg/common");
class IdentityManagerBuilder {
    constructor() {
        this.config = {};
    }
    withToken(token) {
        this.config.token = token;
        return this;
    }
    withEndpoint(endpoint) {
        this.config.endpoint = endpoint;
        return this;
    }
    withService(service) {
        this.config.service = service;
        return this;
    }
    onIdentityUpdate(handler) {
        this.config.identityUpdateHandler = handler;
        return this;
    }
    onChatMessage(handler) {
        this.config.chatMessageHandler = handler;
        return this;
    }
    onPartyUpdate(handler) {
        this.config.partyUpdateHandler = handler;
        return this;
    }
    onMatchmakerLobbyJoin(handler) {
        this.config.matchmakerLobbyJoinHandler = handler;
        return this;
    }
    onNotification(handler) {
        this.config.notificationHandler = handler;
        return this;
    }
    onError(handler) {
        this.config.errorHandler = handler;
        return this;
    }
    async build() {
        let gameId;
        if (typeof this.config.service === "undefined") {
            let initService = new IdentityService_1.IdentityService({
                endpoint: this.config.endpoint,
                token: this.config.token,
            });
            let { identityToken, gameId: resGameId } = await initService.setupIdentity({
                existingIdentityToken: fetchToken(),
            });
            saveToken(identityToken);
            this.config.token = identityToken;
            gameId = resGameId;
            this.config.service = new IdentityService_1.IdentityService({
                endpoint: this.config.endpoint,
                token: identityToken,
            });
        }
        let manager = new IdentityManager(this.config, gameId);
        manager.initiate();
        return manager;
    }
}
exports.IdentityManagerBuilder = IdentityManagerBuilder;
class IdentityManager {
    constructor(opts, gameId) {
        this.service = opts.service;
        this.token = opts.token;
        this.endpoint = opts.endpoint;
        this.gameId = gameId;
        this.identityUpdateHandler = opts.identityUpdateHandler;
        this.chatMessageHandler = opts.chatMessageHandler;
        this.partyUpdateHandler = opts.partyUpdateHandler;
        this.matchmakerLobbyJoinHandler = opts.matchmakerLobbyJoinHandler;
        this.errorHandler = opts.errorHandler;
    }
    initiate() {
        if (this.identityUpdateHandler !== undefined) {
            this.service
                .getIdentitySelfProfile({})
                .then((res) => {
                this.identityUpdateHandler(res.identity);
            })
                .catch(this.handleError.bind(this));
        }
        if (this.chatMessageHandler !== undefined ||
            this.matchmakerLobbyJoinHandler !== undefined ||
            this.partyUpdateHandler !== undefined ||
            this.identityUpdateHandler !== undefined) {
            if (this.eventStream)
                this.eventStream.cancel();
            this.eventStream = new common_1.RepeatingRequest(async (abortSignal, watchIndex) => {
                return await this.service.watchEvents({ watchIndex }, { abortSignal });
            });
            this.eventStream.onMessage((res) => {
                for (let event of res.events) {
                    if (event.notification &&
                        this.notificationHandler !== undefined) {
                        this.notificationHandler(event.notification, event.kind);
                    }
                    if (event.kind.chatMessage) {
                        if (this.chatMessageHandler !== undefined) {
                            this.chatMessageHandler(event.kind.chatMessage.thread);
                        }
                    }
                    else if (event.kind.matchmakerLobbyJoin) {
                        if (this.matchmakerLobbyJoinHandler !== undefined) {
                            this.matchmakerLobbyJoinHandler(event.kind.matchmakerLobbyJoin.lobby);
                        }
                    }
                    else if (event.kind.partyUpdate) {
                        if (this.partyUpdateHandler !== undefined) {
                            this.partyUpdateHandler(event.kind.partyUpdate.party);
                        }
                    }
                    else if (event.kind.identityUpdate) {
                        if (this.identityUpdateHandler !== undefined) {
                            this.identityUpdateHandler(event.kind.identityUpdate.identity);
                        }
                    }
                }
            });
            this.eventStream.onError(this.handleError.bind(this));
        }
    }
    switchIdentity(newIdentityToken) {
        this.destroy();
        saveToken(newIdentityToken);
        this.token = newIdentityToken;
        this.service = new IdentityService_1.IdentityService({
            endpoint: this.endpoint,
            token: newIdentityToken,
        });
        this.initiate();
    }
    logout() {
        deleteToken();
    }
    async startGameLink(completeCb, errorCb) {
        let prepareRes;
        try {
            prepareRes = await this.service.prepareGameLink({});
        }
        catch (e) {
            (errorCb !== null && errorCb !== void 0 ? errorCb : this.handleError)(e);
            return;
        }
        if (this.existingGameLinkingContext) {
            this.existingGameLinkingContext.cancel();
        }
        let gameLinkStream = new common_1.RepeatingRequest(async (abortSignal, watchIndex) => {
            return await this.service.getGameLink({
                identityLinkToken: prepareRes.identityLinkToken,
                watchIndex,
            }, { abortSignal });
        });
        gameLinkStream.onMessage((res) => {
            if (res.status == models_1.GameLinkStatus.COMPLETE ||
                res.status == models_1.GameLinkStatus.CANCELLED) {
                gameLinkStream.cancel();
                if (res.status == models_1.GameLinkStatus.COMPLETE) {
                    this.switchIdentity(res.newIdentity.identityToken);
                }
                completeCb(res);
            }
        });
        gameLinkStream.onError(errorCb !== null && errorCb !== void 0 ? errorCb : this.handleError.bind(this));
        return new GameLinkingContext(prepareRes, gameLinkStream);
    }
    destroy() {
        if (this.eventStream)
            this.eventStream.cancel();
        if (this.existingGameLinkingContext) {
            this.existingGameLinkingContext.cancel();
        }
    }
    handleError(err) {
        if (this.errorHandler !== undefined)
            this.errorHandler(err);
        else
            console.error(err);
    }
}
exports.IdentityManager = IdentityManager;
class GameLinkingContext {
    constructor(prepareRes, gameLinkStream) {
        this.response = prepareRes;
        this.gameLinkStream = gameLinkStream;
    }
    cancel() {
        this.gameLinkStream.cancel();
    }
}
exports.GameLinkingContext = GameLinkingContext;
function fetchToken() {
    var _a;
    if (typeof window === "undefined")
        return undefined;
    return (_a = window.localStorage.getItem("rivet:token")) !== null && _a !== void 0 ? _a : undefined;
}
function saveToken(token) {
    if (typeof window === "undefined")
        return;
    window.localStorage.setItem("rivet:token", token);
}
function deleteToken() {
    if (typeof window === "undefined")
        return;
    window.localStorage.removeItem("rivet:token");
}
