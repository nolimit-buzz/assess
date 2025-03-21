"use client";
import { styled, Container, Box } from "@mui/material";
import React, { useState } from "react";
import Header from "@/app/dashboard/layout/header/Header";
import Sidebar from "@/app/dashboard/layout/sidebar/Sidebar";

const MainWrapper = styled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  width: "100%",
  // padding: "20px",
}));

const PageWrapper = styled("div")(() => ({
  display: "flex",
  flexGrow: 1,
  paddingBottom: "60px",
  flexDirection: "column",
  zIndex: 1,
  backgroundColor: "transparent",
}));

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  return (
      <main>
        <Header toggleMobileSidebar={() => setMobileSidebarOpen(true)} />
        <MainWrapper className="mainwrapper">
          {/* ------------------------------------------- */}
          {/* Sidebar */}
          {/* ------------------------------------------- */}
          {/*<Sidebar*/}
          {/*  isSidebarOpen={isSidebarOpen}*/}
          {/*  isMobileSidebarOpen={isMobileSidebarOpen}*/}
          {/*  onSidebarClose={() => setMobileSidebarOpen(false)}*/}
          {/*/>*/}
          {/* ------------------------------------------- */}
          {/* Main Wrapper */}
          {/* ------------------------------------------- */}
          <PageWrapper className="page-wrapper">
            {/* ------------------------------------------- */}
            {/* PageContent */}
            {/* ------------------------------------------- */}
            <Container
                sx={{
                  maxWidth: "100% !important",
                  margin:'0',
                  padding: '0px !important',
                  width: "100% !important",

                }}
            >
              {/* ------------------------------------------- */}
              {/* Header */}
              {/* ------------------------------------------- */}
              {/* ------------------------------------------- */}
              {/* Page Route */}
              {/* ------------------------------------------- */}
              <Box sx={{ width:'100%',minHeight: "calc(100vh - 170px)"  }}>
                {children}
              </Box>
              {/* ------------------------------------------- */}
              {/* End Page */}
              {/* ------------------------------------------- */}
            </Container>
          </PageWrapper>
        </MainWrapper>

      </main>
  );
}
