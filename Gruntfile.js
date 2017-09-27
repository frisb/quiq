module.exports = function (grunt) {
  grunt.initConfig({
    clean: {
      default: {
        src: [
          'lib'
        ]
      }
    },
		ts: {
			compile : {
				tsconfig: true,
        options: {
					fast: 'never'
				}
			}
		},
    mochaTest: {
      quiq: {
        options: {
          reporter: 'spec'
        },
        src: ['tests/*.js']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-ts');
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.registerTask('default', ['clean', 'ts', 'mochaTest']);
};