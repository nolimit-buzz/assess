'use client';
import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Grid,
  styled,
  Chip,
  Stack,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  InputAdornment,
  Skeleton,
} from '@mui/material';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Divider from '@mui/material/Divider';
import RefreshIcon from '@mui/icons-material/Refresh';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../../../global.css';
import { BorderStyle } from '@mui/icons-material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { generateInput } from '../../../../utils/openai';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, TextField, IconButton } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const Banner = styled(Box)(({ theme }) => ({
  width: '100%',
  background: '#4444E2',
  color: '#fff',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: '28px',
}));

const Pill = styled(Chip)(({ theme }) => ({
  padding: '10px 12px',
  backgroundColor: 'rgba(255, 255, 255, 0.12)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  borderRadius: '20px',
  color: '#fff',
}));

const PageContainer = styled(Box)(({ theme }) => ({
  padding: '0',
  backgroundColor: '#F1F4F9',
  minHeight: '100vh',
}));

const FormContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#fff',
  borderRadius: '8px',
  width: '100%',
  maxWidth: '1063px',
  margin: 'auto',
}));

const StyledStepper = styled(Stepper)(({ theme }) => ({
  padding: '28px 24px',
  '& .MuiStepConnector-line': {
    border: '0.5px dashed rgba(17, 17, 17, 0.68)'
  },
  '& .Mui-completed svg': {
    color: 'rgba(29, 175, 97, 1)'
  }
}));

const StyledStepLabel = styled(StepLabel)(({ theme }) => ({
  '& .MuiStepLabel-label': {
    color: 'rgba(17, 17, 17, 0.68)',
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '100%',
    letterSpacing: '0.16px',
  },
  '& .Mui-active': {
    fontWeight: '400',
    color: 'rgba(17, 17, 17, 1)'
  }
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: '8px',
  backgroundColor: '#032B44',
  padding: '16px 44px',
  color: 'rgba(205, 247, 235, 0.92)',
  fontSize: '16px',
  fontWeight: 500,
  lineHeight: '100%',
  letterSpacing: '0.16px',
}));

const StyledOutlineButton = styled(Button)(({ theme }) => ({
  borderRadius: '8px',
  color: '#032B44',
  padding: '16px 44px',
  fontSize: '16px',
  fontWeight: 500,
  lineHeight: '100%',
  letterSpacing: '0.16px',
}));

const TextEditor = ({ label, description, value, onChange, onRegenerate }) => {
  return (
    <>
      <Stack direction="row" spacing={3} alignItems="flex-start" width={'100%'} padding="28px 24px">
        <Stack spacing={1} minWidth={'280px'}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="subtitle1" sx={{
              color: 'rgba(17, 17, 17, 0.92)',
              fontSize: '20px',
              fontStyle: 'normal',
              fontWeight: 600,
              lineHeight: '100%',
              letterSpacing: '0.1px',
            }}>{label}</Typography>
            <IconButton size="small" onClick={onRegenerate}>
              <RefreshIcon />
            </IconButton>
          </Stack>
          <Typography sx={{
            color: 'rgba(17, 17, 17, 0.68)',
            fontSize: '16px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: '100%',
            letterSpacing: '0.16px',
          }} variant="body2" color="textSecondary">
            {description}
          </Typography>
        </Stack>
        <ReactQuill
          value={value}
          onChange={onChange}
          style={{
            flex: 2, borderRadius: '8px',
            border: '0.8px solid rgba(17, 17, 17, 0.14)', marginLeft: 0
          }}
        />
      </Stack>
      <Divider />
    </>
  );
};

const Field = ({ label, description, value, onChange, multiline = false, customStyle = {} }) => {
  return (
    <>
      <Stack direction="row" spacing={3} alignItems="flex-start" padding="28px 24px">
        <Stack spacing={1} minWidth={'280px'}>
          <Typography variant="subtitle1" sx={{
            color: 'rgba(17, 17, 17, 0.92)',
            fontSize: '20px',
            fontStyle: 'normal',
            fontWeight: 600,
            lineHeight: '100%',
            letterSpacing: '0.1px',
          }}>{label}</Typography>
          <Typography sx={{
            color: 'rgba(17, 17, 17, 0.68)',
            fontSize: '16px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: '100%',
            letterSpacing: '0.16px',
          }} variant="body2" color="textSecondary">
            {description}
          </Typography>
        </Stack>
        <TextField
          fullWidth
          value={value}
          onChange={onChange}
          variant="outlined"
          multiline={multiline}
          rows={multiline ? 4 : 1}
          style={{ marginLeft: 0, fontWeight: 700 }}
          sx={{
            ...customStyle,
          }}
        />
      </Stack>
    </>
  );
};

const FormBuilderField = ({ field, index, handleChange, handleDelete, handleTypeChange }) => {
  return (
    <Stack alignItems="flex-start" width={'100%'} sx={{ padding: '20px 22px', border: '1px solid rgba(17, 17, 17, 0.14)', borderRadius: '8px' }}>
      <Stack direction='row' spacing={1} width={'100%'}>
        <Stack direction="row" alignItems="center" justifyContent={'space-between'} width={'100%'}>
          <TextField
            placeholder="Type Question"
            value={field.label}
            onChange={(e) => handleChange(index, 'label', e.target.value)}
            variant="outlined"
            sx={{
              width: '100%',
              '& .MuiInputBase-root': {
                '& input': {
                  fontSize: '16px !important',
                  color: 'rgba(17, 17, 17, 0.92)',
                  fontWeight: 500,
                  lineHeight: '100%',
                  letterSpacing: '0.16px',
                  border: 'none',
                  '&:placeholder': {
                    color: 'rgba(17, 17, 17, 0.48)',
                  }
                },
                '& fieldset': {
                  border: 'none',
                }
              }
            }}
          />
          <Stack direction={'row'} gap={2} alignItems={'center'}>
            <FormControl variant="outlined" style={{ minWidth: 150 }}>
              <Select
                value={field.type}
                onChange={(e) => handleTypeChange(index, e.target.value)}
                sx={{
                  '& .MuiSelect-select': {
                    padding: '5px 8px',
                    paddingRight: '10px',
                    borderRadius: '5px',
                    backgroundColor: '#F4F4F6',
                    color: 'rgba(17, 17, 17, 0.84)',
                    fontSize: '14px',
                    fontWeight: 500,
                    letterSpacing: '0.14px',
                    '& div': {
                      paddingRight: 0,
                    },
                    '& fieldset': {
                      border: 'none',
                    }
                  }
                }}
              >
                <MenuItem value="text">Open Question</MenuItem>
                <MenuItem value="select">Multi Choice</MenuItem>
                <MenuItem value="file">Attachment</MenuItem>
              </Select>
            </FormControl>
            <svg onClick={() => handleDelete(index)} cursor={'pointer'} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.5 4.98332C14.725 4.70832 11.9333 4.56665 9.15 4.56665C7.5 4.56665 5.85 4.64998 4.2 4.81665L2.5 4.98332" stroke="#111111" stroke-opacity="0.84" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M7.08301 4.14175L7.26634 3.05008C7.39967 2.25841 7.49967 1.66675 8.90801 1.66675H11.0913C12.4997 1.66675 12.608 2.29175 12.733 3.05841L12.9163 4.14175" stroke="#111111" stroke-opacity="0.84" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M15.7087 7.6167L15.167 16.0084C15.0753 17.3167 15.0003 18.3334 12.6753 18.3334H7.32533C5.00033 18.3334 4.92533 17.3167 4.83366 16.0084L4.29199 7.6167" stroke="#111111" stroke-opacity="0.84" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M8.6084 13.75H11.3834" stroke="#111111" stroke-opacity="0.84" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M7.91699 10.4167H12.0837" stroke="#111111" stroke-opacity="0.84" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </Stack>
        </Stack>
      </Stack>
      {field.type === 'text' && (
        <TextField
          fullWidth
          value={field.value}
          onChange={(e) => handleChange(index, 'value', e.target.value)}
          variant="outlined"
          InputProps={{
            readOnly: true,
            autoFocus: true,
          }}
          placeholder="Response field"
          sx={{
            flex: 1,
            '& .MuiInputBase-root': {
              width: '100%',
              backgroundColor: '#F4F4F6',
              borderRadius: '6px',
              border: "0.5px solid rgba(17, 17, 17, 0.08)",
              '& input': {
                width: '100%',
                borderRadius: '5px',
                backgroundColor: '#F4F4F6',
                color: 'rgba(17, 17, 17, 0.84)',
                '&:placeholder': {
                  color: 'rgba(17, 17, 17, 0.48)',
                }
              },
              '& fieldset': {
                width: '100%',
                border: 'none',
              }
            }
          }}
        />
      )}
      {field.type === 'select' && (
        <Stack width={'100%'} gap={1}>
          {field.options.map((option, idx) => (
            <Stack direction="row" alignItems="center" gap={1} key={idx}>
              <TextField
                value={option}
                onChange={(e) => handleChange(index, 'options', e.target.value, idx)}
                variant="outlined"
                placeholder={`Enter option ${idx + 1}`}
                sx={{
                  width: '100%',
                  '& .MuiInputBase-root': {
                    width: '100%',
                    flex: 1,
                    backgroundColor: '#F4F4F6',
                    borderRadius: '6px',
                    border: "0.5px solid rgba(17, 17, 17, 0.08)",
                    '& input': {
                      width: '100%',
                      '&:placeholder': {
                        color: 'rgba(17, 17, 17, 0.48)',
                      }
                    },
                    '& fieldset': {
                      width: '100%',
                      border: 'none',
                    }
                  }
                }}
              />
              <IconButton size="small" onClick={() => handleDelete(index, idx)}>
                <svg cursor={'pointer'} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.5 4.98332C14.725 4.70832 11.9333 4.56665 9.15 4.56665C7.5 4.56665 5.85 4.64998 4.2 4.81665L2.5 4.98332" stroke="#111111" stroke-opacity="0.84" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M7.08301 4.14175L7.26634 3.05008C7.39967 2.25841 7.49967 1.66675 8.90801 1.66675H11.0913C12.4997 1.66675 12.608 2.29175 12.733 3.05841L12.9163 4.14175" stroke="#111111" stroke-opacity="0.84" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M15.7087 7.6167L15.167 16.0084C15.0753 17.3167 15.0003 18.3334 12.6753 18.3334H7.32533C5.00033 18.3334 4.92533 17.3167 4.83366 16.0084L4.29199 7.6167" stroke="#111111" stroke-opacity="0.84" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M8.6084 13.75H11.3834" stroke="#111111" stroke-opacity="0.84" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M7.91699 10.4167H12.0837" stroke="#111111" stroke-opacity="0.84" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </IconButton>
            </Stack>
          ))}
          <Button
            startIcon={<AddIcon />}
            onClick={() => handleChange(index, 'addOption')}
            style={{ marginTop: '10px' }}
          >
            Add Option
          </Button>
        </Stack>
      )}
      {field.type === 'file' && (
        <TextField
          fullWidth
          value={field.value}
          onChange={(e) => handleChange(index, 'value', e.target.value)}
          variant="outlined"
          placeholder="Attach file"
          InputProps={{
            readOnly: true,
            autoFocus: true,
            startAdornment: (
              <InputAdornment position="start">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.2754 10.1249L8.21706 12.1833C7.07539 13.3249 7.07539 15.1666 8.21706 16.3083C9.35872 17.4499 11.2004 17.4499 12.3421 16.3083L15.5837 13.0666C17.8587 10.7916 17.8587 7.0916 15.5837 4.8166C13.3087 2.5416 9.60872 2.5416 7.33372 4.8166L3.80039 8.34994C1.85039 10.2999 1.85039 13.4666 3.80039 15.4249" stroke="#111111" stroke-opacity="0.92" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiInputBase-root': {
              backgroundColor: '#F4F4F6',
              borderRadius: '6px',
              border: "0.5px solid rgba(17, 17, 17, 0.08)",
              '& input': {
                color: 'rgba(17, 17, 17, 0.84)',
              },
              '& fieldset': {
                border: 'none',
              }
            }
          }}
        />
      )}
    </Stack>
  );
};

const AssessmentStep = ({ assessments, selectedAssessment, handleAssessmentChange }) => {
  return (
    <Stack direction="row" spacing={3} alignItems="flex-start" marginBottom="20px" width={'100%'}>
      <Stack spacing={1} minWidth={'280px'}>
        <Typography variant="subtitle1">Add Assessment</Typography>
        <Typography variant="body2" color="textSecondary">
          Assessment for this role
        </Typography>
      </Stack>
      <FormControl fullWidth>
        <InputLabel>Select Assessment</InputLabel>
        <Select
          value={selectedAssessment}
          onChange={(e) => handleAssessmentChange(e.target.value)}
          label="Select Assessment"
        >
          {assessments.map((assessment, index) => (
            <MenuItem key={index} value={assessment}>
              {assessment}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
};

const AboutTheJob = () => {
  const params = useParams();
  const jobId = params['job_id'];

  const steps = ['About the Job', 'Application Form', 'Assessment'];

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    work_model: '',
    job_type: '',
    description: '',
    responsibilities: '',
    expectations: [],
    salary: '',
  });

  const [formFields, setFormFields] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAssessment, setSelectedAssessment] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [jobUrl, setJobUrl] = useState("");
  const assessments = ['Assessment 1', 'Assessment 2', 'Assessment 3']; // Example assessments

  // Fetch job details on component mount
  useEffect(() => {
    const fetchJobDetails = async () => {
      if (!jobId) {
        setError('No job ID provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const token = localStorage.getItem('jwt');

        const response = await axios.get(`https://app.elevatehr.ai/wp-json/elevatehr/v1/jobs/${jobId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        const jobData = response.data;
        if (!jobData.description.length) {
          const aiSuggestions = await generateInput({ jobTitle: jobData.title, jobLevel: jobData.level, field: '' })
          const expectations = aiSuggestions.expectations;
          if (expectations[0] === '') expectations.shift();
          setFormData({
            ...jobData,
            expectations: jobData.expectations.split(',') || [],
            about_role: aiSuggestions.aboutTheRole || '',
            responsibilities: aiSuggestions.jobResponsibilities || '',
            expectations: expectations || [],
            description: aiSuggestions.aboutTheRole || '',
          })
          setFormFields(jobData.application_form.required_fields || []);
          setLoading(false);
          return
        }

        setFormData({
          ...jobData,
          expectations: jobData.expectations.split(',') || [],
        });
        setFormFields(jobData.application_form.required_fields || []);

        setLoading(false);
      } catch (err) {
        console.error('Error fetching job details:', err);
        setError('Failed to fetch job details. Please try again later.');
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [jobId]);

  const handleChange = (field) => (value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleRegenerate = (field) => async () => {
    try {
      const aiSuggestions = await generateInput({ jobTitle: formData.title, jobLevel: formData.level, field: field })
      setFormData(prevData => ({
        ...prevData,
        [field === 'aboutTheRole' ? 'description' : field === 'jobResponsibilities' ? 'responsibilities' : 'expectations']: aiSuggestions[field] || prevData[field]
      }));
    } catch (err) {
      console.error(`Error regenerating ${field}:`, err);
    }
  };

  const addExpectation = () => {
    setFormData((prevData) => ({
      ...prevData,
      expectations: [...prevData.expectations, 'New Expectation'],
    }));
  };

  const addField = (type = 'text') => {
    setFormFields([
      ...formFields,
      {
        type,
        label: '',
        description: '',
        value: '',
        options: type === 'select' ? ['', ''] : []
      }
    ]);
  };

  const handleFieldChange = (index, key, value, optionIndex = null) => {
    setFormFields((prevFields) =>
      prevFields.map((field, idx) => {
        if (idx === index) {
          if (key === 'options' && optionIndex !== null) {
            return {
              ...field,
              options: field.options.map((opt, i) => (i === optionIndex ? value : opt)),
            };
          } else if (key === 'addOption') {
            return {
              ...field,
              options: [...field.options, ''],
            };
          } else {
            return { ...field, [key]: value };
          }
        }
        return field;
      })
    );
  };

  const handleTypeChange = (index, type) => {
    setFormFields((prevFields) =>
      prevFields.map((field, idx) => {
        if (idx === index) {
          field.type = type;
          if (type === 'select' && !field?.options?.length) {
            field.options = ['', ''];
          } else if (type !== 'select') {
            field.options = [];
          }
        }
        return field;
      })
    );
  };

  const handleDeleteField = (index, optionIndex = null) => {
    setFormFields((prevFields) =>
      prevFields.map((field, idx) => {
        if (idx === index) {
          if (optionIndex !== null) {
            return {
              ...field,
              options: field.options.filter((_, optIdx) => optIdx !== optionIndex),
            };
          }
          return null; // This will be filtered out below
        }
        return field;
      }).filter(field => field !== null)
    );
  };

  const handleAssessmentChange = (assessment) => {
    setSelectedAssessment(assessment);
  };

  const handleDone = async () => {
    // Collate all the data
    const collatedData = {
      ...formData,
      application_form: formFields,
      selectedAssessment
    };

    console.log("Updating job post...", collatedData);

    if (!jobId) {
      alert("Error: Job ID is missing!");
      return;
    }

    try {
      const token = localStorage.getItem("jwt");

      const response = await axios.put(
        `https://app.elevatehr.ai/wp-json/elevatehr/v1/jobs/${jobId}`,
        {...collatedData,job_type: "fulltime",
          availability: "week",
          skills: "php,css",
          experience_years: "5 years",
          qualifications:'Senior',
          current_role: "jnr dev",
          work_preference: "remote",
          salary_range: "100-200",
          start_date: "immediately",
          address: "34 Ellasan",
          salary_min:'2000',
          salary_max:'30000',
          github_profile: "https://www.linkedin.com"},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      );

      // Construct the job URL
      const jobUrl = `http://localhost:3000/dashboard/applicant/${jobId}`;
      setJobUrl(jobUrl);
      setShowDialog(true);

      console.log("Success:", response.data);
    } catch (error) {
      console.error("Error updating job post:", error.response?.data || error.message);
      alert(`Failed to update job post: ${error.response?.data?.message || "Unknown error"}`);
    }
  };

  // Copy to clipboard function
  const copyToClipboard = () => {
    navigator.clipboard.writeText(jobUrl).then(() => {
      alert("URL copied to clipboard!");
    });
  };

  // Redirect function
  const handleCloseDialog = () => {
    setShowDialog(false);
    window.location.href = "http://localhost:3000/dashboard";
  };

  const renderStepContent = () => {
    if (loading) {
      return (
        <Stack spacing={2} padding="20px">
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="rectangular" height={150} />
          <Skeleton variant="text" width="40%" />
          <Skeleton variant="rectangular" height={100} />
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="rectangular" height={150} />
          <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="circular" width={40} height={40} />
          </Stack>
        </Stack>
      );
    }

    if (error) {
      return <Typography align="center" color="error" padding="20px">{error}</Typography>;
    }

    switch (currentStep) {
      case 1:
        return (
          <>
            <Field
              label="Job Title"
              description="A descriptive job title."
              value={formData.title}
              onChange={(e) => handleChange('title')(e.target.value)}
              customStyle={{
                '& .MuiInputBase-root': {
                  '& input': {
                    fontSize: '24px !important', color: 'rgba(17, 17, 17, 0.92)',
                    fontWeight: 600,
                    lineHeight: '100%',
                    letterSpacing: '0.12px',
                  },
                  '& fieldset': {
                    borderRadius: '8px',
                    border: '0.8px solid rgba(17, 17, 17, 0.14) !important',
                  }
                },
              }}
            />
            <Divider />

            <TextEditor
              label="About the Role"
              description="More information on the role."
              value={formData.about_role}
              onChange={handleChange('about_role')}
              onRegenerate={handleRegenerate('aboutTheRole')}
            />
            <TextEditor
              label="Job Responsibilities"
              description="What you will do in this role."
              value={formData.responsibilities}
              onChange={handleChange('responsibilities')}
              onRegenerate={handleRegenerate('jobResponsibilities')}
            />
            <Stack spacing={1} marginBottom="10px" direction="row" padding="28px 24px">
              <Stack spacing={1} minWidth={'280px'}>
                <Typography variant="subtitle1" sx={{
                  color: 'rgba(17, 17, 17, 0.92)',
                  fontSize: '20px',
                  fontStyle: 'normal',
                  fontWeight: 600,
                  lineHeight: '100%',
                  letterSpacing: '0.1px',
                }}>Expectation</Typography>
                <Typography sx={{
                  color: 'rgba(17, 17, 17, 0.68)',
                  fontSize: '16px',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: '100%',
                  letterSpacing: '0.16px',
                }} variant="body2" color="textSecondary">
                  What you're bringing to this role.
                </Typography>
                <IconButton size="small" onClick={handleRegenerate('expectations')}>
                  <RefreshIcon />
                </IconButton>
              </Stack>
              <Stack gap={'12px'} width={'100%'}>
                {formData.expectations.map((expectation, index) => (
                  <TextField
                    key={index}
                    fullWidth
                    value={expectation}
                    onChange={(e) => {
                      const newExpectations = [...formData.expectations];
                      newExpectations[index] = e.target.value;
                      setFormData((prevData) => ({
                        ...prevData,
                        expectations: newExpectations,
                      }));
                    }}
                    variant="outlined"
                    sx={{
                      '& .MuiInputBase-root': {
                        '& fieldset': {
                          borderRadius: '8px',
                          border: '0.8px solid rgba(17, 17, 17, 0.14) !important',
                        }
                      },
                    }}
                  />
                ))}
                <Button
                  startIcon={<AddIcon />}
                  onClick={addExpectation}
                  style={{ marginTop: '10px' }}
                >
                  Add Expectation
                </Button>
              </Stack>
            </Stack>
            <Divider />
            <Field
              label="Salary"
              description="Add numeration."
              value={formData.salary}
              onChange={(e) => handleChange('salary')(e.target.value)}
              customStyle={{
                '& .MuiInputBase-root': {
                  '& fieldset': {
                    borderRadius: '8px',
                    border: '0.8px solid rgba(17, 17, 17, 0.14) !important',
                  }
                },
              }}
            />
          </>
        );
      case 2:
        return (
          <Stack padding="28px" gap={'12px'}>
            {formFields.map((field, index) => (
              <FormBuilderField
                key={index}
                field={field.type === 'email' || field.type === 'url' ? { ...field, type: 'text' } : field}
                index={index}
                handleChange={handleFieldChange}
                handleDelete={handleDeleteField}
                handleTypeChange={handleTypeChange}
              />
            ))}

            <StyledOutlineButton
              variant="outlined"
              color="primary"
              onClick={() => addField()}
              style={{ alignSelf: 'flex-start', marginTop: '20px', marginRight: '10px' }}
            >
              Add Question
            </StyledOutlineButton>
          </Stack>
        );
      case 3:
        return (
          <AssessmentStep
            assessments={assessments}
            selectedAssessment={selectedAssessment}
            handleAssessmentChange={handleAssessmentChange}
          />
        );
      default:
        return <Typography>Unknown Step</Typography>;
    }
  };

  return (
    <PageContainer>
      <Banner sx={{
        width: "100%",
        backgroundColor: "#032B44",
        backgroundImage: "url(/images/backgrounds/banner-bg.svg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }} height={'204px'} display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
        {loading ? (
          <Stack spacing={2} alignItems="center">
            <Skeleton variant="text" width="120%"  height={40}  />
            {/* <Skeleton variant="text" width="40%" /> */}
            <Stack direction="row" spacing={2} justifyContent="center">
              <Skeleton variant="rounded" width={100} height={30} />
              <Skeleton variant="rounded" width={100} height={30} />
              <Skeleton variant="rounded" width={100} height={30} />
            </Stack>
          </Stack>
        ) : (
          <>
            <Typography variant="h4" sx={{
              color: "rgba(255, 255, 255, 0.92)",
              textAlign: "center",
              fontSize: "40px",
              fontWeight: "600",
              lineHeight: "100%"
            }}>{formData.title}</Typography>
            <Stack mt={2} direction={'row'} alignItems={'center'} justifyContent={'center'} gap={'8px'}>
              <Pill label={formData.location} />
              <Pill label={formData.work_model} />
              <Pill label={formData.job_type} />
            </Stack>
          </>
        )}
      </Banner>
      <FormContainer>
        <StyledStepper activeStep={currentStep - 1}>
          {steps.map((label, index) => (
            <Step key={label}>
              <StyledStepLabel>{label}</StyledStepLabel>
            </Step>
          ))}
        </StyledStepper>
        <Divider />

        {renderStepContent()}
        <Stack direction="row" gap={3} alignItems="flex-start" marginBottom="20px" width={'100%'} justifyContent={'flex-end'} padding={'28px 43px'}>
          {currentStep === 3 ? (
            <Stack direction={'row'} gap={3}>
              <StyledOutlineButton
                variant="outlined"
                color="primary"
                onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 1))}
                style={{ alignSelf: 'flex-end', marginTop: '20px', marginRight: '10px' }}
              >
                Back
              </StyledOutlineButton>
              <StyledButton
                variant="contained"
                color="primary"
                onClick={handleDone}
                style={{ alignSelf: 'flex-end', marginTop: '20px' }}
              >
                Done
              </StyledButton>
            </Stack>
          ) : (
            <>
              {currentStep > 1 && (
                <StyledOutlineButton
                  variant="outlined"
                  // color="primary"
                  onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 1))}
                  style={{ alignSelf: 'flex-end', marginTop: '20px', marginRight: '10px' }}
                >
                  Back
                </StyledOutlineButton>
              )}
              <StyledButton
                variant="contained"
                // color="primary"
                onClick={() => setCurrentStep((prev) => Math.min(prev + 1, 3))}
                style={{ alignSelf: 'flex-end', marginTop: '20px' }}
                
              >
                Next
              </StyledButton>
            </>
          )}
        </Stack>
        <Dialog open={showDialog} onClose={handleCloseDialog}>
          <DialogTitle>Job Post Updated Successfully!</DialogTitle>
          <DialogContent>
            <Typography variant="body1">Your job post has been successfully updated. You can share the job link below:</Typography>
            <TextField
              fullWidth
              margin="dense"
              value={jobUrl}
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <IconButton onClick={copyToClipboard} edge="end">
                    <ContentCopyIcon />
                  </IconButton>
                )
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} variant="contained" color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </FormContainer>
    </PageContainer>
  );
};

export default AboutTheJob;
