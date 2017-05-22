// Generated on 2015-09-15 using generator-angular 0.12.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Automatically load required Grunt tasks
  require('jit-grunt')(grunt, {
    ngconstant : 'grunt-ng-constant',
    useminPrepare: 'grunt-usemin',
    removelogging : 'grunt-remove-logging',
    ngtemplates: 'grunt-angular-templates',
    cdnify: 'grunt-google-cdn'
  });

  // Configurable paths for the application
  var appConfig = {
    app: require('./bower.json').appPath || 'app',
    dist: 'dist'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    yeoman: appConfig,

    ngconstant: {
      options: {
        name: 'config',
        dest: '<%= yeoman.app %>/scripts/config.js',
        wrap: '"use strict";\n\n {%= __ngModule %}',
        constants: {
          // constants for DEV and PROD
          package: grunt.file.readJSON('package.json')
        }
      },
      // Environment targets
      development: {
        constants: {
          ENV: {
            name       : 'development',
            // serviceKey : "RAYJXZBFVCAZTVCDHHPN",
            serviceKey : "uhWrWpUhyZQy8rPfiC7X",
            endpoints  : {
              australia             : "https://service.route360.net/australia/",
              norway                : "https://service.route360.net/norway/",
              france                : "https://service.route360.net/france_belgium/",
              britishcolumbia       : "https://service.route360.net/britishcolumbia/",
              // denmark               : "https://service.route360.net/denmark/",
              denmark               : "https://api1.eu.route360.net:8086/",
              britishisles          : "https://service.route360.net/britishisles/",
              switzerland           : "https://service.route360.net/switzerland/",
              austria               : "https://service.route360.net/austria/",
              germany               : "https://dev.route360.net/xxx/",
              // germany               : "http://localhost:8080/",
              newyork               : "https://service.route360.net/na_northeast/",
              italy                 : "https://service.route360.net/italy/",
              spain                 : "https://service.route360.net/iberia/",
              spain                 : "https://dev.route360.net/xxx/",
              portugal              : "https://service.route360.net/iberia/",
              czech_republic        : "https://service.route360.net/czech_republic/",
              south_america         : "https://service.route360.net/south_america/",
              sweden                : "https://service.route360.net/sweden/",
              malaysia_singapore    : "https://service.route360.net/malaysia_singapore/",
              quebec                : "https://service.route360.net/quebec/",

              geocoder        : "https://service.route360.net/geocode/"
            },
            poiQueries : [{
                "name"  : "Banks",
                "query" : "(\n" +
                          "  way[\"amenity\"=\"bank\"]\n" +
                          "     (52.338,13.088,52.675,13.761);\n" +
                          "  node[\"amenity\"=\"bank\"]\n"+
                          "      (52.338,13.088346,52.675,13.761);\n" +
                          ");"
            },{
                "name"  : "McDonald\'s",
                "query" : "(\n" +
                          "  way[\"name\"=\"McDonald's\"]\n" +
                          "     (52.338,13.088,52.675,13.761);\n" +
                          "  node[\"name\"=\"McDonald's\"]\n"+
                          "      (52.338,13.088346,52.675,13.761);\n" +
                          ");"
            },{
                "name"  : "Museums",
                "query" : "(\n" +
                          "  way[\"tourism\"=\"museum\"]\n" +
                          "     (52.338,13.088,52.675,13.761);\n" +
                          // "  >;\n" +
                          "  node[\"tourism\"=\"museum\"]\n"+
                          "      (52.338,13.088346,52.675,13.761);\n" +
                          ");"
            },{
                "name"  : "Gas stations",
                "query" : "(\n" +
                          "  way[\"amenity\"=\"fuel\"]\n" +
                          "     (52.338,13.088,52.675,13.761);\n" +
                          // "  >;\n" +
                          "  node[\"amenity\"=\"fuel\"]\n"+
                          "      (52.338,13.088346,52.675,13.761);\n" +
                          ");"
            },{
                "name"  : "Public toilets",
                "query" : "(\n" +
                          "  way[\"amenity\"=\"toilets\"]\n" +
                          "     (52.338,13.088,52.675,13.761);\n" +
                          // "  >;\n" +
                          "  node[\"amenity\"=\"toilets\"]\n"+
                          "      (52.338,13.088346,52.675,13.761);\n" +
                          ");"
            }]
          }
        }
      },
      production: {
        constants: {
          ENV: {
            name       : 'production',
            serviceKey : "OOWOFUK3OPHLQTA8H5JD",
            endpoints  : {
                germany               : "https://service.route360.net/germany/",
                australia             : "https://service.route360.net/australia/",
                norway                : "https://service.route360.net/norway/",
                france                : "https://service.route360.net/france_belgium/",
                britishcolumbia       : "https://service.route360.net/britishcolumbia/",
                denmark               : "https://service.route360.net/denmark/",
                britishisles          : "https://service.route360.net/britishisles/",
                switzerland           : "https://service.route360.net/switzerland/",
                austria               : "https://service.route360.net/austria/",
                newyork               : "https://service.route360.net/na_northeast/",
                italy                 : "https://service.route360.net/italy/",
                spain                 : "https://service.route360.net/iberia/",
                portugal              : "https://service.route360.net/iberia/",
                czech_republic        : "https://service.route360.net/czech_republic/",
                south_america         : "https://service.route360.net/south_america/",
                sweden                : "https://service.route360.net/sweden/",
                malaysia_singapore    : "https://service.route360.net/malaysia_singapore/",
                quebec                : "https://service.route360.net/quebec/",

              geocoder        : "https://service.route360.net/geocode/"
            }
          }
        }
      }
    },

    removelogging: {
      dist: {
        src: "<%= yeoman.dist %>/**/*.js" // Each file will be overwritten with the output!
      }
    },

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      js: {
        files: ['<%= yeoman.app %>/scripts/{,*/}*.js'],
        tasks: ['newer:jshint:all'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      jsTest: {
        files: ['test/spec/{,*/}*.js'],
        tasks: ['newer:jshint:test', 'karma']
      },
      compass: {
        files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['compass:server', 'autoprefixer:server']
      },
      gruntfile: {
        files: ['Gruntfile.js'],
        tasks: ['ngconstant:development']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= yeoman.app %>/{,*/}*.html',
          '.tmp/styles/{,*/}*.css',
          '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: '0.0.0.0', // for smartphone testing
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect().use(
                '/app/styles',
                connect.static('./app/styles')
              ),
              connect.static(appConfig.app)
            ];
          }
        }
      },
      test: {
        options: {
          port: 9001,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect.static('test'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect.static(appConfig.app)
            ];
          }
        }
      },
      dist: {
        options: {
          open: true,
          base: '<%= yeoman.dist %>'
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= yeoman.app %>/scripts/{,*/}*.js'
        ]
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/spec/{,*/}*.js']
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/{,*/}*',
            '!<%= yeoman.dist %>/.git{,*/}*'
          ]
        }]
      },
      server: '.tmp'
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      server: {
        options: {
          map: true,
        },
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    // Automatically inject Bower components into the app
    wiredep: {
      app: {
        src: ['<%= yeoman.app %>/index.html'],
        ignorePath:  /\.\.\//
      },
      test: {
        devDependencies: true,
        src: '<%= karma.unit.configFile %>',
        ignorePath:  /\.\.\//,
        fileTypes:{
          js: {
            block: /(([\s\t]*)\/{2}\s*?bower:\s*?(\S*))(\n|\r|.)*?(\/{2}\s*endbower)/gi,
              detect: {
                js: /'(.*\.js)'/gi
              },
              replace: {
                js: '\'{{filePath}}\','
              }
            }
          }
      },
      sass: {
        src: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
        ignorePath: /(\.\.\/){1,2}bower_components\//
      }
    },

    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
      options: {
        sassDir: '<%= yeoman.app %>/styles',
        cssDir: '.tmp/styles',
        generatedImagesDir: '.tmp/images/generated',
        imagesDir: '<%= yeoman.app %>/images',
        javascriptsDir: '<%= yeoman.app %>/scripts',
        fontsDir: '<%= yeoman.app %>/styles/fonts',
        importPath: './bower_components',
        httpImagesPath: '/images',
        httpGeneratedImagesPath: '/images/generated',
        httpFontsPath: '/styles/fonts',
        relativeAssets: false,
        assetCacheBuster: false,
        raw: 'Sass::Script::Number.precision = 10\n'
      },
      dist: {
        options: {
          generatedImagesDir: '<%= yeoman.dist %>/images/generated'
        }
      },
      server: {
        options: {
          sourcemap: true
        }
      }
    },

    // Renames files for browser caching purposes
    filerev: {
      dist: {
        src: [
          '<%= yeoman.dist %>/scripts/{,*/}*.js',
          '<%= yeoman.dist %>/styles/{,*/}*.css',
        //   '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          '<%= yeoman.dist %>/styles/fonts/*'
        ]
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '<%= yeoman.app %>/index.html',
      options: {
        dest: '<%= yeoman.dist %>',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    // Performs rewrites based on filerev and the useminPrepare configuration
    usemin: {
      html: ['<%= yeoman.dist %>/{,*/}*.html'],
      css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
      js: ['<%= yeoman.dist %>/scripts/{,*/}*.js'],
      options: {
        assetsDirs: [
          '<%= yeoman.dist %>',
          '<%= yeoman.dist %>/images',
          '<%= yeoman.dist %>/styles'
        ],
        patterns: {
          js: [[/(images\/[^''""]*\.(png|jpg|jpeg|gif|webp|svg))/g, 'Replacing references to images']]
        }
      }
    },

    // The following *-min tasks will produce minified files in the dist folder
    // By default, your `index.html`'s <!-- Usemin block --> will take care of
    // minification. These next options are pre-configured if you do not wish
    // to use the Usemin blocks.
    // cssmin: {
    //   dist: {
    //     files: {
    //       '<%= yeoman.dist %>/styles/main.css': [
    //         '.tmp/styles/{,*/}*.css'
    //       ]
    //     }
    //   }
    // },
    // uglify: {
    //   dist: {
    //     files: {
    //       '<%= yeoman.dist %>/scripts/scripts.js': [
    //         '<%= yeoman.dist %>/scripts/scripts.js'
    //       ]
    //     }
    //   }
    // },
    // concat: {
    //   dist: {}
    // },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },

    svgmin: {
      options: {
          full: true,
          plugins: [
            {cleanupIDs: false},                  // don't remove  ids
            {removeViewBox: false},               // don't remove the viewbox atribute from the SVG
            {removeUselessStrokeAndFill: false},  // don't remove Useless Strokes and Fills
            {removeEmptyAttrs: false}             // don't remove Empty Attributes from the SVG
          ]
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: ['*.html'],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },

    ngtemplates: {
      dist: {
        options: {
          module: 'r360DemoApp',
          htmlmin: '<%= htmlmin.dist.options %>',
          usemin: 'scripts/scripts.js'
        },
        cwd: '<%= yeoman.app %>',
        src: 'views/{,*/}*.html',
        dest: '.tmp/templateCache.js'
      }
    },

    // ng-annotate tries to make the code safe for minification automatically
    // by using the Angular long form for dependency injection.
    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/scripts',
          src: '*.js',
          dest: '.tmp/concat/scripts'
        }]
      }
    },

    // Replace Google CDN references
    cdnify: {
      dist: {
        html: ['<%= yeoman.dist %>/*.html']
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            '*.html',
            'images/{,*/}*.{webp}',
            'styles/fonts/{,*/}*.*'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= yeoman.dist %>/images',
          src: ['generated/*']
        }, {
          expand: true,
          cwd: '.',
          src: 'bower_components/bootstrap-sass-official/assets/fonts/bootstrap/*',
          dest: '<%= yeoman.dist %>'
        }]
      },
      styles: {
        expand: true,
        cwd: '<%= yeoman.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
        'compass:server'
      ],
      test: [
        'compass'
      ],
      dist: [
        'compass:dist',
        'imagemin',
        'svgmin'
      ]
    },

    // Test settings
    karma: {
      unit: {
        configFile: 'test/karma.conf.js',
        singleRun: true
      }
    },

    keycdn: {
      purgeURL: {
        options: {
          apiKey: 'sk_prod_NTQ3NmZkYmU0NGE3MzM4YzZj',
          zoneId: '18060',
          method: 'del'
        },
        files: [{
            expand : true,
            src: 'dist/**',
            filter: 'isFile',
            rename: function(dest, src) {

                var contextPath = 'demo';
                var kcdnFileName = "apps-2248.kxcdn.com/" + contextPath + "/" + src.replace("dist/", "");

                return kcdnFileName;
            }
        }],
      },
    },

    'ftp-deploy': {
      build: {
        auth: {
          host: '78.46.156.197',
          port: 21,
          authKey: 'webspace'
        },
        src: 'dist',
        dest: 'public_html/project/demo',
        exclusions: ['**/.DS_Store', '**/Thumbs.db', 'dist/tmp'],
        forceVerbose : true
      }
    },
  });

  grunt.loadNpmTasks('grunt-ftp-deploy');

  grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'ngconstant:development',
      'wiredep',
      'concurrent:server',
      'autoprefixer:server',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve:' + target]);
  });

  grunt.registerTask('test', [
    'clean:server',
    'wiredep',
    'concurrent:test',
    'autoprefixer',
    'connect:test',
    'karma'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'ngconstant:production',
    'wiredep',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'ngtemplates',
    'concat',
    'ngAnnotate',
    'copy:dist',
    'removelogging:dist',
    'cdnify',
    'cssmin',
    'uglify',
    'filerev',
    'usemin',
    'htmlmin'
  ]);

  grunt.registerTask('deploy', [
    'ftp-deploy',
    'keycdn'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);
};
