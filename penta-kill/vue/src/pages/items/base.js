export default {
    props: ['title', 'imageList', 'id'],

    methods: {
        skip(e) {
            this.$router.push({
                path: '/detail/' + 123456
            })
            console.log('clicking', e);
        }
    }
}