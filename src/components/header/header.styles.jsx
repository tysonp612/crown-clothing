// import styled, { css } from "styled-components";
import styled from "styled-components";
import { Link } from "react-router-dom";
//css syntax allows us to write a block of css code that can pass in other block (like sass module)
// const OptionContainerStyles = css`
//   padding: 10px 15px;
//   cruisor: pointer;
// `;
export const HeaderContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
`;

//to use Link element from react router, we use style(Link) and pass Link as a function
export const LogoContainer = styled(Link)`
  height: 100%;
  width: 70px;
  padding: 25px;
`;
export const OptionsContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  cursor: pointer;
`;
export const OptionLink = styled(Link)`
  padding: 10px 15px;
  cruisor: pointer;
`;
// export const OptionDiv = styled.div`
//   ${OptionContainerStyles}
// `;
/*
.header {
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;

  .logo-container {
    height: 100%;
    width: 70px;
    padding: 25px;
  }

  .options {
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    cursor: pointer;

    .option {
      padding: 10px 15px;
    }
  }
}
*/
