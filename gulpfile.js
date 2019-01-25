var gulp = require('gulp'),
	fileinclude = require('gulp-file-include'),
	concat = require('gulp-concat'),
	autoprefixer = require('gulp-autoprefixer'),
	sass = require('gulp-sass'),
	imagemin = require('gulp-imagemin'),
	rename = require('gulp-rename'),
	cache = require('gulp-cache'),
	del = require('del'),
	uglify = require('gulp-uglify'),
	cleanCSS = require('gulp-clean-css'),
	browserSync = require('browser-sync'),
	notify = require("gulp-notify");

// settings

gulp.task('browser-sync', function () {
	browserSync({
		server: {
			baseDir: 'src',
		},
		port: 3000,
		notify: false,
	});
});

//develop

gulp.task('html:dev', function () {
	gulp.src('src/pages/*.html')
		.pipe(fileinclude({
			prefix: '@@',
			basepath: '@file'
		}))
		.pipe(gulp.dest('src/'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task('js', function () {
	return gulp.src([
			'src/static/js/common.js',
		])
		.pipe(concat('common.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('src/assets/js'));
});

gulp.task('js:dev', ['js'], function () {
	return gulp.src([
			'src/assets/libs/jquery/dist/jquery.min.js',
			'src/assets/libs/swiper/dist/js/swiper.min.js',
			'src/assets/libs/fancybox/dist/jquery.fancybox.min.js',
			'src/assets/js/common.min.js',
		])
		.pipe(concat('scripts.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('src/assets/js'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task('sass:dev', function () {
	return gulp.src('src/static/scss/**/*.scss')
		.pipe(sass({
			outputStyle: 'expand'
		}).on("error", notify.onError()))
		.pipe(rename({
			suffix: '.min',
			prefix: ''
		}))
		.pipe(autoprefixer(['last 15 versions']))
		.pipe(cleanCSS())
		.pipe(gulp.dest('src/assets/css'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task('watch', ['sass:dev', 'js:dev', 'html:dev', 'browser-sync'], function () {
	gulp.watch(['src/static/scss/**/*.scss', 'src/modules/**/*.scss'], ['sass:dev']);
	gulp.watch(['assets/libs/**/*.js', 'src/static/js/common.js'], ['js:dev']);
	gulp.watch(['src/modules/**/*.html', 'src/pages/*.html'], ['html:dev']);
});

gulp.task('removedist', function () {
	return del.sync('dist');
});
gulp.task('clearcache', function () {
	return cache.clearAll();
});

gulp.task('default', ['watch']);