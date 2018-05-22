describe('Item', function() {
   
  describe('constructor', function() {
    it('should enforce a max limit on quality of 50', function() {
       var item = new Item('example', 100, 100);
       expect(item.quality).toBe(50);
    });
  });
});