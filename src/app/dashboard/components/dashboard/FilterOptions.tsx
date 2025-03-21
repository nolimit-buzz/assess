import AccessTimeIcon from "@mui/icons-material/AccessTime";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LaunchIcon from "@mui/icons-material/Launch";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import PersonSearchOutlinedIcon from "@mui/icons-material/PersonSearchOutlined";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import { 
  Button, 
  Chip, 
  Link, 
  Paper, 
  Stack, 
  Typography 
} from "@mui/material";
import React from "react";

const FilterOptionsSection = () => {
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
    { icon: <WorkOutlineIcon fontSize="small" />, text: "4 years" },
    { icon: <MonetizationOnOutlinedIcon fontSize="small" />, text: "400k-600k" },
    { icon: <AccessTimeIcon fontSize="small" />, text: "Available immediately" },
    { icon: <PersonSearchOutlinedIcon fontSize="small" />, text: "Open to trial" },
  ];

  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        py: 3,
        px: 3.5,
        borderBottom: "0.8px solid rgba(17, 17, 17, 0.08)",
        position: "relative",
      }}
    >
      {/* Candidate Name */}
      <Typography variant="h6" fontWeight={600} sx={{ mb: 0.5 }}>
        Sumayah Alli
      </Typography>

      {/* Candidate Info Row */}
      <Stack direction="row" spacing={7} alignItems="center" sx={{ mt: 1 }}>
        <Stack direction="row" spacing={7}>
          {candidateInfo.map((item, index) => (
            <Stack key={index} direction="row" spacing={1} alignItems="center">
              {item.icon}
              <Typography variant="body2" color="rgba(17, 17, 17, 0.68)">
                {item.text}
              </Typography>
            </Stack>
          ))}
        </Stack>

        {/* Portfolio Link */}
        <Link
          href="#"
          underline="always"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            color: "rgba(17, 17, 17, 0.92)",
          }}
        >
          <Typography variant="body2">Portfolio</Typography>
          <LaunchIcon fontSize="small" />
        </Link>
      </Stack>

      {/* Skills Chips */}
      <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
        {skills.map((skill, index) => (
          <Chip
            key={index}
            label={skill}
            sx={{
              bgcolor: "#efefef",
              color: "rgba(17, 17, 17, 0.68)",
              borderRadius: "28px",
              fontSize: "14px",
              fontWeight: 400,
            }}
          />
        ))}
      </Stack>

      {/* Quick Actions Button */}
      <Button
        variant="outlined"
        endIcon={<KeyboardArrowDownIcon />}
        sx={{
          position: "absolute",
          top: 38,
          right: 24,
          textTransform: "none",
          color: "text.secondary",
          borderColor: "divider",
        }}
      >
        Quick actions
      </Button>
    </Paper>
  );
};

export default FilterOptionsSection;
