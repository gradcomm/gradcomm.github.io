requirejs.config({
    baseUrl: 'src',
    paths: {
        text: '../node_modules/text/text',
        views: './views',
        templates: './templates',
    },
});

requirejs(['views/main'],
    function(MainView) {
        window.mainView = new MainView({el: $('.main')});
    });

