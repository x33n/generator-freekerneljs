module.exports = function (grunt) {
    var path = require('path');

    // Load all grunt tasks
    require('load-grunt-tasks')(grunt);

    // Show elapsed time at the end
    require('time-grunt')(grunt);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        'string-replace': {
            'material-design-iconic-font': {
                files: [{
                    expand: true,
                    cwd: 'bower_components/material-design-iconic-font/scss/',
                    src: '**/*',
                    dest: 'bower_components/material-design-iconic-font/scss/'
                }],
                options: {
                    replacements: [{
                        pattern: '$md-css-prefix: md;',
                        replacement: '$md-css-prefix: mdi;'
                    }]
                }
            },
            tags: {
                files: [{
                    expand: true,
                    cwd: 'dist/debug/',
                    src: [
                        '**/*',
                        '!**/assets/fonts/**',
                        '!**/assets/images/**'
                    ],
                    dest: 'dist/debug/'
                }, {
                    expand: true,
                    cwd: 'dist/',
                    src: [
                        '**/*',
                        '!**/assets/fonts/**',
                        '!**/assets/images/**'
                    ],
                    dest: 'dist/'
                }],
                options: {
                    replacements: [
                        {
                            pattern: 'fkjs_(name)',
                            replacement: '<%= pkg.name %>'
                        },
                        {
                            pattern: 'fkjs_(title)',
                            replacement: '<%= pkg.title %>'
                        },
                        {
                            pattern: 'fkjs_(description)',
                            replacement: '<%= pkg.description %>'
                        },
                        {
                            pattern: 'fkjs_(version)',
                            replacement: '<%= pkg.version %>'
                        }
                    ]
                }
            }
        },
        copy: {
            debug: {
                src: [
                    '**/*',
                    '!**/assets/css/**',
                    '!**/assets/scss/**'
                ],
                expand: true,
                cwd: 'app',
                dest: 'dist/debug'
            }
        },
        wiredep: {
            debug: {
                src: [
					'dist/debug/index.html'
                ],
                options: {

                }
            }
        },
        sass: {
            'material-design-iconic-font': {
                options: {
                    style: 'expanded',
                    noCache: true
                },
                files: [{
                    expand: true,
                    cwd: 'bower_components/material-design-iconic-font/scss',
                    src: ['**/*.scss'],
                    dest: 'bower_components/material-design-iconic-font/css',
                    ext: '.css'
                }]
            },
            debug: {
                options: {
                    style: 'expanded',
                    lineNumbers: true,
                    cacheLocation: 'app/assets/scss/.sass-cache'
                },
                files: [{
                    expand: true,
                    cwd: 'app/assets/scss/',
                    src: ['**/*.scss'],
                    dest: 'app/assets/scss/temp',
                    ext: '.css'
                }]
            },
            dist: {
                options: {
                    style: 'expanded',
                    lineNumbers: true,
                    cacheLocation: 'app/assets/scss/.sass-cache'
                },
                files: [{
                    expand: true,
                    cwd: 'app/assets/scss/',
                    src: ['**/*.scss'],
                    dest: 'app/assets/scss/temp',
                    ext: '.css'
                }]
            }
        },
        concat: {
            'debug-css-first': {
                src: [
                    'app/assets/scss/temp/*.css',
                    'app/assets/css/**/*.css',
                    '!**/app/assets/css/**/custom.css',
                ],
                dest: 'dist/debug/assets/css/app.css',
            },
            'debug-css-last': {
                src: [
                    'dist/debug/assets/css/app.css',
                    'app/assets/css/custom.css'
                ],
                dest: 'dist/debug/assets/css/app.css',
            },
            'dist-css-first': {
                src: [
                    'app/assets/scss/temp/*.css',
                    'app/assets/css/**/*.css',
                    '!**/app/assets/css/**/custom.css',
                ],
                dest: 'dist/assets/css/app.css',
            },
            'dist-css-last': {
                src: [
                    'dist/assets/css/app.css',
                    'app/assets/css/custom.css'
                ],
                dest: 'dist/assets/css/app.css',
            }
        },
        clean: {
            'debug-before': [
                'dist/debug/'
            ],
            'debug-after': [
                'app/assets/scss/temp'
            ],
            'dist-before': [
                'dist/'
            ],
            'disst-after': [
                'app/assets/scss/temp'
            ]
        },
        watch: {
            debug: {
                files: [
                    'app/**/*'
                ],
                tasks: ['debug'],
                options: {
                    // Start a live reload server on the default port 35729
                    livereload: true,
                    spawn: false
                }
            }
        }
    });

    grunt.event.on('watch', function (action, filepath, target) {
        grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
    });

    /**
	 * @description
	 *   Debug task(s).
	 * 
	 */
    grunt.registerTask('debug', [
        'clean:debug-before',
        'copy:debug',
        'wiredep:debug',
        'sass:debug',
        'string-replace:tags',
        'concat:debug-css-first',
        'concat:debug-css-last',
        'clean:debug-after'
    ]);

    /**
	 * @description
	 *   Dist task(s).
	 * 
	 */
    grunt.registerTask('dist', [
        'clean:dist-before',
        //'copy:debug',
        //'wiredep:debug',
        'sass:dist',
        //'string-replace:material-design-iconic-font',
        'string-replace:tags',
        //'sass:material-design-iconic-font',
        'concat:dist-css-first',
        'concat:dist-css-last',
        'clean:debug-after'
    ]);

    /**
	 * @description
	 *   Default task(s).
	 * 
	 */
    grunt.registerTask('default', [
        'string-replace:material-design-iconic-font',
        'sass:material-design-iconic-font',
        'debug'
    ]);
};