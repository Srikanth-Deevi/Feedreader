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
  /* This is our first test suite - a test suite just contains
   * a related set of tests. This suite is all about the RSS
   * feeds definitions, the allFeeds variable in our application.
   */
  describe('RSS Feeds', function() {
    /* This is our first test - it tests to make sure that the
     * allFeeds variable has been defined and that it is not
     * empty. Experiment with this before you get started on
     * the rest of this project. What happens when you change
     * allFeeds in app.js to be an empty array and refresh the
     * page?
     */
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });


    /* Test that loops through each feed in the allFeeds object and ensures it has a URL defined
     * and that the URL is defined and that the URL is not empty.
     */
    it('url in all feeds', function() {
      var i;
      for (i = 0; i < allFeeds.length; i++) {
        expect(allFeeds[i].url).toBeTruthy();
      }
    });

    /* Test that loops through each feed in the allFeeds object and ensures it has a name defined
     * and that the name is not empty.
     */
    it('name in all feeds', function() {
      var j;
      for (j = 0; j < allFeeds.length; j++) {
        expect(allFeeds[j].name).toBeDefined();
        expect(allFeeds[j].name).not.toBe(null);
      }
    });
  });


  /* test suite to check menu */
  describe('The menu', function() {
    const menu = document.querySelector('body');

    /* Test that ensures the menu element is
     * hidden by default.
     */

    it('is hidden by default', function() {
      expect(menu.classList).toContain("menu-hidden");
    });

    /* Test that ensures the menu changes visibility when the menu icon is clicked.
     * This test should have two expectations: does the menu display when
     * clicked and does it hide when clicked again.
     */
    var BODY = $('body'),
      MENU_BUTTON = $('.menu-icon-link');

    it('should show menu when click the menu icon link and hide the menu when click again', function() {
      MENU_BUTTON.click();
      expect(BODY.hasClass('menu-hidden')).toBeFalsy();

      MENU_BUTTON.click();
      expect(BODY.hasClass('menu-hidden')).toBeTruthy();
    });

  });

  /* Describe the test suite "Initial Entries */

  describe('Initial Entries', function() {
    beforeEach(function(done) {
      loadFeed(0, function() {
        done();
      });
    });
    /* Test after loadFeed function,
     * the HTML should contains at least a feed with entry
     */

    it('should loadFeed and render the entry and .feed container', function() {
      expect($('.feed').has('.entry').length).not.toBe(0);
    });
  });

  /*  Describe test suite "New Feed Selection" */
  describe('New Feed Selection', function() {
    var initialFeed;
    var newFeed;

    beforeEach(function(done) {
      // load first feed
      loadFeed(0, function() {
        initialFeed = $('.feed').html();

        // Load second feed
        loadFeed(1, function() {
          newFeed = $('.feed').html();
          done();
        });
      });

    });

    /* Test that ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     * Remember, loadFeed() is asynchronous.
     */
    it('should load new feed', function(done) {
      expect(newFeed).not.toBe(initialFeed);
      done();
    });
  });
}());
