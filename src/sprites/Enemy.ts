import PlayingScene from "../scenes/PlayingScene";

export default class Enemy extends Phaser.GameObjects.Sprite {
  event: Phaser.Time.TimerEvent;

  constructor(scene: PlayingScene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.scaleX = 0.5;
    this.scaleY = 0.5;

    this.event = this.scene.time.addEvent({
      delay: 100,
      callback: () => {
        scene.physics.moveToObject(this, scene.player, 100);
      },
      loop: true,
    });

    scene.events.on("update", () => {
      this.update();
    });
  }

  update() {
    if (!this.body) return;

    if (this.body.velocity.x > 0) this.flipX = true;
    else this.flipX = false;
  }

  hitBy(sprite: any) {
    sprite.destroy();
    this.scene.time.removeEvent(this.event);
    this.destroy();
  }
}
