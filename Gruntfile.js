module.exports = function(grunt) {
    var LIVERELOAD_PORT = 35725,
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
        connect: {
            options: {
                hostname: 'localhost',
                base: 'app',
                keepalive: false 
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
            }
        },
        watch: {
            options: {
                livereload: LIVERELOAD_PORT
            },
            html: {
            	files: ["app/**/*.html"]
            },
            scripts: {
                files: ["app/app.js", "app/scripts/**/*.js"],
                tasks: ["concat"]
            },
            css: {
                files: ["app/styles/*.css"]
            }
        }
    });

    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-concat');
    
    grunt.registerTask('build', ['concat']);
    
    grunt.registerTask('default', ['build', 'connect:server', 'open:server', 'watch']);
};
