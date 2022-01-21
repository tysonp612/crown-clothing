import React, { useEffect } from "react";
import "./collection.styles.scss";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { changeShopParams } from "./../../redux/shop/shop.actions";
import { selectCollection } from "./../../redux/shop/shop.selector";
import CollectionItem from "../../components/collection-item/collection-item.component";

const CollectionPage = ({ match, collection, changeParams }) => {
  let params = useParams();
  const { title, items } = collection;
  console.log(items);
  useEffect(() => {
    changeParams(params.collectionId);
  });
  return (
    <div className="collection-page">
      <h2 className="title">{title}</h2>
      <div className="items">
        {items.map((item) => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    //putting the (state) below is necessary because unlike other selectors, this selector needs a part of the state depending on the URL parameter
    collection: selectCollection(state.shop.params)(state),
  };
};
const mapDispatchToProps = (dispatch) => ({
  changeParams: (item) => dispatch(changeShopParams(item)),
});
export default connect(mapStateToProps, mapDispatchToProps)(CollectionPage);

/*Explain how to extract data from params:
1) Make shop params into redux with actions, type, payload, reducer...
2) import useParams and useEffect from react to extract the params from URL...
3) Make dispatch with payload of the param and save data from step 2 into shop reducer
4) Make a selectCollection selector, inside we find the data with the id or route name or id that matches the passed params(URL)
(collectionUrlParam) => {
  return createSelector([selectShopItems], (collections) => {
    return collections.find(
      (collection) => collection.id === COLLECTION_ID_MAP[collectionUrlParam]
    );
  });
**Remember to return of step 4, because in mapStateToProp, the selector return a function, that get called second time in mapStateToProp, and from that new function, we return the data that matches with passed parameter

*/
