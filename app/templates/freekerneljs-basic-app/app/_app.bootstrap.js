/**
 * Load all JS dependencies, then bootstrap the application.
 */
$script([
    // List your files here before loading the app files, for example:
    // 'widgets/widget1/module.js',
    // 'views/view1/controller.js',

    // app files
    'app.module.js'

], 'appDependencies');


// Finally load routes
$script.ready('appDependencies', function () {
    $script([
        'app.routes.js'

    ], function () {
        angular.bootstrap(document, ['FreeKernelJsDemoApp']);
    });
});