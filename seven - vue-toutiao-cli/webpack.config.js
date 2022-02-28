module.exports =  {
    entry: __dirname + 'src/index.js',
    output:  {
        path: __dirname + 'dist',
        filename: 'index.js'
    },
    publicPath: '这里一般会写自己的cdn地址',
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                // .js
            },
            {
                // vue-style-loader
            }
        ]
    }
};
