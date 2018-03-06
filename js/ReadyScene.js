(function(ns){

    var ReadyScene = ns.ReadyScene = Hilo.Class.create({
        Extends: Hilo.Container,
        constructor: function(properties){
            ReadyScene.superclass.constructor.call(this, properties);

            this.bg = null;
            this.tip = null;
            this.init(properties);
        },

        init: function(properties) {
            this.bg = new Hilo.Bitmap({
                image: properties.redyBg,
                scaleX: properties.clientWidth / properties.redyBg.width,
                scaleY: properties.clientHeight / properties.redyBg.height
            }).addTo(this);
            this.bg.x = 0;
            this.bg.y = 0;

            this.finger = new Hilo.Bitmap({
                image: properties.finggerImg
            }).addTo(this);
            this.finger.x = properties.clientWidth / 2 + 70;
            this.finger.y = properties.clientHeight * 0.38;

            Hilo.Tween.to(this.finger, {x: this.finger.x + 20, y: this.finger.y + 20}, {duration: 500, reverse:true, loop:true});
            
        }
    });

})(window.game);