import PlayingScene from "../scenes/PlayingScene";

const config = {
  type: Phaser.CANVAS,
  width: 800,
  height: 600,
  backgroundColor: "#CDE8F6",
  parent: "thegame",
  scene: [PlayingScene],
};

export default config;
