<!-- 学得快 -->

<!-- 答应别人的事不管怎样都要做到 -->

<!-- Vue -->

<!-- 1、mvp模式 -->

<!-- 用户行为修改modal，然后modal作用于view上 -->

function presenter() {
    $.ajax(data)
        .then(data => {
            $('div').html(data);
        })
}

div.onclick = () => {
    presenter();
}

<!-- 2、Vue组件 -->

<!-- 子给父传值，this.$emit('mingzi')  v-on:mingzi="方法名" -->

<!-- 3、vue-router -->

url https://wwww.taobao.com:80/market/1?query=女装
                       host/port/path/params/query

<!-- 嵌套路由 -->
一句话：先访问一个组件，再访问对应的子组件

<!-- 切换地址栏的path的时候会引起页面刷新，1、改hash也可以不引起页面的刷新，从而增加历史纪录，那么怎么通过修改正经path（改路由）的时候达到一样不刷新的效果呢？ -->
<!-- 2、用 -->
window.history.pushState(null, null, '/setting')

<!-- 这种功能有什么用呢，做单页，保证良好的用户体验 -->
<!-- mode有hash也有history（pushState为原理） -->

<!-- e.g -->

function test(){
    console.log('sunbai');
}

Promise.resolve().then(res => {console.log('res')}).then(test());

<!-- res or sunbai first？ -->

<!-- test，可以提出去 -->

<!-- 缺乏基础设施，走流程，搞单测流水线，留buffer时间，git commit的hook自动跑单测 -->

todo：
flow / TypeScript



