
module.exports = function(grunt) 
{
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	
	grunt.initConfig(
	{
		cwd: process.cwd(),
		pkg: grunt.file.readJSON('package.json'),

		uglify: 
		{
			options: {
				banner: '/*! <%= pkg.name %> - ver. <%= pkg.version %> */\r\n',
				compress: { drop_console: true }
			},

			js: {
				files: { 
					'renderer.js': [
					'src/*.js'
				],
					'website/renderer.js': [
					'src/*.js'
				]}
			}
		},

		watchfiles: {
			first: {
				files: ['src/*.js'],
				tasks: ['uglify']
			}
		}
	});

	grunt.renameTask('watch', 'watchfiles');
	grunt.registerTask('watch', ['watchfiles']); 
}