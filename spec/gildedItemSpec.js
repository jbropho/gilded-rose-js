describe('Gilded Item', function() {

  describe('special', function() {
    it('returns false for non speciality items', function() {
       var randomItem = new GildedItem('randomThing', 10, 10);
       expect(randomItem.isSpecial()).toBe(false);
    });
    it('returns true for sulfuras', function() {
      var sulfuras = new GildedItem('Sulfuras, Hand of Ragnaros', 10, 10);
      expect(sulfuras.isSpecial()).toBe(true);
    });
    it('returns true for backstage passes', function() {
      var sulfuras = new GildedItem('Backstage passes to a TAFKAL80ETC concert', 10, 10);
      expect(sulfuras.isSpecial()).toBe(true);
    });
    it('returns true for Aged Brie', function() {
      var sulfuras = new GildedItem('Aged Brie', 10, 10);
      expect(sulfuras.isSpecial()).toBe(true);
    });
  });

  describe('updateQuality', function() {
    it('reduces item quality by 1', function() {
      var randomItem = new GildedItem('someThing', 10, 10);
      var before = randomItem.quality;
      var after;

      randomItem.updateQuality()
      after = randomItem.quality;

      expect(before - after).toEqual(1);
    });

    it('does not reduce quality below 0', function() {
      var randomItem = new GildedItem('someThing', 10, 0);
      randomItem.updateQuality();
      expect(randomItem.quality).toBe(0);
    });
  });
});