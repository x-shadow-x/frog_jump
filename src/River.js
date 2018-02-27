
/*(function(ns){

    var River = ns.River = Hilo.Class.create({
        Extends: Hilo.Sprite,
        constructor: function(properties){
            console.log(properties.atlas.getSprite('river'));
            River.superclass.constructor.call(this, properties);
            
            this.addFrame(properties.atlas.getSprite('river'));
            this.interval = 6;
        },

        getReady: function(){
            this.play();
            this.tween = Hilo.Tween.to(this, {y:this.y + 10}, {duration: 1000, reverse:true, loop:true});
        }
    });

})(window.game);*/


(function(ns){

    var River = ns.River = Hilo.Class.create({
        Extends: Hilo.Bitmap,
        constructor: function(properties) {
            var bitMapProperties  = {
                id: properties.id,
                image: properties.image,
                rect: properties.rect,
                scaleX: (properties.clientWidth + (-properties.offset) * 2) / properties.image.width

            };

            River.superclass.constructor.call(this, bitMapProperties);

            //放置地面在舞台的最底部
            this.y = properties.y;
            this.tween = Hilo.Tween.to(this, {y: this.y + properties.step}, {duration: properties.duration, reverse:true, loop:true});

            //循环移动地面
            Hilo.Tween.to(this, {x: properties.offset * bitMapProperties.scaleX}, {duration: 1000, loop: true});
        },
    });

})(window.game);