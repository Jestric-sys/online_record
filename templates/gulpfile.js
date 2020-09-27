const {src, dest, series, watch} = require('gulp')
const sass = require('gulp-sass')
const include = require('gulp-file-include')
const csso = require('gulp-csso')
const del = require('del')
const htmlmin = require('gulp-htmlmin')
const autoPrefixer = require('gulp-autoprefixer')
const sync = require('browser-sync').create()
const concat = require('gulp-concat')
const image = require('gulp-image')


function html() {
   return src('src/**.html')
      .pipe(include({
         prefix: '@@',
      }))
      .pipe(dest('dist'))
      
}

function scss() {
   return src('src/scss/**.scss')
      .pipe(sass())
      .pipe(autoPrefixer({
         cascade: false
      }))
      .pipe(csso())
      .pipe(concat('enter.css'))
      .pipe(dest('dist'))
}
 
function img() {
   return src('src/img/*')
      .pipe(image({
         pngquant: true,
         optipng: false,
         zopflipng: true,
         jpegRecompress: false,
         mozjpeg: true,
         gifsicle: true,
         svgo: true,
         concurrent: 10,
         quiet: true
      }))
      .pipe(dest('dist/img'))
}

function clear() {
   return del('dist')
}

function serve() {
   sync.init({
      server: './dist'
   })
   watch('src/**.html', series(html)).on('change', sync.reload)
   watch('src/scss/**.scss', series(scss)).on('change', sync.reload)

}

exports.build = series(clear, scss, html, img)
exports.serve = series(clear, html, scss, img, serve)
exports.clear = clear

