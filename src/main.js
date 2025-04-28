// ==================
// MainMenu Scene
// ==================
class MainMenu extends Phaser.Scene {
  constructor() {
    super({ key: "MainMenu" });
  }

  create() {
    this.cameras.main.setBackgroundColor("#24252A");

    // Title Text
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
      .setInteractive();

    startButton
      .on("pointerover", () => startButton.setColor("#ffff00"))
      .on("pointerout", () => startButton.setColor("#00ff00"))
      .on("pointerdown", () => this.scene.start("CommentSectionChaos"));

    // Instructions Button
    const instructionsButton = this.add
      .text(400, 400, "Instructions", {
        fontSize: "24px",
        color: "#ffffff",
        fontFamily: "Arial",
      })
      .setOrigin(0.5)
      .setInteractive();

    instructionsButton
      .on("pointerover", () => instructionsButton.setColor("#ffff00"))
      .on("pointerout", () => instructionsButton.setColor("#ffffff"))
      .on("pointerdown", () => {
        alert("Find the villain. Stay sharp. Think critically.");
      });
  }
}

// ==================
// CommentSectionChaos Scene
// ==================
class CommentSectionChaos extends Phaser.Scene {
  constructor() {
    super({ key: "CommentSectionChaos" });
  }

  preload() {
    // Comment Pool: Expanded to ~30 comments
    this.commentPool = [
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
      {
        username: "RealNews123",
        content: "Everyone is panicking without knowing all the facts!",
        type: "troll",
      },
      {
        username: "BotBlaster",
        content: "Win a free trip! Click here! 🌴",
        type: "bot",
      },
      {
        username: "WhistleGuy",
        content: "People like *them* are ruining our culture...",
        type: "dogwhistle",
      },
      {
        username: "KindSoul",
        content: "Remember: empathy > anger. ❤️",
        type: "normal",
      },
      {
        username: "TruthSeeker",
        content: "Don't believe everything you read! Question it all!",
        type: "troll",
      },
      {
        username: "TravelBotX",
        content: "Unbelievable deals! Book now!! ✈️",
        type: "bot",
      },
      {
        username: "SubtleSignal",
        content: "Some groups just don't fit into our way of life...",
        type: "dogwhistle",
      },
      {
        username: "FriendlyNeighbor",
        content: "Stay positive, friends! 🌻",
        type: "normal",
      },
      {
        username: "ConspiracyHunter",
        content: "Wake up sheeple!! The truth is hidden!",
        type: "troll",
      },
      {
        username: "PromoBot",
        content: "Limited time offer! Don't miss out!",
        type: "bot",
      },
      {
        username: "CodeWhistler",
        content: "Certain people just can’t be trusted with important roles.",
        type: "dogwhistle",
      },
      {
        username: "JoyfulHeart",
        content: "Sending love and kindness to all! ❤️",
        type: "normal",
      },
      {
        username: "JusticeWatch",
        content: "They're trying to silence us!",
        type: "troll",
      },
      {
        username: "SpammySam",
        content: "FREE gift cards! Comment NOW!",
        type: "bot",
      },
      {
        username: "SignalCaller",
        content: "They aren't *real* citizens anyway...",
        type: "dogwhistle",
      },
      {
        username: "PeaceBringer",
        content: "Let's build bridges, not walls. ✨",
        type: "normal",
      },
      {
        username: "AngryVoice",
        content: "They don't deserve rights.",
        type: "dogwhistle",
      },
      {
        username: "SuperSaleBot",
        content: "50% off luxury watches! ⌚",
        type: "bot",
      },
      {
        username: "HopeDealer",
        content: "Kindness is contagious. ❤️",
        type: "normal",
      },
      {
        username: "AltNewsNow",
        content: "You won't hear THIS on the mainstream news!",
        type: "troll",
      },
      {
        username: "CouponKing",
        content: "Get your discounts today! 🎟️",
        type: "bot",
      },
      {
        username: "HiddenAgenda",
        content: "The government is hiding everything from us!",
        type: "troll",
      },
      {
        username: "BridgeBuilder",
        content: "Together we are stronger. 🤝",
        type: "normal",
      },
      {
        username: "BaitWhistle",
        content: "Our neighborhoods aren't safe anymore...",
        type: "dogwhistle",
      },
      {
        username: "GiveawayBot",
        content: "WIN $1000 Amazon gift card!",
        type: "bot",
      },
    ];

    this.dialogue = [
      "Detective: The villain is infecting this comment section!",
      "Detective: They use trolls to provoke, bots to amplify, and dog whistles to radicalize.",
      "Detective: Identify trolls, bots, and dog whistles with the red flags.",
      "Detective: Correctly tagging them helps us hack their machine!",
      "Detective: Misidentifying good commenters will set us back. Be careful!",
      "Detective: Good luck, agent.",
    ];
  }

  create() {
    this.dialogueIndex = 0;
    this.selectedFlag = null;
    this.progressValue = 0;

    // Set background color
    this.cameras.main.setBackgroundColor("#1e1e1e");

    // Create mask area
    this.panelMaskShape = this.add.graphics();
    this.panelMaskShape.fillStyle(0x1e1e1e);
    this.panelMaskShape.fillRect(100, 190, 500, 360); // (x, y, width, height)

    const mask = new Phaser.Display.Masks.GeometryMask(
      this,
      this.panelMaskShape
    );

    // Create a container for comments
    this.commentPanel = this.add.container(100, 190); // Notice (100, 190) to align with mask
    this.commentPanel.setMask(mask);

    this.scrollOffset = 0;

    this.input.on("wheel", (pointer, gameObjects, deltaX, deltaY, deltaZ) => {
      this.scrollOffset -= deltaY * 0.5; // Adjust scroll speed
      this.scrollOffset = Phaser.Math.Clamp(this.scrollOffset, -1000, 0); // Limit scrolling
      this.commentPanel.y = 190 + this.scrollOffset; // IMPORTANT: base y + scroll
    });

    this.activeComments = [];

    this.createIntro();
  }

  createIntro() {
    this.cameras.main.setBackgroundColor("#1e1e1e");

    this.detective = this.add.rectangle(100, 500, 80, 120, 0x0077ff);
    this.dialogueBox = this.add.rectangle(400, 550, 700, 80, 0x333333);
    this.dialogueText = this.add.text(
      120,
      520,
      this.dialogue[this.dialogueIndex],
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
    if (this.dialogueIndex < this.dialogue.length) {
      this.dialogueText.setText(this.dialogue[this.dialogueIndex]);
    } else {
      this.startGame();
    }
  }

  startGame() {
    this.detective.destroy();
    this.dialogueBox.destroy();
    this.dialogueText.destroy();

    this.createUI();
    this.spawnInitialComments();
  }

  createUI() {
    this.progressBarWidth = 600;

    this.progressBarFill = this.add
      .rectangle(100, 20, this.progressBarWidth, 20, 0x00ff00)
      .setOrigin(0, 0.5);
    this.progressBarFill.scaleX = 0.15;

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

    this.add.text(620, 150, "Red Flags:", {
      fontSize: "20px",
      color: "#ffffff",
      fontFamily: "Arial",
    });

    this.trollFlag = this.createFlag(620, 190, "👺 Troll", "troll", "#ff4444");
    this.botFlag = this.createFlag(620, 240, "🤖 Bot", "bot", "#44ff44");
    this.dogwhistleFlag = this.createFlag(
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
        backgroundColor: "#333333",
        padding: { x: 5, y: 3 },
        fontFamily: "Arial",
      })
      .setInteractive();

    flag.on("pointerdown", () => this.selectFlag(type));
    return flag;
  }

  selectFlag(type) {
    this.selectedFlag = type;
    [this.trollFlag, this.botFlag, this.dogwhistleFlag].forEach((flag) => {
      flag.setBackgroundColor("#333333");
    });
    if (type === "troll") this.trollFlag.setBackgroundColor("#5555ff");
    if (type === "bot") this.botFlag.setBackgroundColor("#5555ff");
    if (type === "dogwhistle")
      this.dogwhistleFlag.setBackgroundColor("#5555ff");
  }

  spawnInitialComments() {
    for (let i = 0; i < 10; i++) {
      this.spawnRandomComment();
    }
  }

  spawnRandomComment() {
    if (this.commentPool.length === 0) return;

    const index = Phaser.Math.Between(0, this.commentPool.length - 1);
    const data = this.commentPool.splice(index, 1)[0];
    const y = this.activeComments.length * 70;

    const container = this.add.container(0, y);

    const username = this.add.text(10, 0, data.username, {
      fontSize: "16px",
      color: "#00bfff",
      fontFamily: "Arial",
      fontStyle: "bold",
    });

    const content = this.add.text(30, 20, data.content, {
      fontSize: "14px",
      color: "#ffffff",
      fontFamily: "Arial",
      wordWrap: { width: 500 },
    });

    content.commentType = data.type;
    content.marked = false;

    container.add([username, content]);
    container.contentText = content;

    content.setInteractive();
    content.on("pointerdown", () => this.onCommentClicked(container));

    this.commentPanel.add(container);
    this.activeComments.push(container);
  }

  onCommentClicked(container) {
    if (!this.selectedFlag || container.contentText.marked) return;

    container.contentText.marked = true;
    const correct = this.selectedFlag === container.contentText.commentType;
    const flashColor = correct ? "#00ff00" : "#ff0000";
    const progressChange = correct ? 50 : -20;

    container.iterate((child) => {
      child.setStyle({ backgroundColor: flashColor });
    });

    this.tweens.add({
      targets: container,
      alpha: 0,
      duration: 300,
      onComplete: () => {
        const removedY = container.y;

        container.destroy();
        this.activeComments = this.activeComments.filter((c) => c.active);

        this.activeComments.forEach((c) => {
          if (c.y > removedY) {
            this.tweens.add({
              targets: c,
              y: c.y - 70,
              duration: 200,
            });
          }
        });

        if (this.activeComments.length < 10) {
          this.spawnRandomComment();
        }
      },
    });

    this.updateProgress(progressChange);
  }

  updateProgress(amount) {
    this.progressValue = Phaser.Math.Clamp(
      this.progressValue + amount,
      0,
      this.progressBarWidth
    );

    this.progressBarFill.scaleX = this.progressValue / this.progressBarWidth;

    if (this.progressValue >= this.progressBarWidth) {
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
