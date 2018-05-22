describe("Gilded Rose", function() {
    var gildedRose;

   beforeEach(function() {
     gildedRose = new Shop();
   })

  it("should foo", function() {
    const gildedRose = new Shop([ new Item("foo", 0, 0) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toEqual("foo");
  });

  it("should degrade in quality", function(){
     var before;
     var after;
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
    var before;
    var after;
    var agedBrie = new Item('Aged Brie', 100, 50);

    gildedRose.items.push(agedBrie);
    before = agedBrie.quality;
    gildedRose.updateQuality();
    after = agedBrie.quality;
    expect(before).toBeLessThan(after);
  });
});
