export default class PlayingScene extends Phaser.Scene {
  private character: Phaser.GameObjects.Image | null = null;

  private upKey: Phaser.Input.Keyboard.Key | null = null;
  private downKey: Phaser.Input.Keyboard.Key | null = null;
  private leftKey: Phaser.Input.Keyboard.Key | null = null;
  private rightKey: Phaser.Input.Keyboard.Key | null = null;

  constructor() {
    super("PlayGame");
  }
  preload() {
    this.load.setBaseURL("http://127.0.0.1:8887");
    this.load.image("character", "./src/assets/sprites/mushroom.png");
  }
  create() {
    this.character = this.add.image(400, 300, "character");

    this.upKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    this.downKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.DOWN
    );
    this.leftKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.LEFT
    );
    this.rightKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.RIGHT
    );
  }
  update() {
    if (this.character) {
      if (this.upKey?.isDown) this.character.y -= 10;
      if (this.downKey?.isDown) this.character.y += 10;
      if (this.leftKey?.isDown) this.character.x -= 10;
      if (this.rightKey?.isDown) this.character.x += 10;
    }
  }
}
