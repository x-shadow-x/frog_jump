(function(ns) {

    var Pillars = ns.Pillars = Hilo.Class.create({
        Extends: Hilo.Container,
        constructor: function(properties) {

            Pillars.superclass.constructor.call(this, properties);

            this.numPillars = properties.numPillars;
            this.numOffscreenPillars = properties.numOffscreenPillars;
            this.image = properties.image;
            this.startX = properties.startX >> 0;
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

        log: function() {
            this.children.forEach((item) => {
                console.log(item.x);
            });
            console.log('===============');
        },

        placePillars: function(pillar, index) {
            var pillarX = this.startX;
            var minSpace = this.minSpace;
            var maxSpace = this.maxSpace;
            var children = this.children;
            var prePillar = null;
            var x1 = 0; // 第二根柱子x坐标距离屏幕右侧的距离
            var x2 = 0; // 第一根柱子和第二根柱子之间的间距
            var x3 = 0; // 第二根柱子和第三根柱子的间距~这个具体算出第三根柱子的x坐标后才能计算

            if (index === 1) {
                prePillar = children[index - 1];
                pillarX = prePillar.x + this.pillarWidth + minSpace + (maxSpace - minSpace) * Math.random() >> 0;
            } else if (index === 2) {

                var minX = this.clientWidth - this.x;
                var range = children[index - 1].x - children[index - 2].x - this.pillarWidth - this.minSpace;
                pillarX = minX + range * Math.random() >> 0;
            }

            pillar.x = pillarX;
            pillar.y = this.pillarY;
        },

        resetPillars: function() {
            var pillar = this.getChildAt(0);
            this.setChildIndex(pillar, this.numPillars - 1);
            this.placePillars(pillar, this.numPillars - 1);
        },

        // 判断跳跃结果
        hitTest: function(destX, frogWidth) {
            // console.log(destX, frogWidth);
            // console.log(this.children[0], this.children[1]);
            // console.log('=================================================');
            var firstPillarX = this.children[0].x + this.x;
            var secondPillarX = this.children[1].x + this.x;
            if (destX + frogWidth >= secondPillarX && destX <= secondPillarX + this.pillarWidth) {
                // 成功跳到下一个柱子
                return 1;
            } else if (destX <= firstPillarX + this.pillarWidth) {
                // 还在当前柱子
                return 0;
            } else {
                // 掉下去了
                return -1;
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