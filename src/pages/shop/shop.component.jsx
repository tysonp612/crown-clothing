import React from "react";
import CollectionPreview from "../../components/collection-preview/collection-preview.component";
import { Route } from "react-router-dom";
import CollectionOverview from "./../../components/collection-overview/collection-overview.component";
import CollectionPage from "../collection/collection.component";
const ShopPage = ({ match }) => {
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
};

export default ShopPage;
