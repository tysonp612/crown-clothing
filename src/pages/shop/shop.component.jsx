import React from "react";
import { connect } from "react-redux";
import { onSnapshot, collection } from "firebase/firestore";
// import {
//   firestore,
//   convertCollectionsSnapshotToMap,
// } from "./../../firebase/firebase.utils";
import { fetchCollectionsStartAsync } from "./../../redux/shop/shop.actions";
import { selectCollectionFetching } from "./../../redux/shop/shop.selector";

import { createStructuredSelector } from "reselect";
import { Route } from "react-router-dom";
import CollectionOverview from "./../../components/collection-overview/collection-overview.component";
import CollectionPage from "../collection/collection.component";
import { updateCollections } from "./../../redux/shop/shop.actions";
//HOC (No need in this case, we only use loading ? <CollectionPage> : <Spinning>)
// import WithSpinner from "./../../components/with-spinner/with-spinner.component";
// const CollectionsOverviewWithSpinner = WithSpinner(CollectionOverview);
// const CollectionPageWithSpinner = WithSpinner(CollectionPage);
import {
  SpinnerContainer,
  SpinnerOverlay,
} from "./../../components/with-spinner/with-spinner.styles";

class ShopPage extends React.Component {
  constructor(props) {
    //IMPORTANT: Putting API request (fetching) in constructor is a bad pattern that are not recommended because it will cause all kind of different states to happend

    super(props);
    //No need to use state since we used asynchronously redux handler
    // this.state = {
    //   loading: true,
    // };
  }
  // unsubscribeFromSnapshot = null;
  componentDidMount() {
    // const { updateCollections } = this.props;
    //getting collecion "collections" references from firestore
    // const collectionRef = collection(firestore, "collections");

    //Promise pattern
    // fetch(
    //   "https://firestore.googleapis.com/v1/projects/crown-clothing-a1add/databases/(default)/documents/collections"
    // )
    //   .then((response) => response.json())
    //   .then((collections) => console.log(collections));
    //send us snapshot representing the code of collections array when code gets run on the first time

    //Observable pattern
    // this.unsubscribeFromSnapshot = onSnapshot(
    //   collectionRef,
    //   async (snapshot) => {
    //     const collectionsMap = await convertCollectionsSnapshotToMap(snapshot);
    //     updateCollections(collectionsMap);
    //     this.setState({ loading: false });
    //   }
    // );

    //ASYNC REDUX HANDLER pattern
    const { fetchCollectionsStartAsync } = this.props;
    fetchCollectionsStartAsync();
  }
  render() {
    const { match, isCollectionFetching } = this.props;
    // const { loading } = this.state;

    //we get access to {match,location, history} becasue in App.js we wrap route between Shop (top level)
    return (
      <div className="shop-page">
        {/* We use match.path is because we don't want to hard code /shop/... and it makes it more flexible if we want to reuse it in another place */}
        <Route
          exact
          path={`${match.path}`}
          //Always have to remember to return from function or use short hand return
          render={(props) => {
            return isCollectionFetching ? (
              <SpinnerOverlay>
                <SpinnerContainer />
              </SpinnerOverlay>
            ) : (
              <CollectionOverview {...props} />
            );
          }}
        />
        <Route
          path={`${match.path}/:collectionId`}
          render={(props) =>
            isCollectionFetching ? (
              <SpinnerOverlay>
                <SpinnerContainer />
              </SpinnerOverlay>
            ) : (
              <CollectionPage {...props} />
            )
          }
        ></Route>
      </div>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  isCollectionFetching: selectCollectionFetching,
});

const mapDispatchToProps = (dispatch) => {
  return {
    // updateCollections: (collectionsMap) =>
    //   dispatch(updateCollections(collectionsMap)),
    //ASYNCHRONOUS REDUX HANDLE
    fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
