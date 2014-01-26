module.exports = function(grunt) {

var files = [
    'src/LayoutEngine.js',
    'src/Render.js'
];

var banner = '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n';

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                    banner: banner,
                    beautify:true
                },
                build: {
                    src: files,
                    dest: 'build/Sequence.min.js'
                }
            }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task(s).
    grunt.registerTask('default', ['uglify']);

};
