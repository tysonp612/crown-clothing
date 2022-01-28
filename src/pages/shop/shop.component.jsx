import React from "react";
import { connect } from "react-redux";
import { onSnapshot, collection } from "firebase/firestore";
import {
  firestore,
  convertCollectionsSnapshotToMap,
} from "./../../firebase/firebase.utils";
import { Route } from "react-router-dom";
import CollectionOverview from "./../../components/collection-overview/collection-overview.component";
import CollectionPage from "../collection/collection.component";
import { updateCollections } from "./../../redux/shop/shop.actions";
class ShopPage extends React.Component {
  unsubscribeFromSnapshot = null;
  componentDidMount() {
    const { updateCollections } = this.props;
    //getting collecion "collections" references from firestore
    const collectionRef = collection(firestore, "collections");

    //send us snapshot representing the code of collections array when code gets run on the first time
    this.unsubscribeFromSnapshot = onSnapshot(
      collectionRef,
      async (snapshot) => {
        const collectionsMap = await convertCollectionsSnapshotToMap(snapshot);
        updateCollections(collectionsMap);
      }
    );
  }
  render() {
    const { match } = this.props;
    //we get access to {match,location, history} becasue in App.js we wrap route between Shop (top level)
    return (
      <div className="shop-page">
        {/* We use match.path is because we don't want to hard code /shop/... and it makes it more flexible if we want to reuse it in another place */}
        <Route exact path={`${match.path}`} component={CollectionOverview} />
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionPage}
        ></Route>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateCollections: (collectionsMap) =>
      dispatch(updateCollections(collectionsMap)),
  };
};

export default connect(null, mapDispatchToProps)(ShopPage);
