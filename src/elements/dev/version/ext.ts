import { Rivet } from '@rivet-gg/api';

export interface MatchmakerConfigExt {
	config: Rivet.cloud.version.matchmaker.Config;
	gameModes: GameModeExt[];
	docker: GameModeRuntimeDockerExt;
}

export interface GameModeExt {
	nameId: string;
	gameMode: Rivet.cloud.version.matchmaker.gameMode.GameMode;
	regions: GameModeRegionExt[];
}

export interface GameModeRegionExt {
	nameId: string;
	region: Rivet.cloud.version.matchmaker.gameMode.GameModeRegion;
}

export interface GameModeRuntimeDockerExt {
	docker: Rivet.cloud.version.matchmaker.gameMode.GameModeRuntimeDocker;
	env: { key: string; value: string }[];
	ports: GameModeRuntimeDockerPortExt[];
}

export interface GameModeRuntimeDockerPortExt {
	label: string;
	port: Rivet.cloud.version.matchmaker.gameMode.GameModeRuntimeDockerPort;
}
