export const addMutipleItemsToCart = (cartItems, cartItemToAdd) => {
  //THINK OF cartItems (ARRAY) and cartItemToAdd (OBJECT AS STATE IN CART REDUCER
  //this function will return the first item found in the array of cartItems based of the function passed in find()
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToAdd.id
  );
  //check if there is any existing item, if true, return a new array with an object of quantity
  if (existingCartItem) {
    //this console.log will return an object of existing item {id: 18, name: 'Black Jean Shearling', imageUrl: 'https://i.ibb.co/XzcwL5s/black-shearling.png', price: 125, quantity: 2}
    console.log(existingCartItem);
    //if there is an existing item, check every single item to find which particular item is existing, then return a new array of that item with a new object {quantity : quantity+1}
    return cartItems.map((cartItem) =>
      //this line above means make a new cartItems array, but the cartItem that matches the id with the new one will return a new object with quantity +1
      cartItem.id === cartItemToAdd.id
        ? //if id matches, spread everything in that cartitem to make the old object, then add quantity + 1
          { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  } //if no existing item, then return old cart item and an object of new cart item
  // console.log([...cartItems, { ...cartItemToAdd, quantity: 1 }]);
  return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  //1 Check if the item we choose is inside the cart , of if the item have already existed
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );
  //2 If there is an existing item, and the quantity is equal 1, we only keep the item with quantity > 1
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }
  //3 Else, we map for a new array, which we first check the id matches ? if yes, if id matches, spread everything in that cartitem to make the old object, then subject quantity -

  return cartItems.map((cartItem) =>
    //this line above means make a new cartItems array, but the cartItem that matches the id with the new one will return a new object with quantity -1
    cartItem.id === cartItemToRemove.id
      ? //if id matches, spread everything in that cartitem to make the old object, then add quantity - 1
        { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};
