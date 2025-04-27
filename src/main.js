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
    this.commentData = [
      {
        username: "PatriotEagle99",
        content:
          "Why even bother listening to them? They're all corrupt anyway.",
        type: "troll",
      },
      {
        username: "FreedomBot2025",
        content:
          "Amazing! Check out this new political page! 👉 [suspicious link]",
        type: "bot",
      },
      {
        username: "LibertyCrier",
        content:
          "Some people just don't value 'traditional values' anymore... sad.",
        type: "dogwhistle",
      },
      {
        username: "SunnyDays",
        content: "Hope everyone is staying safe and kind out there! ❤️",
        type: "normal",
      },
    ];
  }

  preload() {
    // Later: Load assets
  }

  selectFlag(flagType) {
    this.selectedFlag = flagType;
    console.log("Selected flag:", flagType);

    // Optionally: highlight the selected flag
    this.trollFlag.setBackgroundColor("#333333");
    this.botFlag.setBackgroundColor("#333333");
    this.dogWhistleFlag.setBackgroundColor("#333333");

    if (flagType === "troll") {
      this.trollFlag.setBackgroundColor("#5555ff"); // Highlight
    } else if (flagType === "bot") {
      this.botFlag.setBackgroundColor("#5555ff");
    } else if (flagType === "dogwhistle") {
      this.dogWhistleFlag.setBackgroundColor("#5555ff");
    }
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
    // Progress Bar Placeholder (for later)
    this.progressBar = this.add.rectangle(400, 20, 600, 20, 0x00ff00);

    // Title of the Post (centered)
    this.add
      .text(400, 60, "🚨 Breaking News 🚨", {
        fontSize: "24px",
        color: "#ffffff",
        fontFamily: "Arial",
      })
      .setOrigin(0.5);

    // Placeholder Post Content
    this.add
      .text(400, 100, "An important event has everyone talking...", {
        fontSize: "16px",
        color: "#cccccc",
        fontFamily: "Arial",
      })
      .setOrigin(0.5);

    // Comment Section Title
    this.add
      .text(100, 150, "Comments:", {
        fontSize: "20px",
        color: "#ffffff",
        fontFamily: "Arial",
      })
      .setOrigin(0, 0);

    // Group to hold all comments
    this.commentsGroup = this.add.group();

    // Vertical spacing
    let commentY = 180; // Start position under the "Comments:" title

    // Loop through comment data and spawn comments
    this.commentData.forEach((comment) => {
      const usernameText = this.add.text(100, commentY, comment.username, {
        fontSize: "16px",
        color: "#00bfff",
        fontFamily: "Arial",
        fontStyle: "bold",
      });

      const contentText = this.add.text(120, commentY + 20, comment.content, {
        fontSize: "14px",
        color: "#ffffff",
        fontFamily: "Arial",
        wordWrap: { width: 550 },
      });

      this.commentsGroup.add(usernameText);
      this.commentsGroup.add(contentText);

      // Increase Y for next comment
      commentY += 70; // Space out the comments nicely

      // Red Flags UI
      this.selectedFlag = null; // Track what the player has selected

      this.add.text(620, 150, "Red Flags:", {
        fontSize: "20px",
        color: "#ffffff",
        fontFamily: "Arial",
      });

      // Troll Flag
      this.trollFlag = this.add
        .text(620, 190, "👺 Troll", {
          fontSize: "18px",
          color: "#ff4444",
          fontFamily: "Arial",
          backgroundColor: "#333333",
          padding: { x: 5, y: 3 },
        })
        .setInteractive();

      this.trollFlag.on("pointerdown", () => {
        this.selectFlag("troll");
      });

      // Bot Flag
      this.botFlag = this.add
        .text(620, 240, "🤖 Bot", {
          fontSize: "18px",
          color: "#44ff44",
          fontFamily: "Arial",
          backgroundColor: "#333333",
          padding: { x: 5, y: 3 },
        })
        .setInteractive();

      this.botFlag.on("pointerdown", () => {
        this.selectFlag("bot");
      });

      // Dog Whistle Flag
      this.dogWhistleFlag = this.add
        .text(620, 290, "🐶 Dog Whistle", {
          fontSize: "18px",
          color: "#ffff44",
          fontFamily: "Arial",
          backgroundColor: "#333333",
          padding: { x: 5, y: 3 },
        })
        .setInteractive();

      this.dogWhistleFlag.on("pointerdown", () => {
        this.selectFlag("dogwhistle");
      });
    });
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
