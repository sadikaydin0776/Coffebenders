import { MenuCategory } from './types';

export const ambientVideoUrl = "https://cdn.coverr.co/videos/coverr-pouring-coffee-5250/1080p.mp4"; // Reliable external hosting, can be changed
export const ambientPosterUrl = "https://images.unsplash.com/photo-1559525839-b184a4d698c7?q=80&w=1080&auto=format&fit=crop"; // High quality fallback image

const dailySpecials = [
  {
    name: "Latte", nameEn: "Latte",
    description: "Özel harman espressomuz ve ipeksi süt köpüğü ile günün vazgeçilmezi.",
    descriptionEn: "Our special blend espresso and silky milk foam, essential for the day.",
    price: 160, calories: 120, protein: 8, sugar: 9,
    recommendations: ["S.Sebastian Cheesecake", "Brownie"]
  },
  {
    name: "Flat White", nameEn: "Flat White",
    description: "Mikro köpürtülmüş ipeksi süt ile pürüzsüz espresso deneyimi.",
    descriptionEn: "Smooth espresso experience with micro-foamed silky milk.",
    price: 180, calories: 110, protein: 7, sugar: 8,
    recommendations: ["Cookie Pie"]
  },
  {
    name: "Cold Brew", nameEn: "Cold Brew",
    description: "16 saat demlenmiş ferahlatıcı soğuk kahvemiz.",
    descriptionEn: "Our refreshing cold coffee brewed for 16 hours.",
    price: 220, calories: 5, protein: 0, sugar: 0,
    recommendations: ["Cookies"]
  },
  {
    name: "S.Sebastian Cheesecake", nameEn: "S.Sebastian Cheesecake",
    description: "İçi yumuşacık, dışı yanık enfes tatlımız.",
    descriptionEn: "Soft inside, burnt outside delicious dessert.",
    price: 250, calories: 520, protein: 9, sugar: 32,
    recommendations: ["Americano", "Filtre Kahve"]
  },
  {
    name: "Mocha", nameEn: "Mocha",
    description: "Çikolata, espresso ve sıcak sütün harika uyumu.",
    descriptionEn: "Perfect harmony of chocolate, espresso and hot milk.",
    price: 190, calories: 280, protein: 9, sugar: 35,
    recommendations: ["Mini Kurabiye"]
  },
  {
    name: "V60", nameEn: "V60",
    description: "Özel filtre kağıdıyla demlenmiş berrak ve aromatik kahve.",
    descriptionEn: "Clear and aromatic coffee brewed with special filter paper.",
    price: 200, calories: 5, protein: 0, sugar: 0,
    recommendations: ["Mozaik Pasta"]
  },
  {
    name: "Brownie", nameEn: "Brownie",
    description: "Belçika çikolatası ile hazırlanan yoğun ıslak kekimiz.",
    descriptionEn: "Our intense moist cake prepared with Belgian chocolate.",
    price: 220, calories: 450, protein: 5, sugar: 35,
    recommendations: ["Latte", "Flat White"]
  }
];

export const getDailyProduct = () => {
  const day = new Date().getDay();
  return {
    ...dailySpecials[day],
    badge: "Baristanın Önerisi",
    badgeEn: "Barista's Choice"
  };
};

export const menuData: MenuCategory[] = [
  {
    id: "espresso",
    title: "ESPRESSO",
    titleEn: "ESPRESSO",
    icon: "Coffee",
    items: [
      { name: "Americano", description: "Espresso, Su", descriptionEn: "Espresso, Water", priceSmall: 130, priceLarge: 150 },
      { name: "Latte", description: "Espresso, Süt", descriptionEn: "Espresso, Milk", priceSmall: 160, priceLarge: 180, calories: 120, protein: 8, sugar: 9, recommendations: ["S.Sebastian Cheesecake", "Brownie"] },
      { name: "Cappucino", description: "Espresso, Süt, Süt Köpüğü", descriptionEn: "Espresso, Milk, Milk Foam", priceSmall: 160, priceLarge: 180, calories: 110, protein: 7, sugar: 8, recommendations: ["Tiramisu"] },
      { name: "Flat White", description: "Espresso, Mikro Köpürtülmüş Süt", descriptionEn: "Espresso, Micro-foamed Milk", priceSmall: 180, priceLarge: 200 },
      { name: "White Mocha", description: "Espresso, Beyaz Çikolata, Süt", descriptionEn: "Espresso, White Chocolate, Milk", priceSmall: 190, priceLarge: 210 },
      { name: "Caramel Macchiato", description: "Espresso, Karamel, Süt, Vanilya", descriptionEn: "Espresso, Caramel, Milk, Vanilla", priceSmall: 190, priceLarge: 210 },
      { name: "ToffeeNut Latte", description: "Espresso, Toffee Nut Şurubu, Süt", descriptionEn: "Espresso, Toffee Nut Syrup, Milk", priceSmall: 190, priceLarge: 210 },
      { name: "Mocha", description: "Espresso, Çikolata, Süt", descriptionEn: "Espresso, Chocolate, Milk", priceSmall: 190, priceLarge: 210 },
      { name: "Pumpkin Spice", description: "Espresso, Bal Kabağı Baharatı, Süt", descriptionEn: "Espresso, Pumpkin Spice, Milk", priceSmall: 190, priceLarge: 210 },
      { name: "Green Eye", description: "Espresso, Filtre Kahve", descriptionEn: "Espresso, Filter Coffee", price: 180 },
      { name: "Black Eye", description: "Double Espresso, Filtre Kahve", descriptionEn: "Double Espresso, Filter Coffee", price: 200 },
    ]
  },
  {
    id: "brews",
    title: "BREWS",
    titleEn: "BREWS",
    icon: "Droplet",
    items: [
      { name: "Filtre Kahve", nameEn: "Filter Coffee", description: "Demlenmiş Kahve", descriptionEn: "Brewed Coffee", priceSmall: 120, priceLarge: 140 },
      { name: "Chemex", description: "Özel Filtre Demleme", descriptionEn: "Special Filter Brew", price: 200 },
      { name: "v60", description: "Özel Filtre Demleme", descriptionEn: "Special Filter Brew", price: 200 },
      { name: "American Press", description: "Özel Basınçlı Demleme", descriptionEn: "Special Pressure Brew", price: 200 },
      { name: "Cold Brew", description: "Soğuk Demleme Kahve", descriptionEn: "Cold Brewed Coffee", price: 220, calories: 5, protein: 0, sugar: 0, recommendations: ["Cookie Pie", "Cookies"] },
      { name: "Türk Kahvesi", nameEn: "Turkish Coffee", description: "Geleneksel Türk Kahvesi", descriptionEn: "Traditional Turkish Coffee", priceSmall: 110, priceLarge: 150, calories: 5, protein: 0, sugar: 0 },
      { name: "Sütlü Türk Kahvesi", nameEn: "Turkish Coffee with Milk", description: "Sütlü Geleneksel Türk Kahvesi", descriptionEn: "Traditional Turkish Coffee with Milk", price: 160 },
    ]
  },
  {
    id: "classic-espresso",
    title: "CLASSIC ESPRESSO",
    titleEn: "CLASSIC ESPRESSO",
    icon: "CupSoda",
    items: [
      { name: "Espresso Single", description: "Tek Shot Espresso", descriptionEn: "Single Shot Espresso", price: 100 },
      { name: "Espresso Double", description: "Çift Shot Espresso", descriptionEn: "Double Shot Espresso", price: 140 },
      { name: "Espresso Mach.", description: "Espresso, Süt Köpüğü İşareti", descriptionEn: "Espresso, Milk Foam Mark", price: 140 },
      { name: "Espresso Cort.", description: "Espresso, Eşit Miktarda Süt", descriptionEn: "Espresso, Equal Part Milk", price: 170 },
      { name: "Espresso Affa.", description: "Espresso, Vanilyalı Dondurma", descriptionEn: "Espresso, Vanilla Ice Cream", price: 180 },
    ]
  },
  {
    id: "hot-drinks",
    title: "HOT DRINKS",
    titleEn: "HOT DRINKS",
    icon: "Flame",
    items: [
      { name: "Çay", nameEn: "Tea", description: "Siyah Çay", descriptionEn: "Black Tea", price: 70 },
      { name: "Bitki Çayı", nameEn: "Herbal Tea", description: "Mevsimsel Otlar", descriptionEn: "Seasonal Herbs", price: 170 },
      { name: "Chai Tea Latte", description: "Chai Baharatları, Süt", descriptionEn: "Chai Spices, Milk", priceSmall: 180, priceLarge: 200 },
      { name: "Hot Chocolate", description: "Sıcak Çikolata, Süt", descriptionEn: "Hot Chocolate, Milk", priceSmall: 170, priceLarge: 190 },
      { name: "Salep", description: "Sıcak Salep, Tarçın", descriptionEn: "Hot Salep, Cinnamon", priceSmall: 200, priceLarge: 220 },
    ]
  },
  {
    id: "fresh",
    title: "FRESH",
    titleEn: "FRESH",
    icon: "Leaf",
    items: [
      { name: "Lemonade", description: "Taze Limon, Nane", descriptionEn: "Fresh Lemon, Mint", price: 150 },
      { name: "Raspberry Hibiscus", description: "Ahududu, Hibiskus Özü", descriptionEn: "Raspberry, Hibiscus Extract", price: 200 },
      { name: "Iced Green Tea", description: "Soğuk Yeşil Çay, Mango / Şeftali / Ananas", descriptionEn: "Iced Green Tea, Mango / Peach / Pineapple", price: 200 },
      { name: "Ice Chai Tea Latte", description: "Soğuk Süt, Chai Baharatları", descriptionEn: "Cold Milk, Chai Spices", price: 200 },
    ]
  },
  {
    id: "cold-drinks",
    title: "COLD DRINKS",
    titleEn: "COLD DRINKS",
    icon: "Snowflake",
    items: [
      { name: "Milkshake", description: "Vanilya / Çikolata / Çilek, Süt, Dondurma", descriptionEn: "Vanilla / Chocolate / Strawberry, Milk, Ice Cream", price: 260 },
      { name: "Frozen", description: "Mango / Şeftali / Ananas / Yaban Mersini / Çilek / Orman Meyvesi / Çarkıfelek", descriptionEn: "Mango / Peach / Pineapple / Blueberry / Strawberry / Mixedberry / Passion Fruit", price: 210 },
      { name: "Frappe", description: "Vanilya / Çikolata / Karamel, Süt, Buz", descriptionEn: "Vanilla / Chocolate / Caramel, Milk, Ice", price: 230 },
    ]
  },
  {
    id: "desserts",
    title: "TATLILAR",
    titleEn: "DESSERTS",
    icon: "CakeSlice",
    items: [
      { name: "Brownie", description: "Belçika Çikolatası, Tereyağı", descriptionEn: "Belgian Chocolate, Butter", price: 220, calories: 450, protein: 5, sugar: 35 },
      { name: "Cookie Pie", description: "Kurabiye Hamuru, Çikolata Parçacıkları", descriptionEn: "Cookie Dough, Chocolate Chips", price: 220, calories: 400, protein: 4, sugar: 30 },
      { name: "Mozaik Pasta", nameEn: "Mosaic Cake", description: "Bisküvi, Çikolata Sosu", descriptionEn: "Biscuit, Chocolate Sauce", price: 190 },
      { name: "Coco Star", description: "Hindistan Cevizi, Çikolata Kaplama", descriptionEn: "Coconut, Chocolate Coating", price: 240 },
      { name: "Tiramisu", description: "Kedidili, Mascarpone, Espresso", descriptionEn: "Ladyfingers, Mascarpone, Espresso", price: 210 },
      { name: "Mozaik Kek", nameEn: "Mosaic Loaf", description: "Sade ve Kakaolu Kek", descriptionEn: "Plain and Cocoa Cake", price: 150 },
      { name: "Limonlu Kek", nameEn: "Lemon Cake", description: "Limon, Haşhaş", descriptionEn: "Lemon, Poppy Seed", price: 150 },
      { name: "Berry Hibiscus Kek", nameEn: "Berry Hibiscus Cake", description: "Orman Meyveleri, Hibiskus", descriptionEn: "Mixed Berries, Hibiscus", price: 230 },
      { name: "Ibiza", description: "Karamel, Bisküvi, Çikolata", descriptionEn: "Caramel, Biscuit, Chocolate", price: 240 },
      { name: "Snickers", description: "Yer Fıstığı, Karamel, Nuga", descriptionEn: "Peanuts, Caramel, Nougat", price: 240, calories: 480, protein: 10, sugar: 40 },
      { name: "S.Sebastian Cheesecake", description: "Krem Peynir, Krema", descriptionEn: "Cream Cheese, Cream", price: 250, calories: 520, protein: 9, sugar: 32 },
      { name: "Cheesecake", description: "Frambuaz / Limon, Krem Peynir", descriptionEn: "Raspberry / Lemon, Cream Cheese", price: 240 },
      { name: "Pavlova", description: "Beze, Krema, Taze Meyve", descriptionEn: "Meringue, Cream, Fresh Fruit", price: 250 },
      { name: "Spoonful/Magnolia", description: "Puding, Bebe Bisküvisi, Çilek / Muz", descriptionEn: "Pudding, Biscuit, Strawberry / Banana", price: 230 },
      { name: "Cookies", description: "Çikolata Parçacıklı Kurabiye", descriptionEn: "Chocolate Chip Cookie", price: 150 },
    ]
  },
  {
    id: "sandwiches",
    title: "SANDVİÇLER",
    titleEn: "SANDWICHES",
    icon: "Sandwich",
    items: [
      { name: "Dana Jambon Sandviç", nameEn: "Beef Ham Sandwich", description: "Dana Jambon, Peynir, Yeşillik", descriptionEn: "Beef Ham, Cheese, Greens", price: 230 },
      { name: "Hindi Füme Sandviç", nameEn: "Smoked Turkey Sandwich", description: "Hindi Füme, Kaşar, Domates", descriptionEn: "Smoked Turkey, Kashkaval, Tomato", price: 220 },
      { name: "Focaccia 5 Peynirli Sandviç", nameEn: "Focaccia 5 Cheese Sandwich", description: "5 Çeşit Peynir, Fesleğen Sos", descriptionEn: "5 Kinds of Cheese, Basil Pesto", price: 250 },
    ]
  },
  {
    id: "snacks",
    title: "SNACKS",
    titleEn: "SNACKS",
    icon: "Cookie",
    items: [
      { name: "Mini Kurabiye", nameEn: "Mini Cookies", price: 130 },
      { name: "Corny Vegan Bar", price: 100 },
      { name: "Fellas Protein", price: 150, calories: 150, protein: 15, sugar: 2, recommendations: ["Americano"] },
      { name: "Fellas Granola", price: 90, calories: 200, protein: 5, sugar: 5 },
    ]
  },
  {
    id: "extra",
    title: "EXTRA",
    titleEn: "EXTRA",
    icon: "Plus",
    items: [
      { name: "Espresso Shot", price: 40 },
      { name: "Aroma", price: 40 },
      { name: "Bal", nameEn: "Honey", price: 40 },
      { name: "Krema", nameEn: "Cream", price: 40 },
    ]
  },
  {
    id: "soft-bar",
    title: "SOFT BAR",
    titleEn: "SOFT DRINKS",
    icon: "GlassWater",
    items: [
      { name: "Pet Su", nameEn: "Water (Pet)", price: 30 },
      { name: "Cam Su", nameEn: "Water (Glass)", price: 60 },
      { name: "S. Pellegrino", price: 140 },
      { name: "Coca Cola", price: 100 },
      { name: "Zafer Gazoz", nameEn: "Zafer Lemonade", price: 75 },
      { name: "Beyoğlu Klasik / Zencefil", nameEn: "Beyoğlu Classic / Ginger", price: 90 },
    ]
  }
];
