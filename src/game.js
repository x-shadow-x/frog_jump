(function() {

    window.onload = function() {
        game.init();
    }

    var game = window.game = {
        width: 0,
        height: 0,

        maxPillarDistance: 0,
        bgBottom: 59, // 背景距离底部的距离
        riverSpace: 20, // 将来将参数配置成变量用

        numPillars: 4,
        numOffscreenPillars: 2,

        step: 0, // 跳跃的步数

        asset: null,
        stage: null,
        ticker: null,
        state: null,
        score: 0,

        bg: null,
        rivers: null,
        bird: null,
        pillars: null,
        gameReadyScene: null,
        gameOverScene: null,

        init: function() {
            this.asset = new game.Asset();
            this.asset.on('complete', function(e) {
                this.asset.off('complete');
                this.initStage();
            }.bind(this));
            this.asset.load();
        },

        initStage: function() {
            this.width = Math.min(innerWidth, 450) * 2;
            this.maxPillarDistance = this.width * 0.5;
            this.height = Math.min(innerHeight, 750) * 2;
            this.scale = 0.5;

            //舞台画布
            var canvasType = location.search.indexOf('dom') != -1 ? 'dom' : 'canvas';

            //舞台
            this.stage = new Hilo.Stage({
                renderType: canvasType,
                container: document.body,
                // canvas: canvas,
                width: this.width,
                height: this.height,
                scaleX: this.scale,
                scaleY: this.scale
            });
            document.body.appendChild(this.stage.canvas);

            //启动计时器
            this.ticker = new Hilo.Ticker(60);
            this.ticker.addTick(Hilo.Tween);
            this.ticker.addTick(this.stage);
            this.ticker.start(true);

            this.stage.enableDOMEvent(Hilo.event.POINTER_START, true);
            this.stage.on(Hilo.event.POINTER_START, this.handleTouchStart.bind(this));

            //初始化
            this.initBackground();
            this.initPillars();

            //准备游戏
            this.gameReady();
        },

        initBackground: function() {
            this.initBg();
            this.initRiver();
        },

        initRiver: function() {
            this.rivers = [
                new game.River({
                    id: 'riverUp',
                    image: this.asset.river,
                    rect: [0, 0, this.asset.river.width, 39],
                    clientWidth: this.width,
                    y: this.height - 79,
                    step: 10,
                    offset: -78,
                    duration: 1800
                }),
                new game.River({
                    id: 'riverMiddle',
                    image: this.asset.river,
                    rect: [0, 39, this.asset.river.width, 39],
                    clientWidth: this.width,
                    y: this.height - 59,
                    step: 10,
                    offset: -78,
                    duration: 1600
                }),
                new game.River({
                    id: 'riverDown',
                    image: this.asset.river,
                    rect: [0, 78, this.asset.river.width, 39],
                    clientWidth: this.width,
                    y: this.height - 39,
                    step: 10,
                    offset: -78,
                    duration: 1000
                })
            ];

            this.rivers.forEach(function(item) {
                item.addTo(this.stage);
            }.bind(this));
        },

        initBg: function() {
            var bgHeight = this.asset.bg.height;
            this.bgs = [
                new game.Bg({
                    id: 'bg1',
                    image: this.asset.bg,
                    x: 0,
                    y: this.height - bgHeight - this.bgBottom
                }),
                new game.Bg({
                    id: 'bg2',
                    image: this.asset.bg,
                    x: this.asset.bg.width,
                    y: this.height - bgHeight - this.bgBottom
                })
            ];

            this.bgs.forEach(function(item) {
                item.addTo(this.stage);
            }.bind(this));
        },

        initPillars: function() {
            this.pillars = new game.Pillars({
                id: 'pillars',
                image: this.asset.pillar,
                startX: this.width * 0.1, // 屏幕中起始柱子的横坐标
                pillarY: this.height - this.asset.pillar.height,
                minSpace: this.width * 0.2,
                maxSpace: this.width * 0.6,
                clientWidth: this.width,
                numPillars: this.numPillars,
                numOffscreenPillars: this.numOffscreenPillars
            }).addTo(this.stage);
        },

        gameReady: function() {
            this.state = 'ready';

            // this.gameOverScene.hide();
            // this.score = 0;
            // this.currentScore.visible = true;
            // this.currentScore.setText(this.score);
            // this.gameReadyScene.visible = true;
            // this.pillars.reset();
            // this.river.getReady();
        },

        gameStart: function() {
            this.state = 'playing';
            // this.gameReadyScene.visible = false;
        },

        gameOver: function() {
            // if(this.state !== 'over'){
            //     //设置当前状态为结束over
            //     this.state = 'over';
            //     //停止障碍的移动
            //     this.pillars.stopMove();
            //     //小鸟跳转到第一帧并暂停
            //     this.bird.goto(0, true);
            //     //隐藏屏幕中间显示的分数
            //     this.currentScore.visible = false;
            //     //显示结束场景
            //     this.gameOverScene.show(this.calcScore(), this.saveBestScore());
            // }
        },

        handleTouchStart: function() {
            console.log(this.pillars);
            var index = this.step % this.numOffscreenPillars;
            var pillars = this.pillars.children;
            var distance = pillars[index + 1].x - pillars[index].x
            this.bgs.forEach(function(item) {
                item.startMove(distance);
            })
            this.pillars.startMove(distance);
        }

    };

})();