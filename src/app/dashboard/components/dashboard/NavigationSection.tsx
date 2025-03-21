import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LaunchIcon from "@mui/icons-material/Launch";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import { Box, Button, Checkbox, Chip, Link, Stack, Typography } from "@mui/material";
import React from "react";

export default function NavigationSection() {
  // Skills data for mapping
  const skills = ["Communication", "Data analysis", "Strategic Thinking", "Empathy", "Prioritization"];

  // Candidate info data for mapping
  const candidateInfo = [
    { icon: <WorkOutlineIcon fontSize="small" />, text: "3 years" },
    { icon: <AttachMoneyIcon fontSize="small" />, text: "400k-600k" },
    { icon: <AccessTimeIcon fontSize="small" />, text: "Available in 2 weeks" },
    { icon: <PersonSearchIcon fontSize="small" />, text: "No to trial" },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        borderBottom: "0.8px solid rgba(17, 17, 17, 0.08)",
        py: 3,
        px: 3,
      }}
    >
      {/* Candidate Name Section */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
        <Checkbox size="small" sx={{ mr: 1 }} />
        <Typography
          variant="h6"
          fontWeight={600}
          sx={{
            fontSize: "1.125rem",
            lineHeight: "18px",
            color: "rgba(17, 17, 17, 0.92)",
          }}
        >
          Yerima Jacob
        </Typography>
      </Box>

      {/* Candidate Information Section */}
      <Stack direction="row" spacing={3.5} alignItems="center" sx={{ mt: 0.5, mb: 2 }}>
        {candidateInfo.map((item, index) => (
          <Stack key={index} direction="row" spacing={1} alignItems="center">
            {item.icon}
            <Typography
              variant="body2"
              sx={{ color: "rgba(17, 17, 17, 0.68)", fontSize: "1rem", lineHeight: "16px" }}
            >
              {item.text}
            </Typography>
          </Stack>
        ))}

        {/* Resume Link */}
        <Stack direction="row" spacing={0.5} alignItems="center">
          <Link
            underline="always"
            sx={{
              color: "rgba(17, 17, 17, 0.92)",
              fontSize: "1rem",
              lineHeight: "16px",
              cursor: "pointer",
            }}
          >
            Resume
          </Link>
          <LaunchIcon sx={{ fontSize: 20 }} />
        </Stack>

        {/* Spacer to push Quick Actions Button to the right */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Quick Actions Button */}
        <Button
          variant="outlined"
          endIcon={<KeyboardArrowDownIcon />}
          sx={{
            borderRadius: 2,
            textTransform: "none",
            px: 2,
            py: 1.5,
            fontSize: "0.875rem",
            color: "text.secondary",
            borderColor: "rgba(17, 17, 17, 0.2)",
          }}
        >
          Quick actions
        </Button>
      </Stack>
</Box>
  )}
