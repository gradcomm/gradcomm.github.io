define(['moment', 'text!templates/counter.html.tpl'],
    function(moment, tpl) {
        var IRS_DATE = moment('February 4, 2017');

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
                return Math.ceil(moment.duration(IRS_DATE.diff(moment())).asDays());
            },

            render: function() {
                this.$el.html(this.template({countdownDays: this.countdownDays}));
                return this;
            },
        });
    });
