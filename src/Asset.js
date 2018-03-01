(function(ns){

    var Asset = ns.Asset = Hilo.Class.create({
        Mixes: Hilo.EventMixin,
        queue: null,
        bg: null,
        river: null,
        ready: null,
        over: null,
        numberGlyphs: null,
        frogAtlas: null,
        pillar: null,
        bgSound: null,

        load: function(){
            var resources = [
                {id:'bg', src:'images/bg.jpg'},
                {id:'river', src:'images/river.png'},
                {id:'frog', src:'images/frog.png'},
                {id:'pillar', src:'images/pillar.png'},
                {id:'number', src:'images/number.png'}
            ];

            this.queue = new Hilo.LoadQueue();
            this.queue.add(resources);
            this.queue.on('complete', this.onComplete.bind(this));
            this.queue.on('complete', this.onComplete.bind(this));
            this.queue.start();
            this.queue.on('load', function(e){
                console.log(e.detail);
            });
        },

        onComplete: function(e){
            this.bg = this.queue.get('bg').content;
            this.river = this.queue.get('river').content;
            this.pillar = this.queue.get('pillar').content;
            

            this.frogAtlas = new Hilo.TextureAtlas({
                image: this.queue.get('frog').content,
                frames: [
                    [0, 0, 144, 132], 
                    [0, 132, 144, 132], 
                    [0, 264, 144, 132],
                    [0, 396, 144, 132]
                ],
                sprites: {
                    frog: [0, 1, 2, 3]
                }
            });

            var number = this.queue.get('number').content;
            this.numberGlyphs = {
                0: {image:number, rect:[0,0,60,91]},
                1: {image:number, rect:[61,0,60,91]},
                2: {image:number, rect:[121,0,60,91]},
                3: {image:number, rect:[191,0,60,91]},
                4: {image:number, rect:[261,0,60,91]},
                5: {image:number, rect:[331,0,60,91]},
                6: {image:number, rect:[401,0,60,91]},
                7: {image:number, rect:[471,0,60,91]},
                8: {image:number, rect:[541,0,60,91]},
                9: {image:number, rect:[611,0,60,91]}
            };


            this.queue.off('complete');
            this.fire('complete');
        }
    });

})(window.game);