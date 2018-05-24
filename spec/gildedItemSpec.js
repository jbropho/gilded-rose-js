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

  describe('limitQuality', function() {
    it('limits quality to 50', function() {
      var randomItem = new GildedItem('someThing', 10, 55);
      randomItem.limitQuality();
      expect(randomItem.quality).toBe(50);
    })
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
      randomItem.updateQuality()
      expect(randomItem.quality).toBe(0);
    });
  });

  describe('update sellIn', function() {
    it('does not change sellIn for sulfuras', function() {
      var sulfura = new GildedItem('Sulfuras, Hand of Ragnaros',  80, 100);
      sulfura.updateSellIn();
      expect(sulfura.sellIn).toEqual(80);
    });

    it('changes sellIn by -1', function() {
     var notSulfura = new GildedItem('something else', 80, 100);
     notSulfura.updateSellIn();
     expect(notSulfura.sellIn).toEqual(79);
    });
  });

  describe('back stage pass', function() {
    it('increases in quality by 2 when sellIn < 11', function() {
      var backstage = new BackstagePass('TAFKAL80ETC', 10, 10);
 
      var before = backstage.quality;
      var after;
    
      backstage.updateQuality();
      after = backstage.quality;

      expect(after - before).toEqual(2);
    });
    it('increases in quality by 2 when sellIn < 6', function() {
      var backstage = new BackstagePass('TAFKAL80ETC', 5, 10);
      var before = backstage.quality;
      var after;
      
      backstage.updateQuality();
      after = backstage.quality;

      expect(after - before).toEqual(3);
    });
    it('should not increase above 50', function() {
      var backstage = new BackstagePass('TAFKAL80ETC', 5, 50);
      var before = backstage.quality;
      var after;
      
      backstage.updateQuality();
      after = backstage.quality;

      expect(after).toEqual(before);
    });
    it('sets value to 0 when sellIn is 0', function() {
      var backstage = new BackstagePass('TAFKAL80ETC', 0, 50);
      backstage.updateQuality();
      expect(backstage.quality).toBe(0);
    });
  });
});


describe('calcBackstageValue', function(){
  it('should += 1 when quality < 50 && sellIn < 11', function() {
      var pass = { sellIn: 10, quality: 40 };
      Shop.calcBackstageQuality(pass);
      expect(pass.quality).toBe(41);
  });

  it('should += 2 when quality < 49 && sellIn < 6', function() {
     var pass = { sellIn: 5, quality: 40};
     Shop.calcBackstageQuality(pass);
     expect(pass.quality).toBe(42);
  });
  
  it('should not increase quality above 50', function() {
     var pass = { sellIn: 5, quality: 49};
     Shop.calcBackstageQuality(pass);
     expect(pass.quality).toBe(50);
  });
});
