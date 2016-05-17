define(['text!templates/counter.html.tpl'],
    function(tpl) {
        var IRS_DATE = new Date(2017, 1, 4);

        return Backbone.View.extend({
            template: _.template(tpl),

            initialize: function() {
                this.countdownDays = this.getCountdownDays();

                window.setInterval(function() {
                    this.countdownDays = this.getCountdownDays();
                    this.render();
                }.bind(this), 10000);

                return this;
            },

            getCountdownDays: function() {
                return Math.floor((IRS_DATE - Date.now()) / 1000 / 60 / 60 / 24);
            },

            render: function() {
                this.$el.html(this.template({countdownDays: this.countdownDays}));
                return this;
            },
        });
    });
