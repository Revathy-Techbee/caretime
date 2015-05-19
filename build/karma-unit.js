module.exports = function ( karma ) {
  karma.set({
    /** 
     * From where to look for files, starting with the location of this file.
     */
    basePath: '../',

    /**
     * This is the list of file patterns to load into the browser during testing.
     */
    files: [
      'vendor/jquery/dist/jquery.min.js',
      'vendor/jquery-ui/jquery-ui.min.js',
      'vendor/angular/angular.min.js',
      'vendor/underscore/underscore-min.js',
      'vendor/angular-sanitize/angular-sanitize.min.js',
      'vendor/angular-ui-utils/ui-utils.min.js',
      'vendor/angular-resource/angular-resource.min.js',
      'vendor/angular-cookies/angular-cookies.min.js',
      'vendor/angular-animate/angular-animate.min.js',
      'vendor/angular-ui-router/release/angular-ui-router.min.js',
      'vendor/angular-translate/angular-translate.min.js',
      'vendor/ngstorage/ngStorage.min.js',
      'custom-vendors/angular/ui-jq.js',
      'custom-vendors/angular/ui-load.js',
      'custom-vendors/angular/ui-validate.js',
      'vendor/angular-bootstrap/ui-bootstrap-tpls.min.js',
      'vendor/moment/moment.js',
      'custom-vendors/moment-recur.js',
      'vendor/moment-timezone/builds/moment-timezone-with-data.min.js',
      'custom-vendors/angular/datePicker.js',
      'custom-vendors/angular/datePickerUtils.js',
      'custom-vendors/angular/dateRange.js',
      'custom-vendors/angular/input.js',
      'custom-vendors/angular/ngAutocomplete.js',
      'vendor/angular-mapbox/dist/angular-mapbox.min.js',
      'custom-vendors/select2/select2.min.js',
      'vendor/angular-ui-select2/src/select2.js',
      'vendor/angular-ui-select/dist/select.js',
      'vendor/ngInfiniteScroll/build/ng-infinite-scroll.min.js',
      'custom-vendors/fullcalendar/fullcalendar.js',
      'custom-vendors/fullcalendar/gcal.js',
      'vendor/angular-ui-calendar/src/calendar.js',
      'vendor/mapbox.js/mapbox.js',
      'custom-vendors/mapbox.directions.js',
      'custom-vendors/timezonedb.js',
      'build/templates-app.js',
      'build/templates-common.js',
      'vendor/angular-mocks/angular-mocks.js',
      
      'src/**/*.js',
      //'src/**/*.coffee',//NOTE: uncomment this line to add coffee script files to tests..	  
    ],
    exclude: [
      'src/assets/**/*.js'
    ],
    frameworks: [ 'jasmine' ],
    plugins: [ 'karma-jasmine', 'karma-phantomjs-launcher', 'karma-firefox-launcher', 'karma-coffee-preprocessor' ],
    preprocessors: {
      '**/*.coffee': 'coffee',
    },

    /**
     * How to report, by default.
     */
    reporters: 'dots',

    /**
     * On which port should the browser connect, on which port is the test runner
     * operating, and what is the URL path for the browser to use.
     */
    port: 9018,
    runnerPort: 9100,
    urlRoot: '/',

    /** 
     * Disable file watching by default.
     */
    autoWatch: false,

    /**
     * The list of browsers to launch to test on. This includes only "Firefox" by
     * default, but other browser names include:
     * Chrome, ChromeCanary, Firefox, Opera, Safari, PhantomJS
     *
     * Note that you can also use the executable name of the browser, like "chromium"
     * or "firefox", but that these vary based on your operating system.
     *
     * You may also leave this blank and manually navigate your browser to
     * http://localhost:9018/ when you're running tests. The window/tab can be left
     * open and the tests will automatically occur there during the build. This has
     * the aesthetic advantage of not launching a browser every time you save.
     */
    browsers: [
      'PhantomJS'
    ]
  });
};

