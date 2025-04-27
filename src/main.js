class MainMenu extends Phaser.Scene {
  constructor() {
    super({ key: "MainMenu" });
  }

  preload() {
    // Load assets here if needed
  }

  create() {
    this.cameras.main.setBackgroundColor("#24252A");

    // Title
    this.add
      .text(400, 150, "Operation Red Flag", {
        fontSize: "48px",
        color: "#ffffff",
        fontFamily: "Arial",
      })
      .setOrigin(0.5);

    // Start Mission Button
    const startButton = this.add
      .text(400, 300, "Start Mission", {
        fontSize: "32px",
        color: "#00ff00",
        backgroundColor: "#000000",
        padding: { x: 10, y: 5 },
        fontFamily: "Arial",
      })
      .setOrigin(0.5)
      .setInteractive()
      .on("pointerover", () => startButton.setStyle({ fill: "#ffff00" }))
      .on("pointerout", () => startButton.setStyle({ fill: "#00ff00" }))
      .on("pointerdown", () => {
        this.scene.start("GameScene");
      });

    // Instructions (Optional)
    const instructionsButton = this.add
      .text(400, 400, "Instructions", {
        fontSize: "24px",
        color: "#ffffff",
        fontFamily: "Arial",
      })
      .setOrigin(0.5)
      .setInteractive()
      .on("pointerover", () => instructionsButton.setStyle({ fill: "#ffff00" }))
      .on("pointerout", () => instructionsButton.setStyle({ fill: "#ffffff" }))
      .on("pointerdown", () => {
        // Future: show instructions scene
        alert("Find the villain. Stay sharp. Think critically.");
      });
  }
}

class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" });
  }

  create() {
    this.cameras.main.setBackgroundColor("#000000");
    this.add
      .text(400, 300, "Game Started!", {
        fontSize: "32px",
        color: "#ffffff",
        fontFamily: "Arial",
      })
      .setOrigin(0.5);
  }
}

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: [MainMenu, GameScene],
  backgroundColor: "#1d1d1d",
};

const game = new Phaser.Game(config);
