(function() {
    //  1
    function prepare() {

        const imgTask = (img, src) =>  {
            return new Promise(function(resolve, reject) {
                img.onload = resolve;
                img.onerror = reject;
                img.src = src;
            });
        }

        const context = document.getElementById('content').getContext('2d');
        const heroImg = new Image();
        const allSpriteImg = new Image();
        
        const allresourceTask = Promise.all([
            imgTask(heroImg, './hero.png'),
            imgTask(allSpriteImg, './all.jpg'),
        ]);
        let loaded = false;

        return {
            // 标准的jsDoc
            /**
             * @params {Function} [callback] - 当准备好了后要调用的回调函数
             *
            */
            getResource(callback) {

                allresourceTask.then(function() {
                    callback && callback(context, heroImg);
                })
                // if (loaded) {
                //     callback && callback(context, heroImg);
                //     return;
                // }
                // heroImg.onload = function() {
                //     callback && callback(context, heroImg);
                //     loaded = true;
                // }
                // // 当这块的数据是从服务器来的，接下来利用闭包去做缓存
                // heroImg.src = './hero.png';
            }
        }
    }
    //  2
    function drawHero(context, heroImg, allSpriteImg, {initX, initY}) {

        function draw() {
            this.context
                .drawImage(
                    this.heroImg,
                    this.imgPos.x,
                    this.imgPos.y,
                    this.imgPos.width,
                    this.imgPos.height,
                    this.rect.x,
                    this.rect.y,
                    this.rect.width,
                    this.rect.height
                )
        }

        // 如果只有一个, 可以做单例
        var hero = {
            img: heroImg,
            context: context,
            imgPos: {
                x: 0,
                y: 0,
                width: 32,
                height: 32
            },
            rect: {
                x: 0,
                y: 0,
                width: 32,
                height: 32
            },

            draw: draw
        }

        // 一个方法里面返回了个新对象
        // 魔王这块再拆解，红衣魔王，黑衣魔王，如何不通过入参区分开，这里要说到继承
        function Monster(initPos) {
            this.img= allSpriteImg,
            this.context= context,
            this.imgPos= {
                x: initPos.x,
                y: initPos.y,
                width: 30,
                height: 30
            },
            this.rect= {
                x: 0,
                y: 0,
                width: 40,
                height: 40
            }
        }
        Monster.prototyp.draw = draw;

        function RedMonster(initPos) {
            Monster.call(this, initPos)
            // 红魔王集体放大（这里有个重写）
            this.imgPos= {
                x: initPos.x,
                y: initPos.y,
                width: 40,
                height: 40
            }
        }
        RedMonster.prototype = Object.create(Monster.prototype);

        var monster = new Monster({x:2, y:3});
        var monster2 = new RedMonster({x:2, y:3});
        var monster3 = new Monster({x:2, y:3});

        hero.draw();
        monster.draw();
        monster2.draw();
        monster3.draw();
    }

    // 两个函数联合使用
    var resourceManager = prepare();
    // 传的 callback 
    resourceManager.getResource(function (context, heroImg) {
        drawHero(context, heroImg, allSpriteImg, {initY: 0, initX: 0});
    });

    document.getElementById('create').addEventListener('click', function() {
        resourceManager.getResource(function (context, heroImg) {
            drawHero(context, heroImg, allSpriteImg, {initY: Math.random() * 100, initX: Math.random() * 100});
        });
    });
})();