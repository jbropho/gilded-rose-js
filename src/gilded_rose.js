class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class GildedItem extends Item {
  constructor(name, sellIn, quality) {
    super(name, sellIn, quality);
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }
  
  static nameIsInArray(item, arr) {
    return arr.includes(item.name)
  }

  updateQuality() {
    this.items.forEach(function(item){
      if ( !Shop.nameIsInArray(item, ['Aged Brie', 'Backstage passes to a TAFKAL80ETC concert', 'Sulfuras, Hand of Ragnaros'])) {
        if (item.quality > 0) {
            item.quality -= 1;
          if (item.name === 'Conjured') {
            item.quality -= 1;
          }
        } // all code below here deals with Backstage passes, sulfuras and aged brie
      } else {
        // all items increase quality += 1 if quality < 50 
        if (item.quality < 50) {
          item.quality = item.quality + 1;
          //  backstage pass +1 if sellIn < 11
          if (item.name == 'Backstage passes to a TAFKAL80ETC concert') {
            if (item.sellIn < 11) {
              if (item.quality < 50) {
                item.quality += 1;
              }
            } // backstage pass +1 if sellIn < 6
            if (item.sellIn < 6) {
              if (item.quality < 50) {
                item.quality += 1;
              }
            }
          }
        }
      }
      if (item.name != 'Sulfuras, Hand of Ragnaros') {
        item.sellIn = item.sellIn - 1;
      }
      if (item.sellIn < 0) {
          if (item.quality > 0) {
            if ( !Shop.nameIsInArray(item, ['Aged Brie', 'Backstage passes to a TAFKAL80ETC concert', 'Sulfuras, Hand of Ragnaros'])) {
                item.quality -= 1;
            } else {
            item.quality = item.quality - item.quality;
          }
           } else {
            if (item.quality < 50) {
              item.quality += 1;
           }
          }
        }
      });

    return this.items;
  }
}
