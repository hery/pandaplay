ig.module('game.entities.boobless')
.requires('impact.entity')
.defines(function() {
	EntityBoobless = ig.Entity.extend( {
		animSheet: new ig.AnimationSheet('media/boobless-sprite.png', 64, 64),
		size: {x:30, y:40},
		offset: {x:20, y:20},
		maxVel: {x:100, y:100},
		flip: false,
		friction: {x:150, y:0},
		speed: 50,
    type: ig.Entity.TYPE.B,
    checkAgainst: ig.Entity.TYPE.A,
    collides: ig.Entity.COLLIDES.ACTIVE,
		init: function(x, y, settings) {
			this.parent(x, y, settings);
			this.addAnim('idle', 1, [13*11]);
			this.addAnim('run', 0.1, [13*11+0,13*11+1,13*11+2,13*11+3,13*11+4,13*11+5,13*11+6,13*11+7,13*11+8]);
		},
		update: function() {
			// flip if near edge
			if (!ig.game.collisionMap.getTile(this.pos.x + (this.flip ? +4 : this.size.x -4), this.pos.y + this.size.y+1)) {
				this.flip = !this.flip;
			}
			if (this.vel.x != 0) {
				this.currentAnim = this.anims.run;
			}
			var xdir = this.flip ? -1 : 1;
			this.vel.x = this.speed * xdir;
			this.currentAnim.flip.x = this.flip;
			this.parent();
		},
    check: function (other) {
      // other.receiveDamage(10, this);
    },
		handleMovementTrace: function(res) {
			this.parent(res);
			if (res.collision.x) {
				this.flip = !this.flip;
			}
		},
	});
});
