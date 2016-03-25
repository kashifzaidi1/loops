module.exports = function(grunt) {

  // ===========================================================================
  // CONFIGURE GRUNT ===========================================================
  // ===========================================================================
  grunt.initConfig({

    // get the configuration info from package.json ----------------------------
    // this way we can use things like name and version (pkg.name)
    pkg: grunt.file.readJSON('package.json'),

    // all of our configuration will go here
    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'public/css/all.css': ['public/libraries/bootstrap/bootstrap.css', 
                                    'public/libraries/font-awesome/css/font-awesome.css',
                                    'public/css/animate.css',
                                    'public/css/style.css']
        }
      }
    },


    uglify: {
      my_target: {
        files: {
          'public/js/all.min.js': ["public/js/modernizr.custom.js",
                                  "public/libraries/jquery/dist/jquery.js",
                                  "public/libraries/bootstrap/dist/js/bootstrap.js",
                                  "public/js/jquery.parallax-1.1.3.js",
                                  "public/js/imagesloaded.pkgd.js",
                                  "public/js/jquery.sticky.js",
                                  "public/js/wow.min.js",
                                  "public/js/jquery.easypiechart.js",
                                  "public/js/waypoints.min.js",
                                  "public/js/jquery.cbpQTRotator.js",
                                  "public/js/custom.js"]
        }
      }
    }

  });

  // ===========================================================================
  // LOAD GRUNT PLUGINS ========================================================
  // ===========================================================================
  // we can only load these if they are in our package.json
  // make sure you have run npm install so our app can find these
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['cssmin','uglify']); 
};