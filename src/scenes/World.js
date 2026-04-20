class World extends Phaser.Scene {

    constructor() {
        super("World");
    }

    init(data) {
        this.username = data.username || 'Penguin';
    }

    create() {
        const W = 1520;
        const H = 960;

        // Sky gradient via rectangles
        this.add.rectangle(W / 2, H / 2, W, H, 0x5bc8e8);

        // Mountains in background
        this.drawMountain(200, 680, 340, 0x8ecfde);
        this.drawMountain(500, 640, 260, 0x7ac0d4);
        this.drawMountain(900, 660, 300, 0x8ecfde);
        this.drawMountain(1300, 650, 280, 0x7ac0d4);

        // Snow-covered ground
        this.add.rectangle(W / 2, H - 60, W, 220, 0xdff0f8);

        // Ground highlight ridge
        const ridge = this.add.graphics();
        ridge.fillStyle(0xffffff, 0.5);
        ridge.fillEllipse(W / 2, H - 155, W * 1.1, 60);

        // Clock tower (Town Square landmark)
        this.drawClockTower(760, 520);

        // Left building
        this.drawBuilding(220, 540, 260, 280, 0xe8c97a, 'Coffee Shop');

        // Right building
        this.drawBuilding(1300, 540, 260, 280, 0xc8e89a, 'Gift Shop');

        // Draw the player penguin
        this.drawPenguin(760, 740);

        // Name tag
        this.add.text(760, 680, this.username, {
            fontFamily: 'Burbank Small',
            fontSize: '28px',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 5,
        }).setOrigin(0.5, 0.5);

        // Top HUD bar
        const hud = this.add.rectangle(W / 2, 30, W, 60, 0x013a6b, 0.9);

        this.add.text(20, 30, 'Club Penguin', {
            fontFamily: 'Burbank Small',
            fontSize: '32px',
            color: '#ffffff',
        }).setOrigin(0, 0.5);

        this.add.text(W - 20, 30, this.username, {
            fontFamily: 'Burbank Small',
            fontSize: '28px',
            color: '#ffdd55',
        }).setOrigin(1, 0.5);

        // Coins label
        this.add.text(W / 2, 30, 'Coins: 500', {
            fontFamily: 'Burbank Small',
            fontSize: '26px',
            color: '#ffdd55',
        }).setOrigin(0.5, 0.5);

        // Room label
        this.add.text(W / 2, H - 20, 'Town Square', {
            fontFamily: 'Burbank Small',
            fontSize: '28px',
            color: '#003a6b',
            stroke: '#ffffff',
            strokeThickness: 3,
        }).setOrigin(0.5, 1);

        // Demo mode tag
        this.add.text(W / 2, H - 46, '[ Demo Mode ]', {
            fontFamily: 'Burbank Small',
            fontSize: '20px',
            color: '#336699',
        }).setOrigin(0.5, 1);

        // Fade in
        this.cameras.main.fadeIn(500, 0, 0, 0);

        // Simple waddle left/right on arrow keys
        this.cursors = this.input.keyboard.createCursorKeys();
        this.penguinX = 760;
        this.penguinY = 740;
        this.penguinDir = 1;
    }

    update() {
        const speed = 4;
        let moved = false;

        if (this.cursors.left.isDown) {
            this.penguinX = Math.max(60, this.penguinX - speed);
            this.penguinDir = -1;
            moved = true;
        } else if (this.cursors.right.isDown) {
            this.penguinX = Math.min(1460, this.penguinX + speed);
            this.penguinDir = 1;
            moved = true;
        }

        if (moved) {
            this.penguinGfx.clear();
            this.drawPenguinShape(this.penguinX, this.penguinY, this.penguinDir);
            if (this.nameTag) {
                this.nameTag.setPosition(this.penguinX, this.penguinY - 60);
            }
        }
    }

    drawPenguin(x, y) {
        this.penguinGfx = this.add.graphics();
        this.drawPenguinShape(x, y, 1);

        // Name tag as a separate object so we can move it
        this.nameTag = this.add.text(x, y - 60, this.username, {
            fontFamily: 'Burbank Small',
            fontSize: '28px',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 5,
        }).setOrigin(0.5, 0.5);

        // Remove the earlier static name tag — it was added before this method
        // (no-op here; the one created in create() is replaced by this one)
    }

    drawPenguinShape(x, y, dir) {
        const g = this.penguinGfx;
        // Body
        g.fillStyle(0x111111, 1);
        g.fillEllipse(x, y, 100, 130);
        // Belly
        g.fillStyle(0xfff5cc, 1);
        g.fillEllipse(x, y + 10, 62, 88);
        // Eyes
        g.fillStyle(0xffffff, 1);
        g.fillCircle(x - 18 * dir, y - 38, 12);
        g.fillCircle(x + 5 * dir, y - 38, 12);
        g.fillStyle(0x111111, 1);
        g.fillCircle(x - 15 * dir, y - 38, 6);
        g.fillCircle(x + 8 * dir, y - 38, 6);
        // Beak
        g.fillStyle(0xff8c00, 1);
        g.fillTriangle(
            x - 6, y - 22,
            x + 6, y - 22,
            x, y - 10
        );
        // Feet
        g.fillStyle(0xff8c00, 1);
        g.fillEllipse(x - 22, y + 68, 34, 16);
        g.fillEllipse(x + 22, y + 68, 34, 16);
    }

    drawMountain(x, baseY, halfW, color) {
        const g = this.add.graphics();
        g.fillStyle(color, 1);
        g.fillTriangle(x - halfW, baseY, x + halfW, baseY, x, baseY - halfW * 1.1);
        // Snow cap
        g.fillStyle(0xffffff, 0.8);
        g.fillTriangle(x - halfW * 0.25, baseY - halfW * 0.75, x + halfW * 0.25, baseY - halfW * 0.75, x, baseY - halfW * 1.1);
    }

    drawClockTower(x, baseY) {
        const g = this.add.graphics();
        // Tower body
        g.fillStyle(0xc8a46e, 1);
        g.fillRect(x - 60, baseY - 280, 120, 280);
        // Tower top / roof
        g.fillStyle(0x8b6340, 1);
        g.fillTriangle(x - 75, baseY - 280, x + 75, baseY - 280, x, baseY - 360);
        // Clock face
        g.fillStyle(0xf5f0e0, 1);
        g.fillCircle(x, baseY - 180, 44);
        g.lineStyle(3, 0x8b6340, 1);
        g.strokeCircle(x, baseY - 180, 44);
        // Clock hands
        g.lineStyle(4, 0x333333, 1);
        g.beginPath();
        g.moveTo(x, baseY - 180);
        g.lineTo(x, baseY - 215);
        g.strokePath();
        g.beginPath();
        g.moveTo(x, baseY - 180);
        g.lineTo(x + 28, baseY - 180);
        g.strokePath();
        // Door
        g.fillStyle(0x6b4226, 1);
        g.fillRect(x - 18, baseY - 60, 36, 60);
        // Windows
        g.fillStyle(0xaaddff, 1);
        g.fillRect(x - 30, baseY - 200, 20, 24);
        g.fillRect(x + 10, baseY - 200, 20, 24);

        // Label
        this.add.text(x, baseY + 10, 'Town Square', {
            fontFamily: 'Burbank Small',
            fontSize: '22px',
            color: '#003a6b',
        }).setOrigin(0.5, 0);
    }

    drawBuilding(x, baseY, w, h, color, label) {
        const g = this.add.graphics();
        g.fillStyle(color, 1);
        g.fillRect(x - w / 2, baseY - h, w, h);
        // Roof
        g.fillStyle(0xaa8833, 1);
        g.fillTriangle(x - w / 2 - 10, baseY - h, x + w / 2 + 10, baseY - h, x, baseY - h - 80);
        // Door
        g.fillStyle(0x6b4226, 1);
        g.fillRect(x - 22, baseY - 70, 44, 70);
        // Windows
        g.fillStyle(0xaaddff, 1);
        g.fillRect(x - w / 2 + 20, baseY - h + 40, 44, 44);
        g.fillRect(x + w / 2 - 64, baseY - h + 40, 44, 44);
        // Sign
        g.fillStyle(0xffffff, 0.9);
        g.fillRect(x - 70, baseY - h + 110, 140, 36);
        this.add.text(x, baseY - h + 128, label, {
            fontFamily: 'Burbank Small',
            fontSize: '20px',
            color: '#003a6b',
        }).setOrigin(0.5, 0.5);
    }
}

export default World;
