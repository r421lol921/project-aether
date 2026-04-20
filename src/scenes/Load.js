class Load extends Phaser.Scene {

    constructor() {
        super("Load");
    }

    init(data) {
        this.username = data.username || 'Penguin';
    }

    create() {
        const W = 1520;
        const H = 960;

        // Dark blue CP-style background
        this.cameras.main.setBackgroundColor('#013a6b');

        // Outer progress bar track
        const trackX = W / 2 - 300;
        const trackY = H / 2 + 60;
        const trackW = 600;
        const trackH = 36;

        // Track background
        const track = this.add.graphics();
        track.fillStyle(0x001e3d, 1);
        track.fillRoundedRect(trackX, trackY, trackW, trackH, 18);
        track.lineStyle(3, 0x3399ff, 1);
        track.strokeRoundedRect(trackX, trackY, trackW, trackH, 18);

        // Fill bar
        this.fillBar = this.add.graphics();

        // Snowflake / CP logo placeholder — draw a simple snowflake with lines
        this.logoGraphics = this.add.graphics();
        this.drawSnowflake(W / 2, H / 2 - 120, 80, 0xffffff);

        // Club Penguin title
        this.add.text(W / 2, H / 2 - 10, 'Club Penguin', {
            fontFamily: 'Burbank Small',
            fontSize: '72px',
            color: '#ffffff',
            stroke: '#003080',
            strokeThickness: 8,
        }).setOrigin(0.5, 0.5);

        // Loading label
        this.loadingLabel = this.add.text(W / 2, trackY + trackH / 2, 'Loading...', {
            fontFamily: 'Burbank Small',
            fontSize: '24px',
            color: '#aaccff',
        }).setOrigin(0.5, 0.5).setDepth(1);

        // Tips text that cycles
        const tips = [
            'Tip: Throw snowballs by pressing T!',
            'Tip: You can change your colour at the Clothes Shop!',
            'Tip: Dance by pressing D!',
            'Tip: Wave at your friends by pressing W!',
            'Tip: Explore all the rooms on the island!',
        ];
        let tipIndex = 0;
        this.tipText = this.add.text(W / 2, trackY + trackH + 40, tips[tipIndex], {
            fontFamily: 'Burbank Small',
            fontSize: '26px',
            color: '#66aaff',
        }).setOrigin(0.5, 0);

        this.time.addEvent({
            delay: 1800,
            loop: true,
            callback: () => {
                tipIndex = (tipIndex + 1) % tips.length;
                this.tipText.setText(tips[tipIndex]);
            }
        });

        // Simulate loading progress over ~3 seconds then launch World
        this.progress = 0;
        this.trackX = trackX;
        this.trackY = trackY;
        this.trackW = trackW;
        this.trackH = trackH;

        // Tween progress from 0 to 1
        this.tweens.add({
            targets: this,
            progress: 1,
            duration: 3000,
            ease: 'Sine.easeInOut',
            onUpdate: () => {
                this.drawFillBar(this.progress);
                const pct = Math.floor(this.progress * 100);
                this.loadingLabel.setText(pct + '%');
            },
            onComplete: () => {
                this.loadingLabel.setText('100%');
                this.drawFillBar(1);
                this.time.delayedCall(300, () => {
                    this.cameras.main.fadeOut(500, 0, 0, 0);
                    this.cameras.main.once('camerafadeoutcomplete', () => {
                        this.scene.start('World', { username: this.username });
                    });
                });
            }
        });

        // Slowly spin the snowflake
        this.logoAngle = 0;
    }

    update() {
        this.logoAngle += 0.3;
        this.logoGraphics.clear();
        this.drawSnowflake(1520 / 2, 960 / 2 - 120, 80, 0xffffff, this.logoAngle);
    }

    drawFillBar(progress) {
        const { trackX, trackY, trackW, trackH } = this;
        const fillW = Math.max(0, (trackW - 4) * progress);
        this.fillBar.clear();
        if (fillW > 0) {
            this.fillBar.fillStyle(0x33aaff, 1);
            this.fillBar.fillRoundedRect(trackX + 2, trackY + 2, fillW, trackH - 4, 16);
        }
    }

    drawSnowflake(cx, cy, radius, color, angleDeg = 0) {
        const g = this.logoGraphics;
        g.lineStyle(5, color, 1);
        const spokes = 6;
        const angleRad = Phaser.Math.DegToRad(angleDeg);
        for (let i = 0; i < spokes; i++) {
            const a = angleRad + (Math.PI * 2 / spokes) * i;
            const ex = cx + Math.cos(a) * radius;
            const ey = cy + Math.sin(a) * radius;
            g.beginPath();
            g.moveTo(cx, cy);
            g.lineTo(ex, ey);
            g.strokePath();
            // Branch arms
            const armLen = radius * 0.35;
            for (const side of [-1, 1]) {
                const ba = a + side * Math.PI / 4;
                const mid = 0.55;
                const mx = cx + Math.cos(a) * radius * mid;
                const my = cy + Math.sin(a) * radius * mid;
                g.beginPath();
                g.moveTo(mx, my);
                g.lineTo(mx + Math.cos(ba) * armLen, my + Math.sin(ba) * armLen);
                g.strokePath();
            }
        }
        // Center circle
        g.fillStyle(color, 1);
        g.fillCircle(cx, cy, 8);
    }
}

export default Load;
