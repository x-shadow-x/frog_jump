
(function(ns){

var Frog = ns.Frog = Hilo.Class.create({
    Extends: Hilo.Sprite,
    constructor: function(properties){
        Frog.superclass.constructor.call(this, properties);
        this.startX = properties.startX;
        this.startY = properties.startY;
        this.riverY = properties.riverY; // 河水的y坐标用来判断青蛙是否掉下河了
        this.addFrame(properties.atlas.getSprite('frog'));

        this.gravity = 10 / 1000 * 0.3;
        this.jumpHeight = 320;
        this.currentHeight = 0;
        this.distance = 0; // 跳跃的水平距离
        this.initVelocity = Math.sqrt(2 * this.jumpHeight * this.gravity);
        this.jumpDuration = 2 * this.initVelocity / this.gravity >> 0; // 根据给定的跳跃高度推算出每次的跳跃时间
        this.jumpV = 0; // 水平跳跃的速度
    },

    getReady: function() {
        //设置起始坐标
        this.x = this.startX;
        this.y = this.startY;
        this.stop();
        this.goto(0, true);
    },

    jump: function(distance) {
        this.isJumping = true;
        this.distance = distance;
        this.jumpStartTime = +new Date();
        this.jumpV = this.distance / this.jumpDuration;
    },

    // 手指点击屏幕~青蛙处于准备起跳状态
    readyJump: function() {
        this.goto(1, true);
    },

    // 上升阶段
    jumpUp: function() {
        this.goto(2, true);
    },

    // 掉落阶段
    jumpDown: function() {
        this.goto(3, true);
    },
    
    onUpdate: function() {
        if(!this.isJumping) return;
        //跳跃时间
        var time = (+new Date()) - this.jumpStartTime;
        //跳跃的垂直距离
        var height = this.initVelocity * time - 0.5 * this.gravity * time * time;
        
        //y轴坐标
        var x = this.startX + this.jumpV * time;
        var y = this.startY - height;
        if(y <= this.riverY){
            //青蛙未掉下河
            this.y = y;
            this.x = x;
            if(height > this.currentHeight) {
                // 往上跳
                this.jumpUp();
            } else {
                //往下掉
                this.jumpDown();
            }
            this.currentHeight = height;
        } else {
            //青蛙已经掉下河，游戏结束
            this.y = this.riverY;
            this.isDead = true;
            this.isJumping = false;
        }
    }
});

})(window.game);