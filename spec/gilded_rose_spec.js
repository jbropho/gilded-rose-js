describe("Gilded Rose", function() {
    var gildedRose;
    var before;
    var after;

   beforeEach(function() {
     gildedRose = new Shop();
   });

  it("should degrade the quality of an item", function(){
     var example = new GildedItem('thing', 10, 50);

     gildedRose.items.push(example);
     before = example.quality;
     gildedRose.updateQuality();
     after = example.quality;

     expect(after).toBeLessThan(before);
  });

  it("shouldn't degrade quality below 0", function() {
    var example = new GildedItem('thing', 10, 0);
    gildedRose.items.push(example);
    gildedRose.updateQuality();
    expect(example.quality).toBe(0);
  });

  it("should increase quality of Agred brie as it ages", function(){
    var agedBrie = new GildedItem('Aged Brie', 100, 30);

    gildedRose.items.push(agedBrie);
    before = agedBrie.quality;
    gildedRose.updateQuality();
    after = agedBrie.quality;
    expect(before).toBeLessThan(after);
  });

  it("should not increase quality above 50", function() {
    var agedBrie = new GildedItem('Aged Brie', 20, 50);

    gildedRose.items.push(agedBrie);
    before = agedBrie.quality;
    gildedRose.updateQuality();
    after = agedBrie.quality;
    expect(before).toEqual(after);
  });

  it("should degrade quality by 2* once sell by passes", function() {
    var firstDecrease;
    var secondDecrease;
    var example = new GildedItem('thing', 1, 10);
    var startQuality = example.quality;
    var secondQuality;
    gildedRose.items.push(example);

    gildedRose.updateQuality();
    secondQuality = example.quality;
    firstDecrease = startQuality - secondQuality;

    gildedRose.updateQuality();
    secondDecrease = secondQuality - example.quality;

    expect(firstDecrease * 2).toEqual(secondDecrease);
  });

  describe('Conjured items', function() {
    it('decreases in quality 2* as fast as normal item', function() {
       var conjured = new GildedItem('Conjured', 10, 50);
       var normal = new GildedItem('Normal', 10, 50);
       var conjuredBefore = conjured.quality;
       var normalBefore = normal.quality;
       var conjuredDiff;
       var normalDiff;

       gildedRose.items.push(normal);
       gildedRose.items.push(conjured);

       gildedRose.updateQuality();

       conjuredDiff = conjuredBefore - conjured.quality;
       normalDiff = normalBefore - normal.quality;

       expect(normalDiff * 2).toEqual(conjuredDiff);
    });
  });

  describe('Sulfuras', function(){
    var sulfura;

    beforeEach(function() {
      sulfura =  new GildedItem('Sulfuras, Hand of Ragnaros', 40, 80);
    });

    it('does not degrade in quality', function() {
      gildedRose.items.push(sulfura);

      before = sulfura.quality;
      gildedRose.updateQuality();
      after = sulfura.quality;

      expect(before).toEqual(after);
    });

    it('sell in date does not decrease', function() {
      gildedRose.items.push(sulfura);

      before = sulfura.sellIn;
      gildedRose.updateQuality();
      after = sulfura.sellIn;
      expect(before).toEqual(after);
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

   describe('limitItemQuality', function() {
      it('sets item quality to 50 if quality > 50', function() {
         var pass = { sellIn: 5, quality: 55};
         Shop.limitItemQuality(pass);
         expect(pass.quality).toBe(50);
      });
      it('limits sulfuras to 80', function() {
        var sulfura = { name: 'Sulfuras, Hand of Ragnaros', sellIn: 5, quality: 100 };
        Shop.limitItemQuality(sulfura);
        expect(sulfura.quality).toBe(80);
      });
   });
});

