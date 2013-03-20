ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'game.levels.pandalevel1',
  'impact.font',
  'impact.debug.debug'
)
.defines(function(){

MyGame = ig.Game.extend({
	gravity: 300,
	
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),
	
	init: function() {
		// Initialize your game here; bind keys etc.
		// bind keys
		ig.input.bind(ig.KEY.A, 'left');
		ig.input.bind(ig.KEY.D, 'right');
		ig.input.bind(ig.KEY.W, 'jump');
		
    // focus mode
		ig.input.bind(ig.KEY.S, 'focus');
		ig.input.bind(ig.KEY.Q, 'unfocus');
    
    // commands
		ig.input.bind(ig.KEY.F, 'pressedF');
		ig.input.bind(ig.KEY.I, 'pressedI');
		ig.input.bind(ig.KEY.R, 'pressedR');
		ig.input.bind(ig.KEY.E, 'pressedE');

		ig.input.bind(ig.KEY.K, 'pressedK');
		ig.input.bind(ig.KEY.O, 'pressedO');
		ig.input.bind(ig.KEY.M, 'pressedM');
		ig.input.bind(ig.KEY.H, 'pressedH');

		ig.input.bind(ig.KEY.C, 'shoot');
		
		// load level
		this.loadLevel(LevelPandalevel1);
	},
	
	update: function() {
		// Update all entities and backgroundMaps
		this.parent();
		// Add your own, additional update code here
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
    var x = 10;
        y = 10;
    this.font.draw('pandaplay', x,y);
    this.font.draw('A=LEFT; D=RIGHT; W=JUMP; S=FOCUS; Q=STOP FOCUS;', x,y+10);
    this.font.draw('Available focus commands: FIRE, KOMEHOMEHO', x,y+20);
    this.font.draw('To use focus commands, enter focus mode by pressing S,', x,y+30);
    this.font.draw('then enter your command namer.', x,y+40);
	}
});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 60, 800, 600, 1 );

});
