/**
 * @typedef {Object} MenuItem
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {number} price
 * @property {string} category
 * @property {string[]} tags
 * @property {boolean} seasonal
 * @property {boolean} soldOut
 * @property {string} image
 * @property {string} imageAlt
 */

/**
 * @typedef {Object} MenuCategory
 * @property {string} id
 * @property {string} name
 * @property {string} slug
 */

/** @type {MenuCategory[]} */
export const categories = [
  { id: "1", name: "All", slug: "all" },
  { id: "2", name: "Coffee", slug: "coffee" },
  { id: "3", name: "Tea & More", slug: "drinks" },
  { id: "4", name: "Food", slug: "food" },
  { id: "5", name: "Seasonal", slug: "seasonal" },
];

/** @type {MenuItem[]} */
export const menuItems = [
  {
    id: "espresso",
    name: "Classic Espresso",
    description: "Bold, rich single origin shot with caramel notes",
    price: 3.5,
    category: "coffee",
    tags: [],
    seasonal: false,
    soldOut: false,
    image: "/menu-items/1.jpg",
    imageAlt: "Rich espresso shot in white ceramic cup",
  },
  {
    id: "cortado",
    name: "Cortado",
    description: "Equal parts espresso and steamed milk, velvety smooth",
    price: 4.5,
    category: "coffee",
    tags: [],
    seasonal: false,
    soldOut: false,
    image: "/menu-items/2.jpg",
    imageAlt: "Cortado coffee in glass with layered milk",
  },
  {
    id: "oat-latte",
    name: "Oat Milk Latte",
    description: "Creamy oat milk paired with our house espresso blend",
    price: 5.5,
    category: "coffee",
    tags: ["vegan"],
    seasonal: false,
    soldOut: false,
    image: "/menu-items/3.jpg",
    imageAlt: "Creamy latte with latte art in ceramic mug",
  },
  {
    id: "cold-brew",
    name: "Cold Brew",
    description: "Slow-steeped for 18 hours, served over ice",
    price: 5.0,
    category: "coffee",
    tags: ["vegan"],
    seasonal: false,
    soldOut: false,
    image: "/menu-items/4.jpg",
    imageAlt: "Iced cold brew coffee in glass with condensation",
  },
  {
    id: "pour-over",
    name: "Single Origin Pour Over",
    description: "Hand-poured, rotating seasonal bean selection",
    price: 6.0,
    category: "coffee",
    tags: [],
    seasonal: false,
    soldOut: false,
    image: "/menu-items/5.jpg",
    imageAlt: "Pour over coffee brewing with gooseneck kettle",
  },
  {
    id: "matcha-latte",
    name: "Matcha Latte",
    description: "Ceremonial grade matcha, steamed milk of choice",
    price: 5.5,
    category: "drinks",
    tags: ["gluten-free"],
    seasonal: false,
    soldOut: false,
    image: "/menu-items/6.jpg",
    imageAlt: "Vibrant green matcha latte in clear glass",
  },
  {
    id: "chai",
    name: "House Chai Latte",
    description: "Spiced black tea, simmered with whole milk and honey",
    price: 5.0,
    category: "drinks",
    tags: [],
    seasonal: false,
    soldOut: false,
    image: "/menu-items/7.jpg",
    imageAlt: "Warm spiced chai latte in ceramic cup",
  },
  {
    id: "fresh-juice",
    name: "Fresh Pressed Juice",
    description: "Daily selection of seasonal fruits and vegetables",
    price: 6.5,
    category: "drinks",
    tags: ["vegan", "gluten-free"],
    seasonal: false,
    soldOut: false,
    image: "/menu-items/8.jpg",
    imageAlt: "Fresh pressed colorful juice in glass",
  },
  {
    id: "croissant",
    name: "Butter Croissant",
    description: "Flaky, golden, baked fresh every morning",
    price: 4.0,
    category: "food",
    tags: [],
    seasonal: false,
    soldOut: false,
    image: "/menu-items/9.jpg",
    imageAlt: "Golden flaky butter croissant on white plate",
  },
  {
    id: "avocado-toast",
    name: "Avocado Toast",
    description: "Sourdough, smashed avocado, chili flake, micro herbs",
    price: 12.0,
    category: "food",
    tags: ["vegan"],
    seasonal: false,
    soldOut: false,
    image: "/menu-items/10.jpg",
    imageAlt: "Avocado toast on sourdough with chili flakes",
  },
  {
    id: "granola-bowl",
    name: "House Granola Bowl",
    description: "Oats, nuts, seeds, seasonal fruit, honey yogurt",
    price: 10.0,
    category: "food",
    tags: ["gluten-free"],
    seasonal: false,
    soldOut: false,
    image: "/menu-items/11.jpg",
    imageAlt: "Granola bowl topped with fresh berries and yogurt",
  },
  {
    id: "sandwich",
    name: "Turkey & Brie Sandwich",
    description: "Ciabatta, roasted turkey, brie, fig jam, arugula",
    price: 13.5,
    category: "food",
    tags: [],
    seasonal: false,
    soldOut: false,
    image: "/menu-items/12.jpg",
    imageAlt: "Turkey and cheese sandwich on artisan bread",
  },
  {
    id: "lavender-latte",
    name: "Lavender Honey Latte",
    description: "Espresso, house-made lavender syrup, local honey",
    price: 6.5,
    category: "seasonal",
    tags: ["gluten-free"],
    seasonal: true,
    soldOut: false,
    image: "/menu-items/13.jpg",
    imageAlt: "Lavender colored latte with purple floral garnish",
  },
  {
    id: "mango-matcha",
    name: "Mango Matcha Fizz",
    description: "Iced matcha, mango puree, sparkling water",
    price: 7.0,
    category: "seasonal",
    tags: ["vegan", "gluten-free"],
    seasonal: true,
    soldOut: false,
    image: "/menu-items/14.jpg",
    imageAlt: "Layered green and orange iced drink in tall glass",
  },
  {
    id: "açaí-bowl",
    name: "Açaí Power Bowl",
    description: "Açaí blend, topped with granola, coconut, berries",
    price: 13.0,
    category: "seasonal",
    tags: ["vegan", "gluten-free"],
    seasonal: true,
    soldOut: true,
    image: "/menu-items/15.jpg",
    imageAlt: "Açaí bowl topped with granola, coconut flakes, and fresh berries",
  },
];

export const featuredItemIds = [
  "oat-latte",
  "avocado-toast",
  "lavender-latte",
  "cold-brew",
  "granola-bowl",
  "croissant",
];
