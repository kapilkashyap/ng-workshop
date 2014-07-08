module.exports = function(grunt) {
    var LIVERELOAD_PORT = 35725,
    	TEST_PORT = 9003,
        PORT = 9002;
    grunt.initConfig({
        concat: {
            dest: {
                src: [
                    'app/app.js', 'app/scripts/**/*.js'
                ],
                dest: 'app/components/ng-workshop.js'
            }
        },
        ngdocs: {
            options: {
                scripts: ['angular.js','app/app.js'],
                html5Mode: true
            },
            all: ['app/scripts/**/*.js']
        },
        connect: {
            options: {
                hostname: 'localhost',
                base: 'app',
                keepalive: false 
            },
            testserver: {
                options: {
                    port: TEST_PORT
                }
            },
            server: {
                options: {
                    port: PORT,
                    livereload: LIVERELOAD_PORT
                }
            }
        },
        open: {
            server: {
                path: 'http://localhost:' + PORT + '/index.html'
            },
            testserver: {
                path: 'http://localhost:' + TEST_PORT + '/index.html'
            }
        },
        watch: {
            options: {
                livereload: LIVERELOAD_PORT
            },
            scripts: {
                files: ["app/**/*.html", "app/scripts/**/*.js"],
                tasks: ["concat"]
            },
            css: {
                files: ["app/styles/*.css"]
            },
            test: {
                files: ["test/**/*"],
                tasks: [/*"protractor:e2e"*/]
            }
        },
        karma: {
            unit : {
                configFile : './test/karma-unit.conf.js',
                autoWatch : false,
                singleRun : true
            },
            unit_auto : {
                configFile : './test/karma-unit.conf.js'
            }
        },
        protractor : {
			options : {
				keepAlive : false, // If false, the grunt process stops when the first test fails.
				noColor : false, // If true, protractor will not use colors in its output.
				args : {
				// Arguments passed to the command
				}
			},
			e2e : {
				options : {
					configFile : "test/e2e.conf.js", // Target-specific config file
					args : {
						baseUrl : 'http://localhost:' + TEST_PORT
						// Target-specific arguments
					}
				}
			}
		},
		jshint : {
			src : {
				options : {
					jshintrc : '.jshintrc'
				},
				src : [ 'app/scripts/**/*.js' ]
			},
			test : {
				options : {
					jshintrc : 'test/.jshintrc'
				},
				src : [ 'test/e2e/**/*.js' ]
			}
		}
    });

    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-ngdocs');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-protractor-runner');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    
    grunt.registerTask('build', ['concat']);
    // Running this target will execute both, unit tests and e2e tests
    grunt.registerTask('test', ['build', 'connect:testserver', 'karma:unit', 'protractor:e2e']);
    
    // Run this target for executing unit test cases
    grunt.registerTask('test:unit', ['build', 'karma:unit']);
    // Run this target for executing e2e test cases
    grunt.registerTask('test:e2e', ['build', 'connect:testserver', 'protractor:e2e']);
    grunt.registerTask('watch:e2e', ['build', 'connect:testserver', 'watch:test']);
    grunt.registerTask('createDocs', ['ngdocs']);
    
    grunt.registerTask('default', ['build', 'connect:server', 'open:server', 'watch']);
};
