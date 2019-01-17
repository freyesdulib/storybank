'use strict';

// Define the Grunt configuration method
module.exports = function (grunt) {
    // Initialize Grunt configuraiton
    grunt.initConfig({
        // Configure the grunt-env task
        env: {
            test: {
                NODE_ENV: 'test'
            },
            dev: {
                NODE_ENV: 'development'
            }
        },
        concat: {
            options: {
                separator: ' '
            },
            framework: {
                src: ['client/lib/angular/angular.min.js',
                    'client/lib/angular-route/angular-route.min.js',
                    'client/lib/angular-resource/angular-resource.min.js'],
                dest: 'client/dist/framework.min.js'
            },
            stories: {
                src: ['client/stories/stories.client.module.js',
                    'client/stories/controllers/stories.client.controller.js',
                    'client/stories/services/stories.client.service.js',
                    'client/stories/services/tags.client.service.js',
                    'client/stories/directives/stories.client.menu.directive.js',
                    'client/stories/directives/stories.client.tag-list.directive.js',
                    'client/stories/directives/stories.client.tags.directive.js',
                    'client/stories/directives/stories.client.related-links.directive.js',
                    'client/stories/config/stories.client.routes.js'],
                dest: 'client/dist/stories.min.js'
            },
            dashboard: {
                src: ['client/dashboard/dashboard.client.module.js',
                    'client/dashboard/controllers/dashboard.client.controller.js',
                    'client/dashboard/directives/dashboard.client.menu.directive.js',
                    'client/dashboard/directives/dashboard.client.editor.menu.directive.js',
                    'client/dashboard/config/dashboard.client.routes.js'],
                dest: 'client/dist/dashboard.min.js'
            },
            users: {
                src: ['client/users/users.client.module.js',
                    'client/users/controllers/user.client.controller.js',
                    'client/users/services/authentication.client.service.js',
                    'client/users/services/user.client.service.js',
                    'client/users/config/user.client.routes.js'],
                dest: 'client/dist/users.min.js'
            },
            tags: {
                src: ['client/tags/tags.client.module.js',
                    'client/tags/controllers/tags.client.controller.js',
                    'client/tags/services/tags.client.service.js',
                    'client/tags/config/tags.client.routes.js'],
                dest: 'client/dist/tags.min.js'
            },
            thirdparty: {
                src: ['client/lib/angular-flash-alert/dist/angular-flash.min.js'],
                dest: 'client/dist/thirdparty.min.js'
            },
        },
        uglify: {
            options: {
                mangle: false
            },
            my_target: {
                files: {
                    'client/dist/dashboard.min.js': ['client/dist/dashboard.min.js'],
                    'client/dist/stories.min.js': ['client/dist/stories.min.js'],
                    'client/dist/users.min.js': ['client/dist/users.min.js'],
                    'client/dist/tags.min.js': ['client/dist/tags.min.js'],
                    'client/dist/dropdown.min.js': ['client/lib/bootstrap/js/dropdown.js'],
                    'client/dist/tabs.min.js': ['client/lib/bootstrap/js/tab.js'],
                    'client/dist/collapse.min.js': ['client/lib/bootstrap/js/collapse.js']
                }
            }
        },
        // Configure the grunt-nodemon task
        nodemon: {
            dev: {
                script: 'server.js',
                options: {
                    ext: 'js,html',
                    watch: ['server.js', 'config/**/*.js', 'server/**/*.js']
                }
            },
            debug: {
                script: 'server.js',
                options: {
                    nodeArgs: ['--debug'],
                    ext: 'js,html',
                    watch: ['server.js', 'config/**/*.js', 'server/**/*.js']
                }
            }
        },
        // Configure the grunt-mocha-test task
        mochaTest: {
            src: 'server/tests/**/*.js',
            options: {
                reporter: 'spec'
            }
        },
        // Configure the grunt-karma task
        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        },
        // Configure the grunt-protractor-runner task
        protractor: {
            e2e: {
                options: {
                    configFile: 'protractor.conf.js'
                }
            }
        },
        // Configure the grunt-contrib-jshint task
        jshint: {
            all: {
                src: ['server.js', 'config/**/*.js', 'server/**/*.js', 'client/js/*.js', 'client/modules/**/*.js'],
                options: {
                    node: true,
                    predef: [
                        "define",
                        "require",
                        "exports",
                        "module",
                        "describe",
                        "before",
                        "beforeEach",
                        "after",
                        "afterEach",
                        "it",
                        "inject",
                        "expect"
                    ]
                }
            }
        },

        // Configure the grunt-contrib-csslint task
        csslint: {
            all: {
                src: 'client/modules/**/*.css'
            }
        },
        // Configure the grunt-contrib-watch task
        watch: {
            js: {
                files: ['server.js', 'config/**/*.js', 'server/**/*.js', 'client/js/*.js', 'client/modules/**/*.js'],
                tasks: ['jshint']
            },
            css: {
                files: 'client/modules/**/*.css',
                tasks: ['csslint']
            }
        },
        // Configure the grunt-concurrent task
        concurrent: {
            dev: {
                tasks: ['nodemon', 'watch'],
                options: {
                    logConcurrentOutput: true
                }
            },
            debug: {
                tasks: ['nodemon:debug', 'watch', 'node-inspector'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },
        // Configure the grunt-node-inspector task
        'node-inspector': {
            debug: {}
        }
    });

    // Load the external Grunt tasks
    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-protractor-runner');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-node-inspector');
    //grunt.loadNpmTasks('grunt-wiredep');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Create the 'default' Grunt task
    grunt.registerTask('default', ['env:dev', 'lint', 'concurrent:dev']);

    // Create the 'debug' Grunt task
    grunt.registerTask('debug', ['env:dev', 'lint', 'concurrent:debug']);

    // Create the 'test' Grunt task
    grunt.registerTask('test', ['env:test', 'mochaTest', 'karma', 'protractor']);

    // Create the 'lint' Grunt task
    grunt.registerTask('lint', ['jshint', 'csslint']);
};