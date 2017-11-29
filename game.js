var gameState = {
	create: function(){
	
		initilize();
		var spiderman;
		var myScore = 0;

		if(!music.isPlaying){
			music.loopFull();
		}

		//shootSound = game.add.audio('shoot', 1, false);
	
		initalPosX = game.width/2;
		initalPosY = game.height;

		//console.log(device);

		this.velocity = 0;
		this.shootable = true;
		this.courseScore = 0;
		this.maxHeight = 0;
		this.hookStuck = false;

		sky = game.add.tileSprite(0, 75, game.width, game.height, 'sky');
		sky.anchor.setTo(0, 0);

		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.world.setBounds(0, 0, game.world.width, 1000);
		game.camera.y = 75;

		this.clouds = game.add.group();
		this.clouds.enableBody = true;
		this.clouds.createMultiple(4, 'leftCloud');
		this.clouds.createMultiple(4, 'leftCloud');

		floorRepeat = game.add.tileSprite(0, 75, game.width, game.height, 'repeat-floor');
		floorRepeat.anchor.setTo(0, 0);
		floorRepeat.scale.y = 1;
		floorRepeat.scale.x = 1;

		floor = game.add.image(0, game.height-50,'building-bottom');
		floor.anchor.setTo(0, 0);
		floor.scale.y = 1;
		floor.scale.x = 1;

		this.platforms = game.add.group();
		this.platforms.enableBody = true;
		this.platforms.inputEnabled = true;
		this.platforms.createMultiple(6, 'platform');


		this.platforms.callAll('animations.add', 'animations', 'fly3', [0,1,2,3,4,5,6], 30, true);
		this.platforms.callAll('play', null, 'fly3');


		scoreBG = game.add.sprite(-300, game.height-40, 'score');
		scoreMove = scoreBG.animations.add('move');

		scoreBG.alpha = 0;

		scoreText = this.game.add.text(-120, game.height-6, '', { font: '18px Bangers', fill: '#00000' });
		highScoreText = this.game.add.text(-120, game.height+20, "High Score: " + highScore, { font: '18px Bangers', fill: '#00000' });

		scoreText.alpha = 0;
		highScoreText.alpha = 0;

		for (var i = 0; i < 8; i++) {
			var cloud = this.clouds.getFirstDead();
			cloud.scale.x = Math.random()*0.5 + 0.3;
			cloud.scale.y = cloud.scale.x;

			var x = (300 + cloud.scale.x*300) * Math.random() - cloud.scale.x;
			var y = (625 + cloud.scale.y*150) * Math.random() - cloud.scale.x;

			cloud.reset(x, y);
			cloud.body.velocity.x = Math.random() * 100 - 50;;

			cloud.checkWorldBounds = true;
			cloud.outOfBoundsKill = true;

			cloud.events.onKilled.add(this.cloudDied, this);
		}


		// Display the spiderman on the screen
		this.spiderman = this.game.add.sprite(initalPosX, initalPosY, 'spiderman');
		this.spiderman.scale.set(0.75);
		this.spiderman.animations.add('standing',[18],1,true);
		this.spiderman.animations.play('standing', 1, true);

		this.spiderman.animations.add('left', [11], 1, true);
    	this.spiderman.animations.add('right', [16], 1, true);
		this.spiderman.animations.add('left-jump', [12], 1, true);
    	this.spiderman.animations.add('right-jump', [15], 1, true);
    	this.spiderman.animations.add('left-fall', [13], 1, true);
    	this.spiderman.animations.add('right-fall', [14], 1, true);
		game.physics.arcade.enable(this.spiderman);
		this.spiderman.body.collideWorldBounds = true;
		this.spiderman.body.bounce.setTo(0.5,0.5);

		//console.log(game.world.height + this.spiderman.y);

		this.webs = game.add.group();
		this.webs.enableBody = true;
		this.webs.inputEnabled = true;
		this.webs.createMultiple(60, 'web');

		for (var i = 0; i < 3; i++) {
			var platform = this.platforms.getFirstDead();

			platform.reset(Math.floor(Math.random()*200), 125 + i*325);
			platform.scale.y = 0.3;
			platform.scale.x = 0.3;

			platform.checkWorldBounds = true;
			platform.outOfBoundsKill = true;

			platform.events.onKilled.add(this.platformDied, this);

		}

		this.hook = this.game.add.sprite(1000, 1000, 'hook');
		game.physics.arcade.enable(this.hook);
		this.hook.body.collideWorldBounds = false;
		this.hook.body.bounce.setTo(1,1);
		this.hook.inputEnabled = true;
		this.hook.kill();
   

	},
	update: function() {
		//console.log(this.spiderman.x);

		if(this.score() >= 250){
			this.platforms.y = this.platforms.y;
			if(this.platforms.x>=60){
				game.add.tween(this.platforms).to({x: -80},1000,Phaser.Easing.None,true);
			}
			if(this.platforms.x<=0){
				game.add.tween(this.platforms).to({x: 80},1000,Phaser.Easing.None,true);
			}
		}

		//console.log(this.platforms.x);

		if(this.score() >= 500){
			this.platforms.y = this.platforms.y;
			if(this.platforms.x>=60){
				game.add.tween(this.platforms).to({x: -80},700,Phaser.Easing.None,true);
			}
			if(this.platforms.x<=0){
				game.add.tween(this.platforms).to({x: 80},700,Phaser.Easing.None,true);
			}
		}


		sky.tilePosition.x += 0.05;

		//update();
		if (this.spiderman.position.y >= 900){
			console.log('game over');
			owSound.play();
			this.restartGame();
			scoreBG.frame = 1;
		}

		game.input.onDown.add(this.clickHandler, this);

		this.game.physics.arcade.overlap(this.platforms, this.hook, this.hookPlatformCollisionHandler, null, this);
		this.game.physics.arcade.overlap(this.hook, this.spiderman, this.hookSpidermanCollisionHandler, null, this);
		this.game.physics.arcade.overlap(this.webs, this.spiderman, this.webSpidermanCollisionHandler, null, this);

		if (this.phase === "beforeFly") {
			this.hook.body.velocity.y = this.velocity;
			floorRepeat.tilePosition.y = floorRepeat.tilePosition.y;
			this.maxHeight = 700 - this.spiderman.position.y;
			// this.angel.body.velocity.y -= this.deltaY/5;
			// this.angel.body.velocity.x -= this.deltaX/5;
			if (this.spiderman.position.y <= this.bottomPlatformY) {
				this.phase = "fly";
				this.hook.kill();
				this.velocity = -this.spiderman.body.velocity.y;
				this.propogateVelocity();
				this.spiderman.body.velocity.y = 0;
				floorRepeat.tilePosition.y = floorRepeat.tilePosition.y;
				this.maxHeight = 700 - this.bottomPlatformY;
				if(this.game.input.mousePointer.x < 150){
					this.spiderman.animations.play('right-jump', 1, true);
				}
				else{
					this.spiderman.animations.play('left-jump', 1, true);
				}
				
			}
		}

		if (this.phase === "fly") {
			this.courseScore += this.velocity;
			this.shootable = true;
			this.gameStarted = true;
			this.velocity -= 15;
			floorRepeat.tilePosition.y += 10;
			floor.y +=15 ;
			if(this.game.input.mousePointer.x < 150){
				this.spiderman.animations.play('right-jump', 1, true);
			}
			else{
				this.spiderman.animations.play('left-jump', 1, true);
			}

			if(this.velocity>1500){
				scoreBG.frame = 2;

			}
			else if(this.velocity>900 && this.velocity<1500){
				scoreBG.frame = 3;

			}
			else{
				scoreBG.frame = 0;
			}

			this.velocity = Math.max(this.velocity, 0);
			this.propogateVelocity();
				if (this.velocity === 0) {
					this.spiderman.body.velocity.y = 0;
					this.phase = "afterFly";
					this.hookStuck = false;
					if(this.game.input.mousePointer.x < 150){
						this.spiderman.animations.play('right-fall', 1, true);
					}
					else{
						this.spiderman.animations.play('left-fall', 1, true);
					}
				}
		}

		if (this.phase === "afterFly") {
			this.spiderman.body.velocity.y += 15;
			this.hookStuck = false;
			if(this.game.input.mousePointer.x < 150){
				this.spiderman.animations.play('right-fall', 1, true);
			}
			else{
				this.spiderman.animations.play('left-fall', 1, true);
			}
		}

		if (this.gameStarted && this.spiderman.position.y >= 900) {
			this.restartGame();
			scoreBG.frame = 1;
		}

		if (this.hook.position.y <= -1 || this.hook.position.y >= 950 || this.hook.position.x <= 0 || this.hook.position.x >= game.world.width) {
			//console.log(this.hook.position);
			this.shootable = false;
			this.hookStuck = false;
			this.hook.kill();
			this.shootable = true;
		}

		if (this.hook.alive && !this.hookStuck) {
			// this.hook.body.velocity.y += 15;
			// if (this.hook.body.velocity.x < 0) {
			// 	this.hook.body.velocity.x += 4;
			// } else if (this.hook.body.velocity.x > 0){
			// 	this.hook.body.velocity.x -= 4;
			// }
		}

		scoreText.text = "Score: " + pad(this.score(), 6);

	},
	score: function() {
		return Math.floor((this.courseScore + this.maxHeight)/1000);
	},
	clickHandler: function() {
		if (this.shootable && this.spiderman.position.y > this.game.input.mousePointer.y) {
			this.shoot();
			if(this.game.input.mousePointer.x < 150){
				this.spiderman.animations.play('right', 1, true);
			}
			else{
				this.spiderman.animations.play('left', 1, true);
			}
			shootSound.play();
		}
	},
	shoot: function() {

		game.add.tween(scoreBG).to({alpha:1},300,Phaser.Easing.None,true);
		game.add.tween(scoreText).to({alpha:1},400,Phaser.Easing.None,true);
		game.add.tween(highScoreText).to({alpha:1},400,Phaser.Easing.None,true);
		game.add.tween(scoreBG).to({x: 2},300,Phaser.Easing.None,true);
		game.add.tween(scoreText).to({x: 110},400,Phaser.Easing.None,true);
		game.add.tween(highScoreText).to({x: 110},400,Phaser.Easing.None,true);

		if (this.hook.alive === false) {
			this.hook.reset(this.spiderman.position.x + 12.5, this.spiderman.position.y);
			var x = this.game.input.activePointer.x - (this.spiderman.position.x + 12.5);
			var y = this.game.input.activePointer.y - this.spiderman.position.y;
			this.hookNorm = Math.sqrt(Math.pow(x, 2) +  Math.pow(y, 2));
			this.hook.body.velocity.x = x / this.hookNorm * 1700;
			this.hook.body.velocity.y = y / this.hookNorm * 1700;
			this.shootable = false;
			this.shootHeight = this.spiderman.position.y;
    	}
	},
	hookPlatformCollisionHandler: function() {
		if (this.hook.position.y < this.shootHeight - 10 && !this.hookStuck) {
			this.phase = "beforeFly";
			this.bottomPlatformY = this.hook.position.y;
			var deltaX = this.spiderman.position.x + 25 - this.hook.position.x;
			var deltaY = this.spiderman.position.y - this.hook.position.y-20;
			var norm = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
			this.spiderman.body.velocity.x = -deltaX*4;
			this.spiderman.body.velocity.y = -deltaY*4;
			this.hook.body.velocity.x = 0;
			this.hook.body.velocity.y = 0;
			this.hookStuck = true;

			for (var i = 1; i < Math.floor(norm / 10)+1; i++) {
				web = this.webs.getFirstDead();

				if (web == null){
					console.log('null');
					web = this.webs.getFirstDead();
				}
				else{
					web.scale.x = 0.15;
					web.scale.y = 0.15;
					var x = 30 + -i * deltaX / Math.floor(norm / 10) + this.spiderman.position.x;
					var y = -(i+1.5) * deltaY / Math.floor(norm / 10) + this.spiderman.position.y;

					web.reset(x, y);
				}
				//console.log(web.scale.x + web.scale.y);	
			}
		}
	},
	hookSpidermanCollisionHandler: function() {
		this.hook.kill();
		this.hookStuck = false;
		this.webs.forEach(function(web) {
			web.kill();
		})
	},
	webSpidermanCollisionHandler: function(a, b) {
		b.kill();
	},
	// Make the spiderman jump
	jump: function() {
		// Add a vertical velocity to the spiderman
    	this.spiderman.body.velocity.x = -100;
	},
	addOnePlatform: function(x, y) {
		var platform = this.platforms.getFirstDead();

		platform.reset(x, y);
		platform.body.velocity.y = this.velocity;

		platform.checkWorldBounds = true;
		platform.outOfBoundsKill = true;
  	},
	platformDied: function() {
		this.addOnePlatform(Math.floor(Math.random()*175), 75);
    },
    addOneCloud: function(x, y) {
		var cloud = this.clouds.getFirstDead();
		cloud.scale.x = Math.random()*0.3 + 0.2;
		cloud.scale.y = cloud.scale.x;
		var cloudVelocity = Math.random() * 100 - 50;

			if (cloudVelocity > 0) {
				var x = -cloud.scale.x*300;
				var y = (625 + cloud.scale.x) * Math.random() - cloud.scale.x;
			} else {
				var x = 300;
				var y = (625 + cloud.scale.x) * Math.random() - cloud.scale.x;
			}

		cloud.reset(x, y);
		cloud.body.velocity.x = cloudVelocity;

		cloud.checkWorldBounds = true;
		cloud.outOfBoundsKill = true;

		cloud.events.onKilled.add(this.cloudDied, this);
  },

  cloudDied: function() {
    // this.addOneCloud(Math.floor(Math.random()*175), 75);
    this.addOneCloud();
  },
  accelerate: function() {
    this.velocity += 200;
    this.propogateVelocity();
  },
  decelerate: function() {
    this.velocity -= 200;
    this.propogateVelocity();
  },
  propogateVelocity: function() {
    this.platforms.forEach(function(platform, i) {
      platform.body.velocity.y = this.velocity;
    }.bind(this));
  },
  restartGame: function() {
  	this.hook.destroy();
  	this.webs.destroy();
  	this.phase = null;
  	this.gameStarted = false;
  	this.spiderman.body.velocity.x = 0;
    this.spiderman.body.velocity.y = 0;

  	this.webs.enableBody = false;
    this.velocity = 0;
    this.shootable = true;
    
    this.maxHeight = 0;
    this.hookStuck = false;
    
    this.velocity = 0;
   
    highScore = Math.max(highScore, this.score());
  	highScoreText.setText(highScore);
  	this.courseScore = 0;
  	
    game.state.start('gameOver');
    // game.state.start('game');
  }
};

function pad(number, length) {
	var str = '' + number;
	while (str.length < length) {
		str = '0' + str;
	}
	return str;
}

function initilize(){
	
}

function update(){
	
}

function runAround(e){
}