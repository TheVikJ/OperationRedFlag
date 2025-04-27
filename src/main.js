// ==================
// MainMenu Scene
// ==================
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
        this.scene.start("CommentSectionChaos");
      });

    // Instructions Button
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
        alert("Find the villain. Stay sharp. Think critically.");
      });
  }
}

// ==================
// Comment Classes
// ==================

// Base Comment Class
class Comment extends Phaser.GameObjects.Container {
  constructor(scene, x, y, username, content, type) {
    super(scene, x, y);

    this.username = username;
    this.content = content;
    this.type = type; // "normal", "troll", "bot", "dogwhistle"
    this.selected = false;

    this.bg = scene.add
      .rectangle(0, 0, 700, 60, 0xffffff)
      .setStrokeStyle(2, 0x000000);

    this.usernameText = scene.add.text(-330, -20, username, {
      fontSize: "16px",
      color: "#333333",
    });

    this.contentText = scene.add.text(-330, 0, content, {
      fontSize: "14px",
      color: "#000000",
      wordWrap: { width: 650 },
    });

    this.add([this.bg, this.usernameText, this.contentText]);
    this.setSize(700, 60);

    scene.add.existing(this);
  }
}

// Subclasses for different types
class TrollComment extends Comment {
  constructor(scene, x, y, username, content) {
    super(scene, x, y, username, content, "troll");
  }
}
class BotComment extends Comment {
  constructor(scene, x, y, username, content) {
    super(scene, x, y, username, content, "bot");
  }
}
class DogWhistleComment extends Comment {
  constructor(scene, x, y, username, content) {
    super(scene, x, y, username, content, "dogwhistle");
  }
}
class NormalComment extends Comment {
  constructor(scene, x, y, username, content) {
    super(scene, x, y, username, content, "normal");
  }
}

// ==================
// CommentSectionChaos Scene
// ==================
class CommentSectionChaos extends Phaser.Scene {
  constructor() {
    super({ key: "CommentSectionChaos" });
    this.dialogueIndex = 0;
    this.dialogueTexts = [
      "Detective: The villain is infecting this comment section!",
      "Detective: They use trolls to provoke, bots to amplify, and dog whistles to radicalize.",
      "Detective: Identify trolls, bots, and dog whistles with the red flags.",
      "Detective: Correctly tagging them helps us hack their machine!",
      "Detective: Misidentifying good commenters will set us back. Be careful!",
      "Detective: Good luck, agent.",
    ];
  }

  preload() {
    // Later: Load assets
  }

  create() {
    this.cameras.main.setBackgroundColor("#1e1e1e");

    // Detective rectangle
    this.detective = this.add.rectangle(100, 500, 80, 120, 0x0077ff);

    // Dialogue box
    this.dialogueBox = this.add.rectangle(400, 550, 700, 80, 0x333333);
    this.dialogueText = this.add.text(
      120,
      520,
      this.dialogueTexts[this.dialogueIndex],
      {
        fontSize: "20px",
        color: "#ffffff",
        wordWrap: { width: 600 },
      }
    );

    // Clicking advances dialogue
    this.input.on("pointerdown", () => {
      this.advanceDialogue();
    });
  }

  advanceDialogue() {
    this.dialogueIndex++;
    if (this.dialogueIndex < this.dialogueTexts.length) {
      this.dialogueText.setText(this.dialogueTexts[this.dialogueIndex]);
    } else {
      this.startGameplay();
    }
  }

  startGameplay() {
    // Hide detective intro
    this.dialogueBox.destroy();
    this.dialogueText.destroy();
    this.detective.destroy();

    // Placeholder: starting gameplay
    this.setupGameUI();
  }

  setupGameUI() {
    this.add
      .text(400, 300, "Gameplay Starting...", {
        fontSize: "32px",
        color: "#ffffff",
      })
      .setOrigin(0.5);

    // Later: set up comment section, flags, spawning comments, progress bar, etc.
  }
}

// ==================
// Game Configuration
// ==================
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: [MainMenu, CommentSectionChaos],
  backgroundColor: "#1d1d1d",
};

const game = new Phaser.Game(config);
