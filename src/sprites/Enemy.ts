import PlayingScene from "../scenes/PlayingScene";

export default class Enemy extends Phaser.GameObjects.Sprite {
  constructor(scene: PlayingScene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.scaleX = 0.4;
    this.scaleY = 0.4;

    this.scene.time.addEvent({
      delay: 100,
      callback: () => {
        scene.physics.moveToObject(this, scene.player, 50);
      },
      loop: true,
    });

    scene.events.on("update", () => {
      this.update();
    });

    this.on("overlapstart", (sprite: any) => {
      this.hitBy(sprite);
    });
  }

  update() {
    if (!this.body) return;

    if (this.body.velocity.x > 0) this.flipX = true;
    else this.flipX = false;
  }

  hitBy(sprite: any) {
    sprite.destroy();
    this.scene.time.removeAllEvents();
    this.destroy();
  }
}
