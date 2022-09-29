import PlayingScene from "../scenes/PlayingScene";

const config = {
  type: Phaser.CANVAS,
  width: 1000,
  height: 600,
  backgroundColor: "#ADD8E6",
  parent: "thegame",
  scene: [PlayingScene],
};

export default config;
