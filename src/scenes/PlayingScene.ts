import config from "../config";
import Beam from "../effects/Beam";
import Enemy from "../sprites/Enemy";
import Player from "../sprites/Player";

declare type WasdKeys = {
  up?: Phaser.Input.Keyboard.Key;
  down?: Phaser.Input.Keyboard.Key;
  left?: Phaser.Input.Keyboard.Key;
  right?: Phaser.Input.Keyboard.Key;
};
export default class PlayingScene extends Phaser.Scene {
  player: Player;
  beams: Phaser.GameObjects.Group;
  enemies: Phaser.Physics.Arcade.Group;

  private background: Phaser.GameObjects.TileSprite;
  cursorKeys: CursorKeys;
  wasdKeys: WasdKeys;

  constructor() {
    super("PlayGame");
  }

  preload() {
    this.load.setBaseURL("http://127.0.0.1:8887");

    // Player
    this.load.image("playerR1", "./src/assets/sprites/player/kirbyR1.png");
    this.load.image("playerR2", "./src/assets/sprites/player/kirbyR2.png");
    this.load.image("playerR3", "./src/assets/sprites/player/kirbyR3.png");
    this.load.image("playerR4", "./src/assets/sprites/player/kirbyR4.png");
    this.load.image("playerR5", "./src/assets/sprites/player/kirbyR5.png");
    this.load.image("playerR6", "./src/assets/sprites/player/kirbyR6.png");
    this.load.image("playerR7", "./src/assets/sprites/player/kirbyR7.png");
    this.load.image("playerR8", "./src/assets/sprites/player/kirbyR8.png");
    this.load.image("playerR9", "./src/assets/sprites/player/kirbyR9.png");
    this.load.image("playerR10", "./src/assets/sprites/player/kirbyR10.png");

    this.load.image("playerL1", "./src/assets/sprites/player/kirbyL1.png");
    this.load.image("playerL2", "./src/assets/sprites/player/kirbyL2.png");
    this.load.image("playerL3", "./src/assets/sprites/player/kirbyL3.png");
    this.load.image("playerL4", "./src/assets/sprites/player/kirbyL4.png");
    this.load.image("playerL5", "./src/assets/sprites/player/kirbyL5.png");
    this.load.image("playerL6", "./src/assets/sprites/player/kirbyL6.png");
    this.load.image("playerL7", "./src/assets/sprites/player/kirbyL7.png");
    this.load.image("playerL8", "./src/assets/sprites/player/kirbyL8.png");
    this.load.image("playerL9", "./src/assets/sprites/player/kirbyL9.png");
    this.load.image("playerL10", "./src/assets/sprites/player/kirbyL10.png");

    this.load.image("playerU1", "./src/assets/sprites/player/kirbyU1.png");
    this.load.image("playerU2", "./src/assets/sprites/player/kirbyU2.png");
    this.load.image("playerU3", "./src/assets/sprites/player/kirbyU3.png");
    this.load.image("playerU4", "./src/assets/sprites/player/kirbyU4.png");
    this.load.image("playerU5", "./src/assets/sprites/player/kirbyU5.png");
    this.load.image("playerU6", "./src/assets/sprites/player/kirbyU6.png");
    this.load.image("playerU7", "./src/assets/sprites/player/kirbyU7.png");
    this.load.image("playerU8", "./src/assets/sprites/player/kirbyU8.png");
    this.load.image("playerU9", "./src/assets/sprites/player/kirbyU9.png");
    this.load.image("playerU10", "./src/assets/sprites/player/kirbyU10.png");

    this.load.image("playerD1", "./src/assets/sprites/player/kirbyD1.png");
    this.load.image("playerD2", "./src/assets/sprites/player/kirbyD2.png");
    this.load.image("playerD3", "./src/assets/sprites/player/kirbyD3.png");
    this.load.image("playerD4", "./src/assets/sprites/player/kirbyD4.png");
    this.load.image("playerD5", "./src/assets/sprites/player/kirbyD5.png");
    this.load.image("playerD6", "./src/assets/sprites/player/kirbyD6.png");
    this.load.image("playerD7", "./src/assets/sprites/player/kirbyD7.png");
    this.load.image("playerD8", "./src/assets/sprites/player/kirbyD8.png");
    this.load.image("playerD9", "./src/assets/sprites/player/kirbyD9.png");
    this.load.image("playerD10", "./src/assets/sprites/player/kirbyD10.png");

    this.load.image("beam", "./src/assets/bullets/bullet01.png");

    // Enemy
    this.load.image("enemy1", "./src/assets/sprites/enemy/blade_knight.png");

    this.load.image("background", "./src/assets/background/clouds.png");
  }
  create() {
    // Background
    this.background = this.add.tileSprite(
      0,
      0,
      config.width,
      config.height,
      "background"
    );
    this.background.setOrigin(0, 0);
    this.background.alpha = 0.5;

    // Player
    this.player = new Player(this);
    this.cameras.main.startFollow(this.player);

    this.time.addEvent({
      delay: 1000,
      callback: () => {
        this.shoot();
      },
      loop: true,
    });

    // Enemy
    this.enemies = this.physics.add.group();
    this.addEnemyLoop();

    // Effects
    this.beams = this.add.group();

    // Collision
    this.physics.add.overlap(
      this.beams as unknown as Phaser.GameObjects.GameObject[],
      this.enemies as unknown as Phaser.GameObjects.GameObject[],
      (beam: Beam, enemy: Enemy) => enemy.hitBy(beam),
      null,
      this
    );

    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.wasdKeys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });
  }
  shoot() {
    new Beam(this, this.player);
  }

  movePlayerManager() {
    if (this.cursorKeys.left.isDown || this.wasdKeys.left.isDown) {
      this.player.play("left", true);
      this.player.x -= 3;
    } else if (this.cursorKeys.right.isDown || this.wasdKeys.right.isDown) {
      this.player.x += 3;
      this.player.play("right", true);
    } else if (this.cursorKeys.up.isDown || this.wasdKeys.up.isDown) {
      this.player.y -= 3;
      this.player.play("up", true);
    } else if (this.cursorKeys.down.isDown || this.wasdKeys.down.isDown) {
      this.player.y += 3;
      this.player.play("down", true);
    }

    if (
      Phaser.Input.Keyboard.JustUp(this.cursorKeys.right) ||
      Phaser.Input.Keyboard.JustUp(this.wasdKeys.right) ||
      Phaser.Input.Keyboard.JustUp(this.cursorKeys.left) ||
      Phaser.Input.Keyboard.JustUp(this.wasdKeys.left)
    ) {
      this.player.play("stop", true);
    }
  }

  update() {
    this.movePlayerManager();

    this.background.setX(this.player.x - 400);
    this.background.setY(this.player.y - 300);
    this.background.tilePositionX = this.player.x - 400;
    this.background.tilePositionY = this.player.y - 300;
  }

  addEnemyLoop() {
    this.time.addEvent({
      delay: 2000,
      callback: () => {
        // TODO: ???????????? ??????????????? ???
        this.enemies.add(new Enemy(this, 0, 0, "enemy1"));
      },
      loop: true,
    });
  }
}
