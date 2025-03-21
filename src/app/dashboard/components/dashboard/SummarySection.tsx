import ArchiveIcon from "@mui/icons-material/Archive";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { Button, Stack } from "@mui/material";
import React from "react";

export default function SummarySection() {
  // Common button styling
  const buttonStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.92)",
    border: "1px solid rgba(3, 43, 68, 0.48)",
    borderRadius: "8px",
    color: "primary.main",
    textTransform: "none",
    fontSize: "14px",
    fontWeight: 500,
    letterSpacing: "0.14px",
    lineHeight: "14px",
    px: 2,
    py: 1.5,
    gap: 1,
  };

  // Action Buttons
  const actionButtons = [
    { label: "Reject", icon: <CloseIcon fontSize="small" /> },
    { label: "Move to Assessment", icon: <CheckIcon fontSize="small" /> },
    { label: "Archive", icon: <ArchiveIcon fontSize="small" /> },
  ];

  return (
    <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
      {actionButtons.map((button, index) => (
        <Button key={index} variant="outlined" startIcon={button.icon} sx={{ ...buttonStyle }}>
          {button.label}
        </Button>
      ))}
    </Stack>
  );
}
