{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
	buildInputs = with pkgs; [
		git
		nodejs-16_x
		yarn
	];
}

