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

  static limitItemQuality(item) {
    if (item.name === 'Sulfuras, Hand of Ragnaros' && item.quality > 80) {
      item.quality = 80;
    } else if (item.quality > 50) {
      item.quality = 50;
    }
  }

  updateQuality() {
    this.items.forEach(function(item){
      if (!Shop.nameIsInArray(item, ['Aged Brie', 'Backstage passes to a TAFKAL80ETC concert', 'Sulfuras, Hand of Ragnaros'])) {
        if (item.quality > 0) {
            item.quality -= 1;
        if (item.name === 'Conjured') {
          item.quality -= 1;
        }
        } 
      } else {
        if (item.quality < 50) {
          item.quality += 1;
          if (item.name == 'Backstage passes to a TAFKAL80ETC concert') {
            if (item.sellIn < 11) {
              if (item.quality < 50) {
                item.quality += 1;
              }
            } 
            if (item.sellIn < 6) {
              if (item.quality < 50) {
                item.quality += 1;
              }
            }
          }
        }
      }
      if (item.name != 'Sulfuras, Hand of Ragnaros') {
        item.sellIn -= 1;
      }
      if (item.sellIn < 0) {
          if (item.quality > 0) {
            if (!Shop.nameIsInArray(item, ['Aged Brie', 'Backstage passes to a TAFKAL80ETC concert', 'Sulfuras, Hand of Ragnaros'])) {
                item.quality -= 1;
            } else {
            item.quality = 0;
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
