define(['views/main', 'views/whereispubcrawl'], function(MainView, PubcrawlView) { return Backbone.Router.extend({ routes: {
                'whereispubcrawl': 'whereIsPubcrawl',
                '*shit': 'main',
            },

            main: function() {
                window.mainView = $('.main').html(new MainView().$el);
            },

            whereIsPubcrawl: function() {
                window.mainView = $('.main').html(new PubcrawlView().$el);
            },

        });
    });
