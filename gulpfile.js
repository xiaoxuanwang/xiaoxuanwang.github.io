var gulp = require('gulp'),
		sass = require('gulp-ruby-sass'),
		notify = require("gulp-notify"),
		bower = require('gulp-bower'),
		autoprefixer = require('gulp-autoprefixer'),
		minifycss = require('gulp-minify-css'),
		rename = require('gulp-rename');


var config = {
	sassPath: './resources/sass',
	bowerDir: './bower_components'
}

gulp.task('bower', function() {
	return bower()
		.pipe(gulp.dest(config.bowerDir));
});

gulp.task('style', function() {
	return gulp.src(config.sassPath + '/style.scss')
		.pipe(sass({
		style: 'expanded',
		loadPath: [
			'./resources/sass',
			config.bowerDir + '/bootstrap-sass/assets/stylesheets',
		]})
		.on("error", notify.onError(function (error) {
			return "Error: " + error.message;
		})))
		.pipe(gulp.dest('./public/css'))
		.pipe(rename({suffix: '.min'}))
		.pipe(minifycss())
		.pipe(gulp.dest('./public/css'));
});


// Rerun the task when a file changes

gulp.task('watch', function() {
	gulp.watch(config.sassPath + '/**/*.scss', ['style']);
});

gulp.task('default', ['bower', 'style']);
