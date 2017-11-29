var width = window.innerWidth;
var height = window.innerHeight;
var device;
var highScore = 0;
var web;

//var game = new Phaser.Game(width, height, Phaser.AUTO, 'game');

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || width <= 860 ) {
	var device = 'mobile';
}

else{
	var device = 'desktop';
}
	var game = new Phaser.Game(300, 625, Phaser.AUTO, 'game');

	game.state.add('boot', bootState);
	game.state.add('preload', loadState);
	game.state.add('title', titleState);
	game.state.add('option', optionState);
	game.state.add('game', gameState);
	game.state.add('gameOver', overState);
	
	game.state.start('boot');

	//game.state.start('title');

$('.back').click(function(){
	console.log(true);
	$('#howto').fadeOut();
	$('#howto video').trigger('pause');
});