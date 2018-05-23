describe("Gilded Rose", function() {
    var gildedRose;
    var before;
    var after;

   beforeEach(function() {
     gildedRose = new Shop();
   })

  it("should foo", function() {
    const gildedRose = new Shop([ new Item("foo", 0, 0) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toEqual("foo");
  });

  it("should degrade in quality", function(){
     var example = new Item('thing', 10, 50);

     gildedRose.items.push(example);
     before = example.quality;
     gildedRose.updateQuality();
     after = example.quality;

     expect(after).toBeLessThan(before);
  });

  it("shouldn't degrade quality below 0", function() {
    var example = new Item('thing', 10, 0);
    gildedRose.items.push(example);
    gildedRose.updateQuality();
    expect(example.quality).toBe(0);
  });

  it("should increase quality of Agred brie as it ages", function(){
    var agedBrie = new Item('Aged Brie', 100, 30);

    gildedRose.items.push(agedBrie);
    before = agedBrie.quality;
    gildedRose.updateQuality();
    after = agedBrie.quality;
    expect(before).toBeLessThan(after);
  });

  it("should not increase quality above 50", function() {
    var agedBrie = new Item('Aged Brie', 20, 50);

    gildedRose.items.push(agedBrie);
    before = agedBrie.quality;
    gildedRose.updateQuality();
    after = agedBrie.quality;
    expect(before).toEqual(after);
  });

  it("should degrade quality by 2* once sell by passes", function() {
    var firstDecrease;
    var secondDecrease;
    var example = new Item('thing', 1, 10);
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

  describe('Sulfuras', function(){
    var sulfura;

    beforeEach(function() {
      sulfura =  new Item('Sulfuras, Hand of Ragnaros', 40, 80);
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

  describe('Backstage passes', function() {
     var backstagePass;
     var before;
     var after;

     it('quality +=2 when days <= 10', function() {
       backstagePass = new Item('Backstage passes to a TAFKAL80ETC concert', 9, 10);
       gildedRose.items.push(backstagePass);
       
       before = backstagePass.quality;
       gildedRose.updateQuality();
       after = backstagePass.quality;

       expect(after - before).toEqual(2);
     });

     it('quality +=3 when days <= 5', function() {
      backstagePass = new Item('Backstage passes to a TAFKAL80ETC concert', 5, 10);
      gildedRose.items.push(backstagePass);

      before = backstagePass.quality;
      gildedRose.updateQuality();
      after = backstagePass.quality;

      expect(after - before).toEqual(3);
     });
     
     it('quality === 0 when days === 0', function() {
      backstagePass = new Item('Backstage passes to a TAFKAL80ETC concert', 0, 10);
      gildedRose.items.push(backstagePass);

      gildedRose.updateQuality();
      expect(backstagePass.quality).toEqual(0);
     });
   });
});

