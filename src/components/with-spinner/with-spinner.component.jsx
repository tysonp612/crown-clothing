import React from "react";
import { SpinnerContainer, SpinnerOverlay } from "./with-spinner.styles";
//higher component, it will return functional component
const WithSpinner = (WrappedComponent) => {
  const Spinner = (isLoading, ...otherProps) => {
    if (isLoading) {
      return (
        <SpinnerOverlay>
          <SpinnerContainer />
        </SpinnerOverlay>
      );
    } else {
      return <WrappedComponent {...otherProps} />;
    }
  };
  console.log(Spinner);
  return Spinner;
};

export default WithSpinner;

//1 Making a higher order component with the function of taking some component (WrappedComponent) that we want to wrap with the loading spinner
//2 That wrapped component gets passed into a new component that wrap around it
//3 Determine if is there any isLoading property passed in component? if yes, then wrap it with spinner, if not, then return component with all other props as usual
