// ==================
// MainMenu Scene
// ==================
class MainMenu extends Phaser.Scene {
  constructor() {
    super({ key: "MainMenu" });
  }

  preload() {
    this.load.font("PixelFont", "assets/pixelfont.otf");
  }

  create() {
    this.cameras.main.setBackgroundColor("#24252A");

    // Title Text
    this.add
      .text(400, 150, "Operation Red Flag", {
        fontSize: "48px",
        color: "#ffffff",
        fontFamily: "PixelFont",
      })
      .setOrigin(0.5);

    // Start Mission Button
    const startButton = this.add
      .text(400, 300, "Start Mission", {
        fontSize: "32px",
        color: "#00ff00",
        backgroundColor: "#000000",
        padding: { x: 10, y: 5 },
        fontFamily: "PixelFont",
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
        fontFamily: "PixelFont",
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
    this.load.image("detective", "assets/detective.png");
    this.load.font("PixelFont", "assets/pixelfont.otf");
    // Comment Pool: Expanded to ~30 comments
    this.commentPool = [
      {
        username: "JREGULARGUY",
        content:
          "Lmao this guy still believes in the “experts”? 😂 Imagine being this naive.",
        type: "troll",
      },
      {
        username: "xyz123_12",
        content:
          "Incredible perspective! I just earned $3,000 this week investing in crypto — learn more here 👉 fortnitegiftcard.com",
        type: "bot",
      },
      {
        username: "seethi",
        content:
          "Funny how minorities keep pushing for 'more democracy' while ruining everything.",
        type: "dogwhistle",
      },
      {
        username: "GeorgeJ",
        content:
          "Really thoughtful video. It’s important we keep having these conversations even when it’s uncomfortable.",
        type: "normal",
      },
      {
        username: "SunnyDays",
        content: "Cool story bro. Now do one on why nobody cares anymore.",
        type: "troll",
      },
      {
        username: "christ_the_savior",
        content:
          "Such an important video! Btw if you want financial freedom during these hard times, click here -> cryptowallet789.net",
        type: "bot",
      },
      {
        username: "JeggyWeggs",
        content:
          "Back when certain people weren’t allowed to vote, things seemed... a little more stable. 🤔",
        type: "dogwhistle",
      },
      {
        username: "ethanz",
        content:
          "You made some great points about media consolidation and voter suppression — well researched!",
        type: "normal",
      },
      {
        username: "I_Love_Star_Wars",
        content: "Imagine thinking voting changes anything... 🤡",
        type: "troll",
      },
      {
        username: "mdaniels57",
        content: "Subscribed! Also check my channel for AMAZING deals 🤑",
        type: "bot",
      },
      {
        username: "Lion Of The World",
        content:
          "We need real Americans standing up again before it's too late.",
        type: "dogwhistle",
      },
      {
        username: "TheVikJ",
        content:
          "Even if I don't agree with everything here, I appreciate the respectful tone. Subscribed!",
        type: "normal",
      },
      {
        username: "LodedDiper1776",
        content: "This channel fell off lol.",
        type: "troll",
      },
      {
        username: "jeff_seven927",
        content:
          "2025 is wild! I'm staying safe by boosting my health with THIS amazing product detoxfootpads.org",
        type: "bot",
      },
      {
        username: "joyful heart",
        content:
          "Remember when merit actually mattered instead of ticking boxes?",
        type: "dogwhistle",
      },
      {
        username: "collier_davis",
        content:
          "Glad to see creators tackling serious topics without just yelling at each other.",
        type: "normal",
      },
      {
        username: "wolverine28",
        content: "Bro you don’t understand anything. FAKE NEWS.",
        type: "troll",
      },
      {
        username: "samuel gardner",
        content:
          "The government can't control you if you're financially free! Learn how I did it andreewbelmar.com",
        type: "bot",
      },
      {
        username: "goofy doof",
        content:
          "The founding fathers knew what was coming. Stay vigilant, Patriots. 🐍",
        type: "dogwhistle",
      },
      {
        username: "chloe_morgado",
        content:
          "Important reminder that democracy is a living system — it needs active care, not blind faith.",
        type: "normal",
      },
      {
        username: "art_lover22",
        content: "This piece has such a powerful atmosphere—love the lighting!",
        type: "normal",
      },
      {
        username: "dev_guy42",
        content:
          "This is a solid start, but the pacing feels a little rushed in the middle.",
        type: "normal",
      },
      {
        username: "viewer101",
        content: "I watched this all the way through.",
        type: "normal",
      },
      {
        username: "GenerelCnowledge",
        content:
          "Funny how those people keep ‘expanding democracy’ but somehow everything keeps getting worse.",
        type: "dogwhistle",
      },
      {
        username: "ninja man",
        content:
          "Can't believe people still think everyone’s vote should count the same. Do your research.",
        type: "dogwhistle",
      },
      {
        username: "quiet_kid",
        content:
          "There was a time when only those who truly contributed had a say. We’ve lost our way.",
        type: "dogwhistle",
      },
      {
        username: "CryptoQueen44",
        content:
          "Voting won’t fix your finances, but passive income might! Check out my page for tips 💎",
        type: "bot",
      },
      {
        username: "wealthwizard2025",
        content:
          "Feeling powerless this election? Start earning from home instead 👉 lifechangerzapp.net",
        type: "bot",
      },
      {
        username: "investguru3000",
        content:
          "While everyone argues about politics, I’m quietly making $5k/week. Learn how -> secureyourfuture.me",
        type: "bot",
      },
      {
        username: "hopeful_dodger",
        content: "Keep voting if you want, nothing's ever gonna change. 😂",
        type: "troll",
      },
      {
        username: "pokerjack9000",
        content:
          "Ah yes, another ‘we can change the system’ video. Good luck with that.",
        type: "troll",
      },
      {
        username: "MegaLulz",
        content:
          "Imagine thinking politicians care about your vote. Clown world 🤡",
        type: "troll",
      },
    ];

    this.dialogue = [
      "Detective: Good morning, kid, we already got a new tip.",
      "Detective: It's a break in the Milly Infaux case...",
      "Detective: I've been on her tail for a long time,",
      "Detective: I hope it finally pays off.",
      "Detective: Apparently, Ms. Infaux has been infecting a YouTube Comment Section.",
      "Detective: She's using troll accounts to write inflammatory off-topic comments about the video.",
      "Detective: She's also using bot accounts to drop links to further her causes.",
      "Detective: And she's using dog whistle accounts to divide people up and spread bigotry.",
      "Detective: Identify trolls, bots, and dog whistles with the red flags.",
      "Detective: Correctly tagging them helps us hack her machine!",
      "Detective: Misidentifying good commenters will set us back. Be careful!",
      "Detective: Good luck, agent. I'm gonna get my second cup of coffee.",
    ];
  }

  create() {
    this.dialogueIndex = 0;
    this.selectedFlag = null;
    this.progressValue = 20;

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
    this.detective = this.add.sprite(-100, 300, "detective");
    this.detective.setScale(0.2);

    this.tweens.add({
      targets: this.detective,
      x: 400,
      duration: 1000,
      ease: "Power2",
    });

    this.dialogueBox = this.add.rectangle(400, 550, 700, 80, 0x333333);
    this.dialogueText = this.add.text(
      120,
      520,
      this.dialogue[this.dialogueIndex],
      {
        fontSize: "20px",
        fontFamily: "PixelFont",
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
      this.tweens.add({
        targets: this.detective,
        x: 900,
        duration: 1000,
        ease: "Power2",
        onComplete: () => this.startGame(),
      });
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
      .text(400, 60, "voting... (a video essay)", {
        font: "400 24px PixelFont",
        color: "#ffffff",
      })
      .setOrigin(0.5);

    this.add
      .text(400, 100, "Joey Schmoey", {
        fontSize: "16px",
        color: "#cccccc",
        fontFamily: "PixelFont",
      })
      .setOrigin(1.55);

    this.add.text(100, 150, "Comments:", {
      fontSize: "20px",
      color: "#ffffff",
      fontFamily: "PixelFont",
    });

    this.add.text(620, 150, "Red Flags:", {
      fontSize: "20px",
      color: "#ffffff",
      fontFamily: "PixelFont",
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
    const y = this.activeComments.length * 100;

    const container = this.add.container(0, y);

    const username = this.add.text(10, 0, data.username, {
      fontSize: "16px",
      color: "#00bfff",
      fontFamily: "PixelFont",
      fontStyle: "bold",
    });

    const content = this.add.text(30, 20, data.content, {
      fontSize: "16px",
      color: "#ffffff",
      fontFamily: "PixelFont",
      wordWrap: { width: 450 },
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
              y: c.y - 100,
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
