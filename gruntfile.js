
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
  uglify: {
    my_target: {
      files: {
        'public/javascripts/main.min.js': ['public/javascripts/main.js']
      }
    }
  },
  sass: {
    options: {
      sourceMap: true
    },
    dist: {
      files: {
        'public/stylesheets/style.css': 'public/stylesheets/style.scss'
      }
    }
  },
  watch: {
    scripts: {
      files: ['public/javascripts/main.js', 'public/stylesheets/style.scss'],
      tasks: ['build'],
      options: {
        interrupt: true,
      },
    },
  },
    cssmin: {
      options: {
        shorthandCompacting: true,
        roundingPrecision: -1
      },
      target: {
        files: {
          'public/stylesheets/style.min.css': 'public/stylesheets/style.css'
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('build', ['uglify', 'sass', 'cssmin']);

};