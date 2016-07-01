<title>Where is Pubcrawl?</title>
<link rel="stylesheet" href="styles/whereispubcrawl.css"/>

<div class="header"> 
    <div class="banner">
        <img class="banner-img" src="src/static/banner.png"></img>
    </div>
</div>

<div class="content">
    <div class="content-division schedule">
        <div class="division-header">
            Where is Pubcrawl?
        </div>
        <div class="division-content">
            <div class="next-crawl" style="display: none;">
                <h2> This is not the day you're looking for </h2>
                Check in for the next crawl on <%= nextCrawlDate %>!
            </div>
            <div class="stop-list">
                <div class="countdown">
                    Pubcrawl starts in: <div class="countdown-time"></div>
                </div>
            </div>
        </div>
    </div>
    <div class="content-division feed-container"> 
        <div class="division-header">
            Live Checkins 
        </div>
        <div class="division-content">
            <div class="feed">
            </div> 
        </div>
    </div>
</div>
