define([
    'text!templates/announcements.html.tpl',
    'text!data/announcements.json'
    ],
    function(tpl, announcementData) {
        return Backbone.View.extend({
            template: _.template(tpl),
            announcementData: JSON.parse(announcementData),

            initialize: function() {
                return this;
            },

            render: function() {
                var self = this;
                var html = '';

                this.announcementData.forEach(function(announcement) {
                    html += self.template(announcement);
                });

                this.$el.html(html);
                return this;
            },
        });
    });
