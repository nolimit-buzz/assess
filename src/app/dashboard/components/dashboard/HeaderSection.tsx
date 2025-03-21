import ClockIcon from "@mui/icons-material/AccessTimeOutlined";
import ChevronDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MoneyIcon from "@mui/icons-material/MonetizationOnOutlined";
import ArrowUpRightIcon from "@mui/icons-material/NorthEast";
import UserSearchIcon from "@mui/icons-material/PersonSearchOutlined";
import BriefcaseIcon from "@mui/icons-material/WorkOutline";
import {
  Box,
  Button,
  Checkbox,
  Chip,
  Link,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";

const HeaderSection = () => {
  // Skills data for mapping
  const skills = [
    "Communication",
    "Data analysis",
    "Strategic Thinking",
    "Empathy",
    "Prioritization",
  ];

  // Candidate info data for mapping
  const candidateInfo = [
    { icon: <BriefcaseIcon fontSize="small" />, text: "5 years" },
    { icon: <MoneyIcon fontSize="small" />, text: "400k-600k" },
    { icon: <ClockIcon fontSize="small" />, text: "Available immediately" },
    { icon: <UserSearchIcon fontSize="small" />, text: "Open to trial" },
  ];

  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        p: 3,
        pb: 2,
        borderBottom: "0.8px solid rgba(17, 17, 17, 0.08)",
      }}
    >
      {/* Candidate Name with Checkbox */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
        <Checkbox size="small" sx={{ mr: 1, ml: -1 }} />
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            fontSize: "1.125rem",
            lineHeight: "18px",
            color: "rgba(17, 17, 17, 0.92)",
          }}
        >
          Olakunjo Michael
        </Typography>
      </Box>

      {/* Candidate Info Row */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mt: 1,
        }}
      >
        {/* Candidate Details */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 3.5 }}>
          {candidateInfo.map((item, index) => (
            <Box
              key={index}
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              {item.icon}
              <Typography
                variant="body2"
                sx={{
                  color: "rgba(17, 17, 17, 0.68)",
                  fontSize: "1rem",
                  lineHeight: "16px",
                }}
              >
                {item.text}
              </Typography>
            </Box>
          ))}

          {/* Resume Link */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, ml: 1 }}>
            <Link
              href="#"
              underline="always"
              sx={{
                color: "rgba(17, 17, 17, 0.92)",
                fontSize: "1rem",
                lineHeight: "16px",
              }}
            >
              Resume
            </Link>
            <ArrowUpRightIcon fontSize="small" />
          </Box>
        </Box>

        {/* Quick Actions Button */}
        <Button
          variant="outlined"
          endIcon={<ChevronDownIcon />}
          sx={{
            borderRadius: 1,
            textTransform: "none",
            color: "text.secondary",
            borderColor: "rgba(17, 17, 17, 0.12)",
            px: 2,
            py: 1.5,
          }}
        >
          Quick actions
        </Button>
      </Box>

      {/* Skills Chips */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 2 }}>
        {skills.map((skill, index) => (
          <Chip
            key={index}
            label={skill}
            sx={{
              backgroundColor: "#efefef",
              color: "rgba(17, 17, 17, 0.68)",
              borderRadius: "28px",
              fontSize: "0.875rem",
              fontWeight: "normal",
            }}
          />
        ))}
      </Box>
    </Paper>
  );
};

export default HeaderSection;
