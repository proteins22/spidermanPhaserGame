var bootState = {
	create: function(){


		game.physics.startSystem(Phaser.Physics.ARCADE);
		console.log("%cloading...", "color:#000; background:yellow; padding:5px;");
		
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

		//game.scale.minWidth = 300;
 		//game.scale.minHeight = 625;
 		//game.scale.maxWidth = 300;
 		//game.scale.maxHeight = 625;

 		game.scale.pageAlignHorizontally = false;
 		game.scale.pageAlignVertically = false;

		
		game.scale.updateLayout(true);
	

	game.state.start('preload');	
	}
};