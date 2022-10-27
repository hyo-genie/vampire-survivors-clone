import Phaser from "phaser";
import PlayingScene from "../scenes/PlayingScene";

export default class Beam extends Phaser.Physics.Arcade.Sprite {
  static SPEED = 100;
  static DURATION = 1000;

  constructor(scene: PlayingScene, player: Phaser.GameObjects.Sprite) {
    const x = player.x;
    const y = player.y - 16;
    super(scene, x, y, "beam");

    scene.add.existing(this);
    scene.physics.world.enableBody(this);

    scene.beams.add(this);

    this.setCircle(30);
    this.setDepth(80);

    this.body.velocity.x = Beam.SPEED;
    this.body.velocity.y = Beam.SPEED;
    // this.setVelocity();
    // this.setAngle();

    // DURATION만큼 시간이 지나면 사라짐
    scene.time.addEvent({
      delay: Beam.DURATION,
      callback: () => {
        this.destroy();
      },
      loop: false,
    });
  }
}
