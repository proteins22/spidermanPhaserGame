var loadState = {
	preload: function(){
		game.load.crossOrigin = 'anonymous';

		// Change the background color of the game
		game.stage.backgroundColor = '#000';

		game.load.audio('theme', 'assets/theme.mp3');
		game.load.audio('shoot', 'assets/shoot.mp3?v4');
		game.load.audio('theme', 'assets/theme.mp3?v2');
		game.load.audio('showTime', 'assets/showtime.mp3?v2');
		game.load.audio('youSuck', 'assets/dudeyousuck.mp3');
		game.load.audio('herecomesspidey', 'assets/herecomesspidey.mp3');
		game.load.audio('notyourday', 'assets/notyourday.mp3');
		game.load.audio('ow', 'assets/ow.mp3');

		game.load.image('play', 'assets/btn-start.png?v2');
		game.load.image('restart', 'assets/btn-restart.png?v2');
		game.load.image('sharefb', 'assets/btn-share-fb.png?v2');
		game.load.image('sharetw', 'assets/btn-share-tw.png?v2');

		game.load.image('options', 'assets/btn-options.png?v2');
		game.load.image('backtogame', 'assets/btn-back.png?v2');
		game.load.image('howto', 'assets/btn-howto.png?v2');
		game.load.image('plus', 'assets/btn-plus.png?v2');
		game.load.image('minus', 'assets/btn-minus.png?v2');

		game.load.spritesheet('spiderman', 'assets/sprite-spiderman.png?v6', 72, 80);
		game.load.spritesheet('intro', 'assets/intro.png', 72, 80);
		game.load.spritesheet('platform', 'assets/drone.png', 194, 91, 7);
		game.load.image('hook', 'assets/webbed.png?v2');
		game.load.image('web', 'assets/web.png');

		game.load.image('leftCloud', 'assets/cloud-left.png?v2');
		game.load.image('rightCloud', 'assets/cloud-right.png');
		game.load.image('building-bottom', 'assets/building-back.png?v4');
		game.load.image('sky', 'assets/sky.png?v4');
		game.load.image('repeat-floor', 'assets/repeat-floor.png?v4');

		game.load.image('logo', 'assets/logo.png?v4');
		game.load.image('black', 'assets/black.png');
		game.load.spritesheet('score', 'assets/score.png?v4', 252, 109, 4);

		var loadingLabel = game.add.text(game.width/2 ,game.height/2, 'loading...', {font:'30px Bangers, Arial', fill: '#fff'});
			loadingLabel.anchor.setTo(0.5,0.5);
	},

	create: function(){
		music = game.add.audio('theme');

		checkURL();
		music.loopFull();

		shootSound = game.add.audio('shoot',1,false);
		shootSound.volume = 0.5;

		owSound = game.add.audio('ow',1,false);
		owSound.volume = 0.5;

		youSuckSound = game.add.audio('youSuck',1,false);
		youSuckSound.volume = 0.5;

		notYourDaySound = game.add.audio('notyourday',1,false);
		notYourDaySound.volume = 0.5;

		hereIComeSound = game.add.audio('herecomesspidey',1,false);
		hereIComeSound.volume = 0.5;

		console.log("%cstarting game...", "color:#000; background:yellow; padding:5px;");
		//game.state.start('game');
		readyToGo();
		game.state.start('title');
	}
};

readyToGo = function(){
	$('.pre').fadeOut();
	$('html, body').animate({
        scrollTop: $("#game").offset().top
    }, 1000);
};

checkURL = function(){
	if(window.location.href.indexOf("?mySite") > -1){
		music.volume = 0;
	}
	else{
		music.volume = 0.2;
		
	}
};