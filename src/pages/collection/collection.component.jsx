import React from "react";
import "./collection.styles.scss";
import { connect } from "react-redux";
import { selectCollection } from "./../../redux/shop/shop.selector";
import CollectionItem from "../../components/collection-item/collection-item.component";

const CollectionPage = ({ match }) => {
  console.log(match);
  return (
    <div className="category">
      <h2>CATEGORY PAGE</h2>
    </div>
  );
};

// Explaining mapStateToProps:
// In here, we are trying to extract match.params (hats/jackets) from the route/:collection, from then, we pass that into the selector,
// Inside selector, it will get access to state.shopData, then it will find the JSON object containing the data that matches the match params,
// then return that data in to the prop collection below.

const mapStateToProps = (state, ownProps) => {
  return {
    //putting the (state) below is necessary because unlike other selectors, this selector needs a part of the state depending on the URL parameter
    collection: selectCollection(ownProps.match.params.collectionId)(state),
  };
};

export default connect(mapStateToProps)(CollectionPage);
