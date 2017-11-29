var overState = {
	create: function(e) {

		music.stop();

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
		black.alpha = 0;

		scoreBG = game.add.sprite(20 ,-100, 'score');
		scoreMove = scoreBG.animations.add('move');

		scoreBG.frame = 1;

		playButton = game.add.button(game.width/2 ,game.height/2, "restart",this.restart,this);
		playButton.anchor.setTo(0.5,0.5);
		playButton.alpha = 0

		//console.log(highScore);

		gameover = this.game.add.text(130, 135, 'Game Over', { font: '18px Bangers', fill: '#00000' });
		gameover.alpha = 0;
		highScoreText = this.game.add.text(130, 160, "High Score: " + highScore, { font: '18px Bangers', fill: '#000000' });
		highScoreText.alpha = 0;

		setTimeout(function(){
			if(highScore<=499){
				youSuckSound.play();
			}

			if(highScore>=500 && highScore <= 1000){
				notYourDaySound.play();
			}
		},1000);
		
		shareFBButton = game.add.button(playButton.x-100, playButton.y+50,"sharefb", shareFB,this,1,0);
		shareFBButton.anchor.setTo(0,0);
		shareFBButton.scale.setTo(0.5);
		shareFBButton.alpha = 0

		shareTWButton = game.add.button(playButton.x, playButton.y+50,"sharetw", shareTW,this,1,0);
		shareTWButton.anchor.setTo(0,0);
		shareTWButton.scale.setTo(0.5);
		shareTWButton.alpha = 0;

		game.add.tween(black).to({alpha: .6},300,Phaser.Easing.None,true);
		game.add.tween(scoreBG).to( {y: 100 }, 300, Phaser.Easing.None, true);
		game.add.tween(playButton).to( {alpha: 1 }, 300, Phaser.Easing.None, true);
		game.add.tween(shareFBButton).to({alpha: 1},500,Phaser.Easing.None,true);
		game.add.tween(shareTWButton).to({alpha: 1},500,Phaser.Easing.None,true);
		game.add.tween(highScoreText).to({alpha: 1},600,Phaser.Easing.None,true);
		game.add.tween(gameover).to({alpha: 1},600,Phaser.Easing.None,true);

		spidermanIntro = this.game.add.sprite(game.width-5, 500, 'intro');
		spidermanIntro.anchor.setTo(0, 0);
		spidermanIntro.scale.setTo(0.75);
		jumpin = spidermanIntro.animations.add('jumpin',[0,1,10], 1, true);

		//pauseAudio();
		//Cookies.set('highScore', highScore, { expires: '2078-12-31' });

	},
	restart: function() {
		game.add.tween(scoreBG).to( {alpha : 0 }, 300, Phaser.Easing.None, true);
		game.add.tween(playButton).to( {alpha : 0 }, 300, Phaser.Easing.None, true);
		game.add.tween(shareFBButton).to( {alpha : 0 }, 300, Phaser.Easing.None, true);
		game.add.tween(shareTWButton).to( {alpha : 0 }, 300, Phaser.Easing.None, true);
		game.add.tween(gameover).to( {alpha : 0 }, 300, Phaser.Easing.None, true);
		game.add.tween(highScoreText).to( {alpha : 0 }, 300, Phaser.Easing.None, true);
		spidermanJump = game.add.tween(spidermanIntro).to({x : game.width-149,y : game.height-75 }, 300, Phaser.Easing.None, true);
		spidermanJump.onComplete.add(playRest,this);
		hereIComeSound.play();
		function playRest(){
			spidermanIntro.animations.play('jumpin', 15, false);
		}
		intro = game.add.tween(black).to( {alpha : 0 }, 500, Phaser.Easing.None, true, 500);
		intro.onStart.add(onStart, this);
		//intro.onRepeat.add(onLoop, this);
		intro.onComplete.add(onComplete, this);
	}
};

function onStart() {
//	Turn off the delay, so it loops seamlessly from here on
	intro.delay(0);
}

function onLoop() {

}

function onComplete() {
	//playAudio();
    game.state.start('game');
	console.log("%cGame Start!", "color:green; background:none; padding:5px;");
}

//facebook share
window.fbAsyncInit = function() {
	FB.init({
		appId : '1785927905071102',
		xfbml : true,
		version : 'v2.0',
		status  : true
	});
};

function shareFB() {
	FB.ui({
		method: 'feed',
		name: 'Spiderman Webslinger Game',
		caption: 'Play Spiderman Web Slinger Game made with phaser.js. http://bit.ly/2pUL7mK',
		description: ('I just scored '+ highScore + ' points!'),
		link: 'https://yi-lin-web.herokuapp.com/spiderman/',
		picture: 'https://yi-lin-web.herokuapp.com/spiderman/assets/meta.png'
	},
	function(response) {});
}

(function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


function shareTW() {
    var w = 626;
    var h = 436;
    var url = 'http://twitter.com/intent/tweet?text=I%20just%20scored%20'+ highScore + '%20points!%20Play%20the%20Spiderman%20Web%20Slinger%20game%20made%20with%20phaser.js.%20http://bit.ly/2pUL7mK';
    var title = 'Spiderman Webslinger Game';

    var left = (screen.width / 2) - (w / 2);
    var top = (screen.height / 2) - (h / 2);
    window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
}