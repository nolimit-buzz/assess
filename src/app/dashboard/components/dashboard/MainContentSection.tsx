import ClockIcon from "@mui/icons-material/AccessTimeOutlined";
import MoneyIcon from "@mui/icons-material/AttachMoneyOutlined";
import CheckIcon from "@mui/icons-material/CheckCircle";
import ArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ArrowUpRightIcon from "@mui/icons-material/LaunchOutlined";
import UserSearchIcon from "@mui/icons-material/PersonSearchOutlined";
import BriefcaseIcon from "@mui/icons-material/WorkOutline";
import { Box, Button, Chip, Link, Paper, Typography } from "@mui/material";
import React from "react";

export default function MainContentSection() {
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
    { icon: <BriefcaseIcon fontSize="small" />, text: "6 years" },
    { icon: <MoneyIcon fontSize="small" />, text: "600k-700k" },
    { icon: <ClockIcon fontSize="small" />, text: "Available immediately" },
    { icon: <UserSearchIcon fontSize="small" />, text: "Open to trial" },
  ];

  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        p: 3,
        borderBottom: "0.8px solid rgba(17, 17, 17, 0.08)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        {/* Candidate Details Section */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {/* Name and Verification Icon */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                width: 16,
                height: 16,
                bgcolor: "secondary.main",
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CheckIcon sx={{ color: "white", fontSize: 12 }} />
            </Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                fontSize: 18,
                lineHeight: "18px",
              }}
            >
              Jessica Ray Okafor
            </Typography>
          </Box>

          {/* Candidate Info Row */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 3.5 }}>
            {candidateInfo.map((item, index) => (
              <Box
                key={index}
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                {item.icon}
                <Typography
                  variant="body2"
                  sx={{ color: "rgba(17, 17, 17, 0.68)", fontSize: 16 }}
                >
                  {item.text}
                </Typography>
              </Box>
            ))}

            {/* Resume Link */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Link
                href="#"
                underline="always"
                sx={{ color: "rgba(17, 17, 17, 0.92)", fontSize: 16 }}
              >
                Resume
              </Link>
              <ArrowUpRightIcon fontSize="small" />
            </Box>
          </Box>

          {/* Skills List */}
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
            {skills.map((skill, index) => (
              <Chip
                key={index}
                label={skill}
                sx={{
                  bgcolor: "#efefef",
                  color: "rgba(17, 17, 17, 0.68)",
                  borderRadius: "28px",
                  fontSize: 14,
                  fontWeight: 400,
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Quick Actions Button */}
        <Button
          variant="outlined"
          endIcon={<ArrowDownIcon />}
          sx={{
            borderRadius: 2,
            textTransform: "none",
            color: "text.secondary",
            borderColor: "rgba(0, 0, 0, 0.12)",
          }}
        >
          Quick actions
        </Button>
      </Box>
    </Paper>
  );
}
