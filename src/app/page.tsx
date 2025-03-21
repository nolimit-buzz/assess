"use client";
import Link from "next/link";
import { Box, Stack, Typography } from "@mui/material";
import PageContainer from "@/app/dashboard/components/container/PageContainer";
import AuthLogin from "./authentication/auth/AuthLogin";
import Image from "next/image";

const Login = () => {
  return (
    <PageContainer title="Login" description="This is the login page">
      <Stack direction="row" width="100%" height={'100vh'} backgroundColor="white">
        {/* Left Section with Background Image */}
        <Box 
          sx={{ 
            boxSizing:'border-box',
            margin:'80px',
            position: "relative", 
            backgroundColor: "white", 
            // height: "100vh", 
            flex: 1 
          }}
        >
          <Box
            sx={{
            
              width: "100%",
              height: "100%",
              backgroundColor: "#E8EEF8",
              borderRadius: '20px',
              backgroundImage: "url(/images/backgrounds/login-bg.svg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >

          {/* Background Image */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              borderRadius: 2,
            
            }}
          />

          {/* Overlay Content */}
          <Stack 
            spacing={4} 
            alignItems="center" 
            justifyContent="space-evenly" 
            sx={{ position: "absolute", width: "100%", height: "100%", display: "flex" }}
          >
            {/* Logo */}
            <Image 
              src="/images/logos/logo.svg" 
              alt="Company Logo" 
              width={103} 
              height={22} 
              style={{ flexShrink: 0 }}
            />

            {/* Center Image */}
            <Image 
              src="/images/login-left.svg" 
              alt="Login Illustration" 
              width={548} 
              height={436} 
              style={{ flexShrink: 0 }}
            />

            {/* Description Text */}
            <Typography
              sx={{
                color: "rgba(17, 17, 17, 0.84)",
                textAlign: "center",
                fontSize: "32px",
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: "120%", // 38.4px
              }}
            >
              Effortless hiring processes <br /> and discovering top talents easily.
            </Typography>
          </Stack>
          </Box>
        </Box>

        {/* Right Section */}
        <Stack justifyContent="center" sx={{ flex: 1, height: "100vh", backgroundColor: "white" }}>
          <Box sx={{ p: 4, width: "100%", maxWidth: 600, margin: "0 auto" }}>
            <Stack>
              <Typography variant="h1" align="center">Login to your Account</Typography>
            </Stack>
            <AuthLogin
              subtext={
                <Typography variant="subtitle1" textAlign="center" color="textSecondary" mb={'48px'}>
                  Enter your login details
                </Typography>
              }
              subtitle={
                <Stack direction="row" spacing={1} justifyContent="center" mt={3}>
                  <Typography color="06C680" variant="h6" fontWeight={500}>
                    New to Spike?
                  </Typography>
                  <Typography
                    component={Link}
                    href="/authentication/register"
                    fontWeight={500}
                    sx={{ textDecoration: "none", color: "primary.main" }}
                  >
                    Create an account
                  </Typography>
                </Stack>
              }
            />
          </Box>
        </Stack>
      </Stack>
    </PageContainer>
  );
};

export default Login;
