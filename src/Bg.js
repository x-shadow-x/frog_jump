(function(ns) {

    var Bg = ns.Bg = Hilo.Class.create({
        Extends: Hilo.Bitmap,
        constructor: function(properties) {

            Bg.superclass.constructor.call(this, properties);
            this.image = properties.image;
            this.y = properties.y;
            this.x = properties.x;

            this.moveTween = new Hilo.Tween(this, null, {
                onComplete: this.resetBg.bind(this)
            });
        },

        resetBg: function() {
            if (this.x <= -this.image.width / 3) {
                this.x = this.x % (this.image.width / 3)
            }
        },

        startMove: function(distance) {
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

        stopMove: function() {
            if (this.moveTween) {
                this.moveTween.pause();
            }
        },
    });

})(window.game);