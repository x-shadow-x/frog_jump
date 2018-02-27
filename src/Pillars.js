(function(ns) {

    var Pillars = ns.Pillars = Hilo.Class.create({
        Extends: Hilo.Container,
        constructor: function(properties) {

            Pillars.superclass.constructor.call(this, properties);

            this.numPillars = properties.numPillars;
            this.numOffscreenPillars = properties.numOffscreenPillars;
            this.image = properties.image;
            this.startX = properties.startX;
            this.pillarY = properties.pillarY;
            this.minSpace = properties.minSpace;
            this.maxSpace = properties.maxSpace;
            this.clientWidth = properties.clientWidth;
            this.pillarWidth = this.image.width;

            this.createPillars(this.image);
            this.moveTween = new Hilo.Tween(this, null, {
                onComplete: this.resetPillars.bind(this)
            });
        },

        createPillars: function(image) {
            for (var i = 0, len = this.numPillars; i < len; i++) {
                var pillar = new Hilo.Bitmap({
                    id: 'pillar' + i,
                    image: image
                }).addTo(this);

                this.placePillars(pillar, i);
            }
        },

        placePillars: function(pillar, index) {
            var pillarX = this.startX;
            var startX = 0;
            var dis = 0;
            var minSpace = this.minSpace;
            var maxSpace = this.maxSpace;
            var children = this.children;
            var prePillar = null;

            if (index >= this.numOffscreenPillars) {
                prePillar = children[index - 1];
                minSpace = this.clientWidth - (prePillar.x - this.x);
                // maxSpace = minSpace + prePillar.x - children[index - 2].x - this.pillarWidth;
                // pillarX = prePillar.x + minSpace + (maxSpace - minSpace) * Math.random() >> 0;
                // 上面两步简化计算为：
                pillarX = prePillar.x + minSpace + (prePillar.x - children[index - 2].x - this.pillarWidth) * Math.random() >> 0;
            } else if (index > 0) {
                prePillar = children[index - 1];
                pillarX = prePillar.x + this.pillarWidth + minSpace + (maxSpace - minSpace) * Math.random() >> 0;
            }


            // if(index > 0 && index < this.numPillars - 1) {
            //     pillarX = this.children[index - 1].x + (this.maxSpace - this.minSpace) * Math.random() >> 0;
            // } else {
            //     pillarX = this.clientWidth + (this.maxSpace - this.minSpace) * Math.random() >> 0;
            // }

            pillar.x = pillarX;
            pillar.y = this.pillarY;
        },

        resetPillars: function() {
            console.log(123);
            var children = this.children;
            var total = children.length;
            var judgePillar = children[this.numOffscreenPillars];
            if (this.x <= (-judgePillar.x)) {
                children[1].x = children[3].x - children[2].x;
                this.x = 0;

                for (var i = this.numOffscreenPillars, len = children.length; i < len; i++) {
                    this.placePillars(children[i], i);
                }
            }
            // var pillar = this.getChildAt(0);
            // this.setChildIndex(pillar, total - 1);
            // this.placePillars(pillar, total - 1);


            // var total = this.children.length;

            // //把已移出屏幕外的背景放到队列最后面
            // for(var i = 0, len = this.numOffscreenPillars; i < len; i++) {
            //     var bg = this.getChildAt(0);
            //     this.setChildIndex(bg, total - 1);
            //     this.placePillars(bg, this.numOffscreenPillars + i);
            // }

            //重新确定障碍的x轴坐标


            //继续移动
            // this.startMove();
            // Hilo.Tween._tweens.push(this.moveTween);
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