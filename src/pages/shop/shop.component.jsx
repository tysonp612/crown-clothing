import React from "react";
import CollectionPreview from "../../components/collection-preview/collection-preview.component";

import CollectionOverview from "./../../components/collection-overview/collection-overview.component";
const ShopPage = ({ collections }) => {
  return (
    <div className="shop-page">
      <CollectionOverview />
    </div>
  );
};

export default ShopPage;
