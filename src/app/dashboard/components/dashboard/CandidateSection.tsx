import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import { 
  Box, 
  Button, 
  Checkbox, 
  Chip, 
  Stack, 
  Typography 
} from "@mui/material";
import React from "react";

export default function CandidateDetailsSection() {
  // Skills data for mapping
  const skills = [
    "Communication",
    "Data analysis",
    "Strategic Thinking",
    "Empathy",
    "Prioritization",
  ];

  // Candidate details data
  const candidateDetails = [
    { icon: <WorkOutlineIcon fontSize="small" />, text: "4 years" },
    { icon: <AttachMoneyIcon fontSize="small" />, text: "600k-700k" },
    { icon: <AccessTimeIcon fontSize="small" />, text: "Available immediately" },
    { icon: <PersonSearchIcon fontSize="small" />, text: "No to trial" },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "white",
        borderBottom: "0.8px solid rgba(17, 17, 17, 0.08)",
        padding: 3,
        pb: 2,
      }}
    >
      <Box display="flex" alignItems="flex-start">
        <Checkbox
          sx={{
            padding: 0,
            marginRight: 1,
            marginTop: "2px",
            color: "rgba(17, 17, 17, 0.84)",
            opacity: 0.68,
          }}
        />
        <Box width="100%">
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              fontSize: "18px",
              lineHeight: "18px",
              color: "rgba(17, 17, 17, 0.92)",
              mb: 1,
            }}
          >
            Sumayah Alli
          </Typography>

          <Stack direction="row" spacing={3.5} alignItems="center" mb={2}>
            {candidateDetails.map((detail, index) => (
              <Stack key={index} direction="row" spacing={1} alignItems="center">
                {detail.icon}
                <Typography
                  variant="body1"
                  sx={{
                    color: "rgba(17, 17, 17, 0.68)",
                    fontSize: "16px",
                    lineHeight: "16px",
                  }}
                >
                  {detail.text}
                </Typography>
              </Stack>
            ))}

            <Button
              variant="text"
              endIcon={<ArrowOutwardIcon sx={{ width: 20, height: 20 }} />}
              sx={{
                textTransform: "none",
                color: "rgba(17, 17, 17, 0.92)",
                fontSize: "16px",
                lineHeight: "16px",
                textDecoration: "underline",
                padding: 0,
                minWidth: "auto",
              }}
            >
              Resume
            </Button>
          </Stack>

          <Stack direction="row" spacing={1} mt={1}>
            {skills.map((skill, index) => (
              <Chip
                key={index}
                label={skill}
                sx={{
                  bgcolor: "#efefef",
                  color: "rgba(17, 17, 17, 0.68)",
                  fontSize: "14px",
                  fontWeight: "normal",
                  borderRadius: "28px",
                  height: "32px",
                }}
              />
            ))}
          </Stack>
        </Box>

        <Button
          variant="outlined"
          endIcon={<KeyboardArrowDownIcon />}
          sx={{
            textTransform: "none",
            color: "text.secondary",
            borderColor: "rgba(0, 0, 0, 0.12)",
            fontSize: "14px",
            fontWeight: 500,
            padding: "12px 12px 12px 16px",
            borderRadius: "8px",
            whiteSpace: "nowrap",
            ml: "auto",
          }}
        >
          Quick actions
        </Button>
      </Box>
    </Box>
  );
}
