import config from "../config";

declare type WasdKeys = {
  up?: Phaser.Input.Keyboard.Key;
  down?: Phaser.Input.Keyboard.Key;
  left?: Phaser.Input.Keyboard.Key;
  right?: Phaser.Input.Keyboard.Key;
};
export default class PlayingScene extends Phaser.Scene {
  private player: Phaser.GameObjects.Image | null = null;

  private background: Phaser.GameObjects.TileSprite;
  private cursorKeys: CursorKeys;
  private wasdKeys: WasdKeys;

  constructor() {
    super("PlayGame");
  }
  preload() {
    this.load.setBaseURL("http://127.0.0.1:8887");
    this.load.image("player", "./src/assets/sprites/mushroom.png");
    this.load.image("background", "./src/assets/background/clouds.png");
  }
  create() {
    this.background = this.add.tileSprite(
      0,
      0,
      config.width,
      config.height,
      "background"
    );
    this.background.setOrigin(0, 0);
    this.background.alpha = 0.5;

    this.player = this.add.image(400, 300, "player");
    this.cameras.main.startFollow(this.player);

    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.wasdKeys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });
  }
  movePlayerManager() {
    if (this.cursorKeys.left.isDown || this.wasdKeys.left.isDown) {
      this.player.x -= 3;
    } else if (this.cursorKeys.right.isDown || this.wasdKeys.right.isDown) {
      this.player.x += 3;
    }

    if (this.cursorKeys.up.isDown || this.wasdKeys.up.isDown) {
      this.player.y -= 3;
    } else if (this.cursorKeys.down.isDown || this.wasdKeys.down.isDown) {
      this.player.y += 3;
    }
  }

  update() {
    this.movePlayerManager();

    this.background.setX(this.player.x - 400);
    this.background.setY(this.player.y - 300);
    this.background.tilePositionX = this.player.x - 400;
    this.background.tilePositionY = this.player.y - 300;
  }
}
