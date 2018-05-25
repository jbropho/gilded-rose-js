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

  isSpecial() {
    var specialityItems = ['Sulfuras, Hand of Ragnaros', 'Aged Brie', 'Backstage passes to a TAFKAL80ETC concert'];
    return specialityItems.includes(this.name);
  }

  updateQuality() {
    if (this.quality > 0) this.quality--;
  }

  limitQuality() {
    if (this.quality > 50) this.quality = 50;
  }

  updateSellIn() {
    if (this.name !== 'Sulfuras, Hand of Ragnaros') this.sellIn -= 1;
  }
}

class BackstagePass extends GildedItem {
  constructor(name, sellIn, quality) {
    super(name, sellIn, quality);
  }

  updateQuality() {
    if (this.sellIn < 6) {
      this.quality += 3;
    } else if (this.sellIn < 11) {
      this.quality += 2;
    }
    if (this.sellIn === 0) this.quality = 0;
    this.limitQuality();
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
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

      if (!item.isSpecial()) {
        item.updateQuality(); 
      } else if (item.quality < 50) {
        item.quality += 1;
      }
      
      if (item.name === 'Conjured') item.quality -= 1;

      if (item.name === 'Backstage passes to a TAFKAL80ETC concert') {
        item.updateQuality();
      }
  
      item.updateSellIn();
      
      if (item.sellIn < 0) {
         if (item.quality > 0) {
            if (!item.isSpecial()) {
                item.quality -= 1;
            } else {
            item.quality = 0;
            }
            } else if (item.quality < 50) item.quality += 1;
         }
      });
    return this.items;
  }
}
