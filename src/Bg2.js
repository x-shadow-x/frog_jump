(function(ns){

    var Bg = ns.Bg = Hilo.Class.create({
        Extends: Hilo.Container,
        constructor: function(properties) {

            Bg.superclass.constructor.call(this, properties);

            this.numBgs = 2;
            this.numOffscreenBgs = this.numBgs * 0.5;
            this.image = properties.image;

            this.createBg(this.image);
            this.moveTween = new Hilo.Tween(this, null, {
                onComplete: this.resetBg.bind(this)
            });
        },

        createBg: function(image){
            for(var i = 0, len = this.numBgs; i < len; i++) {
                var bg = new Hilo.Bitmap({
                    id: 'bg' + i,
                    image: image
                }).addTo(this);

                this.placeBg(bg, i);
            }           
        },

        placeBg: function(bg, index){
            bg.x = index * bg.width;
            bg.y = 0;
        },

        resetBg: function() {
            console.log(123);
            if(this.x <= -this.image.width) {
                this.x = 0;
            }
            // var total = this.children.length;

            // //把已移出屏幕外的背景放到队列最后面
            // for(var i = 0, len = this.numOffscreenBgs; i < len; i++) {
            //     var bg = this.getChildAt(0);
            //     this.setChildIndex(bg, total - 1);
            //     this.placeBg(bg, this.numOffscreenBgs + i);
            // }

            //重新确定障碍的x轴坐标
            

            //继续移动
            // this.startMove();
            // Hilo.Tween._tweens.push(this.moveTween);
        },

        startMove: function(distance) {
            //设置缓动时间
            this.moveTween.duration = 1000;
            //设置缓动的变换属性，即x从当前坐标变换到targetX
            this.moveTween.setProps({x: this.x}, {x: this.x - distance});
            //启动缓动动画
            this.moveTween.start();
        },

        stopMove: function() {
            if(this.moveTween) {
                this.moveTween.pause();
            }
        },
    });

})(window.game);