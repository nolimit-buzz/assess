import React from "react";
import {
  Box,
  AppBar,
  Toolbar,
  styled,
  Stack,
  IconButton,
  Badge,
  Button,
  Typography,
  Grid,
  Link,
  Avatar
} from "@mui/material";
import PropTypes from "prop-types";
// components
import Profile from "./Profile"
import { IconBellRinging, IconMenu } from "@tabler/icons-react";

interface ItemType {
  toggleMobileSidebar: (event: React.MouseEvent<HTMLElement>) => void;
}

const Header = ({ toggleMobileSidebar }: ItemType) => {
  // const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  // const lgDown = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: "none",
    background: theme.palette.background.paper,
    justifyContent: "center",
    backdropFilter: "blur(4px)",

    [theme.breakpoints.up("lg")]: {
      minHeight: "70px",
    },
  }));

  const ToolbarStyled = styled(Stack)(({ theme }) => ({
    width: "100%",
    color: theme.palette.text.secondary,
    display: "flex",
    justifyContent: "space-between",
    padding: "0 20px",
    maxWidth:'1500px',
    margin:'auto',
    [theme.breakpoints.up("lg")]: {
      padding: "0 80px",
    },
  }));
  
  const ProfileButtonStyled = styled(Button)(({ theme }) => ({
    width: "100%",
    backgroundColor: "#FFFFFF",
    color: theme.palette.grey[600],
    borderRadius: "50px",
    border: `1px solid ${theme.palette.grey[300]}`,
    display: "flex",
    gap: '10px',
  }));

  const LinkStyled = styled(Link)(({ theme }) => ({
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightMedium,
    textDecoration: "none",
  }));

  const links = [{ href: "/", title: "Dashboard" }, { href: "/applications", title: "Applications" }, { href: "/notifications", title: "Notifications" }];
  return (
    <AppBarStyled position="sticky" color="default">

      <ToolbarStyled direction='row' alignItems='center' justifyContent='space-between'>
        <Box>        <img style={{ display: "block" }} width={120} height={56} src="/images/logos/logo.svg" alt="elevatehr" />
        </Box>
        <Stack direction='row' width='max-content' gap={2}>{links.map((link) => <LinkStyled href={link.href}>{link.title}</LinkStyled>)}</Stack>
        <Stack spacing={1} direction="row" alignItems="center">
          <Box
            sx={{
              display: {
                xs: "none",
                sm: "block",
              },
            }}
          >
            <ProfileButtonStyled>
              <Typography>Alimosho J.</Typography>
              <Avatar
                src="/images/profile/user-1.jpg"
                alt="image"
                sx={{
                  width: 28,
                  height: 28,
                }}
              />
            </ProfileButtonStyled>
          </Box>

        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
};

export default Header;
