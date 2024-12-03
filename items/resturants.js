const restaurants = [
  {
    id: 1,
    name: "Pasta Paradise",
    image:
      "https://img.freepik.com/premium-vector/pasta-logo-design-template-vector-round-linear-logo-spaghetti-with-fork-white-background_279597-838.jpg",
    rating: 4.5,
    deliveryTime: "30-40 mins",
    menuItems: [
      {
        id: 11,
        name: "Spaghetti Carbonara",
        price: 12.99,
        image:
          "https://stefaniaskitchenette.com/wp-content/uploads/2024/07/Carbonara-3-720x1080.webp",
        description:
          "Creamy pasta with pancetta, egg yolk, and Parmesan cheese.",
      },
      {
        id: 12,
        name: "Margherita Pizza",
        price: 10.99,
        image:
          "https://au.ooni.com/cdn/shop/articles/20220211142645-margherita-9920.jpg?crop=center&height=800&v=1662539926&width=800",
        description: "Classic pizza with tomato, mozzarella, and fresh basil.",
      },
      {
        id: 13,
        name: "Tiramisu",
        price: 6.99,
        image:
          "https://www.culinaryhill.com/wp-content/uploads/2021/01/Tiramisu-Culinary-Hill-1200x800-1.jpg",
        description:
          "Traditional Italian dessert with coffee-soaked ladyfingers and mascarpone.",
      },
    ],
    category: "Italian",
  },
  {
    id: 2,
    name: "Wok Express",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCJU62BK7q-jqkrBj6JTRHrq_qhVvOVd8eGw&s",
    rating: 4.2,
    deliveryTime: "20-30 mins",
    menuItems: [
      {
        id: 14,
        name: "Kung Pao Chicken",
        price: 13.99,
        image:
          "https://www.onceuponachef.com/images/2018/05/Kung-Pao-Chicken-16-scaled.jpg",
        description:
          "Stir-fried chicken with peanuts, vegetables, and chili peppers.",
      },
      {
        id: 15,
        name: "Spring Rolls",
        price: 5.99,
        image:
          "https://saltedmint.com/wp-content/uploads/2024/01/Vegetable-Spring-Rolls-4.jpg",
        description:
          "Crispy rolls filled with vegetables and served with sweet chili sauce.",
      },
      {
        id: 16,
        name: "Sweet and Sour Chicken",
        price: 14.99,
        image:
          "https://nomadette.com/wp-content/uploads/2023/06/Sweet-Sour-Chicken-Air-Fryer-Recipe.jpg",
        description:
          "Juicy chicken in a tangy sweet and sour sauce with pineapples.",
      },
    ],
    category: "Chinese",
  },
  {
    id: 3,
    name: "Taco Town",
    image:
      "https://i0.wp.com/tacotownpgh.com/wp-content/uploads/2022/09/cropped-TT-logo01B-RGB-1440.png?fit=512%2C512&ssl=1",
    rating: 4.7,
    deliveryTime: "25-35 mins",
    menuItems: [
      {
        id: 17,
        name: "Beef Tacos",
        price: 8.99,
        image:
          "https://kaynutrition.com/wp-content/uploads/2023/08/shredded-beef-tacos.jpg",
        description:
          "Soft tortillas filled with seasoned beef, lettuce, and cheese.",
      },
      {
        id: 18,
        name: "Chicken Quesadilla",
        price: 9.99,
        image:
          "https://www.wellplated.com/wp-content/uploads/2022/10/best-chicken-quesadilla.jpg",
        description:
          "Grilled tortilla with chicken, melted cheese, and peppers.",
      },
      {
        id: 19,
        name: "Churros",
        price: 4.99,
        image:
          "https://hips.hearstapps.com/hmg-prod/images/churros-vertical-661d4691b6ce6.jpg?crop=1.00xw:0.802xh;0,0&resize=980:*",
        description:
          "Fried dough pastries dusted with cinnamon sugar, served with chocolate sauce.",
      },
    ],
    category: "Mexican",
  },
  {
    id: 4,
    name: "Spice Route",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl3bzdFTaAXFRgvhdJ8WWnT-Tt6H2pMsfvcA&s",
    rating: 4.6,
    deliveryTime: "30-40 mins",
    menuItems: [
      {
        id: 20,
        name: "Butter Chicken",
        price: 15.99,
        image:
          "https://saltedmint.com/wp-content/uploads/2024/01/Indian-Butter-Chicken-recipe-with-rice.jpg",
        description: "Creamy tomato-based curry with tender chicken pieces.",
      },
      {
        id: 21,
        name: "Paneer Tikka",
        price: 12.99,
        image:
          "https://sharethespice.com/wp-content/uploads/2024/02/Paneer-Tikka-Featured-500x500.jpg",
        description: "Grilled cottage cheese cubes marinated in spices.",
      },
      {
        id: 22,
        name: "Gulab Jamun",
        price: 5.99,
        image:
          "https://www.vegrecipesofindia.com/wp-content/uploads/2022/10/gulab-jamun-recipe-01.jpg",
        description: "Soft milk dumplings soaked in sugar syrup.",
      },
    ],
    category: "Indian",
  },
  {
    id: 5,
    name: "T-Grill",
    image:
      "https://lh6.googleusercontent.com/proxy/wpsQwjbqIAY6Hlmmwxx5oWkT5ihpDjETU1NbnOlKzv-qdsLusT1ZFsOl_kNJjAlKUV4VpRCXT7Y83lCtrCG3Prvk9KP6_5chOZDFnAzjboJhow4",
    rating: 4.8,
    deliveryTime: "40-50 mins",
    menuItems: [
      {
        id: 23,
        name: "Machboos",
        price: 17.99,
        image:
          "https://www.endofthefork.com/wp-content/uploads/2023/06/machboos-sq-500x500.jpg",
        description: "Fragrant spiced rice with tender lamb or chicken.",
      },
      {
        id: 24,
        name: "Kebab Skewers",
        price: 14.99,
        image:
          "https://www.cookingclassy.com/wp-content/uploads/2017/04/steak-kebabs-12-500x375.jpg",
        description: "Grilled meat skewers seasoned with traditional spices.",
      },
      {
        id: 25,
        name: "Dates Pudding",
        price: 6.99,
        image:
          "https://thebigmansworld.com/wp-content/uploads/2024/09/sticky-date-pudding-recipe.jpg",
        description:
          "Rich dessert made with dates, cardamom, and caramel sauce.",
      },
    ],
    category: "Kuwaiti",
  },
];

export default restaurants;
