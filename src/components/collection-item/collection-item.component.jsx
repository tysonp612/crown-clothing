import React from "react";
import "./collection-item.styles.scss";
import CustomButton from "./../custom-button/custom-button.component";
import { addItemsToCart } from "./../../redux/cart/cart.actions";
import { connect } from "react-redux";
//always have to destructure dispatch from redux and use it as a paremeter in used component
const CollectionItem = ({ item, addItemsToCart }) => {
  console.log(item);
  //destructure item object passed as prop from parent component
  const { name, price, imageUrl } = item;
  return (
    <div className="collection-item">
      <div className="image" style={{ backgroundImage: `url(${imageUrl})` }} />
      {/* //dynamically set background image with fetched data */}
      <div className="collection-footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <CustomButton inverted onClick={() => addItemsToCart(item)}>
        Add to cart
      </CustomButton>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    //import the action from cart/actions to match the type, we need payload on this one
    addItemsToCart: (item) => dispatch(addItemsToCart(item)),
  };
};
//Always have to add null as default props if there is not props from mapStateToProps
export default connect(null, mapDispatchToProps)(CollectionItem);
