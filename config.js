import pkg from './package.json';
import dotenv from 'dotenv';

dotenv.load({ silent: true });

const base = {
    src: './src',
    dist: './dist',
    docs: './tasks/docs'
};

module.exports = {

    browsersync: {
        server: {
            baseDir: base.dist
        },
        open: false,
        ui: false,
        notify: false
    },

    clean: {
        dist: {
            base: base.dist
        }
    },

    serviceWorker: {
        src: {
            serviceWorker: `${base.src}/serviceWorker.js`
        },
        dist: {
            serviceWorker: `${base.dist}`
        }
    },

    css: {
        autoprefixer: {
            browsers: ['last 1 version', '> 5%']
        },
        src: {
            static: `${base.src}/static/scss/**/!(_)*.scss`,
            staticAll: `${base.src}/static/scss/**/*.scss`,
            components: `${base.src}/components/**/*.scss`,
            vendor: `${base.src}/static/scss/vendor/**/*.scss`
        },
        dist: {
            base: `${base.dist}/static/css`
        }
    },

    docs: {
        src: {
            index: `${base.docs}/index.html`,
            indexDir: base.docs,
            layoutDir: `${base.docs}/layout`,
            templates: `${base.src}/templates`,
            templatesAll: `${base.src}/templates/**/**.html`,
            statics: `${base.docs}/static/**`,
            component: `${base.docs}/component-detail.html`,
            preview: `${base.docs}/component-preview.html`,
            components: `${base.src}/components`,
            componentsAll: `${base.src}/components/**/*.yml`
        },
        dist: {
            base: base.dist,
            index: `${base.dist}/index.html`,
            static: `${base.dist}/docs/static/`,
            components: `${base.dist}/docs/components/`
        }
    },

    fonts: {
        src: {
            fonts: `${base.src}/static/fonts/**/*`
        },
        dist: {
            fonts: `${base.dist}/static/fonts`
        }
    },

    githooks: {
        src: {
            all: './tasks/githooks/*'
        },
        dist: {
            base: './.git/hooks',
            all: './.git/hooks/*'
        }
    },

    html: {
        src: {
            templates: `${base.src}/templates/**/*.html`,
            templatesDir: `${base.src}/templates`,
            layout: `${base.src}/layout/*.html`,
            layoutDir: `${base.src}/layout`,
            components: `${base.src}/components/**/*.html`,
            componentsDir: `${base.src}/components`
        },
        dist: {
            base: `${base.dist}/templates`
        },
        baseUri: '/'
    },

    img: {
        src: {
            all: `${base.src}/static/img/**/*.{svg,png,jpg,gif,webp}`
        },
        dist: {
            base: `${base.dist}/static/img`
        }
    },

    js: {
        src: {
            all: `${base.src}/static/js/**/*.js`,
            bundles: `${base.src}/static/js/*.js`,
            components: `${base.src}/components/**/!(*.Spec).js`,
            vendor: `${base.src}/static/js/vendor`,
            tests: `${base.src}/components/**/*.Spec.js`
        },
        dist: {
            base: `${base.dist}/static/js`,
            babelHelpers: `${base.dist}/static/js/babel-helpers.js`
        },
        browserify: {
            paths: [`${base.src}/static/js/`, `${base.src}/components/`],
            debug: true,
            // Keep in config, we concat 'watchify' when running 'gulp dev'
            plugin: ['errorify'],
            transform: ['babelify', 'require-globify']
        },
        eslintAutofix: false
    },

    upload: {
        src: {
            all: `${base.dist}/**`
        },
        dist: {
            target: '/test',
            base: base.dist
        },
        options: {
            // Defined in .env file
            host: process.env.UPLOAD_HOST,
            user: process.env.UPLOAD_USER,
            password: process.env.UPLOAD_PASSWORD
        }
    },

    zip: {
        filename: `${pkg.name}.zip`,
        src: {
            all: `${base.dist}/**/!(*.zip)`
        },
        dist: {
            base: base.dist
        }
    }

};
