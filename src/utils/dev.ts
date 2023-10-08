import { Rivet } from '@rivet-gg/api-internal';

export function versionForId(game: Rivet.cloud.GameFull, versionId: string): Rivet.cloud.version.Summary {
	return game.versions.find(v => v.versionId == versionId);
}
