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

        numPillars: 3,
        numOffscreenPillars: 1,

        step: 0, // 跳跃的步数
        distance: 0, // 青蛙跳跃的水平距离

        touchTime: 0,

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
            this.stage.enableDOMEvent(Hilo.event.POINTER_END, true);
            this.stage.on(Hilo.event.POINTER_START, this.handleTouchStart.bind(this));
            this.stage.on(Hilo.event.POINTER_END, this.handleTouchEnd.bind(this));

            //初始化
            this.initBackground();
            this.initPillars();

            //准备游戏
            this.gameReady();
        },

        initBackground: function() {
            this.initBg();
            this.initRiver();
            this.initFrog();
            this.initCurrentScore();
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

            this.bg = new game.Bg({
                id: 'bg',
                image: this.asset.bg,
                x: 0,
                y: this.height - bgHeight - this.bgBottom
            }).addTo(this.stage);
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

        initFrog: function() {
            this.frog = new game.Frog({
                id: "frog",
                atlas: this.asset.frogAtlas,
                startX: this.width * 0.1 - (this.asset.pillar.width - 100) / 2, // 屏幕中起始柱子的横坐标
                startY: this.height - this.asset.pillar.height - 98,
                clientHeight: this.height,
                floorY: this.height - this.asset.pillar.height - 98
                // floorY: this.rivers[0].y
            }).addTo(this.stage);

            this.frog.on('jumpEnd', function(data) {
                var result = data.detail.result;
                if (result > 0) {
                    // 加分
                    this.currentScore.setText(this.calcScore());
                    // 更新场景值
                    this.updateScene();
                } else if (result < 0) {
                    // 游戏结束
                    this.gameOver();
                }
            }.bind(this));
        },

        initCurrentScore: function() {
            //当前分数
            this.currentScore = new Hilo.BitmapText({
                id: 'score',
                glyphs: this.asset.numberGlyphs,
                textAlign: 'center'
            }).addTo(this.stage);

            //设置当前分数的位置
            this.currentScore.x = this.width - this.currentScore.width >> 1;
            this.currentScore.y = 180;
        },

        calcScore: function() {
            this.score = this.score + 1;
            return this.score;
        },

        gameReady: function() {
            this.state = 'ready';
            this.frog.getReady();

            this.currentScore.visible = true;
            this.currentScore.setText(this.score);

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
            //显示结束场景
            // this.gameOverScene.show(this.calcScore(), this.saveBestScore());
        },

        handleTouchStart: function(e) {
            // var index = this.step % this.numOffscreenPillars;
            // var pillars = this.pillars.children;
            // var distance = pillars[index + 1].x - pillars[index].x
            // this.step = this.step + 1;
            // this.bg.startMove(distance);
            // this.pillars.startMove(distance);
            this.touchTime = e.timeStamp;
            this.frog.readyJump();
            // this.frog.jump();
        },

        handleTouchEnd: function(e) {
            var touchDuration = e.timeStamp - this.touchTime;
            this.distance = touchDuration * 0.5;
            this.frog.jump(this.distance);

            var result = this.pillars.hitTest(this.frog.x + this.distance, 100);
            // 更新青蛙最后掉落的y坐标为掉下河
            this.frog.upDateFloorY(result);
        },

        // 更新整个游戏场景，还原到青蛙站在屏幕中的第一根柱子
        updateScene: function() {
            var updateDistance = this.pillars.children[1].x - this.pillars.children[0].x;
            this.bg.startMove(updateDistance);
            this.pillars.startMove(updateDistance);
            this.frog.startMove(updateDistance);
        }

    };

})();