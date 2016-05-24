define([
    'text!templates/whereispubcrawl.html.tpl',
    'text!templates/crawlstopitem.html.tpl',
    'text!data/pubcrawl.json'
    ],
    function(tpl, crawlStopItemTpl, pubcrawlData) {
        return Backbone.View.extend({
            template: _.template(tpl),
            pubcrawlData: JSON.parse(pubcrawlData),

            initialize: function() {
                this.render();

                this.updateStopsInterval = window.setInterval(function() {
                    this.renderStops();
                }.bind(this), 1000);

                return this;
            },

            render: function() {
                var nextCrawlDate = this.getCurrentSchedule().date.match(/.+(?=,)/)[0];

                this.$el.html(this.template({
                    nextCrawlDate: nextCrawlDate,
                }));

                this.renderStops();
                this.renderTwitterWidget();

                return this;
            },

            renderStops: function() {
                var currentSchedule = this.getCurrentSchedule();

                this.$('.crawl-stop').remove();
                _.each(currentSchedule.stops, function(stop) {
                    stop.id = this.stopId(stop);
                    this.$('.stop-list').append($(_.template(crawlStopItemTpl)(stop)));
                }.bind(this));

                if (this.getCurrentStop()) {
                    this.$('.countdown').hide();
                    this.$('#' + this.stopId(this.getCurrentStop())).addClass('current');
                } else if (new Date(currentSchedule.date).getDate() == new Date().getDate()) {
                    this.$('.countdown-time').html(this.getCountdownTime());
                    this.$('.countdown').show();
                    this.$('.next-crawl').hide();
                } else {
                    this.$('.stop-list').hide();
                    this.$('.next-crawl').show();
                }
            },

            renderTwitterWidget: function() {
                if (window.twttr.widgets === undefined) {
                    window.setTimeout(this.renderTwitterWidget.bind(this), 500);
                    return;
                }

                window.twttr.widgets.createTimeline(
                    '734484500743356416',
                    this.$('.feed')[0],
                    {
                        'height': 600,
                        'width': (window.innerWidth < 1020 ? window.innerWidth : 600),
                        'chrome': 'noheader, nofooter',
                    }

                )
            },

            getCurrentSchedule: function() {
                return _.find(this.pubcrawlData, function(crawl) {
                    var crawlDate = new Date(crawl.date);
                    var currentDate = new Date();

                    return currentDate.getMonth() <= crawlDate.getMonth() &&
                           currentDate.getDate() <= (crawlDate.getDate() + 1);
                });
            },

            getCurrentStop: function() {
                var currentSchedule = this.getCurrentSchedule();
                var currentTime = Date.now()

                var currentStop = _.find(currentSchedule.stops, function(stop) {
                    var startTime = new Date(currentSchedule.date + ' ' + stop.start);
                    var endTime = new Date(currentSchedule.date + ' ' + stop.end);

                    if (stop.start.indexOf('AM') > -1) {
                        startTime.setHours(startTime.getHours() + 24);
                    }

                    if (stop.end.indexOf('AM') > -1) {
                        endTime.setHours(endTime.getHours() + 24);
                    }


                    return currentTime >  startTime &&
                           currentTime <= endTime;
                });

                return currentStop;
            },

            isCountdownVisible: function() {
                return this.$('.countdown').is(':visible');
            },

            getCountdownTime: function() {
                var currentSchedule = this.getCurrentSchedule();
                var firstStop = currentSchedule.stops[0];

                if (!firstStop) {
                    return "Soon&trade;";
                }

                var startTime = new Date(currentSchedule.date + ' ' + firstStop.start);

                if (firstStop.start.indexOf('AM') > -1) {
                    startTime.setHours(startTime.getHours() + 24);
                }

                var timeDiff = new Date(null);
                timeDiff.setMilliseconds(startTime - Date.now());

                return timeDiff.toISOString().substr(11, 8);
            },

            stopId: function(stop) {
                return stop.location.replace(/[^a-zA-Z0-9]/g, '_');
            }
        });
    });
