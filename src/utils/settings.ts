import { ls } from './cache';

export interface SettingChange {
	id: string;
	value: any;
}

const settings = {
	// Settings
	get didConsent(): boolean {
		return ls.getBoolean('did-consent', false);
	},
	set didConsent(v: boolean) {
		ls.setBoolean('did-consent', v);
	},

	get status(): number {
		return ls.getInt('status', 0);
	},
	set status(v: number) {
		ls.getInt('status', v);
	},

	get fullscreenMedia(): boolean {
		return ls.getBoolean('fullscreen-media', false);
	},
	set fullscreenMedia(v: boolean) {
		ls.setBoolean('fullscreen-media', v);
	},

	getVersionConfigDraft(gameId: string): string {
		return ls.getString(`version-config-draft:${gameId}`, '');
	},
	setVersionConfigDraft(gameId: string, v: string) {
		ls.setString(`version-config-draft:${gameId}`, v);
	}
};

export default settings;
