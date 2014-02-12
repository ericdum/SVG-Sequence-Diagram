module.exports = function(grunt) {

var files = [
    'src/LayoutEngine.js',
    'src/Render.js'
];

var banner = '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n';
var jsFiles = 'src/**/*.js';


    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                eqnull: true,
                browser: true,
                es3:true,
                strict:false
            },
            files: [
                jsFiles,
                'Gruntfile.js' ]
        },
        uglify: {
            options: {
                    banner: banner,
                    sourceMap:true,
                    compress:true
                },
                build: {
                    src: files,
                    dest: 'build/Sequence.min.js'
                }
            },
        watch: {
            files: [
                jsFiles,
                'Gruntfile.js'
            ],
            tasks: [
                'build'
            ]
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.loadNpmTasks('grunt-contrib-jshint');


    grunt.registerTask('build', ['jshint','uglify']);
    grunt.registerTask('default', ['build']);

};
