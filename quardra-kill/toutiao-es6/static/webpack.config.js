module.exports = {
    // 会帮忙压缩
    mode: 'production',
    entry: __dirname + '/src/index.js',
    output: {
        path: _dirname + '/dist/',
        filename: 'index.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
}