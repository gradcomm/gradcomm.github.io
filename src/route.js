define(['views/main', 'views/whereispubcrawl'],
    function(MainView, PubcrawlView) {
        return Backbone.Router.extend({
            routes: {
                'whereispubcrawl': 'whereIsPubcrawl',
                '*shit': 'main',
            },

            main: function() {
                window.mainView = new MainView({el: $('.main')});
            },

            whereIsPubcrawl: function() {
                window.mainView = new PubcrawlView({el: $('.main')});
            },

        });
    });
