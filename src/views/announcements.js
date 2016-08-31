define([
    'text!templates/announcements.html.tpl',
    'text!data/announcements.json'
    ],
    function(tpl, announcementData) {
        return Backbone.view.extend({
            template: _template(tpl),
            announcementData: JSON.parse(announcementData),

            initialize: function() {
                this.render();
                return this;
            },

            render: function() {

            },
        });
    });
