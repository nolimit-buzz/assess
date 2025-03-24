// File structure:
// - pages/index.js (main page)
// - components/Navbar.js
// - components/CandidateProfile.js
// - components/SkillTag.js
// - styles/globals.css

// pages/index.js
'use client'
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Link from '@mui/material/Link';

// Icons
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { Document, Page, pdfjs } from 'react-pdf';
import mammoth from 'mammoth';
import axios from 'axios';

// Set up the PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// Define TypeScript interfaces for the API response
interface PersonalInfo {
  firstname: string;
  lastname: string;
  email: string;
  location: string;
}

interface ProfessionalInfo {
  experience: string;
  salary_range: string;
  start_date: string;
  skills: string;
  summary: string;
  portfolio_url?: string;
  experience_list: Array<{
    company: string;
    location: string;
    title: string;
    start_date: string;
    end_date?: string;
    responsibilities: string;
  }>;
}

interface EducationInfo {
  school: string;
  location: string;
  degree: string;
  graduation_date: string;
  details?: string;
}

interface Certification {
  name: string;
  issuer: string;
}

interface ApplicationInfo {
  cover_letter: string;
}

interface Applicant {
  id: number;
  personal_info: PersonalInfo;
  professional_info: ProfessionalInfo;
  education_info: EducationInfo[];
  certifications: Certification[];
  application_info: ApplicationInfo;
  attachments?: {
    cv?: {
      url: string;
      parsed_content?: string;
    };
  };
}

interface ApplicantListItem {
  id: number;
  personal_info: PersonalInfo;
  professional_info: {
    experience: string;
    salary_range: string;
    start_date: string;
  };
}


export default function ApplicantDetails() {
  const router = useRouter();
  const params = useParams();
  const [applicant, setApplicant] = useState<Applicant | null>(null);
  const [applicants, setApplicants] = useState<ApplicantListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cvContent, setCvContent] = useState(null);
  const [numPages, setNumPages] = useState(null);

  const fetchAndParseCV = async (cvUrl) => {
    try {
      // Determine file type from URL
      const fileExtension = cvUrl.split('.').pop().toLowerCase();
      
      const response = await axios.get(cvUrl, {
        responseType: 'arraybuffer'
      });
      
      if (fileExtension === 'pdf') {
        // For PDF files, we'll use react-pdf to display
        setCvContent({ type: 'pdf', data: response.data });
      } else if (fileExtension === 'docx') {
        // For DOCX files, use mammoth to convert to HTML
        const arrayBuffer = response.data;
        const result = await mammoth.convertToHtml({ arrayBuffer });
        setCvContent({ type: 'html', data: result.value });
      } else if (fileExtension === 'txt' || fileExtension === 'md') {
        // For text or markdown files
        const text = new TextDecoder().decode(response.data);
        setCvContent({ type: 'text', data: text });
      } else {
        setError(`Unsupported file format: ${fileExtension}`);
      }
    } catch (err) {
      console.error('Error fetching or parsing CV:', err);
      setError('Failed to load CV');
    }
  };
  // Fetch all applicants
  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const token = localStorage.getItem('jwt');
        if (!token) {
          throw new Error('Authentication token not found');
        }

        const response = await fetch(
          `https://app.elevatehr.ai/wp-json/elevatehr/v1/jobs/${params.job_id}/applications`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        
        if (!response.ok) {
          throw new Error(`Failed to fetch applicants: ${response.statusText}`);
        }

        const data = await response.json();
        setApplicants(data.applications || []);
      } catch (error) {
        console.error('Error fetching applicants:', error);
      }
    };

    if (params.job_id) {
      fetchApplicants();
    }
  }, [params.job_id]);

  useEffect(() => {
    const fetchApplicantDetails = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const token = localStorage.getItem('jwt');
        if (!token) {
          throw new Error('Authentication token not found');
        }

        const response = await fetch(
          `https://app.elevatehr.ai/wp-json/elevatehr/v1/applications/${params.applicant_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        
        if (!response.ok) {
          throw new Error(`Failed to fetch applicant details: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Fetched applicant data:', data); // For debugging
        console.log('CV attachments:', data?.attachments?.cv); // Debug CV data specifically
        console.log('Parsed CV content:', data?.attachments?.cv?.parsed_content); // Debug parsed content
        setApplicant(data);
      } catch (error) {
        console.error('Error fetching applicant details:', error);
        setError(error instanceof Error ? error.message : 'An error occurred while fetching applicant details');
      } finally {
        setLoading(false);
      }
    };

    if (params.applicant_id) {
      fetchApplicantDetails();
    }
  }, [params.applicant_id]);

  const handleBack = () => {
    router.back();
  };

  const handleReject = async () => {
    try {
      const token = localStorage.getItem('jwt');
      if (!token) throw new Error('Authentication token not found');

      const response = await fetch(
        `https://app.elevatehr.ai/wp-json/elevatehr/v1/applications/${params.applicant_id}/reject`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to reject applicant');
      }

      // Navigate back after successful rejection
      router.back();
    } catch (error) {
      console.error('Error rejecting applicant:', error);
      setError(error instanceof Error ? error.message : 'Failed to reject applicant');
    }
  };

  const handleMoveToAssessment = async () => {
    try {
      const token = localStorage.getItem('jwt');
      if (!token) throw new Error('Authentication token not found');

      const response = await fetch(
        `https://app.elevatehr.ai/wp-json/elevatehr/v1/applications/${params.applicant_id}/move-stage`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            stage: 'skill_assessment'
          })
        }
      );

      if (!response.ok) {
        throw new Error('Failed to move applicant to assessment');
      }

      // Navigate back after successful move
      router.back();
    } catch (error) {
      console.error('Error moving applicant to assessment:', error);
      setError(error instanceof Error ? error.message : 'Failed to move applicant to assessment');
    }
  };

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button onClick={handleBack} startIcon={<ArrowBackIcon />}>
          Go Back
        </Button>
      </Container>
    );
  }

  if (!applicant) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="warning">
          No applicant data found
        </Alert>
        <Button onClick={handleBack} startIcon={<ArrowBackIcon />} sx={{ mt: 2 }}>
          Go Back
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Back button */}
      <IconButton 
        onClick={handleBack}
        sx={{ mb: 3 }}
      >
        <ArrowBackIcon />
      </IconButton>

      <Box sx={{ display: 'flex', gap: 3 }}>
        {/* Applicants List Sidebar */}
        <Paper 
          elevation={0} 
          sx={{ 
            width: 320,
            height: 'fit-content',
            borderRadius: 2,
            bgcolor: '#fff',
            overflow: 'hidden'
          }}
        >
          <List sx={{ p: 0 }}>
            {applicants.map((item) => (
              <ListItem
                key={item.id}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  p: 2,
                  cursor: 'pointer',
                  borderBottom: '0.8px solid rgba(17, 17, 17, 0.08)',
                  bgcolor: item.id === applicant?.id ? 'rgba(68, 68, 226, 0.04)' : 'transparent',
                  '&:hover': {
                    bgcolor: 'rgba(0, 0, 0, 0.02)'
                  }
                }}
                onClick={() => router.push(`/dashboard/job-posting/${params.job_id}/submissions/${item.id}`)}
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 600,
                    fontSize: '18px',
                    color: 'rgba(17, 17, 17, 0.92)',
                    mb: 1
                  }}
                >
                  {item.personal_info.firstname} {item.personal_info.lastname}
                </Typography>

                <Stack spacing={1} width="100%">
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <AccessTimeOutlinedIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {item.professional_info.start_date}
                    </Typography>
                    <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center' }}>
                      <PersonOutlineIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                        Open to trial
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <WorkOutlineIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {item.professional_info.experience}
                    </Typography>
                    <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center' }}>
                      <AccountBalanceWalletOutlinedIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                        {item.professional_info.salary_range}
                      </Typography>
                    </Box>
                  </Box>
                </Stack>
              </ListItem>
            ))}
          </List>
        </Paper>

        {/* Main Content - Applicant Details */}
        <Paper elevation={0} sx={{ flex: 1, p: 4, borderRadius: 2 }}>
          <Paper elevation={0} sx={{ p: 4, borderRadius: 2 }}>
            {/* Header Section */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>
                {applicant?.personal_info?.firstname} {applicant?.personal_info?.lastname}
              </Typography>

              <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocationOnOutlinedIcon sx={{ color: 'text.secondary' }} />
                  <Typography color="text.secondary">
                    {applicant?.personal_info?.location || 'Lagos, Nigeria'}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <EmailOutlinedIcon sx={{ color: 'text.secondary' }} />
                  <Typography color="text.secondary">
                    {applicant?.personal_info?.email}
                  </Typography>
                </Box>
                {applicant?.professional_info?.portfolio_url && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <OpenInNewIcon sx={{ color: 'text.secondary' }} />
                    <Link
                      href={applicant.professional_info.portfolio_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        color: 'primary.main',
                        textDecoration: 'underline',
                        display: 'flex',
                        alignItems: 'center',
                        '&:hover': {
                          textDecoration: 'none'
                        }
                      }}
                    >
                      Portfolio
                    </Link>
                  </Box>
                )}
              </Stack>

              {/* Skills */}
              <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
                {applicant?.professional_info?.skills?.split(',').map((skill: string, index: number) => (
                  <Chip
                    key={index}
                    label={skill.trim()}
                    sx={{
                      bgcolor: 'rgba(68, 68, 226, 0.08)',
                      color: 'primary.main',
                      borderRadius: '16px',
                    }}
                  />
                ))}
              </Stack>

              {/* Key Info */}
              <Stack direction="row" spacing={3}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AccessTimeIcon />
                  <Typography>{applicant?.professional_info?.experience}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AccountBalanceWalletOutlinedIcon />
                  <Typography>{applicant?.professional_info?.salary_range}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AccessTimeIcon />
                  <Typography>{applicant?.professional_info?.start_date}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CheckCircleOutlineIcon />
                  <Typography>Open to trial</Typography>
                </Box>
              </Stack>
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* Why hire section */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Why should we hire you?
              </Typography>
              <Typography color="text.secondary" sx={{ whiteSpace: 'pre-line' }}>
                {applicant?.application_info?.cover_letter}
              </Typography>
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* Resume section */}
            <Box>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center',
                justifyContent: 'space-between',
                mb: 3
              }}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 600, 
                    color: 'rgba(17, 17, 17, 0.92)' 
                  }}
                >
                  Resume
                </Typography>
                
                {applicant?.attachments?.cv?.url && (
                  <Link
                    href={applicant.attachments.cv.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      textDecoration: 'none'
                    }}
                  >
                    <Button
                      variant="outlined"
                      startIcon={<OpenInNewIcon />}
                      sx={{
                        borderRadius: 2,
                        textTransform: 'none',
                        px: 3,
                        py: 1.5
                      }}
                    >
                      Download CV
                    </Button>
                  </Link>
                )}
              </Box>

              {/* CV Preview */}
              {applicant?.attachments?.cv ? (
                <Box 
                  sx={{ 
                    mb: 4,
                    p: 3,
                    bgcolor: 'rgba(17, 17, 17, 0.04)',
                    borderRadius: 2,
                    height: '800px',
                    overflow: 'hidden'
                  }}
                >
                  <iframe
                    allowFullScreen
                    unselectable='on'
                    src={applicant.attachments.cv}
                    style={{
                      width: '100%',
                      height: '100%',
                      border: 'none'
                    }}
                    title="CV Preview"
                  />
                </Box>
              ) : (
                <Box 
                  sx={{ 
                    mb: 4,
                    p: 3,
                    bgcolor: 'rgba(17, 17, 17, 0.04)',
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Typography color="text.secondary">
                    No CV available
                  </Typography>
                </Box>
              )}
            </Box>

            {/* Action Buttons */}
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'flex-end', 
              gap: 2, 
              mt: 4,
              position: 'sticky',
              bottom: 0,
              bgcolor: 'background.paper',
              py: 2
            }}>
              <Button
                variant="outlined"
                onClick={handleReject}
                sx={{
                  borderRadius: 2,
                  textTransform: 'none',
                  px: 3,
                  py: 1.5
                }}
              >
                Reject
              </Button>
              <Button
                variant="contained"
                onClick={handleMoveToAssessment}
                sx={{
                  borderRadius: 2,
                  textTransform: 'none',
                  px: 3,
                  py: 1.5,
                  bgcolor: 'primary.main',
                  '&:hover': {
                    bgcolor: 'primary.dark'
                  }
                }}
              >
                Move to Assessment
              </Button>
            </Box>
          </Paper>
        </Paper>
      </Box>
    </Container>
  );
}