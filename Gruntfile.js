module.exports = function( grunt ){

	var pkg = grunt.file.readJSON('package.json');
	var banner = '/* jQuery ST-Pagination v'+ pkg.version +'\n'+
	'   Generated on <%= grunt.template.today("yyyy-mm-dd \'at\' HH:MM:ss") %> */\n\n';

	grunt.initConfig({
		uglify: {
			build: {
				options: {
					banner: banner
				},
				files: {
					'jquery.st-pagination.min.js': 'jquery.st-pagination.js'
				}
			}
		}
	});

	// the cool/easy way to do it
	Object.keys( pkg.devDependencies ).forEach( function( dep ){
		if( dep.substring( 0, 6 ) === 'grunt-' ) grunt.loadNpmTasks( dep );
	});

	grunt.registerTask( 'default', ['dev'] );
	grunt.registerTask( 'build', ['uglify'] );
	grunt.registerTask( 'dev', ['build'] );

};