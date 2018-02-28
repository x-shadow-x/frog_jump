(function(ns) {

    var Frog = ns.Frog = Hilo.Class.create({
        Extends: Hilo.Sprite,
        Mixes: Hilo.EventMixin,
        constructor: function(properties) {
            Frog.superclass.constructor.call(this, properties);
            // this.orianglStartX = properties.startX;
            this.startX = properties.startX;
            this.startY = properties.startY;
            this.floorY = this.startY; // 青蛙起跳后掉回来的 y坐标~默认掉回柱子上~如果碰撞检测到未跳到柱子上~调用相应函数将值设置为底板即掉下河
            this.clientHeight = properties.clientHeight; // 屏幕高度~用来判断青蛙是否掉下河了
            this.addFrame(properties.atlas.getSprite('frog'));

            this.gravity = 10 / 1000 * 0.3;
            this.jumpHeight = 320;
            this.currentHeight = 0;
            this.distance = 0; // 跳跃的水平距离
            this.initVelocity = Math.sqrt(2 * this.jumpHeight * this.gravity);
            this.jumpDuration = 2 * this.initVelocity / this.gravity >> 0; // 根据给定的跳跃高度推算出每次的跳跃时间
            this.jumpV = 0; // 水平跳跃的速度
            this.result = 0; // 跳跃的结果，默认为0，表示在当前柱子上
            console.log(this.startX);

            this.moveTween = new Hilo.Tween(this, null, {});
        },

        getReady: function() {
            //设置起始坐标
            this.x = this.startX;
            this.y = this.startY;
            this.stop();
            this.static();
        },

        // 根据指定的距离回退到起始位置
        startMove: function(distance) {
            this.resetFrog(this.x - distance);
            //设置缓动时间
            this.moveTween.duration = 320;
            //设置缓动的变换属性，即x从当前坐标变换到targetX
            this.moveTween.setProps({
                x: this.x
            }, {
                x: this.x - distance
            });

            //启动缓动动画
            this.moveTween.start();
        },

        resetFrog: function(startX) {
            this.startX = startX;
        },

        jump: function(distance) {
            this.isJumping = true;
            this.distance = distance;
            this.jumpStartTime = +new Date();
            this.jumpV = this.distance / this.jumpDuration;
        },

        static: function() {
            this.goto(0, true);
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

        upDateFloorY: function(result, floorY) {
            if (result < 0) {
                this.floorY = this.clientHeight;
            }
            this.result = result;
        },

        onUpdate: function() {
            if (!this.isJumping) return;
            //跳跃时间
            var time = (+new Date()) - this.jumpStartTime;
            //跳跃的垂直距离
            var height = this.initVelocity * time - 0.5 * this.gravity * time * time;

            //y轴坐标
            var x = this.startX + this.jumpV * time;
            var y = this.startY - height;
            if (y <= this.floorY) {
                //未到静止时的 y坐标
                this.y = y;
                this.x = x;
                if (height > this.currentHeight) {
                    // 往上跳
                    this.jumpUp();
                } else {
                    //往下掉
                    this.jumpDown();
                }
                this.currentHeight = height;
            } else {
                //青蛙已经到达了静止时候的 y坐标
                this.static();
                this.startX = this.x;
                this.y = this.floorY;
                this.isJumping = false;
                this.fire('jumpEnd', {
                    result: this.result
                });
            }
        }
    });

})(window.game);