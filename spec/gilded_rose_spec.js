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
});
