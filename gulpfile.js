// Requis
const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const browserSync = require('browser-sync').create();

// Include plugins
const plugins = require('gulp-load-plugins')(); // tous les plugins de package.json

// constiables de chemins
const source = './app/dist'; // dossier de travail
const destination = './public'; // dossier à livrer


// Tâche "build" = LESS + autoprefixer + CSScomb + beautify (source -> destination)
gulp.task('sass', function () {
    return gulp.src(source + '/sass/main.scss')
        .pipe(plugins.sass())
        .pipe(plugins.autoprefixer())
        .pipe(gulp.dest(destination + '/css/'));
});

// Tâche "minify" = minification CSS (destination -> destination)
gulp.task('minify', function () {
    return gulp.src(destination + '/css/*.css')
        .pipe(plugins.csso())
        .pipe(plugins.rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(destination + '/css/'));
});

// Static Server + watching scss/html files
gulp.task('server', ['sass'], function () {

    browserSync.init({
        proxy: {
            target: "localhost:3800",
            ws: true
        },
    });
    nodemon({
        // the script to run the app
        script: './app.js',
        // this listens to changes in any of these files/routes and restarts the application
        watch: ["src/*.js", 'src/**/*.js'],
        env: {
            "COOKIE_SECRET": "secret",
            "DATABASE":"forum",
            "DB_USER":"root",
            "DB_PASSWORD":"",
            "DB_HOST":"localhost",
            "DB_DIALECT":"mysql",
            "SRV_PORT":3800
        },
    }).on('restart', (r) => {
        browserSync.reload();
    });

    gulp.watch([source + "/sass/*.scss", source + "/sass/**/*.scss"], ['sass']).on('change', browserSync.reload);
    gulp.watch(["views/**/*.pug","views/*.pug"]).on('change', browserSync.reload);
});

// Tâche "prod" = Build + minify
gulp.task('prod', ['build', 'minify']);