define([
    'views/counter',
    'views/announcements',
    'text!templates/main.html.tpl'
    ],
    function(Counter, Announcements, tpl) {
        return Backbone.View.extend({
            template: _.template(tpl),

            subviews: [],

            initialize: function() {
                this.render();
                this.subviews.push(new Counter({el: this.$('.counter')}));
                this.subviews.push(new Announcements({el: this.$('.announcements-container')}));
                this.renderSubviews();
                return this;
            },

            render: function() {
                this.$el.html(this.template());
                this.renderSubviews();
                return this;
            },

            renderSubviews: function() {
                _.each(this.subviews, function(view) {
                    view.render();
                });
            }
        });
    });
