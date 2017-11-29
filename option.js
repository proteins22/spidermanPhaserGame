var optionState = {
	create: function(){
		//game.sound.mute = true;
		//console.log(music.volume);
		backButton = game.add.button(game.width/2, game.height/4,"backtogame",this.backtoGame,this);
		backButton.anchor.setTo(0.5,0.5);

		plusMusicBTN = game.add.button(game.width/2+50, game.height/2,"plus",this.plusMusic,this);
		plusMusicBTN.anchor.setTo(0.5,0.5);

		minusMusicBTN = game.add.button(game.width/2-50, game.height/2,"minus",this.minusMusic,this);
		minusMusicBTN.anchor.setTo(0.5,0.5);

		volumeTextArea = game.add.text(game.width/2, game.height/2, '', { font: '26px Bangers', fill: '#fff' });
		volumeTextArea.anchor.setTo(0.5,0.5);

		volumeText = game.add.text(volumeTextArea.x, volumeTextArea.y-50, 'Volume', { font: '26px Bangers', fill: '#fff' });
		volumeText.anchor.setTo(0.5,0.5);

		plusFxBTN = game.add.button(plusMusicBTN.x, plusMusicBTN.y+100, "plus",this.plusFX,this);
		plusFxBTN.anchor.setTo(0.5,0.5);

		minusFxBTN = game.add.button(minusMusicBTN.x, minusMusicBTN.y+100,"minus",this.minusFX,this);
		minusFxBTN.anchor.setTo(0.5,0.5);

		fxTextArea = game.add.text(volumeTextArea.x, volumeTextArea.y+100, '', { font: '26px Bangers', fill: '#fff' });
		fxTextArea.anchor.setTo(0.5,0.5);

		fxText = game.add.text(fxTextArea.x, fxTextArea.y-50, 'Sound Effects', { font: '26px Bangers', fill: '#fff' });
		fxText.anchor.setTo(0.5,0.5);

	},
	backtoGame: function(){
		game.state.start('title');
	},
	plusMusic: function(){
		music.mute = false;
		if(music.volume>=1.00 || music.volume==1.00){
			null;
		}else{
			music.volume += 0.1;
			this.musicVol(music.volume);
		}
		//console.log(music.volume)
	},
	minusMusic: function(){
		if(music.volume<=0.1 || music.volume==0.00){
			null;
		}
		if(music.volume<=0.01){
			music.mute = true;
		}
		else{
			music.volume -= 0.1;
			this.musicVol(music.volume);
		}
		//console.log(music.volume)
	},
	plusFX: function(){
		shootSound.play();
		shootSound.mute = false;
		if(shootSound.volume>=1.00 || shootSound.volume==1.00){
			null;
		}else{
			shootSound.volume += 0.1;
			this.musicVol(shootSound.volume);
		}
		//console.log(fx.volume)
	},
	minusFX: function(){
		shootSound.play();
		if(shootSound.volume<=0.1 || shootSound.volume==0.00){
			null;
		}
		if(shootSound.volume<=0.01){
			shootSound.mute = true;
		}
		else{
			shootSound.volume -= 0.1;
			this.musicVol(shootSound.volume);
		}
		//console.log(fx.volume)
	},
	musicVol: function(e) {
		return Math.round(e*10);
	},
	update: function() {
		volumeTextArea.text = this.musicVol(music.volume);
		fxTextArea.text = this.musicVol(shootSound.volume);
	}
};

