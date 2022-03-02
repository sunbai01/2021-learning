<!-- 需求：跳到某一个页面的时候，判断登没登录 -->

如果不用router会怎么实现？

每个页面都：
extends: {
    <!-- 基类 -->
    created() {
        if(/uid/.test(document.cookie)) {
            this.$router.push('./login');
        }
    }
}

------------------------------------------------
<!-- vue源码实现 -->

<!--1、 劫持一个对象的属性， e.g -->
<!-- 创建了一个对象 -->
var obj = { };
Object.defineProperty(obj, 'name', {
    <!-- 修改对象的值 -->
    set(newnName) {
        console.log('tovalue', newnName);
        this._name = newName;
    },
    <!-- 获取对象的值 -->
    get() {
        console.log(this._name);
        return 'sunbai';
    }
})