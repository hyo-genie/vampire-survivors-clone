import PlayingScene from "../scenes/PlayingScene";

export default class HpBar extends Phaser.GameObjects.Graphics {
  private value: number;
  private posX: number;
  private posY: number;

  constructor(scene: PlayingScene, player: Phaser.GameObjects.Sprite) {
    super(scene);

    this.posX = player.x - 30;
    this.posY = player.y - 40;
    this.value = 100;

    this.draw();
    this.setScrollFactor(0);

    scene.add.existing(this);
  }

  draw() {
    this.clear();

    this.fillStyle(0xaaaaaa);
    this.fillRect(this.posX, this.posY, 60, 12);

    this.fillStyle(0xffffff);
    this.fillRect(this.posX + 2, this.posY + 2, 56, 8);

    if (this.value < 30) {
      this.fillStyle(0xff3300);
    } else {
      this.fillStyle(0x00ff11);
    }

    this.fillRect(
      this.posX + 2,
      this.posY + 2,
      Math.floor((56 * this.value) / 100),
      8
    );
  }
}
