"use client";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter, useParams } from "next/navigation";
import {
  Box,
  Container,
  Typography,
  IconButton,
  Tabs,
  Tab,
  Paper,
  Checkbox,
  Button,
  Chip,
  MenuItem,
  Select,
  FormControl,
  TextField,
  Radio,
  RadioGroup,
  Menu,
  FormControlLabel,
  CircularProgress,
  Divider,
  ListItem,
  List,
  ListItemText,
  Stack,
  Card,
  Skeleton,
} from "@mui/material";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ClockIcon from "@mui/icons-material/AccessTime";
import FlashIcon from "@mui/icons-material/BoltSharp";
import LocationIcon from "@mui/icons-material/LocationOnOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import WorkIcon from "@mui/icons-material/Work";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import EditIcon from "@mui/icons-material/Edit";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import PlaceIcon from "@mui/icons-material/Place";
import BoltIcon from "@mui/icons-material/Bolt";
import CloseIcon from "@mui/icons-material/Close";
import { Edit, WorkOutline } from "@mui/icons-material";
import ApplicantsList from "@/app/dashboard/components/dashboard/ApplicantsList";
import CandidateListSection from "@/app/dashboard/components/dashboard/CandidatesListSection";
import { useTheme } from "@mui/material/styles";
import QuickActionsDropdown from "@/app/dashboard/components/QuickActionsDropdown";
import BlockIcon from "@mui/icons-material/Block";
import AssessmentIcon from "@mui/icons-material/Assessment";
import ArchiveIcon from "@mui/icons-material/Archive";
import { PHASE_OPTIONS } from "@/app/constants/phaseOptions";
import { styled } from "@mui/material/styles";
import CreatableSelect from 'react-select/creatable';
import { getSkillsForRole, Skill } from '@/utils/skills';

const StyledSelect = styled(Select)({
  '& .MuiSelect-select': {
    backgroundColor: '#fff',
    borderRadius: '12px',
    border: '1px solid rgba(17, 17, 17, 0.08)',
    padding: '16px',
    color: 'rgba(17, 17, 17, 0.84)',
    '&:focus': {
      backgroundColor: '#fff',
    }
  }
});

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#fff',
    borderRadius: '12px',
    border: '1px solid rgba(17, 17, 17, 0.08)',
    '& fieldset': {
      border: 'none',
    },
    '&:hover fieldset': {
      border: 'none',
    },
    '&.Mui-focused fieldset': {
      border: 'none',
    }
  },
  '& .MuiInputBase-input': {
    padding: '16px',
    color: 'rgba(17, 17, 17, 0.84)',
    '&::placeholder': {
      color: 'rgba(17, 17, 17, 0.48)',
    }
  }
});

const StyledRadio = styled(Radio)({
  color: 'rgba(17, 17, 17, 0.6)',
  '&.Mui-checked': {
    color: '#4444E2',
  }
});

export default function Home() {
  const theme = useTheme();
  const [primaryTabValue, setPrimaryTabValue] = useState(0);
  const [subTabValue, setSubTabValue] = useState(0);
  const [filterMenuAnchor, setFilterMenuAnchor] = useState(null);
  const [quickActionsAnchor, setQuickActionsAnchor] = useState(null);
  const [availableSkills, setAvailableSkills] = useState<Skill[]>([]);
  const [filters, setFilters] = useState({
    yearsOfExperience: "",
    salaryMin: "",
    salaryMax: "",
    requiredSkills: [],
    availability: "",
    trial: "",
  });
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [jobDetails, setJobDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [candidates, setCandidates] = useState([]); // State to store fetched candidates
  const [selectedEntries, setSelectedEntries] = useState<number[]>([]);

  const router = useRouter();
  const params = useParams();

  const getJobId = () => {
    return params["job_id"];
  };

  useEffect(() => {
    const fetchJobDetails = async () => {
      // if (primaryTabValue === 1) {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("jwt");
        const jobId = getJobId();
        const response = await fetch(
          `https://app.elevatehr.ai/wp-json/elevatehr/v1/jobs/${jobId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch job details: ${response.status}`);
        }

        const data = await response.json();
        setJobDetails(data);
      } catch (err) {
        console.error("Error fetching job details:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
      // }
    };

    fetchJobDetails();
  }, [primaryTabValue, params]);

  useEffect(() => {
    const fetchCandidates = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("jwt");
        const jobId = getJobId();
        const stage = subTabValue === 0 ? "new" : getStageValue(subTabValue);
        const response = await fetch(
          `https://app.elevatehr.ai/wp-json/elevatehr/v1/jobs/${jobId}/applications?stage=${stage}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch candidates: ${response.status}`);
        }

        const data = await response.json();
        setCandidates(data);
        setFilteredCandidates(data); // Initialize filtered candidates with fetched data
      } catch (err) {
        console.error("Error fetching candidates:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (primaryTabValue === 0) {
      fetchCandidates();
    }
  }, [primaryTabValue, subTabValue, params]);

  useEffect(() => {
    console.log('Job details received:', jobDetails);
    const loadSkills = async () => {

      if (jobDetails) {
        const skills = await getSkillsForRole(jobDetails.title, jobDetails.about_role);
        setAvailableSkills(skills);
      }
    };

    if (jobDetails) {
      loadSkills();
    }
  }, [jobDetails]);

  const getStageValue = (tabValue) => {
    switch (tabValue) {
      case 1:
        return "skill_assessment";
      case 2:
        return "interview";
      case 3:
        return "acceptance";
      case 4:
        return "archived";
      default:
        return "new";
    }
  };

  const handleFilterChange = (filterName, value) => {
    setFilters({
      ...filters,
      [filterName]: value,
    });
  };

  const applyFilters = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("jwt");
      const jobId = getJobId();
      const stage = subTabValue === 0 ? "new" : getStageValue(subTabValue);

      // Build query parameters from filters
      const queryParams = new URLSearchParams();
      if (filters.yearsOfExperience) {
        const [minYears, maxYears] = filters.yearsOfExperience.split("-").map(num => parseInt(num));
        queryParams.append("min_experience", minYears.toString());
        if (maxYears) {
          queryParams.append("max_experience", maxYears.toString());
        }
      }
      if (filters.salaryMin) queryParams.append("min_salary", filters.salaryMin);
      if (filters.salaryMax) queryParams.append("max_salary", filters.salaryMax);
      if (filters.requiredSkills.length > 0) {
        queryParams.append("skills", filters.requiredSkills.join(','));
      }
      if (filters.availability) queryParams.append("availability", filters.availability);
      if (filters.trial) queryParams.append("trial", filters.trial);
      queryParams.append("stage", stage);

      const response = await fetch(
        `https://app.elevatehr.ai/wp-json/elevatehr/v1/jobs/${jobId}/applications?${queryParams.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch filtered candidates: ${response.status}`);
      }

      const data = await response.json();
      setFilteredCandidates(data);
      setCandidates(data); // Update the base candidates list as well
    } catch (err) {
      console.error("Error applying filters:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setFilters({
      yearsOfExperience: "",
      salaryMin: "",
      salaryMax: "",
      requiredSkills: [],
      availability: "",
      trial: "",
    });
    setFilteredCandidates(candidates);
  };

  const handlePrimaryTabChange = (event, newValue) => {
    setPrimaryTabValue(newValue);
  };

  const handleSubTabChange = (event, newValue) => {
    // Clear selected entries when changing phases
    setSelectedEntries([]);
    setSubTabValue(newValue);
  };

  const handleFilterMenuOpen = (event) => {
    setFilterMenuAnchor(event.currentTarget);
  };

  const handleFilterMenuClose = () => {
    setFilterMenuAnchor(null);
  };

  const handleQuickActionsOpen = (event) => {
    setQuickActionsAnchor(event.currentTarget);
  };

  const handleQuickActionsClose = () => {
    setQuickActionsAnchor(null);
  };

  const getSkillChipColor = (skill) => {
    const colors = {
      Communication: { bg: "#FBE9E7", color: "#D84315" },
      "Data analysis": { bg: "#E1F5FE", color: "#0288D1" },
      "Strategic Thinking": { bg: "#F3E5F5", color: "#7B1FA2" },
      Empathy: { bg: "#E8EAF6", color: "#3949AB" },
      Prioritization: { bg: "#E8F5E9", color: "#388E3C" },
      Research: { bg: "#FFEBEE", color: "#C62828" },
    };

    return colors[skill] || { bg: "#E0E0E0", color: "#616161" };
  };

  const renderJobDescription = () => {
    if (loading) {
      return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "400px",
          }}
        >
          <CircularProgress />
        </Box>
      );
    }

    if (error) {
      return (
        <Box sx={{ p: 3, textAlign: "center" }}>
          <Typography color="error" variant="h6">
            Error loading job details
          </Typography>
          <Typography color="textSecondary">{error}</Typography>
          <Button
            variant="contained"
            sx={{ mt: 2 }}
            onClick={() => {
              setError(null);
              setPrimaryTabValue(1);
            }}
          >
            Retry
          </Button>
        </Box>
      );
    }

    const jobData = jobDetails;

    return (
      <Stack direction={"row"} gap={4}>
        <Card
          sx={{
            width: 308,
            height: 345,
            borderRadius: 2,
            overflow: "hidden",
            p: 3,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="h5"
            fontWeight={600}
            color="rgba(17, 17, 17, 0.92)"
            mb={2}
            sx={{
              color: "rgba(17, 17, 17, 0.92)",
              textTransform: "capitalize", // Equivalent to leading-trim: both and text-edge: cap
              fontSize: "24px",
              fontStyle: "normal",
              fontWeight: 600,
              lineHeight: 1, // Equivalent to 100%
              letterSpacing: "0.12px",
            }}
          >
            {jobData?.title}
          </Typography>

          <Stack spacing={2} mb={3}>
            <Chip
              icon={<ClockIcon />}
              label={jobData?.job_type}
              sx={{
                bgcolor: "#edeef1",
                color: "rgba(17, 17, 17, 0.84)",
                borderRadius: "28px",
                height: 36,
                width: "fit-content",
                "& .MuiChip-label": {
                  fontSize: 14,
                  fontWeight: 400,
                },
              }}
            />
            <Chip
              icon={<LocationIcon />}
              label={jobData?.work_model}
              sx={{
                bgcolor: "#edeef1",
                color: "rgba(17, 17, 17, 0.84)",
                borderRadius: "28px",
                height: 36,
                width: "fit-content",
                "& .MuiChip-label": {
                  fontSize: 14,
                  fontWeight: 400,
                },
              }}
            />
            <Chip
              icon={<LocationIcon />}
              label={jobData?.location?.split(" ")?.join(", ")}
              sx={{
                bgcolor: "#edeef1",
                color: "rgba(17, 17, 17, 0.84)",
                borderRadius: "28px",
                height: 36,
                width: "fit-content",
                "& .MuiChip-label": {
                  fontSize: 14,
                  fontWeight: 400,
                },
              }}
            />
          </Stack>

          <Divider sx={{ width: "100%", my: 2 }} />

          <Stack spacing={2.5} mt={1}>
            <Box display="flex" alignItems="center" gap={1}>
              <FlashIcon sx={{ color: "#00C853", width: 20, height: 20 }} />
              <Typography
                fontWeight={500}
                color="rgba(17, 17, 17, 0.84)"
                fontSize={16}
              >
                {jobData?.experience_years} of Experience
              </Typography>
            </Box>
            {jobData?.requirements?.map((requirement, index) => (
              <Box key={index} display="flex" alignItems="center" gap={1}>
                <FlashIcon sx={{ color: "#00C853", width: 20, height: 20 }} />
                <Typography
                  fontWeight={500}
                  color="rgba(17, 17, 17, 0.84)"
                  fontSize={16}
                >
                  {requirement}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Card>
        <Paper
          elevation={0}
          sx={{
            width: 956,
            height: 902,
            borderRadius: 2,
            position: "relative",
            overflow: "hidden",
            p: 4,
          }}
        >
          {/* Icon */}
          <Box
            sx={{
              width: 108,
              height: 108,
              bgcolor: "#e6f9f1",
              borderRadius: "80px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "0.8px solid rgba(67, 67, 225, 0.12)",
              mb: 4,
            }}
          >
            <WorkOutline sx={{ width: 48, height: 48 }} />
          </Box>

          {/* Edit Button */}
          <Link href={`/dashboard/create-job-posting/${getJobId()}`}>
            <Button
              variant="contained"
              startIcon={<Edit />}
              sx={{
                position: "absolute",
                top: 32,
                right: 32,
                bgcolor: "#f4f4f6",
                color: "rgba(17, 17, 17, 0.84)",
                textTransform: "none",
                borderRadius: 2,
                border: "0.5px solid rgba(17, 17, 17, 0.08)",
                py: 1.25,
                px: 2.5,
                "&:hover": {
                  bgcolor: "#e8e8ea",
                },
              }}
            >
              Edit
            </Button>
          </Link>

          {/* About the Role Section */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: "rgba(17, 17, 17, 0.92)",
                fontSize: 20,
                mb: 1.5,
                letterSpacing: "0.1px",
                lineHeight: "20px",
              }}
            >
              About the Role
            </Typography>
            <Box
              dangerouslySetInnerHTML={{ __html: jobData?.about_role }}
              variant="body1"
              sx={{
                color: "rgba(17, 17, 17, 0.84)",
                maxWidth: 660,
                letterSpacing: "0.16px",
                lineHeight: "24px",
              }}
            ></Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Job Responsibilities Section */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: "rgba(17, 17, 17, 0.92)",
                fontSize: 20,
                mb: 1.5,
                letterSpacing: "0.1px",
                lineHeight: "20px",
              }}
            >
              Job Responsibilities
            </Typography>
            <Box
              dangerouslySetInnerHTML={{ __html: jobData?.responsibilities }}
              sx={{
                "& ul": {
                  marginBlockStart: 0,
                  paddingInlineStart: "20px !important",
                  "& li": {
                    display: "list-item",
                    listStyleType: "disc",
                    p: 0,
                    pb: 0.5,
                    color: "rgba(17, 17, 17, 0.84)",
                    letterSpacing: "0.16px",
                    lineHeight: "24px",
                  },
                },
              }}
            />
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Expectations Section */}
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: "rgba(17, 17, 17, 0.92)",
                fontSize: 20,
                mb: 1.5,
                letterSpacing: "0.1px",
                lineHeight: "20px",
              }}
            >
              Expectations of the Role
            </Typography>
            <List sx={{ maxWidth: 660, pl: 2 }}>
              {jobData?.expectations?.split("|||")?.map((expectation, index) => (
                <ListItem
                  key={index}
                  sx={{
                    display: "list-item",
                    listStyleType: "disc",
                    p: 0,
                    pb: 0.5,
                  }}
                >
                  <ListItemText
                    primary={expectation}
                    primaryTypographyProps={{
                      variant: "body1",
                      sx: {
                        color: "rgba(17, 17, 17, 0.84)",
                        letterSpacing: "0.16px",
                        lineHeight: "24px",
                      },
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </Paper>
      </Stack>
    );
  };

  const handleSelectCandidate = (id: number) => {
    setSelectedEntries((prev) => {
      if (prev.includes(id)) {
        return prev.filter((entryId) => entryId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleUpdateStages = async (stage: string, entries: number[] = []) => {
    console.log(stage, entries);
    try {
      const jwt = localStorage.getItem("jwt");
      const entriesToUpdate = entries.length ? entries : selectedEntries; // Use provided entries or selected entries

      const response = await fetch(
        "https://app.elevatehr.ai/wp-json/elevatehr/v1/applications/move-stage",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify({
            stage,
            entries: entriesToUpdate,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to update stage");
      }

      // Clear selections after successful update
      setSelectedEntries([]);

      // Refetch candidates for the current stage
      // await fetchCandidates();
    } catch (error) {
      console.error("Error updating stages:", error);
    }
  };

  const hasActiveFilters = () => {
    return (
      filters.yearsOfExperience !== "" ||
      filters.salaryMin !== "" ||
      filters.salaryMax !== "" ||
      filters.requiredSkills.length > 0 ||
      filters.availability !== "" ||
      filters.trial !== ""
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        bgcolor: "#F5F7FA",
      }}
    >
      <Head>
        <title>ElevateHR - Product Manager Candidates</title>
        <meta
          name="description"
          content="Product Manager candidates for review"
        />
      </Head>

      <Container maxWidth="xl" sx={{ flexGrow: 1, py: 3 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton sx={{ mr: 1 }} aria-label="back">
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h5" component="h1" fontWeight="bold" sx={{
              color: theme.palette.grey[100],
              fontSize: "24px",
              fontWeight: 600,
              lineHeight: "100%", 
              letterSpacing: "0.12px"
            }}  >
              {jobDetails?.title}
            </Typography>
          </Box>
          <Button
            variant="contained"
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.text.secondary,
              borderRadius: 2,
              textTransform: "none",
              "&:hover": {
                bgcolor: "#303F9F",
              },
            }}
          >
            Close responses for this job
          </Button>
        </Box>

        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
          <Tabs
            value={primaryTabValue}
            onChange={handlePrimaryTabChange}
            textColor="secondary"
            indicatorColor="secondary"
          >
            <Tab
              label="Applications"
              sx={{
                textTransform: "none",
                fontWeight: primaryTabValue === 0 ? "bold" : "normal",
                color:
                  primaryTabValue === 0
                    ? theme.palette.secondary.main
                    : theme.palette.grey[100],
              }}
            />
            <Tab
              label="Job description"
              sx={{
                textTransform: "none",
                fontWeight: primaryTabValue === 1 ? "bold" : "normal",
                color:
                  primaryTabValue === 1
                    ? theme.palette.secondary.main
                    : theme.palette.grey[100],
              }}
            />
          </Tabs>
        </Box>

        {primaryTabValue === 0 ? (
          <Stack direction="row" gap={3}>
            <Box sx={{ width: 300, flexShrink: 0 }}>
              <Paper elevation={0} sx={{ p: 3, mb: 2, borderRadius: 2 }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 3
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: '20px',
                      fontWeight: 600,
                      color: 'rgba(17, 17, 17, 0.92)'
                    }}
                  >
                    Filters:
                  </Typography>
                  <Button
                    startIcon={<CloseIcon />}
                    sx={{
                      color: 'rgba(17, 17, 17, 0.72)',
                      textTransform: 'none',
                      fontSize: '14px',
                      fontWeight: 400
                    }}
                    onClick={clearFilters}
                  >
                    Clear filter
                  </Button>
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Typography
                    sx={{
                      mb: 1.5,
                      fontSize: '16px',
                      fontWeight: 500,
                      color: 'rgba(17, 17, 17, 0.92)'
                    }}
                  >
                    Years of experience
                  </Typography>
                  <FormControl fullWidth>
                    <Select
                      value={filters.yearsOfExperience}
                      displayEmpty
                      renderValue={(selected) => selected || "Select years"}
                      sx={{
                        backgroundColor: '#fff',
                        borderRadius: '12px',
                        border: '1px solid rgba(17, 17, 17, 0.08)',
                        '& .MuiSelect-select': {
                          padding: '16px',
                          color: filters.yearsOfExperience ? 'rgba(17, 17, 17, 0.84)' : 'rgba(17, 17, 17, 0.48)'
                        }
                      }}
                      onChange={(e) => handleFilterChange("yearsOfExperience", e.target.value)}
                    >
                      <MenuItem value="">All years</MenuItem>
                      <MenuItem value="1-3">1-3 years</MenuItem>
                      <MenuItem value="4-6">4-6 years</MenuItem>
                      <MenuItem value="7+">7+ years</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Typography
                    sx={{
                      mb: 1.5,
                      fontSize: '16px',
                      fontWeight: 500,
                      color: 'rgba(17, 17, 17, 0.92)'
                    }}
                  >
                    Salary expectation:
                  </Typography>
                  <Stack spacing={1.5}>
                    <StyledTextField
                      placeholder="Min: 000000"
                      fullWidth
                      value={filters.salaryMin}
                      onChange={(e) => handleFilterChange("salaryMin", e.target.value)}
                      type="number"
                    />
                    <StyledTextField
                      placeholder="Max: 000000"
                      fullWidth
                      value={filters.salaryMax}
                      onChange={(e) => handleFilterChange("salaryMax", e.target.value)}
                      type="number"
                    />
                  </Stack>
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Typography
                    sx={{
                      mb: 1.5,
                      fontSize: '16px',
                      fontWeight: 500,
                      color: 'rgba(17, 17, 17, 0.92)'
                    }}
                  >
                    Required skills
                  </Typography>
                  <CreatableSelect
                    isMulti
                    options={availableSkills}
                    value={filters.requiredSkills.map(skill => ({ value: skill, label: skill }))}
                    onChange={(selectedOptions: any) => {
                      const selectedSkills = selectedOptions ? selectedOptions.map((option: any) => option.value) : [];
                      handleFilterChange("requiredSkills", selectedSkills);
                    }}
                    onCreateOption={(inputValue: string) => {
                      const newSkill = { value: inputValue, label: inputValue };
                      handleFilterChange("requiredSkills", [...filters.requiredSkills, inputValue]);
                    }}
                    placeholder="Select or create skills"
                    formatCreateLabel={(inputValue: string) => `Create "${inputValue}"`}
                    styles={{
                      control: (base: any) => ({
                        ...base,
                        backgroundColor: '#fff',
                        borderRadius: '12px',
                        border: '1px solid rgba(17, 17, 17, 0.08)',
                        minHeight: '52px',
                        boxShadow: 'none',
                        '&:hover': {
                          borderColor: 'rgba(17, 17, 17, 0.08)'
                        }
                      }),
                      menu: (base: any) => ({
                        ...base,
                        zIndex: 2
                      }),
                      option: (base: any, state: any) => ({
                        ...base,
                        backgroundColor: state.isFocused ? '#F8F9FB' : 'white',
                        color: 'rgba(17, 17, 17, 0.84)',
                        cursor: 'pointer',
                        padding: '12px 16px'
                      }),
                      multiValue: (base: any) => ({
                        ...base,
                        backgroundColor: '#E8EAFD',
                        borderRadius: '4px',
                        padding: '2px 6px',
                        margin: '2px',
                      }),
                      multiValueLabel: (base: any) => ({
                        ...base,
                        color: '#4444E2',
                        fontSize: '14px'
                      }),
                      multiValueRemove: (base: any) => ({
                        ...base,
                        color: '#4444E2',
                        cursor: 'pointer',
                        '&:hover': {
                          backgroundColor: '#D8DAFD',
                          color: '#4444E2'
                        }
                      }),
                      placeholder: (base: any) => ({
                        ...base,
                        color: 'rgba(17, 17, 17, 0.48)'
                      })
                    }}
                  />
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Typography
                    sx={{
                      mb: 1.5,
                      fontSize: '16px',
                      fontWeight: 500,
                      color: 'rgba(17, 17, 17, 0.92)'
                    }}
                  >
                    Availability:
                  </Typography>
                  <RadioGroup
                    value={filters.availability}
                    onChange={(e) => handleFilterChange("availability", e.target.value)}
                  >
                    <FormControlLabel
                      value="immediately"
                      control={<StyledRadio />}
                      label="Immediately"
                      sx={{
                        '& .MuiTypography-root': {
                          fontSize: '16px',
                          color: 'rgba(17, 17, 17, 0.84)'
                        }
                      }}
                    />
                    <FormControlLabel
                      value="in-a-week"
                      control={<StyledRadio />}
                      label="In a week"
                      sx={{
                        '& .MuiTypography-root': {
                          fontSize: '16px',
                          color: 'rgba(17, 17, 17, 0.84)'
                        }
                      }}
                    />
                    <FormControlLabel
                      value="in-a-month"
                      control={<StyledRadio />}
                      label="In a month"
                      sx={{
                        '& .MuiTypography-root': {
                          fontSize: '16px',
                          color: 'rgba(17, 17, 17, 0.84)'
                        }
                      }}
                    />
                    <FormControlLabel
                      value="in-two-months"
                      control={<StyledRadio />}
                      label="In two months"
                      sx={{
                        '& .MuiTypography-root': {
                          fontSize: '16px',
                          color: 'rgba(17, 17, 17, 0.84)'
                        }
                      }}
                    />
                  </RadioGroup>
                </Box>

                <Button
                  variant="contained"
                  fullWidth
                  disabled={!hasActiveFilters()}
                  sx={{
                    bgcolor: theme.palette.primary.main,
                    color: theme.palette.secondary.light,
                    textTransform: 'none',
                    borderRadius: '12px',
                    padding: '16px',
                    fontSize: '16px',
                    fontWeight: 500,
                    '&:hover': {
                      bgcolor: theme.palette.primary.main,
                    },
                    '&.Mui-disabled': {
                      backgroundColor: 'rgba(0, 0, 0, 0.12)',
                      color: 'rgba(0, 0, 0, 0.26)'
                    }
                  }}
                  onClick={applyFilters}
                >
                  Apply Filter
                </Button>
              </Paper>
            </Box>
            <Box sx={{ flexGrow: 1 }}>
              {/* Your existing tabs */}
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: "divider",
                  mb: 3,
                  backgroundColor: "#ffffff !important",
                  borderRadius: "10px",
                  paddingX: "20px",
                }}
              >
                <Tabs
                  value={subTabValue}
                  onChange={handleSubTabChange}
                  indicatorColor="secondary"
                  TabIndicatorProps={{ e: "4px" }}
                  variant="scrollable"
                  scrollButtons="auto"
                  sx={{ width: "100%", alignItems: "center" }}
                >
                  <Tab
                    label="Application Review"
                    sx={{
                      textTransform: "none",
                      color:
                        subTabValue === 0
                          ? theme.palette.grey[100]
                          : theme.palette.grey[200],
                      flex: 1,
                    }}
                  />
                  <Tab
                    label="Skill assessment"
                    sx={{
                      textTransform: "none",
                      color:
                        subTabValue === 1
                          ? theme.palette.grey[100]
                          : theme.palette.grey[200],
                      flex: 1,
                    }}
                  />
                  <Tab
                    label="Interviews"
                    sx={{
                      textTransform: "none",
                      color:
                        subTabValue === 2
                          ? theme.palette.grey[100]
                          : theme.palette.grey[200],
                      flex: 1,
                    }}
                  />
                  <Tab
                    label="Acceptance"
                    sx={{
                      textTransform: "none",
                      color:
                        subTabValue === 3
                          ? theme.palette.grey[100]
                          : theme.palette.grey[200],
                      flex: 1,
                    }}
                  />
                  <Tab
                    label="Archived"
                    sx={{
                      textTransform: "none",
                      color:
                        subTabValue === 4
                          ? theme.palette.grey[100]
                          : theme.palette.grey[200],
                      flex: 1,
                    }}
                  />
                </Tabs>
              </Box>
              <Paper
                elevation={0}
                sx={{
                  width: "100%",
                  //  maxWidth: 956,
                  bgcolor: "background.paper",
                  borderRadius: 2,
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                {/* Actions bar inside Paper, before candidates list */}
                {selectedEntries?.length > 0 &&
                  subTabValue !== 3 && ( // Hide for acceptance phase
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        p: 2,
                        borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
                      }}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Typography
                          variant="body1"
                          color={theme.palette.grey[100]}
                        >
                          {selectedEntries?.length} candidates selected
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={() => setSelectedEntries([])}
                          sx={{ ml: 1 }}
                        >
                          <CloseIcon fontSize="small" />
                        </IconButton>
                      </Box>

                      <Box sx={{ display: "flex", gap: 2 }}>
                        {PHASE_OPTIONS[getStageValue(subTabValue)]?.map(
                          (option) => (
                            <Button
                              key={option.action}
                              variant="outlined"
                              startIcon={<option.icon />}
                              onClick={() => handleUpdateStages(option.action)}
                              sx={{
                                color:
                                  option.action === "archived"
                                    ? "text.secondary"
                                    : "primary.main",
                                borderColor:
                                  option.action === "archived"
                                    ? "divider"
                                    : "primary.main",
                                "&:hover": {
                                  borderColor:
                                    option.action === "archived"
                                      ? "divider"
                                      : "primary.dark",
                                  bgcolor:
                                    option.action === "archived"
                                      ? "action.hover"
                                      : "primary.lighter",
                                },
                              }}
                            >
                              {option.label}
                            </Button>
                          ),
                        )}
                      </Box>
                    </Box>
                  )}

                {/* Candidates list */}
                {loading
                  ? Array.from({ length: 5 }).map((_, index) => (
                    <Skeleton
                      key={index}
                      variant="rectangular"
                      width="100%"
                      height={150}
                      sx={{ mb: 2, borderRadius: 2 }}
                    />
                  ))
                  : filteredCandidates?.applications?.map((candidate) => (
                    <Box
                      key={candidate.id}
                      sx={{
                        borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
                        "&:last-child": {
                          borderBottom: "none",
                        },
                      }}
                    >
                      <CandidateListSection
                        candidate={candidate}
                        isSelected={selectedEntries?.includes(candidate.id)}
                        onSelectCandidate={handleSelectCandidate}
                        onUpdateStages={handleUpdateStages}
                        disableSelection={subTabValue === 3}
                        currentStage={getStageValue(subTabValue)}
                        selectedEntries={selectedEntries}
                      />
                    </Box>
                  ))}
              </Paper>
            </Box>
          </Stack>
        ) : (
          renderJobDescription()
        )}
      </Container>
    </Box>
  );
}
