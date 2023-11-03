import { html, TemplateResult } from 'lit';
import * as pathToRegexp from 'path-to-regexp';
import global from './utils/global';
import utils from './utils/utils';
import { DevGameRootConfig } from './elements/pages/dev/game/pages/game';
import UIRoot from './elements/root/ui-root';
import { RivetError } from '@rivet-gg/api-internal';
import { isDeveloper } from './utils/identity';
import { Breadcrumb } from './elements/common/navbar';
import { GameSettingsRootConfig } from './elements/pages/dev/game/settings/game-settings';
import { GroupSettingsRootConfig } from './elements/pages/dev/group/settings/group-settings';

const tailwindConfig = require('../tailwind.config.js');
const tailwind_palette = tailwindConfig.theme.extend.colors;

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
		render() {
			return {
				title: 'Home',
				breadcrumb: { type: 'Home' },
				template: html`
					<rvt-user-dashboard .identity="${global.currentIdentity}"></rvt-user-dashboard>
				`
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
				redirect: `${window.location.origin} /${path}${
					search ? `?${new URLSearchParams(search).toString()}` : ''
				}`
			};
		}
	});

	// Reuse the same template in order to preserve the same `page-group-settings` instance.
	function renderPageGroupSettings(groupId: string, config?: GroupSettingsRootConfig) {
		return html` <page-group-settings .groupId="${groupId}" .config="${config}"></page-group-settings>`;
	}

	export let groupSettingsRedirect = new Route<{ groupId: string }>({
		path: '/groups/:groupId/settings',
		render({ groupId }) {
			return {
				redirect: routes.groupSettings.build({ groupId, tab: 'general' })
			};
		}
	});

	export let groupSettings = new Route<{ groupId: string; tab?: string }>({
		path: '/groups/:groupId/settings/:tab?',
		render({ groupId, tab }) {
			return {
				title: 'Settings',
				breadcrumb: { type: 'GroupSettings', groupId: groupId, title: tab },
				template: renderPageGroupSettings(groupId, {
					general: tab.toLowerCase() === 'general' || tab === undefined,
					members: tab.toLowerCase() === 'members',
					billing: tab.toLowerCase() === 'billing'
				})
			};
		}
	});

	export let groupOverview = new Route<{ id: string }>({
		path: '/groups/:id',
		render({ id }) {
			if (!utils.validateUuid(id)) return responses.notFound();

			return {
				title: 'Group',
				breadcrumb: { type: 'Group', groupId: id },
				template: html` <page-group .groupId="${id}"></page-group>`
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
				template: html` <page-analytics-overview .groupId="${groupId}"></page-analytics-overview>`
			};
		}
	});

	export let groupInvite = new Route<{ code: string }>({
		path: '/invite/:code?',
		render({ code }) {
			return {
				title: 'Group Invite',
				breadcrumb: { type: 'Custom' },
				template: html` <page-group-invite .code="${code}"></page-group-invite>`
			};
		}
	});

	export let settings = new Route<{ tab?: string }>({
		path: '/settings/:tab?',
		render({ tab }) {
			return {
				title: `Settings`,
				breadcrumb: { type: 'Custom' },
				template: html` <page-settings .tabId="${tab}"></page-settings>`
			};
		}
	});

	export let linkGame = new Route<{ token: string }>({
		path: '/link/:token',
		render({ token }) {
			return {
				title: `Link account`,
				breadcrumb: { type: 'Custom' },
				template: html` <page-link-game .token="${token}"></page-link-game>`
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
				template: html` <page-dev-device-link .deviceLinkToken="${token}"></page-dev-device-link>`
			};
		}
	});

	// Reuse the same template in order to preserve the same `page-dev-game` instance.
	function renderPageDevGame(gameId: string, namespaceId: string, config: DevGameRootConfig) {
		return html` <page-dev-game
			.gameId="${gameId}"
			.namespaceId="${namespaceId}"
			.config="${config}"
		></page-dev-game>`;
	}

	export let devGame = new Route<{ gameId: string }>({
		path: '/games/:gameId',
		render({ gameId }) {
			if (!global.currentIdentity.isRegistered) return responses.registerRequired();
			if (!utils.validateUuid(gameId)) return responses.notFound();

			return {
				title: 'Game',
				breadcrumb: { type: 'Game', gameId, title: 'Overview' },
				template: html` <game-overview .gameId="${gameId}"></game-overview> `
			};
		}
	});

	// TODO --> Move this to `/games/:gameId/`
	export let devGameOverview = new Route<{ gameId: string }>({
		path: '/games/:gameId/overview',
		render({ gameId }) {
			return {
				redirect: `${window.location.origin}/games/${gameId}`
			};
		}
	});

	function renderPageDevGameSettings(gameId: string, config: GameSettingsRootConfig) {
		return html` <page-dev-game-settings
			.gameId="${gameId}"
			.config="${config}"
		></page-dev-game-settings>`;
	}

	export let devGameSettingsRedirect = new Route<{ gameId: string }>({
		path: '/games/:gameId/settings',
		render({ gameId }) {
			return {
				redirect: routes.devGameSettings.build({ gameId, tab: 'general' })
			};
		}
	});

	export let devGameSettings = new Route<{ gameId: string; tab?: string }>({
		path: '/games/:gameId/settings/:tab?',
		render({ gameId, tab }) {
			return {
				title: 'Settings',
				breadcrumb: { type: 'GameSettings', gameId: gameId, title: tab },
				template: renderPageDevGameSettings(gameId, {
					general: tab === 'general',
					tokens: tab === 'tokens',
					billing: tab === 'billing'
				})
			};
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
				template: renderPageDevGame(gameId, namespaceId, {
					summary: true,
					namespace: { namespaceId }
				})
			};
		}
	});

	export let devVersionSummary = new Route<{ gameId: string; namespaceId: string }>({
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
	});

	export let devVersion = new Route<{ gameId: string; namespaceId: string; versionId: string }>({
		path: '/games/:gameId/namespaces/:namespaceId/versions/:versionId',
		render({ gameId, namespaceId, versionId }) {
			if (!global.currentIdentity.isRegistered) return responses.registerRequired();

			if (!utils.validateUuid(gameId) || !utils.validateUuid(versionId)) return responses.notFound();

			return {
				title: 'Game Version',
				breadcrumb: { type: 'Namespace', gameId, namespaceId, title: 'Version' },
				template: renderPageDevGame(gameId, namespaceId, {
					namespace: { namespaceId },
					version: { versionId }
				})
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

	export let devTokens = new Route<{ gameId: string; namespaceId: string }>({
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

	export let devLogs = new Route<{ gameId: string; namespaceId: string }>({
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

	export let devLogLobby = new Route<{ gameId: string; namespaceId: string; lobbyId: string }>({
		path: '/games/:gameId/namespaces/:namespaceId/logs/:lobbyId',
		render({ gameId, namespaceId, lobbyId }) {
			if (!global.currentIdentity.isRegistered) return responses.registerRequired();
			if (!utils.validateUuid(gameId)) return responses.notFound();
			if (!utils.validateUuid(lobbyId)) return responses.notFound();

			return {
				title: 'Game Logs',
				breadcrumb: { type: 'Namespace', gameId, namespaceId, title: 'Lobby Logs' },
				template: renderPageDevGame(gameId, namespaceId, {
					logs: true,
					namespaceId,
					logsLobbyId: lobbyId
				})
			};
		}
	});

	export let devLobbies = new Route<{ gameId: string; namespaceId: string }>({
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

	export let devKv = new Route<{ gameId: string; namespaceId: string }>({
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
}

export namespace responses {
	export function forbidden(): RenderResult {
		return {
			title: 'Forbidden',
			breadcrumb: {
				type: 'Custom'
			},

			template: html` <page-error message="Forbidden"></page-error>`
		};
	}

	export function badRequest(): RenderResult {
		return {
			title: 'Bad Request',
			breadcrumb: {
				type: 'Custom'
			},
			template: html` <page-error message="Bad Request"></page-error>`
		};
	}

	export function notFound(): RenderResult {
		return {
			title: 'Not Found',
			breadcrumb: {
				type: 'Custom'
			},
			template: html`
				<div class="text-center fixed w-full h-32 m-auto left-0 right-0 top-0 bottom-0">
					<h1 class="text-red-500 font-bold text-8xl pr-2">404</h1>
					<h4 class="pb-4 font-semibold">Page Not Found</h4>
					<stylized-button
						class="mx-auto"
						right-icon="solid/arrow-right"
						color=${tailwind_palette['raised-bg']}
						border-color=${tailwind_palette['raised-bg-border-color']}
						border-width=".75px"
						href=${routes.home.build({})}
						>Go Home</stylized-button
					>
				</div>
			`
		};
	}

	export function underConstruction(): RenderResult {
		return {
			title: 'Coming Soon',
			breadcrumb: {
				type: 'Custom'
			},
			template: html` <invalid-page-state>
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
			template: html` <invalid-page-state>
				<h1 slot="title">Registered Only</h1>
				<h2 slot="subtitle">
					This page isn't available for guest accounts. Register to save your account.
				</h2>
				<div slot="actions">
					<stylized-button .trigger="${() => UIRoot.shared.openRegisterPanel()}"
						>Register Now
					</stylized-button>
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
			template: html` <invalid-page-state>
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
			template: html` <page-dev-only></page-dev-only>`
		};
	}

	export function renderError(error: Error, notFullHeight = false): TemplateResult {
		// Build error message
		let errorMessage: string;
		if (typeof error == 'string') errorMessage = error;
		else if (error instanceof RivetError) {
			return html` <page-error
				.message=${(error.body as any)?.message}
				.expand=${!notFullHeight}
			></page-error>`;
		} else if (error && error.message && typeof error.message == 'string') errorMessage = error.message;
		else if (error && error.hasOwnProperty('statusText')) {
			let err = error as any as Response;

			if (err.status == 403) return (forbidden() as RenderResultTemplate).template;

			errorMessage = err.statusText ? err.statusText : err.status.toString() ?? 'Error';
		} else errorMessage = 'Error';

		return html` <page-error .message="${errorMessage}" .expand="${!notFullHeight}"></page-error>`;
	}
}

export default routes;

// Convert to array so it can be iterated over faster
export const routesArray: Route<any>[] = Object.keys(routes).map(k => (routes as any)[k]);
