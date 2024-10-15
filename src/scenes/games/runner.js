// global game options
const gameOptions = {
	platformStartSpeed: 350,
	spawnRange: [100, 350],
	platformSizeRange: [100, 300],
	playerGravity: 900,
	jumpForce: 400,
	playerStartPosition: 200,
	jumps: 2,
	backgroundSpeed: 1,
	cloudSpeed: 1.2,
	cloudSpeed2: 1.4
}

export default class RunnerGameScene extends Phaser.Scene{
	constructor(){
		super({ key: 'RunnerGameScene' })
	}

	create(){

		// Add the background
		this.assetsBackground = this.add.tileSprite(0, 0, this.sys.game.config.width, this.sys.game.config.height, 'background');
		this.assetsClouds = this.add.tileSprite(0, 0, this.sys.game.config.width, 180, 'runner/clouds');
		this.assetsClouds2 = this.add.tileSprite(0, 20, this.sys.game.config.width, 180, 'runner/clouds2');

		this.assetsBackground.setOrigin(0, 0); // Set the origin to the top-left corner
		this.assetsClouds.setOrigin(0, 0); // Set the origin to the top-left corner
		this.assetsClouds2.setOrigin(0, 0); // Set the origin to the top-left corner



		// group with all active platforms.
		this.platformGroup = this.add.group({

			// once a platform is removed, it's added to the pool
			removeCallback: function(platform){
				platform.scene.platformPool.add(platform)
			}
		});

		// pool
		this.platformPool = this.add.group({

			// once a platform is removed from the pool, it's added to the active platforms group
			removeCallback: function(platform){
				platform.scene.platformGroup.add(platform)
			}
		});

		// number of consecutive jumps made by the player
		this.playerJumps = 0;

		// adding a platform to the game, the arguments are platform width and x position
		this.addPlatform(this.sys.game.config.width, this.sys.game.config.width / 2);

		// adding the player;
		this.player = this.physics.add.sprite(gameOptions.playerStartPosition, this.sys.game.config.height / 2, "run0");
		this.player.setScale(0.15, 0.15)
		this.player.setGravityY(gameOptions.playerGravity);

		this.player.flipX = true

		// Создание анимации "run"
		this.anims.create({
			key: 'run',
			frames: frames('run', 9),
			frameRate: 20,
			repeat: -1 // Зацикливаем анимацию
		})

		// setting collisions between the player and the platform group
		this.physics.add.collider(this.player, this.platformGroup);

		// checking for input
		this.input.on("pointerdown", this.jump, this);
	}

	// the core of the script: platform are added from the pool or created on the fly
	addPlatform(platformWidth, posX){
		let platform;
		if(this.platformPool.getLength()){
			platform = this.platformPool.getFirst();
			platform.x = posX;
			platform.active = true;
			platform.visible = true;
			this.platformPool.remove(platform);
		}
		else{
			platform = this.physics.add.sprite(posX, this.game.config.height * 0.95, "runner/stone");


			platform.setImmovable(true);
			platform.setVelocityX(gameOptions.platformStartSpeed * -1);
			this.platformGroup.add(platform);
		}
		platform.displayWidth = platformWidth;
		this.nextPlatformDistance = Phaser.Math.Between(gameOptions.spawnRange[0], gameOptions.spawnRange[1]);
	}

	// the player jumps when on the ground, or once in the air as long as there are jumps left and the first jump was on the ground
	jump(){
		if(this.player.body.touching.down || (this.playerJumps > 0 && this.playerJumps < gameOptions.jumps)){
			if(this.player.body.touching.down){
				this.playerJumps = 0;
			}
			this.player.setVelocityY(gameOptions.jumpForce * -1);
			this.playerJumps ++;

			this.player.anims.stop()
		}
	}
	update(){
		// Move the background
		this.assetsBackground.tilePositionX += gameOptions.backgroundSpeed;
		this.assetsClouds.tilePositionX += gameOptions.cloudSpeed;
		this.assetsClouds2.tilePositionX += gameOptions.cloudSpeed2;

		// game over
		if(this.player.y > this.game.config.height){
			this.scene.start("LoadingScene");
		}
		this.player.x = gameOptions.playerStartPosition;

		if (this.player.body.touching.down) {
			this.player.anims.play('run', true)
		}


		// recycling platforms
		let minDistance = this.sys.game.config.width
		this.platformGroup.getChildren().forEach(function(platform){
			let platformDistance = this.sys.game.config.width - platform.x - platform.displayWidth / 2;
			minDistance = Math.min(minDistance, platformDistance);
			if(platform.x < - platform.displayWidth / 2){
				this.platformGroup.killAndHide(platform);
				this.platformGroup.remove(platform);
			}
		}, this);

		// adding new platforms
		if(minDistance > this.nextPlatformDistance){
			var nextPlatformWidth = Phaser.Math.Between(gameOptions.platformSizeRange[0], gameOptions.platformSizeRange[1]);
			this.addPlatform(nextPlatformWidth, this.sys.game.config.width + nextPlatformWidth / 2);
		}
	}
};

const frames = (name, countFrames) => {
	let frames = []

	for (let i = 0; i <= countFrames; i++) {
		frames.push({ key: `${name}${i}` })
	}

	return frames
}
