// ==================
// MainMenu Scene
// ==================
class MainMenu extends Phaser.Scene {
  constructor() {
    super({ key: "MainMenu" });
  }

  create() {
    this.cameras.main.setBackgroundColor("#24252A");

    this.add
      .text(400, 150, "Operation Red Flag", {
        fontSize: "48px",
        color: "#ffffff",
        fontFamily: "Arial",
      })
      .setOrigin(0.5);

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
      .on("pointerdown", () => this.scene.start("CommentSectionChaos"));

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
      .on("pointerdown", () =>
        alert("Find the villain. Stay sharp. Think critically.")
      );
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
    this.selectedFlag = null;
  }

  create() {
    this.cameras.main.setBackgroundColor("#1e1e1e");

    this.detective = this.add.rectangle(100, 500, 80, 120, 0x0077ff);
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

    this.input.on("pointerdown", () => this.advanceDialogue());
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
    this.detective.destroy();
    this.dialogueBox.destroy();
    this.dialogueText.destroy();
    this.setupGameUI();
  }

  setupGameUI() {
    // Progress bar
    this.progressValue = 300; // 50% start
    this.progressBar = this.add.rectangle(
      400,
      20,
      this.progressValue,
      20,
      0x00ff00
    );

    this.add
      .text(400, 60, "🚨 Breaking News 🚨", {
        fontSize: "24px",
        color: "#ffffff",
        fontFamily: "Arial",
      })
      .setOrigin(0.5);

    this.add
      .text(400, 100, "An important event has everyone talking...", {
        fontSize: "16px",
        color: "#cccccc",
        fontFamily: "Arial",
      })
      .setOrigin(0.5);

    this.add.text(100, 150, "Comments:", {
      fontSize: "20px",
      color: "#ffffff",
      fontFamily: "Arial",
    });

    this.commentsGroup = this.add.group();
    let commentY = 180;

    this.commentData.forEach((comment) => {
      const usernameText = this.add.text(100, commentY, comment.username, {
        fontSize: "16px",
        color: "#00bfff",
        fontFamily: "Arial",
        fontStyle: "bold",
      });

      const contentText = this.add
        .text(120, commentY + 20, comment.content, {
          fontSize: "14px",
          color: "#ffffff",
          fontFamily: "Arial",
          wordWrap: { width: 550 },
        })
        .setInteractive();

      contentText.commentType = comment.type;
      contentText.marked = false;

      contentText.on("pointerdown", () => {
        this.handleCommentClick(contentText);
      });

      this.commentsGroup.add(usernameText);
      this.commentsGroup.add(contentText);

      commentY += 70;
    });

    // Red Flags UI (only ONCE)
    this.add.text(620, 150, "Red Flags:", {
      fontSize: "20px",
      color: "#ffffff",
      fontFamily: "Arial",
    });

    this.trollFlag = this.createFlag(620, 190, "👺 Troll", "troll", "#ff4444");
    this.botFlag = this.createFlag(620, 240, "🤖 Bot", "bot", "#44ff44");
    this.dogWhistleFlag = this.createFlag(
      620,
      290,
      "🐶 Dog Whistle",
      "dogwhistle",
      "#ffff44"
    );
  }

  createFlag(x, y, label, type, color) {
    const flag = this.add
      .text(x, y, label, {
        fontSize: "18px",
        color: color,
        fontFamily: "Arial",
        backgroundColor: "#333333",
        padding: { x: 5, y: 3 },
      })
      .setInteractive();

    flag.on("pointerdown", () => {
      this.selectFlag(type);
    });

    return flag;
  }

  selectFlag(flagType) {
    this.selectedFlag = flagType;
    console.log("Selected flag:", flagType);

    this.trollFlag.setBackgroundColor("#333333");
    this.botFlag.setBackgroundColor("#333333");
    this.dogWhistleFlag.setBackgroundColor("#333333");

    if (flagType === "troll") {
      this.trollFlag.setBackgroundColor("#5555ff");
    } else if (flagType === "bot") {
      this.botFlag.setBackgroundColor("#5555ff");
    } else if (flagType === "dogwhistle") {
      this.dogWhistleFlag.setBackgroundColor("#5555ff");
    }
  }

  handleCommentClick(contentText) {
    if (!this.selectedFlag || contentText.marked) {
      return;
    }

    contentText.marked = true;

    if (this.selectedFlag === contentText.commentType) {
      this.updateProgress(10);
      this.flashComment(contentText, 0x00ff00);
    } else {
      this.updateProgress(-5);
      this.flashComment(contentText, 0xff0000);
    }
  }

  flashComment(commentText, color) {
    const originalBgColor = commentText.backgroundColor;

    commentText.setStyle({
      backgroundColor: Phaser.Display.Color.ValueToColor(color).rgba,
      color: "#ffffff", // Text stays white
    });

    this.time.delayedCall(200, () => {
      commentText.setStyle({
        backgroundColor: null,
        color: "#ffffff",
      });
      commentText.destroy(); // << Also destroy after flash (makes it disappear)
    });
  }

  updateProgress(amount) {
    this.progressValue += amount * 3;
    this.progressValue = Phaser.Math.Clamp(this.progressValue, 0, 600);
    this.progressBar.width = this.progressValue;

    if (this.progressValue >= 600) {
      alert("Mission Complete! Comment Section Saved!");
      this.scene.restart();
    } else if (this.progressValue <= 0) {
      alert("Mission Failed! The villain won this round!");
      this.scene.restart();
    }
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
