import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import ActionSection from "./ActionSection";
import CandidateDetailsSection from "./CandidateSection";
import CandidateListSection from "./CandidatesListSection";
import  FilterOptionsSection from "./FilterOptions";
import  HeaderSection from "./HeaderSection";
import  MainContentSection from "./MainContentSection";
import  NavigationSection from "./NavigationSection";
import  SummarySection from "./SummarySection";

const ApplicantsList = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        maxWidth: 956,
        bgcolor: "background.paper",
        borderRadius: 2,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Typography
        variant="subtitle1"
        sx={{
          position: "absolute",
          top: "23px",
          left: "20px",
          fontWeight: 600,
          color: "rgba(17, 17, 17, 0.68)",
          fontSize: "1.125rem",
          letterSpacing: "0.27px",
          lineHeight: "18px",
          zIndex: 1,
        }}
      >
        Choose action:
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <SummarySection />
        {/* <HeaderSection /> */}
        {/* <MainContentSection /> */}
        <CandidateListSection />
        {/* <ActionSection /> */}
        {/* <NavigationSection /> */}
        {/* <CandidateDetailsSection /> */}
        {/* <FilterOptionsSection /> */}
      </Box>
    </Paper>
  );
};

export default ApplicantsList;
