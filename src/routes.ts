import { TemplateResult, html } from 'lit';
import * as pathToRegexp from 'path-to-regexp';
import global from './utils/global';
import utils from './utils/utils';
import { DevGameRootConfig } from './elements/pages/dev/game';
import UIRoot from './elements/root/ui-root';
import { RivetError } from '@rivet-gg/api-internal';
import { isDeveloper } from './utils/identity';
import config from './config';
import { Breadcrumb } from './elements/common/navbar';

export type RenderResult = RenderResultTemplate | RenderResultRedirect;

export interface RenderResultTemplate {
	title: string;
	breadcrumb: Breadcrumb;
	template: TemplateResult;
}

export interface RenderResultRedirect {
	redirect: string;
}

type RouteRender<P, S> = (params: P, search: S) => RenderResult;

type RouteParameters = { [key: string]: string };
type SearchParameters = { [key: string]: string };

class Route<P extends RouteParameters, S extends SearchParameters = {}> {
	path: string;
	render: RouteRender<P, S>;

	pathFunction: pathToRegexp.PathFunction<P>;

	pathKeys: pathToRegexp.Key[];
	pathRegex: RegExp;

	constructor({ path, render }: { path: string; render: RouteRender<P, S> }) {
		// Save the properties
		this.path = path;
		this.render = render;

		// Compile path to path builder
		this.pathFunction = pathToRegexp.compile(path);

		// Convert the path to regex
		this.pathKeys = [];
		this.pathRegex = pathToRegexp.pathToRegexp(this.path, this.pathKeys);
	}

	build(params: P, search?: S): string {
		// Get the path
		let path = this.pathFunction(params);

		// Build URL
		return `${window.location.origin}${path}${
			search ? `?${new URLSearchParams(search).toString()}` : ''
		}`;
	}
}

namespace routes {
	export let home = new Route<{}>({
		path: '/',
		render({}) {
			return {
				title: 'Home',
				breadcrumb: { type: 'Home' },
				template: html` <dev-dash .identity=${global.currentIdentity}></dev-dash> `
			};
		}
	});

	// Link removed
	export let homeRedirect = new Route<{}>({
		path: '/home',
		render() {
			return {
				redirect: routes.home.build({})
			};
		}
	});

	// Moved developer path
	export let developerRedirect = new Route<{ path: string }>({
		path: '/developer/:path*',
		render({ path }, search) {
			return {
				redirect: `${window.location.origin}/${path}${
					search ? `?${new URLSearchParams(search).toString()}` : ''
				}`
			};
		}
	});

	// Reuse the same template in order to preserve the same `page-identity` instance.
	function renderPageIdentity(identityId: string, gameNameId: string | null) {
		return html`<page-identity .identityId=${identityId} .gameNameId=${gameNameId}></page-identity>`;
	}

	export let identity = new Route<{ id: string }>({
		path: '/identities/:id',
		render({ id }) {
			if (!utils.validateUuid(id)) return responses.notFound();

			return {
				title: 'Identity',
				breadcrumb: { type: 'Custom' },
				template: renderPageIdentity(id, null)
			};
		}
	});

	export let resolveThread = new Route<{ id: string }>({
		path: '/threads/:id',
		render({ id }) {
			if (!utils.validateUuid(id)) return responses.notFound();

			return {
				title: 'Thread',
				breadcrumb: { type: 'Custom' },
				template: html`<page-thread-resolve .threadId=${id}></page-thread-resolve>`
			};
		}
	});

	export let identityDirectChat = new Route<{ id: string }>({
		path: '/identities/:id/chat',
		render({ id }) {
			if (!utils.validateUuid(id)) return responses.notFound();

			return {
				title: 'Identity Chat',
				breadcrumb: { type: 'Custom' },
				template: html`<page-identity-direct-chat .identityId=${id}></page-identity-direct-chat>`
			};
		}
	});

	export let identityGameStat = new Route<{ id: string; gameNameId: string }>({
		path: '/identities/:id/game/:gameNameId',
		render({ id, gameNameId }) {
			if (!utils.validateUuid(id)) return responses.notFound();

			return {
				title: 'Identity',
				breadcrumb: { type: 'Custom' },
				template: renderPageIdentity(id, gameNameId)
			};
		}
	});

	export let identityFriends = new Route<{ id: string }>({
		path: '/identities/:id/friends',
		render({ id }) {
			if (!utils.validateUuid(id)) return responses.notFound();

			return {
				title: 'Mutual Friends',
				breadcrumb: { type: 'Custom' },
				template: html`<page-identity-friends .identityId=${id}></page-identity-friends>`
			};
		}
	});

	// Reuse the same template in order to preserve the same `page-group` instance.
	function renderPageGroupSettings(groupId: string, gameNameId: string | null) {
		return html`<page-group .groupId=${groupId} .gameNameId=${gameNameId}></page-group>`;
	}

	export let groupSettings = new Route<{ id: string }>({
		path: '/groups/:id/settings',
		render({ id }) {
			if (!utils.validateUuid(id)) return responses.notFound();

			return {
				title: 'Group',
				breadcrumb: { type: 'Group', groupId: id, title: 'Settings' },
				template: renderPageGroupSettings(id, null)
			};
		}
	});

	export let groupChat = new Route<{ id: string }>({
		path: '/groups/:id/chat',
		render({ id }) {
			if (!utils.validateUuid(id)) return responses.notFound();

			return {
				title: 'Group Chat',
				breadcrumb: { type: 'Group', groupId: id, title: 'Chat' },
				template: html`<page-group-chat .groupId=${id}></page-group-chat>`
			};
		}
	});

	export let groupGameStat = new Route<{ id: string; gameNameId: string }>({
		path: '/groups/:id/game/:gameNameId',
		render({ id, gameNameId }) {
			if (!utils.validateUuid(id)) return responses.notFound();

			return {
				title: 'Group',
				breadcrumb: { type: 'Group', groupId: id },
				template: renderPageGroupSettings(id, gameNameId)
			};
		}
	});

	export let groupMembers = new Route<{ id: string }>({
		path: '/groups/:id/members',
		render({ id }) {
			if (!utils.validateUuid(id)) return responses.notFound();

			return {
				title: 'Group Members',
				breadcrumb: { type: 'Group', groupId: id, title: 'Members' },
				template: html`<page-group-members .groupId=${id}></page-group-members>`
			};
		}
	});

	export let groupBilling = new Route<{ groupId: string }>({
		path: '/groups/:groupId/billing',
		render({ groupId }) {
			if (!global.currentIdentity.isRegistered) return responses.registerRequired();
			if (!utils.validateUuid(groupId)) return responses.notFound();

			return {
				title: `Billing`,
				breadcrumb: {
					type: 'Group',
					groupId,
					title: 'Billing'
				},
				template: html`<page-group-billing .groupId=${groupId}></page-group-billing>`
			};
		}
	});

	export let analyticsOverview = new Route<{ groupId: string }>({
		path: '/groups/:groupId/analytics',
		render({ groupId }) {
			if (!global.currentIdentity.isRegistered) return responses.registerRequired();

			if (!utils.validateUuid(groupId)) return responses.notFound();

			return {
				title: `Analytics`,
				breadcrumb: {
					type: 'Group',
					groupId,
					title: 'Analytics'
				},
				template: html`<page-analytics-overview .groupId=${groupId}></page-analytics-overview>`
			};
		}
	});

	export let groupInvite = new Route<{ code: string }>({
		path: '/invite/:code?',
		render({ code }) {
			return {
				title: 'Group Invite',
				breadcrumb: { type: 'Custom' },
				template: html`<page-group-invite .code=${code}></page-group-invite>`
			};
		}
	});

	export let party = new Route<{ id: string }>({
		path: '/parties/:id',
		render({ id }) {
			if (!utils.validateUuid(id)) return responses.notFound();

			return {
				title: `Party`,
				breadcrumb: { type: 'Custom' },
				template: html`<page-party-chat .partyId=${id}></page-party-chat>`
			};
		}
	});

	export let partyInvite = new Route<{ token: string }>({
		path: '/party/invite/:token',
		render({ token }) {
			return {
				title: `Party Invite`,
				breadcrumb: { type: 'Custom' },
				template: html`<page-party-invite .inviteToken=${token}></page-party-invite>`
			};
		}
	});

	export let settings = new Route<{ tab?: string }>({
		path: '/settings/:tab?',
		render({ tab }) {
			return {
				title: `Settings`,
				breadcrumb: { type: 'Custom' },
				template: html`<page-settings .tabId=${tab}></page-settings>`
			};
		}
	});

	export let admin = new Route<{}>({
		path: '/admin',
		render() {
			if (!global.currentIdentity.isAdmin) return responses.notFound();

			return {
				title: `Admin`,
				breadcrumb: { type: 'Custom' },
				template: html`<page-admin></page-admin>`
			};
		}
	});

	export let recentFollowers = new Route<{}>({
		path: '/recent-followers',
		render() {
			return {
				title: `Recent Followers`,
				breadcrumb: { type: 'Custom' },
				template: html`<page-recent-followers></page-recent-followers>`
			};
		}
	});

	export let linkGame = new Route<{ token: string }>({
		path: '/link/:token',
		render({ token }) {
			return {
				title: `Link account`,
				breadcrumb: { type: 'Custom' },
				template: html`<page-link-game .token=${token}></page-link-game>`
			};
		}
	});

	export let devDeviceLink = new Route<{ token: string }>({
		path: '/devices/link/:token',
		render({ token }) {
			if (!global.currentIdentity.isRegistered) return responses.registerRequired();
			if (!isDeveloper(global.currentIdentity)) return responses.developerOnly();

			return {
				title: 'Link Device',
				breadcrumb: { type: 'Custom' },
				template: html`<page-dev-device-link .deviceLinkToken=${token}></page-dev-device-link>`
			};
		}
	});

	// Reuse the same template in order to preserve the same `page-dev-game` instance.
	function renderPageDevGame(gameId: string, namespaceId: string, config: DevGameRootConfig) {
		return html`<page-dev-game .gameId=${gameId} .namespaceId=${namespaceId} .config=${config}></page-dev-game>`;
	}

	export let devGame = new Route<{ gameId: string }>({
		path: '/games/:gameId',
		render({ gameId }) {
			if (!global.currentIdentity.isRegistered) return responses.registerRequired();
			if (!utils.validateUuid(gameId)) return responses.notFound();

			return {
				title: 'Game',
				breadcrumb: { type: 'Game', gameId, title: 'Overview' },
				template: html` <game-overview .gameId=${gameId}></game-overview> `
			};
		}
	});

	// TODO --> Move this to `/games/:gameId/`
	export let devGameOverview = new Route<{ gameId: string }>({
		path: '/games/:gameId/overview',
		render({ gameId }) {
			return {
				redirect: `${window.location.origin}/games/${gameId}`
			}
		}
	});

	export let devNamespace = new Route<{ gameId: string; namespaceId: string }>({
		path: '/games/:gameId/namespaces/:namespaceId',
		render({ gameId, namespaceId }) {
			if (!global.currentIdentity.isRegistered) return responses.registerRequired();

			if (!utils.validateUuid(gameId) || !utils.validateUuid(namespaceId)) return responses.notFound();

			return {
				title: 'Game Namespace',
				breadcrumb: { type: 'Namespace', gameId, namespaceId, title: 'Overview' },
				template: renderPageDevGame(gameId, namespaceId, { summary: true, namespace: { namespaceId } })
			};
		}
	});

	export let devVersionSummary = new Route<{ gameId: string; namespaceId: string}>({
		path: '/games/:gameId/namespaces/:namespaceId/versions',
		render({ gameId, namespaceId }) {
			if (!global.currentIdentity.isRegistered) return responses.registerRequired();
			if (!utils.validateUuid(gameId)) return responses.notFound();

			return {
				title: 'Namespace Versions',
				breadcrumb: { type: 'Namespace', gameId, namespaceId, title: 'Version' },
				template: renderPageDevGame(gameId, namespaceId, { versionSummary: true })
			};
		}
	})

	export let devVersion = new Route<{ gameId: string; namespaceId: string, versionId: string }>({
		path: '/games/:gameId/namespaces/:namespaceId/versions/:versionId',
		render({ gameId, namespaceId, versionId }) {
			if (!global.currentIdentity.isRegistered) return responses.registerRequired();

			if (!utils.validateUuid(gameId) || !utils.validateUuid(versionId)) return responses.notFound();

			return {
				title: 'Game Version',
				breadcrumb: { type: 'Namespace', gameId, namespaceId, title: 'Version' },
				template: renderPageDevGame(gameId, namespaceId, { namespace: { namespaceId }, version: { versionId } })
			};
		}
	});

	export let devVersionDraft = new Route<{ gameId: string }>({
		path: '/games/:gameId/version-draft',
		render({ gameId }) {
			if (!global.currentIdentity.isRegistered) return responses.registerRequired();
			if (!utils.validateUuid(gameId)) return responses.notFound();

			return {
				title: 'Game Version Draft',
				breadcrumb: { type: 'Game', gameId, title: 'Version Draft' },
				template: renderPageDevGame(gameId, null, { versionDraft: true })
			};
		}
	});

	export let devTokens = new Route<{ gameId: string, namespaceId: string }>({
		path: '/games/:gameId/namespaces/:namespaceId/api',
		render({ gameId, namespaceId }) {
			if (!global.currentIdentity.isRegistered) return responses.registerRequired();
			if (!utils.validateUuid(gameId)) return responses.notFound();

			return {
				title: 'Namespace Tokens',
				breadcrumb: { type: 'Namespace', gameId, namespaceId, title: 'Tokens' },
				template: renderPageDevGame(gameId, namespaceId, { tokens: true, namespaceId })
			};
		}
	});

	export let devLogs = new Route<{ gameId: string, namespaceId: string }>({
		path: '/games/:gameId/namespaces/:namespaceId/logs',
		render({ gameId, namespaceId }) {
			if (!global.currentIdentity.isRegistered) return responses.registerRequired();
			if (!utils.validateUuid(gameId)) return responses.notFound();
			if (namespaceId && !utils.validateUuid(namespaceId)) return responses.notFound();

			return {
				title: 'Game Logs',
				breadcrumb: { type: 'Namespace', gameId, namespaceId, title: 'Logs' },
				template: renderPageDevGame(gameId, namespaceId, { logs: true, namespaceId })
			};
		}
	});

	export let devLogLobby = new Route<{ gameId: string, namespaceId: string, lobbyId: string }>({
		path: '/games/:gameId/namespaces/:namespaceId/logs/:lobbyId',
		render({ gameId, namespaceId, lobbyId }) {
			if (!global.currentIdentity.isRegistered) return responses.registerRequired();
			if (!utils.validateUuid(gameId)) return responses.notFound();
			if (!utils.validateUuid(lobbyId)) return responses.notFound();

			return {
				title: 'Game Logs',
				breadcrumb: { type: 'Namespace', gameId, namespaceId, title: 'Lobby Logs' },
				template: renderPageDevGame(gameId, namespaceId, { logs: true, namespaceId, logsLobbyId: lobbyId })
			};
		}
	});

	export let devLobbies = new Route<{ gameId: string, namespaceId: string }>({
		path: '/games/:gameId/namespaces/:namespaceId/lobbies',
		render({ gameId, namespaceId }) {
			if (!global.currentIdentity.isRegistered) return responses.registerRequired();
			if (!utils.validateUuid(gameId)) return responses.notFound();
			if (namespaceId && !utils.validateUuid(namespaceId)) return responses.notFound();

			return {
				title: 'Game Lobbies',
				breadcrumb: { type: 'Namespace', gameId, namespaceId, title: 'Lobbies' },
				template: renderPageDevGame(gameId, namespaceId, { lobbies: true, namespaceId })
			};
		}
	});

	export let devKv = new Route<{ gameId: string, namespaceId: string }>({
		path: '/games/:gameId/namespaces/:namespaceId/kv',
		render({ gameId, namespaceId }) {
			if (!global.currentIdentity.isRegistered) return responses.registerRequired();
			if (!utils.validateUuid(gameId)) return responses.notFound();
			if (namespaceId && !utils.validateUuid(namespaceId)) return responses.notFound();

			return {
				title: 'Game KV',
				breadcrumb: { type: 'Namespace', gameId, namespaceId, title: 'KV' },
				template: renderPageDevGame(gameId, namespaceId, { kv: true, namespaceId })
			};
		}
	});

	export let devBilling = new Route<{ gameId: string }>({
		path: '/games/:gameId/billing',
		render({ gameId }) {
			if (!global.currentIdentity.isRegistered) return responses.registerRequired();
			if (!utils.validateUuid(gameId)) return responses.notFound();

			return {
				title: 'Game Billing',
				breadcrumb: { type: 'Game', gameId, title: 'Billing' },
				template: renderPageDevGame(gameId, null, { sites: true })
			};
		}
	});

	export let devBuilds = new Route<{ gameId: string }>({
		path: '/games/:gameId/builds',
		render({ gameId }) {
			// TODO:
			return responses.notFound();

			if (!global.currentIdentity.isRegistered) return responses.registerRequired();
			if (!utils.validateUuid(gameId)) return responses.notFound();

			return {
				title: 'Game Builds',
				breadcrumb: { type: 'Game', gameId, title: 'Builds' },
				template: renderPageDevGame(gameId, null, { builds: true })
			};
		}
	});

	// export let kitchenSink = new Route<{}>({
	// 	path: '/kitchen-sink',
	// 	render() {
	// 		return {
	// 			title: `Kitchen Sink`,
	// 			template: html`<page-kitchen-sink></page-kitchen-sink>`
	// 		};
	// 	}
	// });

	// export let test = new Route<{}>({
	// 	path: '/test',
	// 	render() {
	// 		return {
	// 			title: `Kitchen Sink`,
	// 			template: html`<div class="w-full h-full"><rvt-sidebar-layout></rvt-sidebar-layout></div>`
	// 		};
	// 	}
	// });
}

export namespace responses {
	export function forbidden(): RenderResult {
		return {
			title: 'Forbidden',
			breadcrumb: {
				type: 'Custom'
			},

			template: html`<page-error message="Forbidden"></page-error>`
		};
	}

	export function badRequest(): RenderResult {
		return {
			title: 'Bad Request',
			breadcrumb: {
				type: 'Custom'
			},
			template: html`<page-error message="Bad Request"></page-error>`
		};
	}

	export function notFound(): RenderResult {
		return {
			title: 'Not Found',
			breadcrumb: {
				type: 'Custom'
			},
			template: html`<invalid-page-state>
				<h1 slot="title">404</h1>
				<h2 slot="subtitle">This page isn't available or it doesn't exist. Sorry!</h2>
			</invalid-page-state>`
		};
	}

	export function underConstruction(): RenderResult {
		return {
			title: 'Coming Soon',
			breadcrumb: {
				type: 'Custom'
			},
			template: html`<invalid-page-state>
				<h1 slot="title">Coming Soon</h1>
				<h2 slot="subtitle">This page isn't available yet. Come back soon!</h2>
				<div slot="actions">
					<stylized-button href=${routes.home.build({})}>Go Home</stylized-button>
				</div>
			</invalid-page-state>`
		};
	}

	export function registerRequired(): RenderResult {
		return {
			title: 'Register Required',
			breadcrumb: {
				type: 'Custom'
			},
			template: html`<invalid-page-state>
				<h1 slot="title">Registered Only</h1>
				<h2 slot="subtitle">
					This page isn't available for guest accounts. Register to save your account.
				</h2>
				<div slot="actions">
					<stylized-button .trigger=${() => UIRoot.shared.openRegisterPanel()}
						>Register Now</stylized-button
					>
				</div>
			</invalid-page-state>`
		};
	}

	export function desktopOnly(): RenderResult {
		return {
			title: 'Desktop Only',
			breadcrumb: {
				type: 'Custom'
			},
			template: html`<invalid-page-state>
				<h1 slot="title">Desktop Only</h1>
				<h2 slot="subtitle">This page is only available on a Desktop platform.</h2>
			</invalid-page-state>`
		};
	}

	export function developerOnly(): RenderResult {
		return {
			title: 'Private Beta',
			breadcrumb: {
				type: 'Custom'
			},
			template: html`<page-dev-only></page-dev-only>`
		};
	}

	export function renderError(error: Error, notFullHeight = false): TemplateResult {
		// Build error message
		let errorMessage: string;
		if (typeof error == 'string') errorMessage = error;
		else if (error instanceof RivetError) {
			return html`<page-error
				.message=${(error.body as any)?.message}
				.expand=${!notFullHeight}
			></page-error>`;
		} else if (error && error.message && typeof error.message == 'string') errorMessage = error.message;
		else if (error && error.hasOwnProperty('statusText')) {
			let err = error as any as Response;

			if (err.status == 403) return (forbidden() as RenderResultTemplate).template;

			errorMessage = err.statusText ? err.statusText : err.status.toString() ?? 'Error';
		} else errorMessage = 'Error';

		return html`<page-error .message=${errorMessage} .expand=${!notFullHeight}></page-error>`;
	}
}

export default routes;

// Convert to array so it can be iterated over faster
export const routesArray: Route<any>[] = Object.keys(routes).map(k => (routes as any)[k]);
