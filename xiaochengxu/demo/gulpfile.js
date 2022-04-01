const {watch, src, dest, parallel} = require('gulp');
const less = require('gulp-less');
const rename = require('gulp-rename');
const distPath = _dirname + '/dist';
const through2 = require('through2');

const copyFiles = () => {
    return src(
        ['src/**/**.js',
        'src/**/**.wxml',
        'src/**/**.json',
        'src/**/**.wxss']
    )
    .pipe(dest(distPath))
};

// 流式处理，本质是对小程序进行改造
const copyLess = () => {
    return src('src/**/**.less')
        .pipe(less)
        .pipe(rename(file => {
            file.extname = '.wxss'
        }))
        .pipe(through2.obj(function(file, _, cb) {
            if(file.isBuffer()) {
                const code = uglify.minify(file.content.toString())
                file.contents = Buffer.from(code.replace(/(\d+)px/g, function(allCode, number) {
                    return (+number)/2 + 'rpx';
                }));
            }
            cb(null, file);
        }))
        .pipe(dest(distPath));
};



module.exports.default = () =>  {
    watch('src/**/**', parallel(copyFiles, copyLess))
}
