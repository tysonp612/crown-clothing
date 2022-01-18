import React from "react";
import "./directory.styles.scss";
import MenuItem from "./../menu-item/menu-item.component";
import { createStructuredSelector } from "reselect";
import { selectDirectorySections } from "./../../redux/directory/directory.selector";
import { connect } from "react-redux";

const Directory = ({ sections }) => {
  return (
    <div className="directory-menu">
      {sections.map(({ id, ...otherSectionProps }) => {
        // title, imageUrl, id, size === ...otherSectionProps
        return <MenuItem key={id} {...otherSectionProps} />;
      })}
    </div>
  );
};

//using selector
const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections,
});

//Using regular redux mapStateToProps
// const mapStateToProps = (state) => {
//   return {
//     sections: state.directory.sections,
//   };
// };
export default connect(mapStateToProps)(Directory);
