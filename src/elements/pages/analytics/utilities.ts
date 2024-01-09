import { Rivet as RivetEe } from '@rivet-gg/api-ee';
import logging from '../../../utils/logging';

export function dataSetToVariant(dataSet: RivetEe.ee.cloud.NamespaceAnalyticsDataSet) {
	if (dataSet.matchmakerOverview) return RivetEe.ee.cloud.AnalyticsVariantQuery.MatchmakerOverview;
	else if (dataSet.playerCount) return RivetEe.ee.cloud.AnalyticsVariantQuery.PlayerCount;
	else if (dataSet.playerCountByRegion) return RivetEe.ee.cloud.AnalyticsVariantQuery.PlayerCountByRegion;
	else if (dataSet.playerCountByGameMode)
		return RivetEe.ee.cloud.AnalyticsVariantQuery.PlayerCountByGameMode;
	else if (dataSet.lobbyCount) return RivetEe.ee.cloud.AnalyticsVariantQuery.LobbyCount;
	else if (dataSet.lobbyCountByRegion) return RivetEe.ee.cloud.AnalyticsVariantQuery.LobbyCountByRegion;
	else if (dataSet.lobbyCountByGameMode) return RivetEe.ee.cloud.AnalyticsVariantQuery.LobbyCountByGameMode;
	else if (dataSet.avgPlayDuration) return RivetEe.ee.cloud.AnalyticsVariantQuery.AvgPlayDuration;
	else if (dataSet.avgPlayDurationByGameMode)
		return RivetEe.ee.cloud.AnalyticsVariantQuery.AvgPlayDurationByGameMode;
	else if (dataSet.avgPlayDurationByRegion)
		return RivetEe.ee.cloud.AnalyticsVariantQuery.AvgPlayDurationByRegion;
	else if (dataSet.newPlayersPerSecond) return RivetEe.ee.cloud.AnalyticsVariantQuery.NewPlayersPerSecond;
	else if (dataSet.newLobbiesPerSecond) return RivetEe.ee.cloud.AnalyticsVariantQuery.NewLobbiesPerSecond;
	else if (dataSet.destroyedLobbiesByFailure)
		return RivetEe.ee.cloud.AnalyticsVariantQuery.DestroyedLobbiesByFailure;
	else if (dataSet.destroyedLobbiesByExitCode)
		return RivetEe.ee.cloud.AnalyticsVariantQuery.DestroyedLobbiesByExitCode;
	else if (dataSet.failedLobbies) return RivetEe.ee.cloud.AnalyticsVariantQuery.FailedLobbies;
	else if (dataSet.lobbyReadyTime) return RivetEe.ee.cloud.AnalyticsVariantQuery.LobbyReadyTime;

	logging.warn('unhandled dataset variant', dataSet);
	return null;
}
