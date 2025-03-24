import ClockIcon from "@mui/icons-material/AccessTimeOutlined";
import CheckIcon from "@mui/icons-material/Check";
import ChevronDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MoneyIcon from "@mui/icons-material/MonetizationOnOutlined";
import ArrowUpRightIcon from "@mui/icons-material/OpenInNew";
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
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import BlockIcon from "@mui/icons-material/Block";
import AssessmentIcon from "@mui/icons-material/Assessment";
import ArchiveIcon from "@mui/icons-material/Archive";
import { PHASE_OPTIONS } from "@/app/constants/phaseOptions";
import { useRouter } from "next/navigation";

interface PhaseOption {
  label: string;
  icon: React.ComponentType;
  action: string;
}

interface PhaseOptions {
  [key: string]: PhaseOption[];
}

// Update the props interface
interface CandidateListSectionProps {
  candidate: any; // Update with proper type
  isSelected: boolean;
  onSelectCandidate: (id: number) => void;
  selectedEntries: number[];
  onUpdateStages: (stage: string, entries: number[]) => void;
  disableSelection?: boolean;
  currentStage: string;
}

export default function CandidateListSection({
  candidate,
  isSelected,
  onSelectCandidate,
  selectedEntries,
  onUpdateStages,
  disableSelection,
  currentStage,
}: CandidateListSectionProps) {
  const router = useRouter();
  console.log(candidate); // Skills data for mapping
  const skills = candidate?.professional_info?.skills?.split(",");

  // Candidate info data for mapping
  const candidateInfo = [
    {
      icon: <BriefcaseIcon fontSize="small" />,
      text: candidate?.professional_info?.experience,
    },
    {
      icon: <MoneyIcon fontSize="small" />,
      text: candidate?.professional_info?.salary_range,
    },
    {
      icon: <ClockIcon fontSize="small" />,
      text: candidate?.professional_info?.start_date,
    },
    // { icon: <UserSearchIcon fontSize="small" />, text: "Open to trial" },
  ];

  // Add these new states and handlers for the dropdown
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAction = (action: string) => {
    onUpdateStages(action, [candidate.id]);
    handleClose();
  };

  const handleCardClick = (event: React.MouseEvent<HTMLElement>) => {
    // Prevent redirection if clicking on checkbox or quick actions button
    if (
      (event.target as HTMLElement).closest('.checkbox-container') ||
      (event.target as HTMLElement).closest('.quick-actions-button')
    ) {
      return;
    }
    
    // Get the job_id from the URL
    const pathParts = window.location.pathname.split('/');
    const jobId = pathParts[pathParts.length - 2];
    
    // Navigate to the applicant details page
    router.push(`/dashboard/job-posting/${jobId}/submissions/${candidate.id}`);
  };

  return (
    <Paper
      elevation={0}
      onClick={handleCardClick}
      sx={{
        display: "flex",
        alignItems: "flex-start",
        p: 2,
        borderBottom: "0.8px solid rgba(17, 17, 17, 0.08)",
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "rgba(0, 0, 0, 0.02)",
        }
      }}
    >
      <Box sx={{ p: 0 }} className="checkbox-container">
        <Checkbox
          sx={{ p: 0 }}
          onChange={() => onSelectCandidate(candidate.id)}
          checked={isSelected}
          icon={
            <Box
              sx={{
                width: 16,
                height: 16,
                borderRadius: 1,
                border: "1px solid grey",
              }}
            />
          }
          checkedIcon={
            <Box
              sx={{
                p: 0,
                width: 16,
                height: 16,
                borderRadius: 1,
                bgcolor: "secondary.main",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CheckIcon sx={{ fontSize: 12, color: "white" }} />
            </Box>
          }
        />
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          position: "relative",
        }}
      >
        {/* Update Checkbox */}

        {/* Candidate name */}
        <Box sx={{ ml: "12px" }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              fontSize: 18,
              lineHeight: "18px",
              color: "rgba(17, 17, 17, 0.92)",
            }}
          >
            {candidate?.personal_info.firstname}{" "}
            {candidate?.personal_info.lastname}
          </Typography>
        </Box>

        {/* Candidate info row */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 3.5,
            mt: 1,
            ml: "12px",
          }}
        >
          {/* Map through candidate info */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 3.5 }}>
            {candidateInfo.map((item, index) => (
              <Box
                key={index}
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                {item.icon}
                <Typography
                  sx={{
                    color: "rgba(17, 17, 17, 0.68)",
                    fontSize: 16,
                    lineHeight: "16px",
                  }}
                >
                  {item.text}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Resume link */}
          <Link
            href="#"
            underline="always"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              color: "rgba(17, 17, 17, 0.92)",
              fontSize: 16,
              lineHeight: "16px",
            }}
          >
            Resume <ArrowUpRightIcon sx={{ fontSize: 20 }} />
          </Link>
        </Box>

        {/* Skills chips */}
        <Box sx={{ display: "flex", gap: 1, mt: 2, ml: "12px" }}>
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

        {/* Quick Actions Button - Always visible */}
        <Button
          variant="outlined"
          onClick={handleClick}
          endIcon={<ChevronDownIcon />}
          className="quick-actions-button"
          sx={{
            position: "absolute",
            right: 16,
            top: 16,
            textTransform: "none",
            borderColor: "grey[100]",
            color: "grey[100]",
            "&:hover": {
              borderColor: "grey[200]",
              backgroundColor: "transparent",
            },
          }}
        >
          Quick actions
        </Button>

        {/* Quick Actions Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          {PHASE_OPTIONS[currentStage]?.map((option: PhaseOption) => {
            const IconComponent = option.icon;
            return (
              <MenuItem
                key={option.action}
                onClick={() => handleAction(option.action)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  py: 1.5,
                  px: 2,
                }}
              >
                <ListItemIcon>
                  <IconComponent />
                </ListItemIcon>
                <ListItemText primary={option.label} />
              </MenuItem>
            );
          })}
        </Menu>
      </Box>
    </Paper>
  );
}
