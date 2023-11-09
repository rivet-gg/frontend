import { html, TemplateResult } from 'lit';
import RvtRoot from '../elements/root/rvt-root';
import { AlertOption } from '../elements/overlay/alert-panel';
import { ActionSheetItem } from '../elements/overlay/action-sheet';
import * as api from '../utils/api';
import logging from '../utils/logging';
import config from '../config';
import { Context } from '../elements/context-menu/context-menu';

/// Helper function that returns a closure that can be passed to `mouseenter` to show a tooltip when hovered and
/// automatically binds the `mouseleave` event to hide the tooltip.
export function tooltip(text: string): (e: Event) => void {
	return (event: Event) => {
		let element = event.currentTarget as HTMLElement;

		// Show tooltip
		RvtRoot.shared.showTooltip(element, text);

		// Add hide event; we register click, since that may cause the tooltip to disappear on an action
		let hideTooltip = () => {
			RvtRoot.shared.hideTooltip();

			element.removeEventListener('mouseleave', hideTooltip);
			element.removeEventListener('click', hideTooltip);
		};
		element.addEventListener('mouseleave', hideTooltip, { once: true });
		element.addEventListener('click', hideTooltip, { once: true });
	};
}

/// Helper function that returns a closure that can be passed to `contextmenu` to show a context menu
/// when right clicked and automatically binds the `focusout` event to hide the context menu.
export function showIdentityContextMenu(identity: api.identity.IdentityHandle): (e: MouseEvent) => void {
	return abstractContextMenu(() => {
		let ctx: Context = { identity: { identity } };
		return html`<context-menu .ctx=${ctx}></context-menu>`;
	});
}

export function showGroupContextMenu(context: Context['group']): (e: MouseEvent) => void {
	return abstractContextMenu(() => {
		let ctx: Context = { group: context };
		return html`<context-menu .ctx=${ctx}></context-menu>`;
	});
}

export function showGroupMemberContextMenu(context: Context['groupMember']): (e: MouseEvent) => void {
	return abstractContextMenu(() => {
		let ctx: Context = { groupMember: context };
		return html`<context-menu .ctx=${ctx}></context-menu>`;
	});
}

export function showJoinRequestContextMenu(context: Context['joinRequest']): (e: MouseEvent) => void {
	return abstractContextMenu(() => {
		let ctx: Context = { joinRequest: context };
		return html`<context-menu .ctx=${ctx}></context-menu>`;
	});
}

export function showBannedIdentityContextMenu(context: Context['bannedIdentity']): (e: MouseEvent) => void {
	return abstractContextMenu(() => {
		let ctx: Context = { bannedIdentity: context };
		return html`<context-menu .ctx=${ctx}></context-menu>`;
	});
}

export function showLobbyContextMenu(context: Context['lobby']): (e: MouseEvent) => void {
	return abstractContextMenu(() => {
		let ctx: Context = { lobby: context };
		return html`<context-menu wide .ctx=${ctx}></context-menu>`;
	});
}

function abstractContextMenu(cb: () => TemplateResult): (e: MouseEvent) => void {
	return (event: MouseEvent) => {
		let element = event.currentTarget as HTMLElement;

		// Show contextmenu
		RvtRoot.shared.showContextMenu(element, event.clientX, event.clientY, cb());

		// Stop default context menu from being enabled
		event.preventDefault();
		event.stopPropagation();
		return false;
	};
}

// Stop default context menu from being enabled
export function noContextMenu(event: MouseEvent): boolean {
	event.preventDefault();
	event.stopPropagation();

	return false;
}

/// Creates an alert with multiple given options and returns a promise
/// indicating the index of which option was picked. Should not be used
// with complex HTML, use <drop-down-modal> instead.
export function showAlert(
	title: string,
	details: TemplateResult = null,
	options: AlertOption[] = [{ label: 'Dismiss' }]
) {
	// Show alert
	RvtRoot.shared.showAlertPanel({ title, details, options, active: true });
}

export function showActionSheet(anchor: HTMLElement, options: ActionSheetItem[]) {
	RvtRoot.shared.showActionSheet({
		contextElement: anchor,
		options,
		active: true
	});
}

logging.errorCb = (title: string, ...data: any[]) => {
	// Debug alert panel
	if (config.DEBUG) {
		showAlert(`Internal Error: ${title}`, html`${data.join(' ~~~ ')}`);
	}
};
