
let { src, dest, watch, pipe, series, parallel } = require("gulp");

/* (1) 命令行安装 */
/* $ npm install gulp-htmlmin --save-dev */

/* (2) 引入插件 */
let htmlmin = require("gulp-htmlmin")

/* (3) 使用插件 */
let htmlminTask = () => {
    var options = {
        removeComments: true, //清除HTML注释
        collapseWhitespace: true, //压缩HTML
        collapseBooleanAttributes: false, //省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: false, //删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
        minifyJS: true, //压缩页面JS
        minifyCSS: true //压缩页面CSS
    };

    return src("../client/html/*.html").pipe(htmlmin(options)).pipe(dest("./build/html"));
}
exports.htmlminTask = htmlminTask;



let cssmin = require("gulp-cssmin")

/* (3) 定制任务*/
let cssminTask = () => {
    return src("../client/css/*.css").pipe(cssmin()).pipe(dest("./build/css"));
}
exports.cssminTask = cssminTask;


/* 把js文件合并、压缩、重命名 */
/* (1) 安装模块 */
/* $ npm install gulp-concat gulp-rename gulp-uglify --save-dev */
/* (2) 加载模块 */
let uglify = require("gulp-uglify");
let plumber=require("gulp-plumber")
/* (3) 指定任务 */
let task = () => {
    return src("../client/js/*.js").pipe(plumber()).pipe(uglify()).pipe(dest("./build//js"))
}

exports.task = task;

exports.taskAll = series(htmlminTask, cssminTask, task);