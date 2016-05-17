define(['views/counter', 'text!templates/main.html.tpl'],
    function(Counter, tpl) {
        return Backbone.View.extend({
            template: _.template(tpl),

            subviews: [],

            initialize: function() {
                this.render();
                this.subviews.push(new Counter({el: this.$('.counter')}));
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
