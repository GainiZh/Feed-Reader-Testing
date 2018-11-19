/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {

    //RSS Feeds suite to test the feeds
    describe('RSS Feeds', function() {
        //check if the variable allfeeds has been defined and not empty
        it('allFeeds variable is defined and not empty', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
         //check each feed if it has URL and that the URL is not empty
         it('urls are defined and not empty', function() {
           for (var i = 0; i < allFeeds.length; i++) {
             expect(allFeeds[i].url).toBeDefined();
             expect(allFeeds[i].url.length).not.toBe(0);
           }
         });
        //check each feed if it has a name defined and that the name is not empty
        it('names are defined and not empty', function() {
          for (var i = 0; i < allFeeds.length; i++) {
            expect(allFeeds[i].name).toBeDefined();
            expect(allFeeds[i].name.length).not.toBe(0);
          }
        });
    });

    //A test suite "The menu" to test the menu
    describe('The menu', function() {
      //check if the menu element is hidden by default
      it('menu element is hidden', function() {
        expect($('body').hasClass('menu-hidden')).toEqual(true);
      });
      //check if the menu changes its visibility after a click event
      it('menu changes visibility on click event', function() {
        $('.menu-icon-link').trigger('click');
        expect($('body').hasClass('menu-hidden')).toBe(false);
        $('.menu-icon-link').trigger('click');
        expect($('body').hasClass('menu-hidden')).toBe(true);
      });
    });

    //A test suite named "Initial Entries" to test initial entries
    describe('Initial Entries', function() {
      //check if the function loadFeed, after it is called and completes its work, there is a single entry element within the feed container
      beforeEach(function(done) {
        loadFeed(0, function() {
          done();
        });
      });
      it('there is at least a single entry', function() {
        expect($('.feed .entry').length).toBeGreaterThan(0);
      });
    });

    //A test suite named "New Feed Selection" to test new feed selections
    describe('New Feed Selection', function() {
      var feedOne, feedTwo;
      //check if the content changes when a new feed is loaded
      beforeEach(function(done) {
        loadFeed(1, function() {
          //check if the first feed is loaded
          console.log('Feed 1 loaded')

          feedOne = $('.feed').html();
        loadFeed(2, function() {
          //check if the second feed is loaded
          console.log('Feed 2 loaded')
          done();
          });
        });
      });

          afterEach(function() {
            loadFeed(0);
          });
          //check if two feeds are equal
          it('two feeds are different', function() {
            feedOne =$('.feed').html();
            expect(feedOne).not.toEqual(feedTwo);
          });
        });
}());
