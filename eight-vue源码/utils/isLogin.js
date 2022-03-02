// 导航守卫

const router = new vueRouter({ ... });
// 改变走向
router.beforeEach((to, from, next) => {
    console.log('');
    // 容易爆栈
    if (!/uid/.test(document.cookie)
        && to.path !== '/page/login') {
        // 跳转到登录页面
        // router.push
        next('/page/login');
    }
    else {
        next();
    }
});

// 页面进去之后
router.afterEach((to, from)=>{
    alert();
})
