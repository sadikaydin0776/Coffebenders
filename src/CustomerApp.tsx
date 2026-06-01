import React, { useState, useEffect, useRef } from 'react';
import { menuData, getDailyProduct, ambientVideoUrl, ambientPosterUrl } from './data';
import { MenuItem } from './types';
import { Logo } from './components/Logo';
import { Search, Sparkles, Share2, X, MessageSquare, CheckCircle2, Instagram, MapPin, Wifi, Phone, Globe, Info, Flame, ThumbsUp, Activity, Menu, Coffee, Droplet, CupSoda, Leaf, Snowflake, CakeSlice, Sandwich, Cookie, Plus, GlassWater, ShoppingCart, Minus, Bell, Receipt, Award, Gift, Shield, Music, Play, SquareTerminal, Pause, UserCheck, Calendar } from 'lucide-react';

import { motion, AnimatePresence } from 'motion/react';
import QRCode from "react-qr-code";

const t = {
  tr: {
    shareMenu: "Menüyü Paylaş",
    shareDesc: "Kameranızı kullanarak QR kodu okutun ve dijital menüye kendi cihazınızdan erişin.",
    searchPlaceholder: "Menüde ara...",
    specialOffers: "Özel Fırsatlar",
    noResults: "Sonuç bulunamadı:",
    feedbackBtn: "Geri Bildirim Ver",
    feedbackTitle: "Geri Bildirim",
    feedbackSub: "Fikirlerinizi Önemsiyoruz",
    feedbackPlace: "Kahvelerimiz, hizmetimiz veya mekanımız hakkındaki düşüncelerinizi buraya yazabilirsiniz...",
    send: "Gönder",
    thanks: "Teşekkürler!",
    thanksDesc: "Geri bildiriminiz başarıyla iletildi. Değerli görüşleriniz bizim için çok önemli.",
    wifiTitle: "WiFi Bağlantısı",
    networkName: "Ağ Adı",
    password: "Şifre",
    close: "Kapat",
    footerText: "Fiyatlara KDV dahildir • El yapımı süreç sabır gerektirir • Anın tadını çıkarın",
    nutritionalInfo: "İçerik Bilgisi",
    calories: "Kalori",
    protein: "Protein",
    sugar: "Şeker",
    recommendationsText: "Bunun yanında şunu deneyin",
    tryWithIt: "En uyumlu tatlı",
    productOfDay: "Bugünün Kahvesi",
    baristaSuggestion: "Baristanın Önerisi",
    kcal: "kcal",
    grams: "g",
    nutritionExplorerBtn: "Kalori & İçerik Hesapla",
    nutritionExplorerTitle: "Besin Değerleri ve İçerik",
    nutritionExplorerDesc: "İçecek ve yiyeceklerimizin kalori, protein ve şeker oranlarını inceleyin.",
    nutritionSearchPlaceholder: "Ürün ara (ör: Latte, Brownie)..."
  },
  en: {
    shareMenu: "Share Menu",
    shareDesc: "Scan the QR code with your camera to access the digital menu on your device.",
    searchPlaceholder: "Search menu...",
    specialOffers: "Special Offers",
    noResults: "No results found:",
    feedbackBtn: "Give Feedback",
    feedbackTitle: "Feedback",
    feedbackSub: "We Care About Your Opinions",
    feedbackPlace: "You can write your thoughts about our coffees, service, or place here...",
    send: "Send",
    thanks: "Thank You!",
    thanksDesc: "Your feedback has been successfully submitted. Your valuable opinions are very important to us.",
    wifiTitle: "WiFi Connection",
    networkName: "Network Name",
    password: "Password",
    close: "Close",
    footerText: "Prices include VAT • Artisanal process requires patience • Enjoy the moment",
    nutritionalInfo: "Nutritional Info",
    calories: "Calories",
    protein: "Protein",
    sugar: "Sugar",
    recommendationsText: "Try this with it",
    tryWithIt: "Best paired with",
    productOfDay: "Coffee of the Day",
    baristaSuggestion: "Barista's Choice",
    kcal: "kcal",
    grams: "g",
    nutritionExplorerBtn: "Calorie & Nutrition Calculator",
    nutritionExplorerTitle: "Nutritional Values",
    nutritionExplorerDesc: "Explore the calorie, protein, and sugar content of our drinks and food.",
    nutritionSearchPlaceholder: "Search products (e.g., Latte, Brownie)..."
  }
};

export default function CustomerApp() {
  const dailyProduct = getDailyProduct();
  const [activeCategory, setActiveCategory] = useState<string>(menuData[0].id);
  const [searchQuery, setSearchQuery] = useState("");
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isQuickMenuOpen, setIsQuickMenuOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [isWifiModalOpen, setIsWifiModalOpen] = useState(false);
  const [isNutritionExplorerOpen, setIsNutritionExplorerOpen] = useState(false);
  const [nutritionSearchQuery, setNutritionSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [language, setLanguage] = useState<'tr' | 'en'>('tr');
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [cart, setCart] = useState<Array<{ item: MenuItem; quantity: number }>>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderNotes, setOrderNotes] = useState("");
  const [orderType, setOrderType] = useState<'table' | 'takeaway'>('table');
  const [orderSent, setOrderSent] = useState(false);
  const [tableNumber, setTableNumber] = useState("Masa 1"); // Could come from URL param
  const [coffeeCount, setCoffeeCount] = useState(() => {
    try {
      const saved = localStorage.getItem('coffeeCount');
      return saved ? parseInt(saved, 10) : 0;
    } catch { return 0; }
  });
  const [isLoyaltyOpen, setIsLoyaltyOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<{name: string; birthDate: string}>(() => {
    try {
      const saved = localStorage.getItem('userProfile');
      return saved ? JSON.parse(saved) : { name: "", birthDate: "" };
    } catch { return { name: "", birthDate: "" }; }
  });
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const [isMusicMenuOpen, setIsMusicMenuOpen] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  const PLAYLIST = [
    { title: "Jazz Cafe (Orijinal)", url: "https://cdn.pixabay.com/download/audio/2022/11/22/audio_febc508520.mp3?filename=smooth-jazz-cafe-124618.mp3" },
    { title: "Sia - Unstoppable", url: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_51c6c5a034.mp3?filename=cinematic-time-lapse-115622.mp3" },
    { title: "Neil Young", url: "https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3" }
  ];

  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(PLAYLIST[currentSongIndex].url);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.4;
    }

    const handleInteraction = () => {
      if (audioRef.current && !isPlayingMusic) {
        audioRef.current.play().then(() => {
          setIsPlayingMusic(true);
        }).catch(() => {
          // Ignore autoplay blocks quietly
        });
      }
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('scroll', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };

    document.addEventListener('click', handleInteraction);
    document.addEventListener('scroll', handleInteraction);
    document.addEventListener('touchstart', handleInteraction);

    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('scroll', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
      if (audioRef.current && !isPlayingMusic) {
         // keep it playing if it was playing, but on unmount stop
      }
    };
  }, []);

  // Update src when currentSongIndex changes
  useEffect(() => {
    if (audioRef.current) {
      const wasPlaying = isPlayingMusic;
      audioRef.current.pause();
      audioRef.current.src = PLAYLIST[currentSongIndex].url;
      audioRef.current.load();
      if (wasPlaying) {
        audioRef.current.play().catch(() => {});
      }
    }
  }, [currentSongIndex]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    }
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlayingMusic) {
        audioRef.current.pause();
        setIsPlayingMusic(false);
      } else {
        audioRef.current.play();
        setIsPlayingMusic(true);
      }
    }
  };

  useEffect(() => {
    try {
      localStorage.setItem('coffeeCount', coffeeCount.toString());
    } catch {}
  }, [coffeeCount]);

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.item.name === item.name);
      if (existing) {
        return prev.map(i => i.item.name === item.name ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemName: string) => {
    setCart(prev => prev.filter(i => i.item.name !== itemName));
  };

  const updateQuantity = (itemName: string, delta: number) => {
    setCart(prev => prev.map(i => {
      if (i.item.name === itemName) {
        const newQ = Math.max(0, i.quantity + delta);
        return { ...i, quantity: newQ };
      }
      return i;
    }).filter(i => i.quantity > 0));
  };
  
  const isCoffeeItem = (item: MenuItem) => {
    return menuData.some(cat => 
      (cat.id === 'sicak-kahveler' || cat.id === 'soguk-kahveler' || cat.id === 'yoresel-filtre') && 
      cat.items.some(i => i.name === item.name)
    );
  };

  // Calculate cart totals
  let subtotal = 0;
  let availableFreeCoffees = Math.floor(coffeeCount / 5);
  let discountAmount = 0;
  let freeCoffeesApplied = 0;
  
  // To apply discount, we find all coffee items in cart, sort by price (cheapest first or most expensive first? 
  // Customarily cheapest first, but mathematically we can just sort by price ascending)
  const coffeePricesInCart: number[] = [];

  cart.forEach(c => {
    const rawPrice = c.item.priceSmall || c.item.price || 0;
    const priceNum = typeof rawPrice === 'string' ? parseFloat(rawPrice.replace(',', '.')) : rawPrice;
    subtotal += priceNum * c.quantity;

    if (isCoffeeItem(c.item)) {
      for (let k = 0; k < c.quantity; k++) {
        coffeePricesInCart.push(priceNum);
      }
    }
  });

  coffeePricesInCart.sort((a, b) => a - b); // Cheapest first
  for (let i = 0; i < Math.min(availableFreeCoffees, coffeePricesInCart.length); i++) {
    discountAmount += coffeePricesInCart[i];
    freeCoffeesApplied++;
  }
  
  const finalTotal = Math.max(0, subtotal - discountAmount);

  const getNumberFormatted = (num: number) => {
    return num.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const submitOrder = async () => {
    if (cart.length === 0) return;
    try {
      const { createOrder } = await import('./store');
      await createOrder({
        tableNumber,
        orderType,
        customerName: userProfile?.name || 'Misafir',
        notes: orderNotes,
        finalTotal,
        discountApplied: discountAmount,
        items: cart.map(c => ({ name: c.item.name, quantity: c.quantity, price: c.item.priceSmall || c.item.price }))
      });
      
      let newCoffeesBought = 0;
      cart.forEach(c => {
        if (isCoffeeItem(c.item)) {
          newCoffeesBought += c.quantity;
        }
      });
      
      // Calculate new coffee count
      // We deduct 5 for each free coffee applied, and add the new coffees bought.
      let nextCount = coffeeCount - (freeCoffeesApplied * 5) + newCoffeesBought;
      if (nextCount > 0) {
        setCoffeeCount(nextCount);
      } else {
        setCoffeeCount(0); // safeguard
      }

      setOrderSent(true);
      setCart([]);
      setOrderNotes("");
      setTimeout(() => {
        setOrderSent(false);
        setIsCartOpen(false);
      }, 3000);
    } catch (err) {
      console.error(err);
      alert("Sipariş gönderilirken hata oluştu.");
    }
  };

  const handleCategoryClick = (id: string) => {
    setActiveCategory(id);
    setSearchQuery("");
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (feedbackText.trim()) {
      setFeedbackSent(true);
      setTimeout(() => {
        setIsFeedbackModalOpen(false);
        setFeedbackSent(false);
        setFeedbackText("");
      }, 3000);
    }
  };

  const displayedCategories = searchQuery.trim() !== ''
    ? menuData
        .map(c => ({
          ...c,
          items: c.items.filter(i => 
            i.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
            (i.nameEn && i.nameEn.toLowerCase().includes(searchQuery.toLowerCase()))
          )
        }))
        .filter(c => c.items.length > 0)
    : menuData.filter(c => c.id === activeCategory);

  const getIcon = (iconName?: string, className?: string) => {
    const defaultClass = "w-3.5 h-3.5 mr-1.5 inline-block opacity-80";
    const props = { className: className || defaultClass };
    switch(iconName) {
      case "Coffee": return <Coffee {...props} />;
      case "Droplet": return <Droplet {...props} />;
      case "CupSoda": return <CupSoda {...props} />;
      case "Flame": return <Flame {...props} />;
      case "Leaf": return <Leaf {...props} />;
      case "Snowflake": return <Snowflake {...props} />;
      case "CakeSlice": return <CakeSlice {...props} />;
      case "Sandwich": return <Sandwich {...props} />;
      case "Cookie": return <Cookie {...props} />;
      case "Plus": return <Plus {...props} />;
      case "GlassWater": return <GlassWater {...props} />;
      default: return null;
    }
  };

  const getText = (trText: string, enText: string | undefined) => {
    if (language === 'en' && enText) return enText;
    return trText;
  };

  const isBirthday = () => {
    if (!userProfile?.birthDate) return false;
    const today = new Date();
    const bd = new Date(userProfile.birthDate);
    return today.getMonth() === bd.getMonth() && today.getDate() === bd.getDate();
  };

  const getLocalizedString = (key: keyof typeof t.tr) => {
    return t[language][key];
  };

  return (
    <div className="min-h-screen bg-[#F8FAF7] font-serif selection:bg-[#1B422B] selection:text-[#F8FAF7] pb-24 overflow-x-hidden">
      {/* Header Info */}
      <header className="bg-[#1B422B] text-[#F8FAF7] py-10 px-6 sm:px-12 rounded-b-[40px] shadow-sm relative overflow-hidden">
        <div className="absolute inset-0 border-[4px] border-[#F8FAF7]/10 rounded-b-[40px] m-2 pointer-events-none"></div>
        <button 
          onClick={() => setLanguage(lang => lang === 'tr' ? 'en' : 'tr')}
          className="absolute top-6 left-6 z-20 flex items-center justify-center p-2.5 rounded-full bg-[#F8FAF7]/10 hover:bg-[#F8FAF7]/20 transition-colors backdrop-blur-sm cursor-pointer border border-[#F8FAF7]/20"
          aria-label="Dil Değiştir"
        >
          <Globe className="w-5 h-5 text-[#F8FAF7] mr-1.5" />
          <span className="font-sans text-xs font-bold leading-none tracking-wider">{language === 'tr' ? 'EN' : 'TR'}</span>
        </button>
        <button 
          onClick={() => setIsMusicMenuOpen(true)}
          className="absolute top-6 left-[100px] z-20 flex items-center justify-center p-2.5 rounded-full bg-[#F8FAF7]/10 hover:bg-[#F8FAF7]/20 transition-colors backdrop-blur-sm cursor-pointer border border-[#F8FAF7]/20"
          aria-label="Müzik Çal/Durdur"
        >
          {isPlayingMusic ? <Music className="w-5 h-5 text-orange-300 animate-pulse" /> : <Music className="w-5 h-5 text-[#F8FAF7]/50" />}
        </button>
        <button 
          onClick={() => setIsCartOpen(true)}
          className="absolute top-6 right-20 z-20 flex items-center justify-center p-2.5 rounded-full bg-[#F8FAF7]/10 hover:bg-[#F8FAF7]/20 transition-colors backdrop-blur-sm cursor-pointer border border-[#F8FAF7]/20 relative"
          aria-label="Sepet"
        >
          <ShoppingCart className="w-5 h-5 text-[#F8FAF7]" />
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              {cart.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          )}
        </button>
        <button 
          onClick={() => setIsProfileOpen(true)}
          className="absolute top-6 right-[136px] z-20 flex items-center justify-center p-2.5 rounded-full bg-[#F8FAF7]/10 hover:bg-[#F8FAF7]/20 transition-colors backdrop-blur-sm cursor-pointer border border-[#F8FAF7]/20"
          aria-label="Profil"
        >
          <UserCheck className="w-5 h-5 text-[#F8FAF7]" />
        </button>
        <button 
          onClick={() => setIsShareModalOpen(true)}
          className="absolute top-6 right-[192px] hidden sm:flex z-20 p-2.5 rounded-full bg-[#F8FAF7]/10 hover:bg-[#F8FAF7]/20 transition-colors backdrop-blur-sm cursor-pointer border border-[#F8FAF7]/20"
          aria-label="Menüyü Paylaş"
        >
          <Share2 className="w-5 h-5 text-[#F8FAF7]" />
        </button>
        <button 
          onClick={() => setIsQuickMenuOpen(true)}
          className="absolute top-6 right-6 z-20 p-2.5 rounded-full bg-[#F8FAF7]/10 hover:bg-[#F8FAF7]/20 transition-colors backdrop-blur-sm cursor-pointer border border-[#F8FAF7]/20"
          aria-label="Hızlı Arama Menüsü"
        >
          <Menu className="w-5 h-5 text-[#F8FAF7]" />
        </button>
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10 mt-6 sm:mt-2">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Logo className="w-24 h-24 mb-6 shadow-xl rounded-[20px] border border-[#F8FAF7]/10 p-1" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="font-serif text-4xl sm:text-5xl font-light tracking-[0.15em] uppercase mb-2"
          >
            Coffee Benders
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-[#F8FAF7]/80 uppercase tracking-[0.3em] text-xs sm:text-sm mb-4"
          >
            Brew & Store
          </motion.p>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="font-medium italic opacity-80 tracking-wide text-sm font-sans mb-8"
          >
            "the last coffee benders"
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex items-center justify-center gap-4 sm:gap-6"
          >
            <a href="https://instagram.com/coffeebenders" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 text-[#F8FAF7]/80 hover:text-[#F8FAF7] transition-colors group">
              <div className="p-3 rounded-full bg-[#F8FAF7]/5 group-hover:bg-[#F8FAF7]/15 transition-colors border border-[#F8FAF7]/10 group-hover:border-[#F8FAF7]/30">
                <Instagram className="w-5 h-5" />
              </div>
            </a>
            <a href="https://www.google.com/maps/search/?api=1&query=Yıldız+Mah.+Eski+Çakırlar+Cad.+Nebahat+Kaya+İş+Merkezi+No%3A52C+-+3+Nolu+Dükkan%2C+07050+Muratpaşa%2FAntalya" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 text-[#F8FAF7]/80 hover:text-[#F8FAF7] transition-colors group">
              <div className="p-3 rounded-full bg-[#F8FAF7]/5 group-hover:bg-[#F8FAF7]/15 transition-colors border border-[#F8FAF7]/10 group-hover:border-[#F8FAF7]/30">
                <MapPin className="w-5 h-5" />
              </div>
            </a>
            <button onClick={() => setIsWifiModalOpen(true)} className="flex flex-col items-center gap-2 text-[#F8FAF7]/80 hover:text-[#F8FAF7] transition-colors group cursor-pointer">
              <div className="p-3 rounded-full bg-[#F8FAF7]/5 group-hover:bg-[#F8FAF7]/15 transition-colors border border-[#F8FAF7]/10 group-hover:border-[#F8FAF7]/30">
                <Wifi className="w-5 h-5" />
              </div>
            </button>
            <a href="tel:+902422380748" className="flex flex-col items-center gap-2 text-[#F8FAF7]/80 hover:text-[#F8FAF7] transition-colors group">
              <div className="p-3 rounded-full bg-[#F8FAF7]/5 group-hover:bg-[#F8FAF7]/15 transition-colors border border-[#F8FAF7]/10 group-hover:border-[#F8FAF7]/30">
                <Phone className="w-5 h-5" />
              </div>
            </a>
          </motion.div>
        </div>
      </header>

      {/* Sticky Navigation and Search */}
      <div className="sticky top-0 z-50 bg-[#F8FAF7]/95 backdrop-blur-md border-b border-[#1B422B]/10 shadow-sm transition-all pb-2">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-4 pb-2">
          {/* Search Bar */}
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#1B422B]/40">
              <Search className="h-4 w-4" />
            </div>
            <input
              type="text"
              placeholder={getLocalizedString("searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-[#1B422B] text-[#1B422B] rounded-full py-3.5 pl-12 pr-4 font-sans text-[13px] tracking-wide focus:outline-none focus:ring-1 focus:ring-[#1B422B] transition-shadow placeholder:text-[#1B422B]/40 shadow-sm"
            />
          </div>
          
          <div className="overflow-x-auto no-scrollbar pb-2">
            <div className="flex space-x-2 w-max px-1">
              {menuData.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className={`flex items-center px-5 py-2.5 rounded-full text-[11px] font-sans tracking-[2px] uppercase transition-all duration-300 ${
                    activeCategory === category.id && !searchQuery
                      ? 'bg-[#1B422B] text-[#F8FAF7] shadow-md border-transparent scale-105'
                      : 'bg-white text-[#1B422B]/70 hover:text-[#1B422B] border border-[#1B422B]/10 hover:border-[#1B422B]/30'
                  }`}
                >
                  {getIcon(category.icon)}
                  <span>{getText(category.title, category.titleEn)}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Menu Categories */}
      <main className="max-w-4xl mx-auto px-4 sm:px-8 mt-8">
        
        {/* Promotions Carousel and Daily Product */}
        {searchQuery.trim() === '' && activeCategory === menuData[0].id && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            {/* Loyalty Card (Hero position) */}
            <div className="bg-white rounded-[24px] p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-[#1B422B]/5 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#2B603D]/5 rounded-bl-full -mr-4 -mt-4 pointer-events-none md:hidden"></div>
              
              <div className="flex-1">
                <div className="flex items-start gap-4 mb-4 md:mb-6">
                  <div className="bg-[#1B422B]/5 text-[#2B603D] p-3 rounded-full shrink-0">
                    <Award size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl font-serif italic text-[#1B422B]">Sadakat Kartı</h2>
                    <p className="text-sm font-sans text-[#1B422B]/60 mt-1">5 kahve iç, 6. <span className="font-bold text-[#D97706]">BEDAVA</span></p>
                  </div>
                </div>

                <div className="flex items-center gap-2 md:gap-4 lg:gap-6 mb-2">
                  {Array.from({ length: 6 }).map((_, index) => {
                    const stamps = coffeeCount % 6;
                    const isEarned = index < stamps;
                    const isFreeCoffee = index === 5;
                    
                    return (
                      <div key={index} className="flex flex-col items-center">
                        <div 
                          className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300
                            ${isEarned && !isFreeCoffee ? 'bg-[#1B422B] text-[#F8FAF7] shadow-md scale-105' : ''}
                            ${!isEarned && !isFreeCoffee ? 'bg-[#1B422B]/5 text-[#1B422B]/20' : ''}
                            ${isFreeCoffee && stamps === 5 ? 'bg-gradient-to-r from-orange-400 to-orange-500 text-[#F8FAF7] shadow-lg scale-110 shadow-orange-500/20' : ''}
                            ${isFreeCoffee && stamps < 5 ? 'bg-[#F8FAF7] border-[1.5px] border-dashed border-[#D97706] text-[#D97706]' : ''}
                          `}
                        >
                          {isFreeCoffee ? <Gift size={isFreeCoffee && stamps === 5 ? 20 : 16} /> : <Coffee size={isEarned ? 18 : 16} />}
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="flex md:hidden justify-between items-center mt-3">
                  <p className="font-medium font-sans text-[13px] text-[#1B422B]">
                    {(coffeeCount % 6) === 5 ? 'Tebrikler! Kahveniz BEDAVA' : `${5 - (coffeeCount % 6)} kahve kala bedava`}
                  </p>
                  <p className="text-[11px] font-bold font-mono text-[#D97706] bg-orange-50 px-3 py-1.5 rounded-full tracking-wider">
                    {(coffeeCount % 6)}/5
                  </p>
                </div>
              </div>

              <div className="flex-1 w-full md:max-w-xs flex flex-col md:border-l md:border-[#1B422B]/10 md:pl-8">
                <div className="hidden md:flex justify-between items-center mb-6">
                  <p className="font-medium font-sans text-[14px] text-[#1B422B]">
                    {(coffeeCount % 6) === 5 ? 'Tebrikler! Kahve Hediye!' : `${5 - (coffeeCount % 6)} kahve kala bedava`}
                  </p>
                  <p className="text-[12px] font-bold font-mono text-[#D97706] bg-orange-50 px-3 py-1.5 rounded-full tracking-wider">
                    {(coffeeCount % 6)}/5
                  </p>
                </div>
                <button 
                  onClick={() => setCoffeeCount(prev => prev + 1)}
                  className={`w-full font-sans font-medium py-3.5 md:py-4 rounded-2xl flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.98]
                    ${(coffeeCount % 6) === 5 
                      ? 'bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-[#F8FAF7] shadow-md' 
                      : 'bg-[#1B422B] hover:bg-[#2B603D] text-[#F8FAF7]'
                    }`}
                >
                  {(coffeeCount % 6) === 5 ? (
                    <>Hediyeni Al <CheckCircle2 size={18} /></>
                  ) : (
                    <>Damga Ekle <Plus size={18} /></>
                  )}
                </button>
              </div>
            </div>

            {/* Daily Product */}
            <div className="mb-8">
              <div className="flex items-center space-x-2 mb-4">
                <Flame className="w-5 h-5 text-[#2B603D]" />
                <h2 className="font-sans text-[0.7rem] uppercase tracking-[3px] text-[#2B603D] font-bold">{getLocalizedString("productOfDay")}</h2>
              </div>
              <div 
                className="bg-[#1B422B] text-[#F8FAF7] rounded-[24px] overflow-hidden shadow-lg relative cursor-pointer group"
                onClick={() => setSelectedItem(dailyProduct as MenuItem)}
              >
                <div className="p-6 md:p-8 flex flex-col justify-center bg-gradient-to-br from-[#1B422B] to-[#122A1C]">
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-[#F8FAF7] text-[#1B422B] rounded-full text-[10px] font-sans font-bold uppercase tracking-[1px] shadow-sm">
                      {getText(dailyProduct.badge, dailyProduct.badgeEn)}
                    </span>
                  </div>
                  <h3 className="font-serif italic text-2xl md:text-3xl mb-2 group-hover:text-[#F8FAF7]/90 transition-colors">{getText(dailyProduct.name, dailyProduct.nameEn)}</h3>
                  <p className="font-sans text-sm md:text-base opacity-80 leading-relaxed mb-6 max-w-2xl">
                    {getText(dailyProduct.description, dailyProduct.descriptionEn)}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                     <span className="font-sans text-xl md:text-2xl font-semibold">{dailyProduct.price} ₺</span>
                     <button className="w-10 h-10 rounded-full bg-[#F8FAF7]/10 flex items-center justify-center group-hover:bg-[#F8FAF7]/20 transition-colors">
                       <Info className="w-5 h-5 text-[#F8FAF7]" />
                     </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Birthday Card */}
              {isBirthday() ? (
                <div id="birthday-card" className="bg-gradient-to-br from-[#1B422B] to-[#122A1C] rounded-[24px] p-6 shadow-md relative overflow-hidden group flex flex-col justify-between min-h-[160px]">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 blur-xl mix-blend-overlay"></div>
                  
                  <div className="flex justify-between items-start mb-6 relative">
                    <div>
                      <span className="text-[10px] font-sans font-bold text-[#F8FAF7]/80 uppercase tracking-widest mb-2 block">
                        Mutlu Yıllar {userProfile.name}!
                      </span>
                      <h2 className="text-xl font-serif italic text-[#F8FAF7] leading-snug">
                        Bugün 1 kahve <br/><span className="text-orange-300 font-sans not-italic font-bold tracking-wide">BEDAVA</span>
                      </h2>
                    </div>
                    <div className="bg-[#F8FAF7]/10 p-3 rounded-full text-orange-300 backdrop-blur-sm border border-[#F8FAF7]/10">
                      <Gift size={24} />
                    </div>
                  </div>

                  <button 
                    onClick={() => alert("Doğum günü hediyeniz sepete eklendi! Afiyet olsun.")}
                    className="w-full mt-auto bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 active:scale-[0.98] transition-all text-[#1B422B] font-sans font-bold tracking-wide py-3 rounded-2xl shadow-lg cursor-pointer border border-orange-300/50"
                  >
                    Hediyeni Al
                  </button>
                </div>
              ) : (
                <div id="birthday-card" className="bg-gradient-to-br from-[#1B422B] to-[#122A1C] rounded-[24px] p-6 shadow-md relative overflow-hidden group flex flex-col justify-between min-h-[160px]">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 blur-xl mix-blend-overlay"></div>
                  <div className="flex justify-between items-start mb-6 relative z-10">
                    <div>
                      <h2 className="text-xl font-serif italic text-[#F8FAF7] leading-snug">
                        Doğum Gününe<br/>Özel Hediye
                      </h2>
                    </div>
                    <div className="bg-[#F8FAF7]/10 p-3 rounded-full text-[#F8FAF7]/50 backdrop-blur-sm border border-[#F8FAF7]/10">
                      <Gift size={24} />
                    </div>
                  </div>
                  <p className="text-sm font-sans text-white/70 mb-4 relative z-10">Profilinize doğum tarihinizi ekleyin, doğum gününüzde bir adet sürpriz hediye kahvenizi bizden alin!</p>
                  <button 
                    onClick={() => setIsProfileOpen(true)}
                    className="w-full relative z-10 mt-auto bg-white/10 hover:bg-white/20 active:scale-[0.98] transition-all text-white font-sans font-bold py-3 rounded-2xl cursor-pointer border border-white/20"
                  >
                    Doğum Tarihi Ekle
                  </button>
                </div>
              )}

              {/* Nutrition Explorer Trigger */}
              <div 
                onClick={() => setIsNutritionExplorerOpen(true)}
                className="bg-[#2B603D] text-[#F8FAF7] rounded-[24px] p-6 shadow-md relative overflow-hidden cursor-pointer group hover:bg-[#1B422B] transition-colors flex flex-col justify-between min-h-[160px]"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 blur-xl"></div>
                <div className="relative z-10 flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Activity className="w-5 h-5 text-[#F8FAF7]" />
                    <h3 className="font-serif italic text-xl">{getLocalizedString("nutritionExplorerBtn")}</h3>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#F8FAF7]/10 flex items-center justify-center group-hover:bg-[#F8FAF7]/20 transition-colors shrink-0">
                    <Search className="w-5 h-5 text-[#F8FAF7]" />
                  </div>
                </div>
                <p className="relative z-10 font-sans text-sm opacity-80 max-w-sm mt-auto">
                  {getLocalizedString("nutritionExplorerDesc")}
                </p>
              </div>

              {/* Store Location Card Mini */}
              <div 
                className="bg-[#F8FAF7] rounded-[24px] shadow-md border border-[#1B422B]/5 relative overflow-hidden group flex flex-col justify-between min-h-[160px]"
              >
                <div className="absolute inset-0 z-0">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3190.170560706691!2d30.68652077651034!3d36.91030097221568!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c38fa2207a9ee5%3A0xe54b419b4a45a278!2sY%C4%B1ld%C4%B1z%2C%20Eski%20%C3%87ak%C4%B1rlar%20Cd.%20No%3A52%20D%3A3%2C%2007050%20Muratpa%C5%9Fa%2FAntalya!5e0!3m2!1str!2str!4v1700000000000!5m2!1str!2str" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0, filter: 'contrast(1.05) opacity(0.8)' }} 
                    allowFullScreen={true} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Coffee Shop Location"
                  ></iframe>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/40 to-transparent pointer-events-none z-0"></div>
                
                <div className="relative z-10 p-6 flex flex-col h-full bg-transparent">
                  <div className="mt-auto">
                    <div className="flex items-center gap-2 mb-1.5">
                      <MapPin size={18} className="text-[#D97706]" />
                      <span className="font-sans font-bold text-[#1B422B] text-lg">Biz Buradayız</span>
                    </div>
                    <p className="font-sans text-[12px] text-[#1B422B]/80 leading-relaxed mb-4 font-medium">
                      Yıldız Mah. Eski Çakırlar Cad. Muratpaşa / Antalya
                    </p>
                    <a 
                      href="https://www.google.com/maps/search/?api=1&query=Yıldız+Mah.+Eski+Çakırlar+Cad.+Nebahat+Kaya+İş+Merkezi+No%3A52C+-+3+Nolu+Dükkan%2C+07050+Muratpaşa%2FAntalya" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-full bg-[#1B422B] text-white flex items-center justify-center p-3 sm:px-4 rounded-[16px] shadow-lg hover:bg-[#2B603D] hover:scale-[1.02] active:scale-95 transition-all pointer-events-auto"
                      aria-label="Yol Tarifi Al"
                    >
                      <span className="font-sans font-medium text-sm">Yol Tarifi Al</span>
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        )}

        {searchQuery.trim() !== '' && displayedCategories.length === 0 && (
          <div className="text-center text-[#1B422B]/60 font-sans mt-20 py-8">
            {getLocalizedString("noResults")} "{searchQuery}"
          </div>
        )}
        <AnimatePresence mode="popLayout">
          {displayedCategories.map((category) => (
            <motion.section
              key={category.id + (searchQuery ? '-search' : '')}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="mb-16"
            >
              <div className="flex items-center space-x-4 mb-8">
                <h2 className="font-sans text-[0.75rem] uppercase tracking-[3px] text-[#2B603D] border-b border-[#1B422B]/30 pb-2 inline-block shrink-0">
                  {getText(category.title, category.titleEn)}
                </h2>
                <div className="flex-grow"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 md:gap-y-8">
                {category.items.map((item, idx) => (
                  <div 
                    key={idx} 
                    className="flex justify-between items-start group cursor-pointer hover:bg-white p-4 -mx-4 rounded-2xl transition-all border border-transparent hover:border-[#1B422B]/5 hover:shadow-sm"
                    onClick={() => setSelectedItem(item)}
                  >
                    <div className="pr-4">
                      <h3 className="font-serif italic text-lg md:text-xl font-medium text-[#1B422B] leading-tight group-hover:text-[#2B603D] transition-colors">
                        {getText(item.name, item.nameEn)}
                      </h3>
                      {(item.description || item.descriptionEn) && (
                        <p className="font-sans text-[11px] md:text-xs text-[#1B422B] opacity-50 mt-1.5 max-w-[240px] leading-relaxed">
                          {getText(item.description || '', item.descriptionEn || undefined)}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-4 font-sans shrink-0 mt-1">
                      {item.priceLarge && item.priceSmall && (
                        <div className="flex items-center gap-4">
                          <div className="flex flex-col items-end">
                            <div className="text-[#1B422B]/70 font-medium text-[15px] leading-none">{item.priceSmall} ₺</div>
                            <div className="text-[9px] uppercase tracking-[1px] text-[#1B422B]/40 mt-1">Küçük</div>
                          </div>
                          <div className="w-[1px] h-6 bg-[#1B422B]/10"></div>
                          <div className="flex flex-col items-end">
                            <div className="text-[#1B422B] font-semibold text-[15px] leading-none">{item.priceLarge} ₺</div>
                            <div className="text-[9px] uppercase tracking-[1px] text-[#1B422B]/60 mt-1">Büyük</div>
                          </div>
                        </div>
                      )}
                      {item.price && !item.priceLarge && (
                        <div className="flex flex-col items-end">
                          <div className="text-[#1B422B] font-semibold text-[15px] leading-none">{item.price} ₺</div>
                          <div className="text-[9px] uppercase tracking-[1px] text-transparent select-none mt-1">Std</div>
                        </div>
                      )}
                      {!item.priceSmall && item.priceLarge && (
                        <div className="flex flex-col items-end">
                          <div className="text-[#1B422B] font-semibold text-[15px] leading-none">{item.priceLarge} ₺</div>
                          <div className="text-[9px] uppercase tracking-[1px] text-[#1B422B]/60 mt-1">Büyük</div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
          ))}
        </AnimatePresence>

        {/* Standalone Ambient Video */}
        <div className="mt-16 rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-lg aspect-[4/5] sm:aspect-[21/9] bg-[#1B422B] relative group relative">
          <video 
            src={ambientVideoUrl} 
            poster={ambientPosterUrl}
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-1000 absolute inset-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1B422B]/90 via-transparent to-transparent flex items-end justify-center p-8 pointer-events-none">
            <h2 className="text-[#F8FAF7] font-serif italic text-3xl md:text-4xl tracking-wide translate-y-2 group-hover:translate-y-0 transition-transform duration-500 shadow-sm">
              Coffee Benders
            </h2>
          </div>
        </div>
      </main>
      
      {/* Footer minimal info */}
      <footer className="mt-24 pb-8 max-w-4xl mx-auto px-4 text-center">
        <div className="flex justify-center items-center gap-4 mb-6">
          <button
            onClick={() => setIsFeedbackModalOpen(true)}
            className="flex items-center space-x-2 text-[#1B422B] bg-[#1B422B]/5 px-4 py-2 rounded-full hover:bg-[#1B422B]/10 transition-colors font-sans text-sm tracking-wide cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>{getLocalizedString("feedbackBtn")}</span>
          </button>
          
          <button
            onClick={() => window.open("/admin", "_blank")}
            className="flex items-center space-x-2 text-[#1B422B]/50 hover:text-[#1B422B] bg-transparent px-2 py-2 rounded-full transition-colors font-sans text-xs tracking-wide cursor-pointer"
            title="Yönetici Paneli"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Giriş</span>
          </button>
        </div>
        <div className="font-sans text-[10px] uppercase tracking-[2px] opacity-40 text-[#1B422B] mt-4">
          {getLocalizedString("footerText")}
        </div>
      </footer>

      {/* Quick Menu Drawer */}
      <AnimatePresence>
        {isQuickMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-[#1B422B]/80 backdrop-blur-sm"
            onClick={() => setIsQuickMenuOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute top-0 right-0 bottom-0 w-full sm:w-[400px] bg-[#F8FAF7] shadow-2xl flex flex-col pt-20 px-6 sm:px-8 pb-8"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setIsQuickMenuOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full bg-[#1B422B]/5 hover:bg-[#1B422B]/10 transition-colors text-[#1B422B] cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>

              <h2 className="font-serif italic text-3xl text-[#1B422B] mb-6 shrink-0">Hızlı Erişim</h2>

              <div className="flex space-x-4 mb-6 shrink-0">
                <button 
                  onClick={() => { alert("Garson çağrıldı!"); setIsQuickMenuOpen(false); }}
                  className="flex-1 bg-white border border-[#1B422B]/10 p-4 rounded-2xl flex flex-col items-center justify-center hover:border-[#1B422B]/30 hover:bg-[#1B422B]/5 transition-colors cursor-pointer shadow-sm"
                >
                  <Bell className="w-6 h-6 text-[#2B603D] mb-2" />
                  <span className="font-sans text-[11px] font-medium text-[#1B422B] uppercase tracking-wider mt-1">Garson</span>
                </button>
                <button 
                  onClick={() => { alert("Hesap istendi!"); setIsQuickMenuOpen(false); }}
                  className="flex-1 bg-white border border-[#1B422B]/10 p-4 rounded-2xl flex flex-col items-center justify-center hover:border-[#1B422B]/30 hover:bg-[#1B422B]/5 transition-colors cursor-pointer shadow-sm"
                >
                  <Receipt className="w-6 h-6 text-[#2B603D] mb-2" />
                  <span className="font-sans text-[11px] font-medium text-[#1B422B] uppercase tracking-wider mt-1">Hesap</span>
                </button>
                <button 
                  onClick={() => { setIsLoyaltyOpen(true); setIsQuickMenuOpen(false); }}
                  className="flex-1 bg-[#1B422B] border border-[#1B422B]/10 p-4 rounded-2xl flex flex-col items-center justify-center hover:bg-[#2B603D] transition-colors cursor-pointer shadow-sm text-[#F8FAF7]"
                >
                  <Award className="w-6 h-6 mb-2" />
                  <span className="font-sans text-[11px] font-bold uppercase tracking-wider mt-1">Sadakat</span>
                </button>
              </div>

              <div className="relative mb-6 shrink-0">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-[#1B422B]/40" />
                </div>
                <input
                  type="text"
                  placeholder="Menüde ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-[#1B422B]/20 text-[#1B422B] rounded-2xl py-4 pl-12 pr-4 font-sans text-base focus:outline-none focus:ring-2 focus:ring-[#2B603D]/50 transition-shadow placeholder:text-[#1B422B]/40 shadow-sm"
                />
              </div>

              <div className="flex-1 overflow-y-auto w-full no-scrollbar pr-2">
                <div className="flex flex-col space-y-2">
                  {menuData.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => {
                        setActiveCategory(category.id);
                        if (searchQuery) setSearchQuery('');
                        setIsQuickMenuOpen(false);
                      }}
                      className={`text-left px-5 py-4 rounded-xl font-sans text-base transition-colors flex items-center ${
                        activeCategory === category.id && !searchQuery
                          ? 'bg-[#1B422B] text-[#F8FAF7] font-semibold shadow-md'
                          : 'bg-white border border-[#1B422B]/10 text-[#1B422B] hover:border-[#1B422B]/30'
                      }`}
                    >
                      {getIcon(category.icon, "w-5 h-5 mr-3 inline-block opacity-80")}
                      <span>{getText(category.title, category.titleEn)}</span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Music Menu Drawer */}
      <AnimatePresence>
        {isMusicMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[160] bg-[#1B422B]/80 backdrop-blur-sm"
            onClick={() => setIsMusicMenuOpen(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute bottom-0 left-0 right-0 max-h-[85vh] sm:h-auto sm:w-[500px] sm:mx-auto sm:top-1/2 sm:bottom-auto sm:-translate-y-1/2 sm:rounded-3xl bg-[#F8FAF7] rounded-t-3xl shadow-2xl flex flex-col pt-6 px-6 sm:px-8 pb-10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-12 h-1.5 bg-[#1B422B]/20 rounded-full mx-auto mb-6 sm:hidden shrink-0"></div>
              
              <button 
                onClick={() => setIsMusicMenuOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full bg-[#1B422B]/5 hover:bg-[#1B422B]/10 transition-colors text-[#1B422B] cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex items-center space-x-3 mb-6 shrink-0">
                <Music className="w-8 h-8 text-[#2B603D]" />
                <h2 className="font-serif italic text-3xl text-[#1B422B]">Müzik</h2>
              </div>

              <div className="flex items-center justify-between mb-8 bg-[#1B422B]/5 p-4 rounded-2xl">
                <div>
                  <p className="font-sans font-bold text-[#1B422B] text-sm mb-1">Müzik Çalıyor</p>
                  <p className="font-sans text-[#1B422B]/60 text-xs">{isPlayingMusic ? 'Arkaplan müziği aktif' : 'Müzik duraklatıldı'}</p>
                </div>
                <button 
                  onClick={toggleMusic}
                  className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors shadow-sm cursor-pointer ${isPlayingMusic ? 'bg-[#2B603D] text-[#F8FAF7]' : 'bg-white text-[#1B422B]'}`}
                >
                  {isPlayingMusic ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                </button>
              </div>

              <h3 className="font-sans font-bold text-xs text-[#1B422B]/50 uppercase tracking-widest mb-4">Çalma Listesi</h3>
              
              <div className="space-y-3">
                {PLAYLIST.map((song, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setCurrentSongIndex(idx);
                      if (!isPlayingMusic) toggleMusic();
                    }}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer ${currentSongIndex === idx ? 'bg-[#1B422B] text-white border-[#1B422B] shadow-md' : 'bg-white border-[#1B422B]/10 hover:border-[#1B422B]/30 hover:bg-[#1B422B]/5'}`}
                  >
                    <div className="flex items-center space-x-3 text-left">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentSongIndex === idx ? 'bg-white/10' : 'bg-[#1B422B]/5'}`}>
                         {currentSongIndex === idx && isPlayingMusic ? (
                           <Music className="w-4 h-4 text-orange-300 animate-pulse" />
                         ) : (
                           <Music className="w-4 h-4 text-[#2B603D] relative z-10" />
                         )}
                      </div>
                      <span className={`font-sans font-medium text-sm leading-tight ${currentSongIndex === idx ? 'text-white' : 'text-[#1B422B]'}`}>
                        {song.title}
                      </span>
                    </div>
                    {currentSongIndex === idx && isPlayingMusic && (
                      <div className="flex space-x-1 pl-4 shrink-0">
                        <div className="w-1 h-3 bg-orange-300 rounded-full animate-[bounce_1s_infinite_100ms]"></div>
                        <div className="w-1 h-4 bg-orange-300 rounded-full animate-[bounce_1s_infinite_300ms]"></div>
                        <div className="w-1 h-2 bg-orange-300 rounded-full animate-[bounce_1s_infinite_500ms]"></div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Share Modal */}
      <AnimatePresence>
        {isShareModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#1B422B]/80 backdrop-blur-sm"
            onClick={() => setIsShareModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-[#F8FAF7] p-8 rounded-[32px] shadow-2xl max-w-sm w-full relative flex flex-col items-center text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsShareModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-[#1B422B]/50 hover:text-[#1B422B] transition-colors bg-[#1B422B]/5 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="font-serif italic text-2xl font-bold text-[#1B422B] mb-2 mt-2">{getLocalizedString("shareMenu")}</h3>
              <p className="text-sm font-sans text-[#1B422B]/60 mb-8">
                {getLocalizedString("shareDesc")}
              </p>
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-[#1B422B]/10">
                <QRCode
                  value={window.location.href}
                  size={200}
                  fgColor="#1B422B"
                  bgColor="#ffffff"
                  level="Q"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Feedback Modal */}
      <AnimatePresence>
        {isFeedbackModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#1B422B]/80 backdrop-blur-sm"
            onClick={() => !feedbackSent && setIsFeedbackModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-[#F8FAF7] p-8 rounded-[32px] shadow-2xl max-w-md w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              {!feedbackSent && (
                <button
                  onClick={() => setIsFeedbackModalOpen(false)}
                  className="absolute top-4 right-4 p-2 text-[#1B422B]/50 hover:text-[#1B422B] transition-colors bg-[#1B422B]/5 rounded-full cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              )}

              {feedbackSent ? (
                <div className="flex flex-col items-center text-center py-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                  >
                    <CheckCircle2 className="w-16 h-16 text-[#2B603D] mb-4" />
                  </motion.div>
                  <h3 className="font-serif italic text-2xl font-bold text-[#1B422B] mb-2">{getLocalizedString("thanks")}</h3>
                  <p className="text-sm font-sans text-[#1B422B]/70">
                    {getLocalizedString("thanksDesc")}
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="p-3 bg-[#1B422B]/10 rounded-full">
                      <MessageSquare className="w-6 h-6 text-[#1B422B]" />
                    </div>
                    <div>
                      <h3 className="font-serif italic text-2xl font-bold text-[#1B422B]">{getLocalizedString("feedbackTitle")}</h3>
                      <p className="text-xs font-sans text-[#1B422B]/60 uppercase tracking-[1px]">{getLocalizedString("feedbackSub")}</p>
                    </div>
                  </div>

                  <form onSubmit={handleFeedbackSubmit}>
                    <textarea
                      value={feedbackText}
                      onChange={(e) => setFeedbackText(e.target.value)}
                      placeholder={getLocalizedString("feedbackPlace")}
                      className="w-full h-32 bg-white border border-[#1B422B]/20 rounded-2xl p-4 font-sans text-sm text-[#1B422B] placeholder:text-[#1B422B]/40 focus:outline-none focus:ring-2 focus:ring-[#2B603D]/50 transition-shadow resize-none mb-6"
                      required
                    />
                    <button
                      type="submit"
                      disabled={!feedbackText.trim()}
                      className="w-full bg-[#1B422B] text-[#F8FAF7] font-sans font-medium rounded-full py-3.5 hover:bg-[#2B603D] transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {getLocalizedString("send")}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Wifi Modal */}
      <AnimatePresence>
        {isWifiModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#1B422B]/80 backdrop-blur-sm"
            onClick={() => setIsWifiModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-[#F8FAF7] p-8 rounded-[32px] shadow-2xl max-w-sm w-full relative flex flex-col items-center text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsWifiModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-[#1B422B]/50 hover:text-[#1B422B] transition-colors bg-[#1B422B]/5 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="w-16 h-16 bg-[#1B422B]/10 rounded-full flex items-center justify-center mb-4 mt-2">
                <Wifi className="w-8 h-8 text-[#1B422B]" />
              </div>

              <h3 className="font-serif italic text-2xl font-bold text-[#1B422B] mb-6">{getLocalizedString("wifiTitle")}</h3>
              
              <div className="w-full space-y-4 mb-8">
                <div className="bg-white p-4 rounded-2xl border border-[#1B422B]/10 text-left">
                  <span className="block text-[10px] font-sans uppercase tracking-widest text-[#1B422B]/50 mb-1">{getLocalizedString("networkName")}</span>
                  <span className="block text-lg font-sans font-medium text-[#1B422B]">Coffee Benders 5G</span>
                </div>
                
                <div className="bg-white p-4 rounded-2xl border border-[#1B422B]/10 text-left">
                  <span className="block text-[10px] font-sans uppercase tracking-widest text-[#1B422B]/50 mb-1">{getLocalizedString("password")}</span>
                  <span className="block text-lg font-mono font-medium text-[#1B422B]">benders2024</span>
                </div>
              </div>

              <button
                onClick={() => setIsWifiModalOpen(false)}
                className="w-full bg-[#1B422B] text-[#F8FAF7] font-sans font-medium rounded-full py-3.5 hover:bg-[#2B603D] transition-colors cursor-pointer"
              >
                {getLocalizedString("close")}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Nutrition Explorer Modal */}
      <AnimatePresence>
        {isNutritionExplorerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[105] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-[#1B422B]/80 backdrop-blur-sm"
            onClick={() => setIsNutritionExplorerOpen(false)}
          >
            <motion.div
              initial={{ y: "100%", opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: "100%", opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-[#F8FAF7] p-6 sm:p-8 rounded-t-[32px] sm:rounded-[32px] shadow-2xl max-w-lg w-full relative flex flex-col h-[85vh] sm:h-[75vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-12 h-1.5 bg-[#1B422B]/20 rounded-full mx-auto mb-6 sm:hidden shrink-0"></div>
              <button
                onClick={() => setIsNutritionExplorerOpen(false)}
                className="absolute top-6 right-6 p-2 text-[#1B422B]/50 hover:text-[#1B422B] transition-colors bg-[#1B422B]/5 rounded-full cursor-pointer hidden sm:flex shrink-0"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mt-2 mb-6 shrink-0 text-center sm:text-left">
                 <div className="flex items-center space-x-3 justify-center sm:justify-start mb-2">
                   <Activity className="w-6 h-6 text-[#2B603D]" />
                   <h3 className="font-serif italic text-2xl font-bold text-[#1B422B]">{getLocalizedString("nutritionExplorerTitle")}</h3>
                 </div>
                 <p className="text-sm font-sans text-[#1B422B]/60 mt-2">
                   {getLocalizedString("nutritionExplorerDesc")}
                 </p>
              </div>

              <div className="relative shrink-0 mb-6">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-[#1B422B]/40" />
                </div>
                <input
                  type="text"
                  placeholder={getLocalizedString("nutritionSearchPlaceholder")}
                  value={nutritionSearchQuery}
                  onChange={(e) => setNutritionSearchQuery(e.target.value)}
                  className="w-full bg-white border border-[#1B422B]/20 text-[#1B422B] rounded-2xl py-3 pl-10 pr-4 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-[#2B603D]/50 transition-shadow placeholder:text-[#1B422B]/40"
                />
              </div>

              <div className="flex-1 overflow-y-auto no-scrollbar -mx-2 px-2">
                {menuData.flatMap(c => c.items).filter(item => 
                   (item.calories !== undefined || item.protein !== undefined || item.sugar !== undefined) &&
                   (nutritionSearchQuery === "" || 
                    item.name.toLowerCase().includes(nutritionSearchQuery.toLowerCase()) || 
                    (item.nameEn && item.nameEn.toLowerCase().includes(nutritionSearchQuery.toLowerCase())))
                ).map((item, idx) => (
                   <div 
                     key={idx} 
                     className="flex items-center justify-between p-4 bg-white border border-[#1B422B]/10 rounded-2xl mb-3 cursor-pointer hover:border-[#2B603D]/50 transition-colors"
                     onClick={() => {
                        setSelectedItem(item);
                     }}
                   >
                     <div>
                       <h4 className="font-serif italic text-lg text-[#1B422B] mb-1">{getText(item.name, item.nameEn)}</h4>
                       <div className="flex space-x-3 text-[10px] font-sans font-bold uppercase tracking-wider text-[#1B422B]/50">
                         {item.calories !== undefined && <span>{item.calories} {getLocalizedString("kcal")}</span>}
                         {item.protein !== undefined && <span>{item.protein}G P</span>}
                         {item.sugar !== undefined && <span>{item.sugar}G S</span>}
                       </div>
                     </div>
                     <div className="w-8 h-8 rounded-full bg-[#1B422B]/5 flex items-center justify-center">
                       <Info className="w-4 h-4 text-[#1B422B]" />
                     </div>
                   </div>
                ))}

                {menuData.flatMap(c => c.items).filter(item => 
                   (item.calories !== undefined || item.protein !== undefined || item.sugar !== undefined) &&
                   (nutritionSearchQuery === "" || 
                    item.name.toLowerCase().includes(nutritionSearchQuery.toLowerCase()) || 
                    (item.nameEn && item.nameEn.toLowerCase().includes(nutritionSearchQuery.toLowerCase())))
                ).length === 0 && (
                  <div className="text-center text-[#1B422B]/50 font-sans mt-10">
                    {getLocalizedString("noResults")} "{nutritionSearchQuery}"
                  </div>
                )}
              </div>

              <button
                onClick={() => setIsNutritionExplorerOpen(false)}
                className="w-full bg-[#1B422B] text-[#F8FAF7] font-sans font-medium rounded-full py-3.5 hover:bg-[#2B603D] transition-colors cursor-pointer shrink-0 mt-4"
              >
                {getLocalizedString("close")}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Detail/Nutritional Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-[#1B422B]/80 backdrop-blur-sm"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ y: "100%", opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: "100%", opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-[#F8FAF7] p-6 sm:p-8 rounded-t-[32px] sm:rounded-[32px] shadow-2xl max-w-md w-full relative flex flex-col max-h-[85vh] overflow-y-auto no-scrollbar"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-12 h-1.5 bg-[#1B422B]/20 rounded-full mx-auto mb-6 sm:hidden"></div>
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-6 right-6 p-2 text-[#1B422B]/50 hover:text-[#1B422B] transition-colors bg-[#1B422B]/5 rounded-full cursor-pointer hidden sm:flex"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mt-2 text-center">
                 <h3 className="font-serif italic text-3xl font-bold text-[#1B422B] mb-2">{getText(selectedItem.name, selectedItem.nameEn)}</h3>
                 {(selectedItem.description || selectedItem.descriptionEn) && (
                    <p className="text-sm font-sans text-[#1B422B]/60 max-w-xs mx-auto leading-relaxed mb-6">
                      {getText(selectedItem.description || '', selectedItem.descriptionEn || undefined)}
                    </p>
                 )}
              </div>

              {((selectedItem.calories !== undefined) || (selectedItem.protein !== undefined) || (selectedItem.sugar !== undefined)) && (
                <div className="mb-8">
                  <div className="flex items-center space-x-2 justify-center mb-4 text-[#2B603D]">
                    <Info className="w-4 h-4" />
                    <span className="font-sans text-[10px] uppercase tracking-[2px] font-bold">{getLocalizedString("nutritionalInfo")}</span>
                  </div>
                  <div className="flex bg-white rounded-2xl border border-[#1B422B]/10 divide-x divide-[#1B422B]/5 shadow-sm overflow-hidden">
                    {selectedItem.calories !== undefined && (
                      <div className="flex-1 p-4 flex flex-col items-center">
                        <span className="text-[#1B422B]/50 text-[10px] font-sans uppercase tracking-widest mb-1">{getLocalizedString("calories")}</span>
                        <span className="text-[#1B422B] font-mono text-xl font-medium">{selectedItem.calories}</span>
                        <span className="text-[#1B422B]/40 text-[9px] font-sans uppercase mt-1">{getLocalizedString("kcal")}</span>
                      </div>
                    )}
                    {selectedItem.protein !== undefined && (
                      <div className="flex-1 p-4 flex flex-col items-center">
                        <span className="text-[#1B422B]/50 text-[10px] font-sans uppercase tracking-widest mb-1">{getLocalizedString("protein")}</span>
                        <span className="text-[#1B422B] font-mono text-xl font-medium">{selectedItem.protein}</span>
                        <span className="text-[#1B422B]/40 text-[9px] font-sans uppercase mt-1">{getLocalizedString("grams")}</span>
                      </div>
                    )}
                    {selectedItem.sugar !== undefined && (
                      <div className="flex-1 p-4 flex flex-col items-center">
                        <span className="text-[#1B422B]/50 text-[10px] font-sans uppercase tracking-widest mb-1">{getLocalizedString("sugar")}</span>
                        <span className="text-[#1B422B] font-mono text-xl font-medium">{selectedItem.sugar}</span>
                        <span className="text-[#1B422B]/40 text-[9px] font-sans uppercase mt-1">{getLocalizedString("grams")}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {selectedItem.recommendations && selectedItem.recommendations.length > 0 && (
                <div className="mb-6 bg-[#1B422B]/5 rounded-2xl p-5 border border-[#1B422B]/10">
                   <div className="flex items-center space-x-2 justify-center mb-4 text-[#1B422B]">
                      <ThumbsUp className="w-4 h-4" />
                      <span className="font-sans text-[10px] uppercase tracking-[2px] font-bold">{getLocalizedString("recommendationsText")}</span>
                   </div>
                   <div className="space-y-2 text-center">
                     {selectedItem.recommendations.map((rec, i) => (
                        <div key={i} className="inline-block px-4 py-2 bg-white rounded-full text-[#1B422B] font-sans text-sm font-medium shadow-sm mx-1 my-1 border border-[#1B422B]/5">
                          {rec}
                        </div>
                     ))}
                   </div>
                </div>
              )}

              <div className="flex space-x-3 mt-auto pt-4">
                <button
                  onClick={() => setSelectedItem(null)}
                  className="flex-1 bg-transparent text-[#1B422B] border border-[#1B422B]/20 font-sans font-medium rounded-full py-3.5 hover:bg-[#1B422B]/5 transition-colors cursor-pointer"
                >
                  {getLocalizedString("close")}
                </button>
                <button
                  onClick={() => {
                    addToCart(selectedItem);
                    setSelectedItem(null);
                    setIsCartOpen(true);
                  }}
                  className="flex-1 bg-[#1B422B] text-[#F8FAF7] font-sans font-medium rounded-full py-3.5 hover:bg-[#2B603D] transition-colors cursor-pointer flex items-center justify-center"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Sepete Ekle
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[160] bg-[#1B422B]/80 backdrop-blur-sm"
            onClick={() => setIsCartOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute top-0 right-0 bottom-0 w-full sm:w-[450px] bg-[#F8FAF7] shadow-2xl flex flex-col pt-20 px-6 sm:px-8 pb-8"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setIsCartOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full bg-[#1B422B]/5 hover:bg-[#1B422B]/10 transition-colors text-[#1B422B] cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex items-center space-x-3 mb-8 shrink-0">
                <ShoppingCart className="w-8 h-8 text-[#2B603D]" />
                <h2 className="font-serif italic text-3xl text-[#1B422B]">Sepetim</h2>
              </div>

              {cart.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center opacity-60">
                  <div className="w-20 h-20 bg-[#1B422B]/5 rounded-full flex items-center justify-center mb-4">
                    <ShoppingCart className="w-8 h-8 text-[#1B422B]" />
                  </div>
                  <p className="font-sans text-lg text-[#1B422B]">Sepetiniz boş.</p>
                </div>
              ) : (
                <>
                  <div className="flex-1 overflow-y-auto no-scrollbar pr-2 mb-6 space-y-4">
                    {cart.map((c, i) => (
                      <div key={i} className="bg-white p-4 rounded-2xl border border-[#1B422B]/10 flex items-center space-x-4 shadow-sm">
                        <div className="flex-1">
                          <h4 className="font-serif italic text-lg text-[#1B422B]">{getText(c.item.name, c.item.nameEn)}</h4>
                          <span className="font-sans text-sm text-[#1B422B]/60">
                            {c.item.priceSmall ? `${c.item.priceSmall} ₺` : c.item.price ? `${c.item.price} ₺` : ''}
                          </span>
                        </div>
                        <div className="flex items-center space-x-3 bg-[#1B422B]/5 rounded-full px-2 py-1">
                          <button 
                            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white transition-colors cursor-pointer text-[#1B422B]"
                            onClick={() => updateQuantity(c.item.name, -1)}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="font-mono font-medium text-lg min-w-[20px] text-center text-[#1B422B]">{c.quantity}</span>
                          <button 
                            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white transition-colors cursor-pointer text-[#1B422B]"
                            onClick={() => updateQuantity(c.item.name, 1)}
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="shrink-0 space-y-4">
                    <div className="bg-white rounded-2xl p-4 border border-[#1B422B]/10 shadow-sm space-y-2 mb-2">
                      <div className="flex justify-between font-sans text-sm text-[#1B422B]/70">
                        <span>Ara Toplam</span>
                        <span>{getNumberFormatted(subtotal)} ₺</span>
                      </div>
                      {freeCoffeesApplied > 0 && (
                        <div className="flex justify-between font-sans text-sm text-[#2B603D] font-bold">
                          <span>Sadakat İndirimi ({freeCoffeesApplied} Kahve)</span>
                          <span>-{getNumberFormatted(discountAmount)} ₺</span>
                        </div>
                      )}
                      <div className="border-t border-[#1B422B]/10 pt-2 flex justify-between font-sans text-lg font-bold text-[#1B422B]">
                        <span>Toplam</span>
                        <span>{getNumberFormatted(finalTotal)} ₺</span>
                      </div>
                    </div>
                    <div className="flex bg-white p-1 rounded-2xl border border-[#1B422B]/10 shadow-sm mt-4">
                      <button
                        onClick={() => setOrderType('table')}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-sans font-medium text-sm transition-all ${orderType === 'table' ? 'bg-[#1B422B] text-white shadow-md' : 'text-[#1B422B]/60 hover:text-[#1B422B] hover:bg-[#1B422B]/5'}`}
                      >
                        <Coffee className="w-4 h-4" />
                        Masaya
                      </button>
                      <button
                        onClick={() => setOrderType('takeaway')}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-sans font-medium text-sm transition-all ${orderType === 'takeaway' ? 'bg-[#1B422B] text-white shadow-md' : 'text-[#1B422B]/60 hover:text-[#1B422B] hover:bg-[#1B422B]/5'}`}
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Gel Al
                      </button>
                    </div>
                    {orderType === 'table' && (
                      <div>
                        <input
                          type="text"
                          placeholder="Masa Numarası (Örn: Masa 1)"
                          value={tableNumber}
                          onChange={(e) => setTableNumber(e.target.value)}
                          className="w-full bg-white border border-[#1B422B]/20 text-[#1B422B] rounded-2xl py-3 px-4 font-sans focus:outline-none focus:ring-2 focus:ring-[#2B603D]/50 transition-shadow placeholder:text-[#1B422B]/40 shadow-sm mt-3"
                        />
                      </div>
                    )}
                    <div className="mt-3">
                      <input
                        type="text"
                        placeholder="Sipariş notunuz (Şekersiz, extra sıcak vb.)"
                        value={orderNotes}
                        onChange={(e) => setOrderNotes(e.target.value)}
                        className="w-full bg-white border border-[#1B422B]/20 text-[#1B422B] rounded-2xl py-3 px-4 font-sans focus:outline-none focus:ring-2 focus:ring-[#2B603D]/50 transition-shadow placeholder:text-[#1B422B]/40 shadow-sm"
                      />
                    </div>
                    {orderSent ? (
                      <div className="bg-[#2B603D] text-[#F8FAF7] rounded-full py-4 text-center font-sans font-bold flex items-center justify-center animate-pulse">
                        <CheckCircle2 className="w-5 h-5 mr-2" />
                        Siparişiniz İletildi!
                      </div>
                    ) : (
                      <button
                        onClick={submitOrder}
                        className="w-full bg-[#1B422B] text-[#F8FAF7] font-sans font-bold text-lg rounded-full py-4 hover:bg-[#2B603D] transition-colors cursor-pointer flex justify-center items-center shadow-lg"
                      >
                        Siparişi Onayla
                      </button>
                    )}
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Profile Modal */}
      <AnimatePresence>
        {isProfileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[160] bg-[#1B422B]/80 backdrop-blur-sm"
            onClick={() => setIsProfileOpen(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute bottom-0 left-0 right-0 max-h-[85vh] sm:h-auto sm:w-[500px] sm:mx-auto sm:top-1/2 sm:bottom-auto sm:-translate-y-1/2 sm:rounded-3xl bg-[#F8FAF7] rounded-t-3xl shadow-2xl flex flex-col pt-6 px-6 sm:px-8 pb-10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-12 h-1.5 bg-[#1B422B]/20 rounded-full mx-auto mb-6 sm:hidden" />
              
              <button 
                onClick={() => setIsProfileOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full bg-[#1B422B]/5 hover:bg-[#1B422B]/10 transition-colors text-[#1B422B] cursor-pointer hidden sm:flex"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex items-center space-x-3 mb-8 shrink-0">
                <UserCheck className="w-8 h-8 text-[#2B603D]" />
                <h2 className="font-serif italic text-3xl text-[#1B422B]">Profilim</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-sans font-bold text-[#1B422B] mb-2 uppercase tracking-wide">Adınız</label>
                  <input
                    type="text"
                    value={userProfile.name}
                    onChange={(e) => {
                      const newProfile = { ...userProfile, name: e.target.value };
                      setUserProfile(newProfile);
                      localStorage.setItem('userProfile', JSON.stringify(newProfile));
                    }}
                    placeholder="Adınız Soyadınız"
                    className="w-full bg-white border border-[#1B422B]/20 text-[#1B422B] rounded-2xl py-3 px-4 font-sans focus:outline-none focus:ring-2 focus:ring-[#2B603D]/50 transition-shadow shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-sans font-bold text-[#1B422B] mb-2 uppercase tracking-wide">Doğum Tarihiniz</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#1B422B]/40">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <input
                      type="date"
                      value={userProfile.birthDate}
                      onChange={(e) => {
                        const newProfile = { ...userProfile, birthDate: e.target.value };
                        setUserProfile(newProfile);
                        localStorage.setItem('userProfile', JSON.stringify(newProfile));
                      }}
                      className="w-full bg-white border border-[#1B422B]/20 text-[#1B422B] rounded-2xl py-3 pl-12 pr-4 font-sans focus:outline-none focus:ring-2 focus:ring-[#2B603D]/50 transition-shadow shadow-sm"
                    />
                  </div>
                  <p className="text-xs font-sans text-[#1B422B]/50 mt-2">Doğum gününüzde sürpriz hediyeler kazanmak için doldurun!</p>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsProfileOpen(false);
                  setTimeout(() => {
                    document.getElementById('birthday-card')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }, 300);
                }}
                className="w-full mt-8 bg-[#1B422B] text-[#F8FAF7] font-sans font-bold text-lg rounded-xl py-3 hover:bg-[#2B603D] transition-colors cursor-pointer shadow-lg"
              >
                Kaydet
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loyalty Modal */}
      <AnimatePresence>
        {isLoyaltyOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[160] bg-[#1B422B]/80 backdrop-blur-sm"
            onClick={() => setIsLoyaltyOpen(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute bottom-0 left-0 right-0 max-h-[85vh] sm:h-auto sm:w-[500px] sm:mx-auto sm:top-1/2 sm:bottom-auto sm:-translate-y-1/2 sm:rounded-3xl bg-[#F8FAF7] rounded-t-3xl shadow-2xl flex flex-col pt-6 px-6 sm:px-8 pb-10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-12 h-1.5 bg-[#1B422B]/20 rounded-full mx-auto mb-6 sm:hidden" />
              
              <button 
                onClick={() => setIsLoyaltyOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full bg-[#1B422B]/5 hover:bg-[#1B422B]/10 transition-colors text-[#1B422B] cursor-pointer hidden sm:flex"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="text-center mb-8 mt-2">
                <div className="w-16 h-16 bg-[#1B422B]/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#1B422B]/10">
                  <Gift className="w-8 h-8 text-[#2B603D]" />
                </div>
                <h2 className="font-serif italic text-3xl text-[#1B422B]">Sadakat Kartım</h2>
                <p className="font-sans text-sm text-[#1B422B]/60 mt-2">5 kahve siparişine 1 hediye bizden!</p>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-[#1B422B]/10 shadow-sm mb-6">
                <div className="flex justify-between items-center mb-6">
                  <span className="font-sans text-sm font-bold text-[#1B422B] uppercase tracking-widest">Güncel Pullar</span>
                  <span className="font-mono text-sm text-[#2B603D] font-bold">{coffeeCount % 5}/5</span>
                </div>
                <div className="flex justify-between">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className={`w-[45px] h-[45px] rounded-full flex items-center justify-center transition-all ${i < (coffeeCount % 5) ? 'bg-[#2B603D] text-white shadow-md scale-105' : 'bg-[#1B422B]/5 text-[#1B422B]/20 border border-[#1B422B]/10'}`}>
                      {i < (coffeeCount % 5) ? <CheckCircle2 className="w-5 h-5" /> : <Coffee className="w-5 h-5" />}
                    </div>
                  ))}
                </div>
                {coffeeCount % 5 === 0 && coffeeCount > 0 && (
                  <div className="mt-8 text-center text-[#2B603D] font-bold font-sans text-sm bg-green-50 p-4 rounded-xl border border-green-200 shadow-sm flex flex-col items-center">
                    <Sparkles className="w-6 h-6 mb-2" />
                    Tebrikler! Bir ücretsiz kahve kazandınız.
                    <span className="text-xs font-normal mt-1 opacity-80">(Sonraki siparişinizde otomatik uygulanacaktır veya kasada QR okutabilirsiniz)</span>
                  </div>
                )}
              </div>
              
              <div className="bg-[#1B422B] text-[white] px-6 py-5 rounded-3xl flex justify-between items-center shadow-lg">
                <div className="flex items-center space-x-3">
                  <Award className="w-8 h-8 text-[#F8FAF7]/80" />
                  <div>
                    <h3 className="font-sans text-[10px] font-bold uppercase tracking-widest opacity-60">Toplam Hediye</h3>
                    <span className="font-sans font-medium text-sm">Kazanılan Ücretsiz Kahve</span>
                  </div>
                </div>
                <span className="font-mono text-3xl font-bold">{Math.floor(coffeeCount / 5)}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
