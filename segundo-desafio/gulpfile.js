var gulp            = require('gulp'),
browserSync     = require('browser-sync'),
reload          = browserSync.reload,
sourcemaps		= require('gulp-sourcemaps'),
sass 			= require('gulp-sass'),
notify			= require('gulp-notify'),
del 			= require('del'),
rename 			= require('gulp-rename'),
cssmin 			= require('gulp-cssmin'),
runSequence 	= require('run-sequence'),
uglify			= require('gulp-uglify');


// Move images to distribution folder
gulp.task('img', function() {
	gulp.src('src/img/**/*')
	.pipe(gulp.dest('dist/img'));
});


// Move partials files to ditribution folder
gulp.task('partials', function() {
	return gulp.src('src/partials/**/*.html')
	.pipe(gulp.dest('dist/partials'));
})

// Move html files to ditribution folder
gulp.task('html', ['partials'], function() {
	return gulp.src('src/index.html')
	.pipe(gulp.dest('dist'));
});

// Move js files to distibution folder
gulp.task('js', function() {
	return gulp.src('src/js/**/*.js')
	.pipe(uglify())
	.pipe(gulp.dest('dist/js'));
});

// Move js files to distibution folder
gulp.task('bower', function() {
	return gulp.src('src/bower_components/**/*')
	.pipe(gulp.dest('dist/bower_components'));
});

// Compile and move sass files to styles folder
gulp.task('sass', function() {
	return gulp.src('src/sass/style.scss')
	.pipe(sourcemaps.init())
	.pipe(sass({
		style: 'expanded'
	}))
	.on('error', notify.onError({
		title: 'SASS Failed',
		message: sass.logError
	}))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('src/css'))
	.pipe(reload({
		stream: true
	}))
	.pipe(notify({
		message: 'Styles task complete'
	}));
});

// Minify and move css files to distribution folder
gulp.task('css', function () {
	gulp.src('src/css/**/*.css')
	.pipe(sourcemaps.init())
	.pipe(cssmin())
	// .pipe(rename({suffix: '.min'}))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('dist/css'));
});

// init browser-ync
gulp.task('browser-sync', ['sass'], function() {
	return browserSync({
		server: {
			baseDir: 'src/'
		}
	});
});


// init browser-ync on build
gulp.task('bs-build', ['sass'], function() {
	return browserSync({
		server: {
			baseDir: 'dist/'
		}
	});
});


// build distribution 
gulp.task('build', ['clean'], function(){
	runSequence('img', 'html', 'bower', 'css', 'js');
});

// clean distribution folder
gulp.task('clean', function() {
	return del('dist');
});

// Reload page
gulp.task('bs-reload', function() {
	browserSync.reload();
});

// Build and reload page
gulp.task('bs-reload-build', function() {
	runSequence('build', 'bs-reload');
});

// start browserSync on dist folder and watch html, imagens, js and scss files
gulp.task('serve:build',['build', 'bs-build']);

// start browserSync on src folder and watch html, imagens, js and scss files
gulp.task('default',['browser-sync'], function() {
	gulp.watch(['src/index.html', 'src/partials/**/*.html'], ['bs-reload']);
	gulp.watch(['src/img/**/*'], ['bs-reload']);
	gulp.watch(['src/sass/**/*.scss'], ['sass']);
	gulp.watch(['src/js/**/*.js'], ['bs-reload']);
});
