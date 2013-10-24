module.exports = function( grunt ){

	var pkg = grunt.file.readJSON('package.json');
	var banner = '/* jQuery ST-Pagination v'+ pkg.version +'\n'+
	'   Generated on <%= grunt.template.today("yyyy-mm-dd \'at\' HH:MM:ss") %> */\n\n';

	grunt.initConfig({
		browserify: {
			test: {
				options: {
					shim: {
						jquery: {
							path: 'test/assets/jquery.js',
							exports: '$'
						}
					}
				},
				files: {
					'test/assets/test.js': ['test/index.js']
				}
			}
		},
		uglify: {
			script: {
				options: {
					banner: banner
				},
				files: {
					'jquery.st-pagination.min.js': 'jquery.st-pagination.js'
				}
			}
		},
		watch: {
			script: {
				files: ['jquery.st-pagination.js'],
				tasks: ['uglify:script']
			},
			test: {
				files: ['jquery.st-pagination.js','test/index.js'],
				tasks: ['browserify:test']
			}
		}
	});

	// the cool/easy way to do it
	Object.keys( pkg.devDependencies ).forEach( function( dep ){
		if( dep.substring( 0, 6 ) === 'grunt-' ) grunt.loadNpmTasks( dep );
	});

	grunt.registerTask( 'default', ['dev'] );
	grunt.registerTask( 'build', ['browserify','uglify'] );
	grunt.registerTask( 'dev', ['build','watch'] );

};