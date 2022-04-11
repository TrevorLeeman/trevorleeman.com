import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { SvgIcon } from "@mui/material";
import styled from "@emotion/styled";

const BottomNavigationStyled = styled(BottomNavigation)`
  position: fixed;
  bottom: 0;
  width: 100%;
`;

export const MobileNavigation = () => (
  <BottomNavigationStyled
    showLabels
    // value={value}
    // onChange={(event, newValue) => {
    //   setValue(newValue);
    // }}
  >
    <BottomNavigationAction label="Home" icon={<HomeIcon />} />
    <BottomNavigationAction
      label="Blog"
      icon={
        <SvgIcon>
          <path d="M3 3V21H21V3H3M18 18H6V17H18V18M18 16H6V15H18V16M18 12H6V6H18V12Z" />
        </SvgIcon>
      }
    />
  </BottomNavigationStyled>
);
