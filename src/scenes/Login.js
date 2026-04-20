import { getLoginHash } from '../crypto.js'
import { sendXMLPacket, getCredentials } from '../index.js'
import Button from '../components/Button.js'

/* START OF COMPILED CODE */

class Login extends Phaser.Scene {

	constructor() {
		super("Login");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	preload() {

		this.load.pack("asset-pack", "assets/asset-pack.json");
		this.load.plugin('rexinputtextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexinputtextplugin.min.js', true);    
	}

	/** @returns {void} */
	editorCreate() {

		// bg
		const bg = this.add.sprite(760, 480, "login", "bg");

		// loginBtn
		const loginBtn = this.add.sprite(760, 497, "login", "button");

		// usernameBox
		const usernameBox = this.add.rectangle(796, 143, 440, 60);
		usernameBox.isFilled = true;
		usernameBox.isStroked = true;
		usernameBox.strokeColor = 0;

		// usernameText
		const usernameText = this.add.text(564, 143, "", {});
		usernameText.setOrigin(1, 0.5);
		usernameText.text = "Penguin Name:";
		usernameText.setStyle({ "align": "right", "color": "#000000ff", "fontFamily": "Burbank Small", "fontSize": "32px" });

		// passwordBox
		const passwordBox = this.add.rectangle(796, 228, 440, 60);
		passwordBox.isFilled = true;
		passwordBox.isStroked = true;
		passwordBox.strokeColor = 0;

		// passwordText
		const passwordText = this.add.text(564, 228, "", {});
		passwordText.setOrigin(1, 0.5);
		passwordText.text = "Password:";
		passwordText.setStyle({ "align": "right", "color": "#000000ff", "fontFamily": "Burbank Small", "fontSize": "32px" });

		// rememberPenguinCheckbox
		const rememberPenguinCheckbox = this.add.sprite(530, 312, "login", "checkbox");

		// rememberPenguinText
		const rememberPenguinText = this.add.text(565, 317, "", {});
		rememberPenguinText.setOrigin(0, 0.5);
		rememberPenguinText.text = "Remember me on this computer";
		rememberPenguinText.setStyle({ "color": "#000000ff", "fontFamily": "Burbank Small", "fontSize": "32px" });

		// rememberPasswordCheckbox
		const rememberPasswordCheckbox = this.add.sprite(530, 384, "login", "checkbox");

		// rememberPasswordText
		const rememberPasswordText = this.add.text(565, 389, "", {});
		rememberPasswordText.setOrigin(0, 0.5);
		rememberPasswordText.text = "Remember my password";
		rememberPasswordText.setStyle({ "color": "#000000ff", "fontFamily": "Burbank Small", "fontSize": "32px" });

		// note
		this.add.image(1188, 571, "login", "note");

		// loginBtnText
		const loginBtnText = this.add.text(760, 495, "", {});
		loginBtnText.setOrigin(0.5, 0.5);
		loginBtnText.text = "Login";
		loginBtnText.setStyle({ "align": "center", "color": "#ffffffff", "fontFamily": "Burbank Small", "fontSize": "45px" });

		// forgotPasswordText
		const forgotPasswordText = this.add.text(760, 640, "", {});
		forgotPasswordText.setOrigin(0.5, 0.5);
		forgotPasswordText.text = "Forgot your password?";
		forgotPasswordText.setStyle({ "align": "center", "color": "#ffffffff", "fontFamily": "Burbank Small", "fontSize": "38px" });

		// createAccountTextUpper
		const createAccountTextUpper = this.add.text(760, 735, "", {});
		createAccountTextUpper.setOrigin(0.5, 0.5);
		createAccountTextUpper.text = "Don't have a penguin?";
		createAccountTextUpper.setStyle({ "align": "center", "color": "#000000ff", "fontFamily": "Burbank Small", "fontSize": "34px" });

		// createAccountTextLower
		const createAccountTextLower = this.add.text(760, 775, "", {});
		createAccountTextLower.setOrigin(0.5, 0.5);
		createAccountTextLower.text = "Create a free account now";
		createAccountTextLower.setStyle({ "align": "center", "color": "#ffffffff", "fontFamily": "Burbank Small", "fontSize": "34px" });

		// rulesText
		const rulesText = this.add.text(760, 865, "", {});
		rulesText.setOrigin(0.5, 0.5);
		rulesText.text = "Club Penguin Rules";
		rulesText.setStyle({ "align": "center", "color": "#ffffffff", "fontFamily": "Burbank Small", "fontSize": "45px" });

		// loginBtn (components)
		const loginBtnButton = new Button(loginBtn);
		loginBtnButton.spriteName = "button";
		loginBtnButton.callback = () => this.login();

		this.bg = bg;
		this.loginBtn = loginBtn;
		this.usernameBox = usernameBox;
		this.usernameText = usernameText;
		this.passwordBox = passwordBox;
		this.passwordText = passwordText;
		this.rememberPenguinCheckbox = rememberPenguinCheckbox;
		this.rememberPenguinText = rememberPenguinText;
		this.rememberPasswordCheckbox = rememberPasswordCheckbox;
		this.rememberPasswordText = rememberPasswordText;
		this.loginBtnText = loginBtnText;
		this.forgotPasswordText = forgotPasswordText;
		this.createAccountTextUpper = createAccountTextUpper;
		this.createAccountTextLower = createAccountTextLower;
		this.rulesText = rulesText;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Sprite} */
	bg;
	/** @type {Phaser.GameObjects.Sprite} */
	loginBtn;
	/** @type {Phaser.GameObjects.Rectangle} */
	usernameBox;
	/** @type {Phaser.GameObjects.Text} */
	usernameText;
	/** @type {Phaser.GameObjects.Rectangle} */
	passwordBox;
	/** @type {Phaser.GameObjects.Text} */
	passwordText;
	/** @type {Phaser.GameObjects.Sprite} */
	rememberPenguinCheckbox;
	/** @type {Phaser.GameObjects.Text} */
	rememberPenguinText;
	/** @type {Phaser.GameObjects.Sprite} */
	rememberPasswordCheckbox;
	/** @type {Phaser.GameObjects.Text} */
	rememberPasswordText;
	/** @type {Phaser.GameObjects.Text} */
	loginBtnText;
	/** @type {Phaser.GameObjects.Text} */
	forgotPasswordText;
	/** @type {Phaser.GameObjects.Text} */
	createAccountTextUpper;
	/** @type {Phaser.GameObjects.Text} */
	createAccountTextLower;
	/** @type {Phaser.GameObjects.Text} */
	rulesText;

	/* START-USER-CODE */

	create() {
		var usernameInput = this.add.rexInputText(796, 150, 440, 60, {
			"type": "textarea",
			"color": "#000000ff",
			"fontFamily": "Burbank Small",
			"fontSize": "40px",
			"padding-left": "10px",
			"padding-right": "10px"
		})
		var passwordInput = this.add.rexInputText(796, 228, 440, 60, {
			"type": "password",
			"color": "#000000ff",
			"fontFamily": "Burbank Small",
			"fontSize": "40px",
			"padding-left": "10px",
			"padding-right": "10px"
		})
		this.editorCreate();

		this.usernameInput = usernameInput;
		this.passwordInput = passwordInput;

		// Make text links interactive
		this.createAccountTextLower.setInteractive({ cursor: 'pointer' });
		this.createAccountTextLower.on('pointerover', () => {
			this.createAccountTextLower.setStyle({ color: '#aaddff' });
		});
		this.createAccountTextLower.on('pointerout', () => {
			this.createAccountTextLower.setStyle({ color: '#ffffffff' });
		});
		this.createAccountTextLower.on('pointerup', () => {
			this.openCreateAccount();
		});

		this.forgotPasswordText.setInteractive({ cursor: 'pointer' });
		this.forgotPasswordText.on('pointerover', () => {
			this.forgotPasswordText.setStyle({ color: '#aaddff' });
		});
		this.forgotPasswordText.on('pointerout', () => {
			this.forgotPasswordText.setStyle({ color: '#ffffffff' });
		});
		this.forgotPasswordText.on('pointerup', () => {
			this.openForgotPassword();
		});

		this.rulesText.setInteractive({ cursor: 'pointer' });
		this.rulesText.on('pointerover', () => {
			this.rulesText.setStyle({ color: '#aaddff' });
		});
		this.rulesText.on('pointerout', () => {
			this.rulesText.setStyle({ color: '#ffffffff' });
		});
		this.rulesText.on('pointerup', () => {
			this.openRules();
		});
	}

	openCreateAccount() {
		console.log("[v0] Create Account clicked");
		window.open('https://www.clubpenguin.com/create-account', '_blank');
	}

	openForgotPassword() {
		console.log("[v0] Forgot Password clicked");
		window.open('https://www.clubpenguin.com/forgot-password', '_blank');
	}

	openRules() {
		console.log("[v0] Rules clicked");
		window.open('https://www.clubpenguin.com/learn/rules', '_blank');
	}

	usernameInput;
	passwordInput;

	login(){
		var username = this.usernameInput.text.trim()
		var password = this.passwordInput.text.trim()

		// Demo shortcut — no server needed
		if (username.toLowerCase() === 'demo' && password.toLowerCase() === 'demo') {
			this.enterDemoWorld(username)
			return
		}

		var loginHash = getLoginHash(password)
		sendXMLPacket("<msg t='sys'><body action='verChk' r='0'><ver v='253' /></body></msg>")
		sendXMLPacket("<msg t='sys'><body action='rndK' r='-1'></body></msg>")
		sendXMLPacket("<msg t='sys'><body action='login' r='0'><login z='w1'><nick><![CDATA[" + username + "]]></nick><pword><![CDATA[" + loginHash + "]]></pword></login></body></msg>")
		setTimeout(function(){
			var credentials = getCredentials()
			console.log(credentials)
		},1000)
	}

	enterDemoWorld(username) {
		// Fade out the login screen then show the demo world
		this.cameras.main.fadeOut(400, 0, 0, 0)
		this.cameras.main.once('camerafadeoutcomplete', () => {
			// Clear the scene and build a simple demo world
			this.children.removeAll(true)

			// Sky blue background
			this.cameras.main.setBackgroundColor('#5bc8e8')

			// Snow ground
			var ground = this.add.rectangle(760, 900, 1520, 200, 0xf0f8ff)

			// Simple igloo shape
			var igloo = this.add.circle(760, 600, 180, 0xffffff)
			var iglooBase = this.add.rectangle(760, 740, 360, 60, 0xe8f4f8)
			var iglooDoor = this.add.rectangle(760, 750, 80, 90, 0x5bc8e8)

			// Demo penguin body
			var body = this.add.ellipse(760, 680, 120, 150, 0x111111)
			var belly = this.add.ellipse(760, 695, 75, 100, 0xfff5cc)
			var eyeL = this.add.circle(740, 655, 12, 0xffffff)
			var eyeR = this.add.circle(780, 655, 12, 0xffffff)
			var pupilL = this.add.circle(743, 655, 6, 0x111111)
			var pupilR = this.add.circle(783, 655, 6, 0x111111)
			var beak = this.add.triangle(760, 675, 0, 0, 20, 0, 10, 14, 0xff8c00)

			// Name tag above penguin
			var nameTag = this.add.text(760, 615, username, {
				fontFamily: 'Burbank Small',
				fontSize: '28px',
				color: '#ffffff',
				stroke: '#000000',
				strokeThickness: 4,
			}).setOrigin(0.5, 0.5)

			// Welcome banner
			var banner = this.add.text(760, 80, 'Welcome to Club Penguin, ' + username + '!', {
				fontFamily: 'Burbank Small',
				fontSize: '42px',
				color: '#ffffff',
				stroke: '#1a6e91',
				strokeThickness: 6,
			}).setOrigin(0.5, 0.5)

			// Hint
			this.add.text(760, 940, 'Demo Mode  —  connect a login server to play for real', {
				fontFamily: 'Burbank Small',
				fontSize: '22px',
				color: '#333333',
			}).setOrigin(0.5, 0.5)

			this.cameras.main.fadeIn(400, 0, 0, 0)
		})
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

export default Login;
