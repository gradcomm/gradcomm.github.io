requirejs.config({
    baseUrl: 'src',
    paths: {
        text: '../node_modules/text/text',
        views: './views',
        templates: './templates',
        data: './data',
    },
});

requirejs(['route', 'views/main'],
    function(Route, MainView) {
        var App = function() {
            this.routes = new Route();

            Backbone.history.start();
        }

        window.bTask = new App();
    });

