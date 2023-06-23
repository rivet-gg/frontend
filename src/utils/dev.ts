import cloud from '@rivet-gg/cloud';

export function versionForId(game: cloud.GameFull, versionId: string): cloud.VersionSummary {
	return game.versions.find(v => v.versionId == versionId);
}
