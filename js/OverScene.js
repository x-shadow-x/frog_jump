
(function(ns){

    var OverScene = ns.OverScene = Hilo.Class.create({
        Extends: Hilo.Container,
        constructor: function(properties){
            console.log(properties);
            OverScene.superclass.constructor.call(this, properties);

            this.scorePanel = null;
            this.replayBtn = null;
            this.init(properties);
        },

        init: function(properties) {

            this.gameOver = new Hilo.Bitmap({
                id: 'gameOver',
                image: properties.gameOverImg,
                x: properties.gameOverX,
                y: properties.gameOverY
            }).addTo(this);

            this.replayBtn = new Hilo.Bitmap({
                id: 'replay',
                image: properties.replayBtnImg,
                x: properties.replayBtnX,
                y: properties.replayBtnY
            }).addTo(this);
        },

        updateScore: function(score) {
            // todo
        }
    });

})(window.game);