/**
 * This file/module contains all configuration for the build process.
 */
module.exports = {
    /**
     * The `build_dir` folder is where our projects are compiled during
     * development and the `compile_dir` folder is where our app resides once it's
     * completely built.
     */
    build_dir: 'build',
    compile_dir: 'bin',

    /**
     * This is a collection of file patterns that refer to our app code (the
     * stuff in `src/`). These file paths are used in the configuration of
     * build tasks. `js` is all project javascript, less tests. `ctpl` contains
     * our reusable components' (`src/common`) template HTML files, while
     * `atpl` contains the same, but for our app's code. `html` is just our
     * main HTML file, `less` is our main stylesheet, and `unit` contains our
     * app's unit tests.
     */
    app_files: {
        js: [ 'src/**/*.js', '!src/**/*.spec.js', '!src/assets/**/*.js' ],
        jsunit: [ 'src/**/*.spec.js' ],

        coffee: [ 'src/**/*.coffee', '!src/**/*.spec.coffee' ],
        coffeeunit: [ 'src/**/*.spec.coffee' ],

        atpl: [ 'src/app/**/*.tpl.html' ],
        ctpl: [ 'src/common/**/*.tpl.html' ],

        html: [ 'src/index.html' ],
        less: 'src/less/main.less'
    },

    /**
     * This is a collection of files used during testing only.
     */
    test_files: {
        js: [
            'vendor/angular-mocks/angular-mocks.js'
        ]
    },

    /**
     * This is the same as `app_files`, except it contains patterns that
     * reference vendor code (`vendor/`) that we need to place into the build
     * process somewhere. While the `app_files` property ensures all
     * standardized files are collected for compilation, it is the user's job
     * to ensure non-standardized (i.e. vendor-related) files are handled
     * appropriately in `vendor_files.js`.
     *
     * The `vendor_files.js` property holds files to be automatically
     * concatenated and minified with our project source files.
     *
     * The `vendor_files.css` property holds any CSS files to be automatically
     * included in our app.
     *
     * The `vendor_files.assets` property holds any assets to be copied along
     * with our app's assets. This structure is flattened, so it is not
     * recommended that you use wildcards.
     */
    vendor_files: {
        js: [
            /*'custom-vendor/google-apis-maps.js',*/
            // 'vendor/bluebird/js/browser/bluebird.js',///this library is a requirement for angular-google-maps
            'vendor/jquery/dist/jquery.min.js',
            'vendor/jquery-ui/jquery-ui.min.js',

            'vendor/angular/angular.min.js',
            'vendor/underscore/underscore-min.js',
            'vendor/angular-ui-utils/modules/route/route.js',
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
            'vendor/select2/select2.min.js',
            'vendor/angular-ui-select2/src/select2.js',
            'vendor/angular-ui-select/dist/select.js',
            'vendor/ngInfiniteScroll/build/ng-infinite-scroll.min.js',/*,

             'custom-vendors/jquery/jquery.hipchat.js',*/
          /* 'custom-vendors/jquery/pdfmake_min.js',
           'custom-vendors/jquery/vfs_fonts.js',

           */
             /* 'custom-vendors/angular/ng-csv.js',
             '*/
             /* 'custom-vendors/jquery/moment.js',
              'custom-vendors/jquery/moment-recur.js',
              */
             /* 'custom-vendors/jquery/fullcalendar/fullcalendar.min.js',
            'custom-vendors/jquery/fullcalendar/ui-calendar.js',*/
          /*  'custom-vendors/jquery/fullcalendar/calendar.js',   */                          

            
            /*
            Revathy Version Not support for Export 
            'vendor/wijmo-angular/Dist/controls/wijmo.min.js',
            'vendor/wijmo-angular/Dist/controls/wijmo.input.min.js',
            'vendor/wijmo-angular/Dist/controls/wijmo.grid.min.js',
            'vendor/wijmo-angular/Dist/controls/wijmo.chart.min.js',
            'vendor/wijmo-angular/Dist/controls/wijmo.gauge.min.js',
            'vendor/wijmo-angular/Dist/interop/angular/wijmo.angular.min.js',*/
            
           /*'custom-vendors/wijmo-angular/Dist/controls/wijmo.min.js',
            'custom-vendors/wijmo-angular/Dist/controls/wijmo.input.min.js',
            'custom-vendors/wijmo-angular/Dist/controls/wijmo.grid.min.js',
            'custom-vendors/wijmo-angular/Dist/controls/wijmo.chart.min.js',
            'custom-vendors/wijmo-angular/Dist/controls/wijmo.gauge.min.js',
            'custom-vendors/wijmo-angular/Dist/interop/angular/wijmo.angular.min.js',
            'custom-vendors/jszip.min.js',
            'custom-vendors/wijmo-angular/Samples/JS/Angular/ExcelImportExport/ExcelImportExport/scripts/c1xlsx.js',
            'custom-vendors/wijmo-angular/Samples/JS/Angular/ExcelImportExport/ExcelImportExport/scripts/ExcelConverter/ExcelConverter.js',
*/
            
            'custom-vendors/fullcalendar/fullcalendar.js',
            'custom-vendors/fullcalendar/gcal.js',
            'vendor/angular-ui-calendar/src/calendar.js',

            'vendor/mapbox.js/mapbox.js',
            'custom-vendors/mapbox.directions.js',
            'custom-vendors/timezonedb.js'
            /*,
             'custom-vendors/angular-multi-select-master/angular-multi-select.js'*/
            

        ],
        css: [
            /*'vendor/jquery-ui/themes/smoothness/jquery-ui.min.css'*/
            /*'vendor/wijmo/Dist/styles/wijmo.min.css'*/
            "custom-vendors/vendorcss/select.min.css",
            "custom-vendors/vendorcss/select2.css",
            "custom-vendors/vendorcss/select2-bootstrap.css",
            "custom-vendors/wijmo-angular/Dist/styles/wijmo.min.css",
            "custom-vendors/angular/datePicker.css",
            "custom-vendors/vendorcss/fullcalendar.css",
            "custom-vendors/vendorcss/mapbox.css"/*,
            "custom-vendors/angular-multi-select-master/angular-multi-select.css"*/
        ],
        assets: [
            /*'vendor/bootstrap/dist/fonts/glyphicons-halflings-regular.eot'*/
        ]
    }
};
