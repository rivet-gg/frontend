import { customElement, property, query } from 'lit/decorators.js';
import { LitElement, html, TemplateResult, PropertyValues } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import { when } from 'lit/directives/when.js';
import styles from './settings.scss';
import { cssify } from '../../utils/css';
import { tooltip, showIdentityContextMenu, showAlert } from '../../ui/helpers';
import { globalEventGroups, SettingChangeEvent } from '../../utils/global-events';
import UIRouter from '../root/ui-router';
import global from '../../utils/global';
import routes, { responses } from '../../routes';

import { OAUTH_PROVIDERS } from '../../utils/utils';
import { identityRouteData } from '../../data/identity';
import logging from '../../utils/logging';
import { ToggleSwitchEvent } from '../common/toggle-switch';
import UIRoot from '../root/ui-root';
import { ls } from '../../utils/cache';
import { map } from 'lit/directives/map.js';

interface TabGroup {
	title: string;
	items: SettingsPageData[];
}

interface SettingsPageData {
	id?: string;
	icon?: string;
	title?: string;
	render?(): TemplateResult;
	url?: string;
	notHub?: boolean;
	spacer?: boolean;
}

interface SettingsData {
	thirdPartyData: boolean;
	collectData: boolean;
	pushNotifications: boolean;
}

@customElement('page-settings')
export default class SettingsPage extends LitElement {
	static styles = cssify(styles);

	@property({ type: String })
	tabId?: string;

	tabs: TabGroup[];
	settings: SettingsData;

	@property({ type: Object })
	loadError?: any;

	@query('#bio-textarea')
	bioTextarea: HTMLTextAreaElement;

	@property({ type: Boolean })
	editModalActive = false;

	// === EVENT HANDLERS ===
	handleSettingChange: (e: SettingChangeEvent) => void;

	constructor() {
		super();

		// Default settings
		this.settings = Object.assign(
			{},
			{
				thirdPartyData: ls.getBoolean('third-party-data', true),
				collectData: ls.getBoolean('collect-data', true),
				pushNotifications: ls.getBoolean('push-notifications', false)
			}
		);

		// Build tabs
		this.tabs = [
			{
				title: 'Account',
				items: [
					{
						id: 'identity',
						icon: 'solid/user',
						title: 'My Account',
						render: this.renderIdentity
					},
					{
						id: 'logout',
						icon: 'solid/right-from-bracket',
						title: 'Log out',
						render: this.renderLogout
					}
				]
			},
			{
				title: 'Informational',
				items: [
					{
						id: 'privacy',
						icon: 'solid/lock',
						title: 'Privacy Policy',
						url: 'https://rivet.gg/privacy'
					},
					{
						id: 'terms',
						icon: 'solid/file',
						title: 'Terms of Service',
						url: 'https://rivet.gg/terms'
					},
					{
						id: 'support',
						icon: 'solid/question',
						title: 'Support',
						url: 'https://rivet.gg/support',
						notHub: true
					}
				]
			}
		];
	}

	connectedCallback() {
		super.connectedCallback();

		// Handle settings change
		this.handleSettingChange = this.onSettingChange.bind(this);
		globalEventGroups.add('setting-change', this.handleSettingChange);
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		// Remove event listeners
		globalEventGroups.remove('setting-change', this.handleSettingChange);
	}

	updated(changedProperties: PropertyValues) {
		super.updated(changedProperties);

		// Set tab if needed; we don't get an updated event if the tab is null
		if (this.tabId == null) {
			this.navigateTab(this.tabs[0].items[0].id);
		}

		if (changedProperties.has('tabId')) {
			let currentTab = this.tabs
				.flatMap(x => x.items)
				.find(p => p.hasOwnProperty('id') && p.id == this.tabId);

			if (currentTab) UIRouter.shared.updateTitle(currentTab.title);
		}
	}

	navigateTab(tabId: string) {
		// Navigate to the correct tab; this will update this view automatically
		let url = routes.settings.build({ tab: tabId });

		UIRouter.shared.navigate(url, {
			replaceHistory: true
		});
	}

	// Called when changing a setting on the settings page
	settingChanged(key: string, value: any) {
		if (key == 'third-party-data') {
			this.settings.thirdPartyData = value;

			ls.setBoolean(key, value);
		} else if (key == 'collect-data') {
			this.settings.collectData = value;

			ls.setBoolean(key, value);
		} else if (key == 'push-notifications') {
			this.settings.pushNotifications = value;

			ls.setBoolean(key, value);

			if (value) global.pushNotifications.enable();
			else global.pushNotifications.disable();
		} else if (key == 'toggle-deletion') {
			if (value) {
				global.live.identity.markDeletion({}).catch((err: Error) => (this.loadError = err));
			} else {
				global.live.identity.unmarkDeletion({}).catch((err: Error) => (this.loadError = err));
			}
		} else {
			logging.warn('Unknown setting', key, '=', value);
		}
	}

	// Called by event handler after a setting is successfully changed
	onSettingChange(event: SettingChangeEvent) {
		if (event.value.id == 'third-party-data') {
			this.settings.thirdPartyData = event.value.value;
		} else if (event.value.id == 'collect-data') {
			this.settings.collectData = event.value.value;
		} else if (event.value.id == 'push-notifications') {
			this.settings.pushNotifications = event.value.value;
		}

		this.requestUpdate('settings');
	}

	openEditModal() {
		if (global.currentIdentity.isRegistered) {
			this.editModalActive = true;
		} else {
			showAlert(
				'Account not registered',
				html`Profile editing is only available for registered accounts.`,
				[
					{
						label: 'Register now',
						cb: () => UIRoot.shared.openRegisterPanel()
					},
					{
						label: 'Dismiss'
					}
				]
			);
		}
	}

	editModalClose() {
		this.editModalActive = false;
	}

	render() {
		if (!this.tabId) return null;
		if (this.loadError) return responses.renderError(this.loadError);

		let currentTab = this.tabs
			.flatMap(x => x.items)
			.find(p => p.hasOwnProperty('id') && p.id == this.tabId);

		return html`
			<rvt-sidebar-layout>
				<rvt-sidebar slot="sidebar">
					${map(
						this.tabs,
						group => html`
							<rvt-sidebar-group .title=${group.title}>
								${map(
									group.items,
									p =>
										html`<rvt-sidebar-button
											?current=${p.id == this.tabId}
											.href=${p.url}
											.target=${p.notHub ? '_blank' : null}
											.trigger=${!p.url ? this.navigateTab.bind(this, p.id) : null}
											.icon=${p.icon}
											>${p.title}</rvt-sidebar-button
										>`
								)}
							</rvt-sidebar-group>
						`
					)}
				</rvt-sidebar>
				<rvt-sidebar-body slot="body"
					>${when(currentTab, () => currentTab.render.apply(this))}</rvt-sidebar-body
				>
			</rvt-sidebar-layout>
		`;
	}

	renderIdentity() {
		let unimp = () => alert('UNIMPLEMENTED');

		// Get email from current identity
		let identity = global.currentIdentity.linkedAccounts.find(a => a.email);
		// Check if registered (with email)
		let isRegistered = global.currentIdentity.isRegistered && !!identity;

		return html`
			<div class="flex flex-col space-y-8">
				<div class="padded-cell flex flex-col space-y-1">
					<h1 class="item-header text-lg">Profile appearance</h1>
					<stylized-button
						icon="solid/user-pen"
						color="#404040"
						text="#eeeeee"
						.trigger=${this.openEditModal.bind(this)}
						>Edit profile</stylized-button
					>
				</div>
				<div class="padded-cell flex flex-col space-y-1">
					<div class="item-header-holder">
						<h1 class="item-header text-lg py-1">Link Email</h1>
						${isRegistered
							? html`<span class="badge bg-green-700 rounded-lg px-3 py-0.5"
									><e-svg src="solid/check"></e-svg> Registered</span
							  >`
							: html`
									<p class="py-1">Link your email to Rivet for full account access.</p>
									<stylized-button
										icon="solid/envelope"
										color="#404040"
										text="#eeeeee"
										.trigger=${() => UIRoot.shared.openRegisterPanel()}
										>${isRegistered ? 'View registration' : 'Link email'}</stylized-button
									>
							  `}
					</div>
				</div>
				<!-- <div class="padded-cell flex flex-col space-y-1">
					<h1 class="item-header text-lg">Push notifications</h1>
					<p class="pb-1">
						Allow Rivet to send your device push notifications for messages while you are away.
					</p>
					<toggle-switch
						?value=${this.settings.pushNotifications}
						@toggle=${(e: ToggleSwitchEvent) => this.settingChanged('push-notifications', e.value)}
					></toggle-switch>
				</div> -->
				<!-- <div class='spacer'></div>
				<div class='padded-cell'>
					<h1 class='item-header'>Email <span class='muted'>******email@gmail.com</span></h1>
					<stylized-button icon='regular/envelope' color='#404040' text='#eeeeee' .trigger=${unimp}>Change email</stylized-button>
				</div>
				<div class='spacer'></div>
				<div class='padded-cell'>
					<h1 class='item-header'>Password</h1>
					<stylized-button icon='regular/key' color='#404040' text='#eeeeee' .trigger=${unimp}>Change password</stylized-button>
				</div>
				<div class='spacer'></div>
				<div class='padded-cell'>
					<h1 class='item-header'>Two Factor Authentication <span class='twofa-badge'><e-svg src='regular/lock'></e-svg>Enabled</span></h1>
					<p>Two factor authentication provides an extra layer of security to your Rivet account.</p>
					<stylized-button icon='regular/lock' color='#404040' text='#eeeeee' .trigger=${unimp}>Remove two factor authentication</stylized-button>
				</div>
				<div class='spacer'></div>
				<div class='padded-cell'>
					<h1 class='item-header'>Delete account</h1>
					<stylized-button icon= of'regular/identity-slash' color='#db3939' .trigger=${unimp}>Delete account</stylized-button>
				</div> -->
				${when(
					global.currentIdentity.isRegistered,
					() =>
						html` <div class="padded-cell flex flex-col space-y-1">
							<h1 class="item-header text-lg">Toggle deletion</h1>
							<p class="pb-1">
								Marks your account for deletion. After 30 days of this switch being on, your
								Rivet account and all associated game accounts will be
								<b>permanently deleted</b>.
							</p>
							<toggle-switch
								?value=${global.currentIdentity.awaitingDeletion}
								@toggle=${(e: ToggleSwitchEvent) =>
									this.settingChanged('toggle-deletion', e.value)}
							></toggle-switch>
						</div>`
				)}
			</div>

			<!-- Editing modal -->
			<drop-down-modal
				large-animation
				.active=${this.editModalActive}
				@close=${this.editModalClose.bind(this)}
			>
				<identity-profile-edit
					slot="body"
					@close=${this.editModalClose.bind(this)}
				></identity-profile-edit>
			</drop-down-modal>
		`;
	}

	renderLinkAccount() {
		return html`
			<div class="padded-cell">
				<h1 class="item-header">Add a new connection</h1>
				<p>Add a connection to your Rivet account for easy access and integration.</p>
				<!-- Link Accounts -->
				<div id="oauth-providers">
					${repeat(
						OAUTH_PROVIDERS,
						p => p.id,
						p =>
							html`<icon-button
								class="provider-icon"
								src=${p.iconPath}
								href=${p.oauthUrl}
								color=${p.color}
								highlight-color="white"
							></icon-button>`
					)}
				</div>
			</div>
			<div class="spacer"></div>
			<div class="padded-cell">
				<h1 class="item-header">Existing connections</h1>
				<p class="muted">No connections added to account.</p>
				<!-- <div id='oauth-connections'>
					${repeat(
					OAUTH_PROVIDERS,
					p => p.id,
					p =>
						html` <div class="oauth-connection" style="background-color: ${p.color};">
							<div class="header">
								<h1><e-svg src=${p.iconPath}></e-svg> ${p.name}</h1>
							</div>
							<h2 class="account-name">NicholasKissel302</h2>
							<e-svg
								class="close-button"
								src="regular/link-slash"
								@mouseenter=${tooltip('Unlink')}
							></e-svg>
						</div>`
				)}
				</div> -->
			</div>
		`;
	}

	renderLogout() {
		return html`
			<div class="padded-cell">
				<h1 class="item-header">Log out of Rivet</h1>
				${global.currentIdentity.isRegistered
					? html`<stylized-button
							icon="regular/arrow-right-from-bracket"
							color="#db3939"
							.trigger=${this.logout.bind(this)}
							>Log out</stylized-button
					  >`
					: html`<p>Logged in as guest.</p>
							<stylized-button .trigger=${() => UIRoot.shared.openRegisterPanel()}
								>Register Now</stylized-button
							> `}
			</div>
		`;
	}

	async logout(): Promise<void> {
		await global.authManager.logout();
		window.location.reload();

		return new Promise(resolve => resolve());
	}
}
