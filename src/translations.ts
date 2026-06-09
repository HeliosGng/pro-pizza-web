export interface TranslationSet {
  appName: string;
  tagline: string;
  subtitle: string;
  orderNow: string;
  viewDirections: string;
  ourMenu: string;
  menuSubtitle: string;
  popular: string;
  price: string;
  sizeMedium: string;
  sizeFamily: string;
  addToCart: string;
  added: string;
  yourCart: string;
  emptyCart: string;
  cartTotal: string;
  sendToWhatsApp: string;
  requestingGPS: string;
  gpsAcquired: string;
  gpsFailed: string;
  locationRequired: string;
  addressPlaceholder: string;
  addressLabel: string;
  getGPSBtn: string;
  quickNotice: string;
  hours: string;
  contactUs: string;
  reviewsTitle: string;
  findUs: string;
  woltOrder: string;
  phoneLabel: string;
  customerNameLabel: string;
  customerNamePlaceholder: string;
  deliveryMethodLabel: string;
  deliveryOption: string;
  takeoutOption: string;
  dineInOption: string;
  pizzaSection: string;
  sandwichSection: string;
  drinksSection: string;
  allSection: string;
  customIngredientsNotice: string;
  metaSecureNotice: string;
  deliveryNotice: string;
}

export const TRANSLATIONS: Record<"en" | "sq", TranslationSet> = {
  en: {
    appName: "Pro Pizza",
    tagline: "Authentic Italian Taste",
    subtitle: "Classic Italian pizzas and premium toasted artisan sandwiches in Tirana. Slowly fermented crust cooked at optimal high temperatures for the ultimate airy crisp and rich flavor.",
    orderNow: "Order Now & Choose Menu",
    viewDirections: "See Location & Directions",
    ourMenu: "Pro Pizza Menu",
    menuSubtitle: "Crispy Crafted Pizzas, Pressed Gourmet Sandwiches, and Icy Refreshments.",
    popular: "House Favorite",
    price: "Price",
    sizeMedium: "Medium (Mesme)",
    sizeFamily: "Family Size (Familjare)",
    addToCart: "Add to Basket",
    added: "Added to Basket ✓",
    yourCart: "Your Customized Ticket",
    emptyCart: "Your basket is currently empty. Scroll our menu and add items to begin!",
    cartTotal: "Real-time Cost Summary",
    sendToWhatsApp: "Deliver Order via WhatsApp Direct",
    requestingGPS: "Locking GPS Coordinates via Satellite...",
    gpsAcquired: "Live Location Linked ✓",
    gpsFailed: "GPS was denied. Please fill in physical coordinates below.",
    locationRequired: "Location Coordinates & Logistics",
    addressPlaceholder: "Street name, building number, entrance details, landmarks for the courier in Tirana...",
    addressLabel: "Delivery Info / Detailed Physical Address",
    getGPSBtn: "Acquire Live GPS (Ensures Safe Delivery)",
    quickNotice: "Open • Delivery between 10:00 AM - 12:00 AM",
    hours: "Monday - Sunday • 10:00 AM - 12:00 AM (Midnight)",
    contactUs: "Quick Orders Line",
    reviewsTitle: "Customer Hearts (4.9 ★★★★★)",
    findUs: "Find Us In Tirana",
    woltOrder: "Find us on Wolt app",
    phoneLabel: "Direct Dial Line",
    customerNameLabel: "Your Customer Name",
    customerNamePlaceholder: "e.g. Alban Hoxha",
    deliveryMethodLabel: "Select Delivery Protocol",
    deliveryOption: "Home Delivery",
    takeoutOption: "Store Takeout",
    dineInOption: "Dine-In Table",
    pizzaSection: "Crafted Pizzas 🍕",
    sandwichSection: "Artisan Pressed Sandwiches 🥪",
    drinksSection: "Cold Drinks 🥤",
    allSection: "Full Menu",
    customIngredientsNotice: "*Extra additions: +30 Lekë for sandwiches, +50 Lekë for medium pizzas, +100 Lekë for family pizzas.",
    metaSecureNotice: "Powered by Pro Pizza Tirana secure order system",
    deliveryNotice: "🛵 Delivery Free inside Tirana"
  },
  sq: {
    appName: "Pro Pizza",
    tagline: "Pica dhe Shije Autentike Italiane",
    subtitle: "Pica klasike me shije autentike dhe sanduiçë artizanalë të pjekur në tostierë, në Rrugën Fortuzi, Tiranë. Brumë i dytë i fermentuar në temperaturë optimale për krokante dhe butësi perfekte.",
    orderNow: "Porosit Tani dhe Shiko Menunë",
    viewDirections: "Shiko Adresën dhe Drejtimet",
    ourMenu: "Menuja e Pro Pizza",
    menuSubtitle: "Pica të Shijshme me Brumë Special, Sanduiçë të Shtypur Gustatorë dhe Pije të Ftohta.",
    popular: "E Preferuar",
    price: "Çmimi",
    sizeMedium: "E Mesme",
    sizeFamily: "Familjare",
    addToCart: "Shto në Shportë",
    added: "Shtuar në Shportë ✓",
    yourCart: "Shporta Juaj e Porosisë",
    emptyCart: "Shporta juaj është bosh. Shfletoni menunë tonë fantastike dhe shtoni produktet tuaja të preferuara!",
    cartTotal: "Totali i Amortizuar në Kohë Reale",
    sendToWhatsApp: "Dërgo Porosinë e Sigurt në WhatsApp",
    requestingGPS: "Duke marrë koordinatat tuaja GPS...",
    gpsAcquired: "Vendndodhja GPS u Regjistrua ✓",
    gpsFailed: "Leja për GPS u refuzua. Shkruani adresën fizike më poshtë.",
    locationRequired: "Vendndodhja dhe Logjistika e Transportit",
    addressPlaceholder: "Rruga, numri i pallatit, hyrja, kati ose pikat referuese pranë zonës suaj për korrierin...",
    addressLabel: "Adresa e Detajuar e Dorëzimit",
    getGPSBtn: "Dërgo vendndodhjen me GPS Live (Garanton Dorëzim të Shpejtë)",
    quickNotice: "Hapur • Shërbim me Motorrist 10:00 - 24:00",
    hours: "E Hënë - E Dielë • 10:00 - 24:00 (Mesnatë)",
    contactUs: "Linja e Shpejtë e Porosive",
    reviewsTitle: "Dashuria e Klientëve tanë (4.9 ★★★★★)",
    findUs: "Ku Ndodhemi në Tiranë",
    woltOrder: "Na gjeni në aplikacionin Wolt",
    phoneLabel: "Telefono Direkte",
    customerNameLabel: "Emri Juaj",
    customerNamePlaceholder: "p.sh. Alban Hoxha",
    deliveryMethodLabel: "Zgjidhni Mënyrën e Marrjes",
    deliveryOption: "Dërgesë në Shtëpi",
    takeoutOption: "Merre Vetë (Takeout)",
    dineInOption: "Në Pizzeri (Dine-In)",
    pizzaSection: "Pica Speciale 🍕",
    sandwichSection: "Sanduiçë të Shtypur Artizanalë 🥪",
    drinksSection: "Pije Freskuese 🥤",
    allSection: "E Gjithë Menuja",
    customIngredientsNotice: "*Shtesat: +30 lekë për sanduiçët, +50 lekë për picat e mesme, +100 lekë për picat familjare.",
    metaSecureNotice: "Siguruar nën oraret e punës të Pro Pizza Tirana",
    deliveryNotice: "🛵 Transporti FALAS - TAXI FALAS"
  }
};
