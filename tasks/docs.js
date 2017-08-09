import config from '../config';
import gulp from 'gulp';
import render from 'gulp-nunjucks-render';
import watch from 'gulp-watch';
import moment from 'moment-timezone';
import runSequence from 'run-sequence';
import transform from 'gulp-transform';
import ext from 'gulp-ext-replace';
import gulpif from 'gulp-if';
import helpers from './util/docHelpers';

/**
 * Sub-task: Docs copy statics
 */
gulp.task('docs-copy-statics', () =>
    gulp.src(config.docs.src.statics)
        .pipe(gulp.dest(config.docs.dist.static))
);

/**
 * Sub-task: Docs render index
 */
gulp.task('docs-render-index', () => {

    // Grab list of templates
    const templates = helpers.getRelativePaths(config.docs.src.templatesAll, config.docs.src.templates);
    const components = helpers.getComponentTree(config.docs.src.componentsAll, config.docs.src.components);

    // Data
    const data = {
        templates: templates.map(template => template.replace(/[\\]/g, '/')),
        components: components,
        lastUpdated: moment().tz('Europe/Amsterdam').format('DD-MM-YYYY HH:mm:ss z'),
        baseUri: config.html.baseUri
    };


    const paths = [
        config.docs.src.indexDir,
        config.docs.src.layoutDir,
        config.html.src.layoutDir,
        config.html.src.componentsDir
    ];

    // Render index template
    return gulp.src(config.docs.src.index)
        .pipe(render({ path: paths, data: data }))
        .pipe(gulp.dest(config.docs.dist.base));
});

/**
 * Task: Docs components
 */
gulp.task('docs-render-components', ['docs-render-component-demos'], () =>

    gulp.src([config.docs.src.componentsAll])
        .pipe(gulpif(helpers.hasContent, transform((content, file) => helpers.renderComponent(content, file))))
        .pipe(ext('.html'))
        .pipe(gulp.dest(config.docs.dist.components))

);

gulp.task('docs-render-component-demos', () =>

    gulp.src([config.docs.src.componentsAll])
        .pipe(gulpif(helpers.hasContent, transform((content, file) => helpers.renderComponentDemo(content, file))))
        .pipe(ext('.demo.html'))
        .pipe(gulp.dest(config.docs.dist.components))

);

/**
 * Task: Docs Compile
 */
gulp.task('docs', cb =>
    runSequence([
        'docs-copy-statics',
        'docs-render-index',
        'docs-render-components',
        'docs-render-component-demos'
    ], cb)
);

/**
 * Task: Docs Watch
 */
gulp.task('docs-watch', cb => {
    const watching = [
        config.docs.src.index,
        config.docs.src.componentsAll,
        config.html.src.templates,
        config.html.src.layout,
        config.html.src.components
    ];
    watch(watching, () => gulp.start(['docs'], cb));
});
