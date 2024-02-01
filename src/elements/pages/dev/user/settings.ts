import { customElement, property, query } from 'lit/decorators.js';
import { html, LitElement, PropertyValues, TemplateResult } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import { when } from 'lit/directives/when.js';
import styles from './settings.scss';
import { cssify } from '../../../../utils/css';
import { showAlert } from '../../../../ui/helpers';
import { globalEventGroups, SettingChangeEvent } from '../../../../utils/global-events';
import RvtRouter from '../../../root/rvt-router';
import global from '../../../../utils/global';
import routes, { responses } from '../../../../routes';

import logging from '../../../../utils/logging';
import { ToggleSwitchEvent } from '../../../common/toggle-switch';
import RvtRoot from '../../../root/rvt-root';
import { ls } from '../../../../utils/cache';
import { map } from 'lit/directives/map.js';
import { IdentityObserver } from '../../../../controllers/identityObserver';

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
}

@customElement('page-settings')
export default class SettingsPage extends LitElement {
	static styles = cssify(styles);

	private identityObserver = new IdentityObserver(this);

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
				collectData: ls.getBoolean('collect-data', true)
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

			if (currentTab) RvtRouter.shared.updateTitle(currentTab.title);
		}
	}

	navigateTab(tabId: string) {
		// Navigate to the correct tab; this will update this view automatically
		let url = routes.settings.build({ tab: tabId });

		RvtRouter.shared.navigate(url, {
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
		} else if (key == 'toggle-deletion') {
			if (value) {
				global.deprecatedApi.identity.markDeletion({}).catch((err: Error) => (this.loadError = err));
			} else {
				global.deprecatedApi.identity
					.unmarkDeletion({})
					.catch((err: Error) => (this.loadError = err));
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
						cb: () => RvtRoot.shared.openRegisterPanel()
					},
					{
						label: 'Dismiss'
					}
				]
			);
		}
	}

	confirmAccountDeletion() {
		showAlert(
			'Schedule account deletion?',
			html`After 30 days, your account will be permanently deleted.`,
			[
				{
					label: 'Cancel'
				},
				{
					label: 'Schedule Deletion',
					destructive: true,
					cb: () => this.settingChanged('toggle-deletion', true)
				}
			]
		);
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
		// Get email from current identity
		let identity = global.currentIdentity.linkedAccounts.find(a => a.email);
		// Check if registered (with email)
		let isRegistered = global.currentIdentity.isRegistered && !!identity;

		return html`
			<div class="flex flex-col space-y-3">
				<h1 class="text-2xl mb-2">Profile Settings</h1>
				<div>
					<h2 class="text-lg mb-2">Profile appearance</h2>
					<rvt-button icon="solid/user-pen" text="#eeeeee" @click=${this.openEditModal.bind(this)}
						>Edit profile</rvt-button
					>
				</div>
				<div class="flex flex-col space-y-3">
					<h2 class="text-lg my-0">Link Email</h2>
					${when(
						isRegistered,
						() =>
							html`<span class="badge self-start bg-green-700 rounded-lg px-3 py-0.5"
								><e-svg src="solid/check"></e-svg> Registered</span
							>`,
						() => html`<p class="mt-0 mb-3">Link your email to Rivet for full account access.</p>`
					)}
					<rvt-button
						icon="solid/envelope"
						text="#eeeeee"
						@click=${() => RvtRoot.shared.openRegisterPanel()}
						>${isRegistered ? 'View registration' : 'Link email'}</rvt-button
					>
				</div>
				<div class="flex flex-col space-y-3">
					<h1 class="text-lg my-0">Logout</h1>
					${global.currentIdentity.isRegistered || global.currentIdentity.isAdmin
						? html`<rvt-button
								class="mt-2"
								icon="solid/arrow-right-from-bracket"
								variant="danger"
								@click=${this.logout.bind(this)}
								>Logout</rvt-button
						  >`
						: html`<p class="mt-0 mb-3">Logged in as guest.</p>
								<rvt-button @click=${() => RvtRoot.shared.openRegisterPanel()}
									>Register Now</rvt-button
								> `}
				</div>
				${when(
					this.identityObserver.identity.isRegistered,
					() => html`
						<div>
							<h2 class="text-lg my-0">Toggle deletion</h2>
							<p class="mt-0 mb-3">
								Marks your account for deletion. After 30 days of this switch being on, your
								Rivet account and all associated game accounts will be
								<b>permanently deleted</b>.
							</p>
							<toggle-switch
								.value=${this.identityObserver.identity.awaitingDeletion}
								@toggle=${(e: ToggleSwitchEvent) => {
									if (!e.value) {
										e.preventDefault();
										return this.confirmAccountDeletion();
									}
									this.settingChanged('toggle-deletion', !e.value);
								}}
							></toggle-switch>
						</div>
					`
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

	async logout() {
		await global.authManager.logout();
	}
}
