(function(ns){

    var Asset = ns.Asset = Hilo.Class.create({
        Mixes: Hilo.EventMixin,
        queue: null,
        bg: null,
        river: null,
        ready: null,
        over: null,
        numberGlyphs: null,
        birdAtlas: null,
        holdback: null,

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
            this.queue.start();
        },

        onComplete: function(e){
            this.bg = this.queue.get('bg').content;
            this.river = this.queue.get('river').content;
            this.pillar = this.queue.get('pillar').content;
            this.riverAtlas = new Hilo.TextureAtlas({
                image: this.queue.get('river').content,
                frames: [
                    [0, 0, 400, 39], 
                    [0, 39, 400, 39], 
                    [0, 78, 400, 39]
                ],
                sprites: {
                    river: [0, 1, 2]
                }
            });
            this.frog = this.queue.get('frog').content;

            // this.frogAtlas = new Hilo.TextureAtlas({
            //     image: this.queue.get('frog').content,
            //     frames: [
            //         [0, 0, 100, 96], 
            //         [0, 60, 86, 60], 
            //         [0, 0, 86, 60]
            //     ],
            //     sprites: {
            //         frog: [0, 1, 2]
            //     }
            // });

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