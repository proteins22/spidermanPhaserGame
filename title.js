var titleState = {
	create: function(){
		//game.state.start('game');

		sky = game.add.tileSprite(0, 0, game.width, game.height, 'sky');
		sky.anchor.setTo(0, 0);
		
		floorRepeat = game.add.tileSprite(0, 0, game.width, game.height, 'repeat-floor');
		floorRepeat.anchor.setTo(0, 0);
		floorRepeat.scale.y = 1;
		floorRepeat.scale.x = 1;

		floor = game.add.image(0, game.height-125,'building-bottom');
		floor.anchor.setTo(0, 0);
		floor.scale.y = 1;
		floor.scale.x = 1;

		black = game.add.image(0, 0,'black');
		black.anchor.setTo(0, 0);
		black.alpha = 0.6;

		logo = game.add.image(10,-100,'logo');
		logo.scale.y = 1;
		logo.scale.x = 1;
		logo.alpha = 0;

		playButton = game.add.button(500 ,game.height/2, "play",this.playTheGame,this);
		playButton.anchor.setTo(0.5,0.5);
		playButton.alpha = 0;

		optionsButton = game.add.button(game.width/2-65, playButton.y+150,"options",this.optionsGame,this);
		optionsButton.anchor.setTo(0.5,0.5);
		optionsButton.scale.setTo(0.75);
		optionsButton.alpha = 0;

		howtoButton = game.add.button(game.width/2+50, playButton.y+150,"howto",this.howtoGame,this);
		howtoButton.anchor.setTo(0.5,0.5);
		howtoButton.scale.setTo(0.75);
		howtoButton.alpha = 0;

		// spidermanIntro = this.game.add.sprite(0, 0, 'spiderman');
		// spidermanIntro.anchor.setTo(0, 0);
		// spidermanIntro.scale.setTo(0.5, 0.5);
		// run = spidermanIntro.animations.add('run',[0,1,2,3,4,5,6,7], 1, true);
		// spidermanIntro.animations.play('run', 15, true);

		spidermanIntro = this.game.add.sprite(game.width-5, 500, 'intro');
		spidermanIntro.anchor.setTo(0, 0);
		spidermanIntro.scale.setTo(0.75);

		jumpin = spidermanIntro.animations.add('jumpin',[0,1,10], 1, true);

		init();

		update();
		//console.log("%cGame Start!", "color:green; background:none; padding:5px;");

	},
	update: function(){
		sky.tilePosition.x += 0.05;
	},
	playTheGame: function(){
		game.add.tween(optionsButton).to( {alpha : 0 }, 200, Phaser.Easing.None, true);
		game.add.tween(howtoButton).to( {alpha : 0 }, 200, Phaser.Easing.None, true);
		game.add.tween(logo).to( {y : -200 }, 300, Phaser.Easing.None, true);
		game.add.tween(playButton).to( {x : -200 }, 300, Phaser.Easing.None, true);

		
		game.add.tween(spidermanIntro).to( {y : -200 }, 300, Phaser.Easing.None, true);
		spidermanJump = game.add.tween(spidermanIntro).to({x : game.width-149,y : game.height-75 }, 300, Phaser.Easing.None, true);
		spidermanJump.onComplete.add(playRest,this);
		hereIComeSound.play();
		function playRest(){
			spidermanIntro.animations.play('jumpin', 15, false);
		}
		
		intro = game.add.tween(black,logo,playButton).to( {alpha : 0 }, 500, Phaser.Easing.None, true, 500);
		intro.onStart.add(onStart, this);
		//intro.onRepeat.add(onLoop, this);
		intro.onComplete.add(onComplete, this);


	},
	optionsGame: function(){
		game.state.start('option');
	},
	howtoGame: function(){
		$('#howto').fadeIn();
		$('#howto video').trigger('play');
	}
};

function init(){
	game.add.tween(logo).to({y: 100},800,Phaser.Easing.None,true);
	game.add.tween(logo).to({alpha: 1},800,Phaser.Easing.None,true);
	game.add.tween(howtoButton).to({alpha: 1},800,Phaser.Easing.None,true);
	game.add.tween(optionsButton).to( {alpha : 1 }, 800, Phaser.Easing.None, true);
	game.add.tween(playButton).to({alpha: 1},800,Phaser.Easing.None,true);
	game.add.tween(playButton).to({x: game.width/2},800,Phaser.Easing.None,true);
}
function onStart() {
//	Turn off the delay, so it loops seamlessly from here on
	intro.delay(0);
}

function onLoop() {

}

function onComplete() {
    game.state.start('game');
	console.log("%cGame Start!", "color:green; background:none; padding:5px;");
}

function startAnimationB() {
	console.log(true);
}