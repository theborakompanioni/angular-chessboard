module.exports = function (grunt) {
    'use strict';

    var initConfig;

    // Loading external tasks
    require('load-grunt-tasks')(grunt);

    // Project configuration.
    initConfig = {
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            all: [
                'Gruntfile.js',
                'src/**/*.js'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: 'src',
                    dest: 'dist',
                    src: [
                        '**/*.js',
                        '**/*.css',
                        '**/*.png'
                    ]
                }]
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'dist/css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'dist/css',
                    ext: '.min.css'
                }]
            }
        },
        uglify: {
            dist: {
                files: {
                    'dist/js/chessboard.min.js': [
                        'dist/js/chessboard.js'
                    ]
                }
            }
        }
    };

    // Register tasks
    grunt.registerTask('default', ['dist']);
    grunt.registerTask('lint', ['jshint']);
    grunt.registerTask('dist', ['copy', 'uglify', 'cssmin']);

    grunt.initConfig(initConfig);
};
