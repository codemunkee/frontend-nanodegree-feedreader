/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* Test that our RSS Feeds are defined correctly */
    describe('RSS Feeds', function() {
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Feeds in the allFeeds object have a URL defined
         * that is not empty.
         */
        it('feed objects have a URL property', function () {
            allFeeds.map(feed => { expect(feed.url).toBeDefined(); } );
        });

        /* Feeds in the allFeeds object have a name defined
         *that is not empty.
         */
        it('feed objects have a name property', function () {
            allFeeds.map(feed => { expect(feed.name).toBeDefined(); } );
        });
    });

    /* Test our hidden menu works as it should */
    describe('The menu', function() {
        // fixtures make sure we set our menu state back to its original state
        beforeEach(function() {
            $('body').addClass('menu-hidden');
        });

        afterEach(function() {
            $('body').addClass('menu-hidden');
        });

        /* make sure the side menu is hidden by default */
        it('is hidden by default', function () {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        /* the menu should show up once clicked */
        it('is shown when icon is clicked', function () {
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
        });
    });

    /* Test that our initial feed entries are displayed as expected */
    describe('Initial Entries', function () {
        beforeEach(function(done) {
            // load the first defined feed and wait for the async request to finish
            // (we pass the done function, provided by jasmine, as a callback to
            // wait for the request to complete)
            loadFeed(0, done);
        });

        /* there is at least one feed entry rendered from our entry template */
        it('has an .entry element within the .feed container', function () {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });

    });

    describe('New Feed Selection', function () {
        // make sure that we allow the async request to complete
        // that initially populates the feed data on the page
        let origHref;

        beforeEach(function(done) {
            loadFeed(0, done);
            // first link we see in the article list
            origHref = $('a.entry-link')[0].href;
        });

        it('shows new feed data when requested', function (done) {
            loadFeed(1, function() {
                const newHref = $('a.entry-link')[0].href;
                expect(origHref !== newHref).toBe(true);
                done();
            });
        });
    });
}());
