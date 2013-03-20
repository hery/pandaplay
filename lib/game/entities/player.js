ig.module(
	'game.entities.player')
.requires(
	'impact.entity')
.defines(function() {
	EntityPlayer = ig.Entity.extend({
		animSheet: new ig.AnimationSheet('media/panda-sprite.png', 64, 64),
		size: {x:30, y:40},
		offset: {x:20, y:20},
		flip: false,
		maxVel: {x:100, y:150},
		friction: {x:600, y:0},
		accelGround: 400,
		accelAir: 200,
		jump: 200,
    focusStatus: 0,
    currentCommandName: '',
    type: ig.Entity.TYPE.A,
    checkAgainst: ig.Entity.TYPE.NONE,
    collides: ig.Entity.COLLIDES.PASSIVE,
    shootTimer: new ig.Timer(0.1),
    pandaCounter: 0,
		init: function(x, y, settings) {
			this.parent(x, y, settings);
			this.addAnim('idle', 1, [24*11]);
			this.addAnim('run', 0.1, [24*11+0,24*11+1,24*11+2,24*11+3,24*11+4,24*11+5,24*11+6,24*11+7,24*11+8]);
			this.addAnim('jump', 1, [24*11+3]);
			this.addAnim('fall', 1, [24*3+5]);
			this.addAnim('focus', 0.1, [24*15+0, 24*15+1, 24*15+2, 24*15+3, 24*15+4], true);
		},
		update: function() {
			// move left or right
			var accel = this.standing ? this.accelGround : this.accelAir;
			if (ig.input.state('right')) {
				this.accel.x = accel;
				this.flip = false;
			} else if (ig.input.state('left')) {
				this.accel.x = -accel;
				this.flip = true;
			} else {
				this.accel.x = 0;
			}
			
			if (ig.input.pressed('jump')) {
        // if (this.vel.y == 0) {
          this.vel.y = -this.jump;
        // }
			}

      if (ig.input.pressed('focus')) {
        this.focusStatus = 1;
        ig.log(this.focusStatus);
      }

      if (ig.input.pressed('unfocus')) {
        this.focusStatus = 0;
        this.currentCommandName = '';
        ig.log(this.focusStatus);
      }
      
      if (ig.input.pressed('pressedF')) {
        if (this.focusStatus == 1) {
          this.currentCommandName = this.currentCommandName + 'F';
          ig.log(this.currentCommandName);
        }
      }

      if (ig.input.pressed('pressedI')) {
        if (this.focusStatus == 1) {
          this.currentCommandName = this.currentCommandName + 'I';
          ig.log(this.currentCommandName);
        }
      }

      if (ig.input.pressed('pressedR')) {
        if (this.focusStatus == 1) {
          this.currentCommandName = this.currentCommandName + 'R';
          ig.log(this.currentCommandName);
        }
      }

      if (ig.input.pressed('pressedE')) {
        if (this.focusStatus == 1) {
          this.currentCommandName = this.currentCommandName + 'E';
          ig.log(this.currentCommandName);
        }
      }

      if (ig.input.pressed('pressedK')) {
        if (this.focusStatus == 1) {
          this.currentCommandName = this.currentCommandName + 'K';
          ig.log(this.currentCommandName);
        }
      }

      if (ig.input.pressed('pressedO')) {
        if (this.focusStatus == 1) {
          this.currentCommandName = this.currentCommandName + 'O';
          ig.log(this.currentCommandName);
        }
      }

      if (ig.input.pressed('pressedM')) {
        if (this.focusStatus == 1) {
          this.currentCommandName = this.currentCommandName + 'M';
          ig.log(this.currentCommandName);
        }
      }


      if (ig.input.pressed('pressedH')) {
        if (this.focusStatus == 1) {
          this.currentCommandName = this.currentCommandName + 'H';
          ig.log(this.currentCommandName);
        }
      }

      
			if (this.vel.y < 0) {
				this.currentAnim = this.anims.jump;
			} else if (this.vel.y > 0) {
				this.currentAnim = this.anims.fall;
			} else if (this.vel.x != 0) {
				this.currentAnim = this.anims.run;
			} else {
        if (this.focusStatus == 1) {
          this.currentAnim = this.anims.focus;
        } else {
				this.currentAnim = this.anims.idle;
        }
			}

      // if (ig.input.pressed('shoot') && this.pandaCounter == 0) { 
      if (this.currentCommandName == "FIRE" && this.pandaCounter == 0) { 
        this.pandaCounter = 10;
      }

      if (this.currentCommandName == "FIRE") {
        this.currentCommandName = '';
        this.focusStatus = 0;
        ig.log(this.currentCommandName);
      }

      if (this.currentCommandName == "KOMEHOMEHO") {
        ig.game.spawnEntity(EntityKameha, this.pos.x, this.pos.y-10, {flip:this.flip});
        this.currentCommandName = '';
        this.focusStatus = 0;
      }

      if (this.pandaCounter > 0) {
        if (this.shootTimer.delta() >= 0) {
            this.shootTimer.reset();
            this.pandaCounter--;
            ig.game.spawnEntity(EntityBullet, this.pos.x, this.pos.y, {flip:this.flip});
        }
      }
			
			this.currentAnim.flip.x = this.flip;
			this.parent();
    }	
	});

  EntityBullet = ig.Entity.extend({
    size: {x: 10, y: 10},
    offset: {x: 0, y:0}, 
    animSheet: new ig.AnimationSheet('media/panda-weapon.png', 32, 32),
    maxVel:{x:300, y:500},
    bounciness: 1,
    type: ig.Entity.TYPE.NONE,
    checkAgainst: ig.Entity.TYPE.B,
    jump:200,
    collides: ig.Entity.COLLIDES.PASSIVE, 
    init: function(x, y, settings) {
      this.parent(x + (settings.flip ? -32:32), y, settings);
      this.vel.x = this.accel.x = (settings.flip ? -this.maxVel.x:this.maxVel.x);
      this.vel.y = -400;
     this.addAnim('idle', 0.5, [0,1,2,], true);
    },
    handleMovementTrace: function(res) {
      this.parent(res);
      if (res.collision.x || res.collision.y) {
        if (res.collision.x) {
        this.accel.x = - this.accel.x;
        }
      }
    },
    check: function(other) {
      other.receiveDamage(0.1, this);
      this.kill();
    },
  });

  EntityKameha = ig.Entity.extend({
    size: {x: 30, y: 30},
    offset: {x: 0, y:0}, 
    animSheet: new ig.AnimationSheet('media/kameha-sprite.png', 64, 64),
    maxVel:{x:600, y:0},
    bounciness: 0,
    type: ig.Entity.TYPE.NONE,
    checkAgainst: ig.Entity.TYPE.B,
    collides: ig.Entity.COLLIDES.PASSIVE, 
    init: function(x, y, settings) {
      this.parent(x + (settings.flip ? -32:32), y, settings);
      this.vel.x = this.accel.x = (settings.flip ? -this.maxVel.x:this.maxVel.x);
      this.addAnim('idle', 1, [0], true);
    },
    handleMovementTrace: function(res) {
      this.parent(res);
      if (res.collision.x || res.collision.y) {
        this.kill();
      }
    },
    check: function(other) {
      other.receiveDamage(5, this);
      this.kill();
    },
  });
});
