// Email validation
export function validateEmail(email) {
    /* eslint-disable */
    const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
    return regex.test(email);
  }
  
  export const recipeTypeList = [
    {
      name: "Desserts",
      image: "desserts",
      path: "dessert"
    },
    {
      name: "Drinks",
      image: "drinks",
      path: "drink"
    },
    {
      name: "Soup & Stew",
      image: "soup-stew",
      path: "soup-stew"
    },
    {
      name: "Salads",
      image: "salads",
      path: "salad"
    },
    {
      name: "Snacks",
      image: "snacks",
      path: "snack"
    },
    {
      name: "Bread, Cakes & Muffins",
      image: "bread-cakes",
      path: "bread-cake-muffin"
    },
    {
      name: "Breakfast & Brunch",
      image: "breakfast",
      path: "breakfast-brunch"
    },
    {
      name: "Lunch",
      image: "lunch",
      path: "lunch"
    },
    {
      name: "Dinner",
      image: "dinner",
      path: "dinner"
    }
  ];