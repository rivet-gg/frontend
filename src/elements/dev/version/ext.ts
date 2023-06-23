import * as cloud from '@rivet-gg/api-internal/api/resources/cloud';

export interface MatchmakerConfigExt {
	config: cloud.version.matchmaker.Config;
	gameModes: GameModeExt[];
	docker: GameModeRuntimeDockerExt;
}

export interface GameModeExt {
	nameId: string;
	gameMode: cloud.version.matchmaker.gameMode.GameMode;
	regions: GameModeRegionExt[];
}

export interface GameModeRegionExt {
	nameId: string;
	region: cloud.version.matchmaker.gameMode.GameModeRegion;
}

export interface GameModeRuntimeDockerExt {
	docker: cloud.version.matchmaker.gameMode.GameModeRuntimeDocker;
	env: { key: string; value: string }[];
	ports: GameModeRuntimeDockerPortExt[];
}

export interface GameModeRuntimeDockerPortExt {
	label: string;
	port: cloud.version.matchmaker.gameMode.GameModeRuntimeDockerPort;
}
