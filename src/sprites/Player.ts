import Beam from "../effects/Beam";
import HpBar from "../effects/HpBar";
import PlayingScene from "../scenes/PlayingScene";

export default class Player extends Phaser.GameObjects.Sprite {
  scene: PlayingScene;
  hpBar: Phaser.GameObjects.Graphics;

  constructor(scene: PlayingScene) {
    super(scene, 400, 300, "playerR1");
    this.scene = scene;
    this.hpBar = new HpBar(scene, this);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    scene.time.addEvent({
      delay: 1000,
      callback: () => {
        this.shoot();
      },
      loop: true,
    });

    this.createAnims();
  }

  shoot() {
    new Beam(this.scene, this);
  }

  move() {
    if (this.scene.cursorKeys.left.isDown || this.scene.wasdKeys.left.isDown) {
      this.play("left", true);
      this.x -= 3;
    } else if (
      this.scene.cursorKeys.right.isDown ||
      this.scene.wasdKeys.right.isDown
    ) {
      this.x += 3;
      this.play("right", true);
    } else if (
      this.scene.cursorKeys.up.isDown ||
      this.scene.wasdKeys.up.isDown
    ) {
      this.y -= 3;
      this.play("up", true);
    } else if (
      this.scene.cursorKeys.down.isDown ||
      this.scene.wasdKeys.down.isDown
    ) {
      this.y += 3;
      this.play("down", true);
    }

    if (
      Phaser.Input.Keyboard.JustUp(this.scene.cursorKeys.right) ||
      Phaser.Input.Keyboard.JustUp(this.scene.wasdKeys.right) ||
      Phaser.Input.Keyboard.JustUp(this.scene.cursorKeys.left) ||
      Phaser.Input.Keyboard.JustUp(this.scene.wasdKeys.left)
    ) {
      this.play("stop", true);
    }
  }

  createAnims() {
    this.scene.anims.create({
      key: "right",
      frames: [
        { key: "playerR1" },
        { key: "playerR2" },
        { key: "playerR3" },
        { key: "playerR4" },
        { key: "playerR5" },
        { key: "playerR6" },
        { key: "playerR7" },
        { key: "playerR8" },
        { key: "playerR9" },
        { key: "playerR10" },
      ],
      frameRate: 8,
      repeat: -1,
    });
    this.scene.anims.create({
      key: "left",
      frames: [
        { key: "playerL1" },
        { key: "playerL2" },
        { key: "playerL3" },
        { key: "playerL4" },
        { key: "playerL5" },
        { key: "playerL6" },
        { key: "playerL7" },
        { key: "playerL8" },
        { key: "playerL9" },
        { key: "playerL10" },
      ],
      frameRate: 8,
      repeat: -1,
    });
    this.scene.anims.create({
      key: "up",
      frames: [
        { key: "playerU1" },
        { key: "playerU2" },
        { key: "playerU3" },
        { key: "playerU4" },
        { key: "playerU5" },
        { key: "playerU6" },
        { key: "playerU7" },
        { key: "playerU8" },
        { key: "playerU9" },
        { key: "playerU10" },
      ],
      frameRate: 8,
      repeat: -1,
    });
    this.scene.anims.create({
      key: "down",
      frames: [
        { key: "playerD1" },
        { key: "playerD2" },
        { key: "playerD3" },
        { key: "playerD4" },
        { key: "playerD5" },
        { key: "playerD6" },
        { key: "playerD7" },
        { key: "playerD8" },
        { key: "playerD9" },
        { key: "playerD10" },
      ],
      frameRate: 8,
      repeat: -1,
    });
    this.scene.anims.create({
      key: "stop",
      frames: [{ key: "playerR1" }],
    });
  }
}
