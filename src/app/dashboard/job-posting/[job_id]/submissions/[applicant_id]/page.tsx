// File structure:
// - pages/index.js (main page)
// - components/Navbar.js
// - components/CandidateProfile.js
// - components/SkillTag.js
// - styles/globals.css

// pages/index.js
'use client'
import { useState } from 'react';
import Head from 'next/head';
import { Box, Container, Typography, IconButton } from '@mui/material';
import CandidateProfile from '../../../../components/dashboard/CandidateProfile';
// import CandidateProfile from '../components/CandidateProfile';

export default function Home() {
  const [candidates, setCandidates] = useState([
    {
      id: 1,
      name: 'Olakunjo Michael',
      availability: 'Available immediately',
      experience: '5 years',
      salary: '400k-600k',
      openToTrial: true,
      location: 'Lagos, Nigeria',
      email: 'Olakunjomichael@gmail.com',
      skills: ['Communication', 'Data analysis', 'Strategic Thinking', 'Empathy', 'Prioritization'],
      statement: 'I believe my strength lies in my deep understanding of user needs and my ability to build products that truly resonate with customers. I\'m a passionate advocate for user-centered design and I thrive in collaborative environments. I\'m adept at working with engineering, design, and marketing teams to ensure we\'re all aligned on the product vision and delivering a cohesive user experience. I\'m also a strong communicator and I excel at building relationships with stakeholders at all levels. I\'m confident I can quickly integrate into your team and contribute to a positive and productive work environment.',
      resume: {
        summary: 'Highly motivated and results-oriented Product Manager with 5+ years of experience driving the development and launch of successful products. Proven ability to translate market needs and customer feedback into actionable product strategies. Expertise in (Mention 2-3 key skills, e.g., agile methodologies, user research, data analysis). Passionate about creating innovative solutions that solve real customer problems and drive business growth.',
        experience: [
          {
            company: 'Assemble Holdings',
            location: 'Lagos, Nigeria',
            title: 'Product Manager',
            period: 'July 2023 - Present',
            achievements: [
              'Led the development and launch of [Product Name], resulting in a [Percentage]% increase in [Key Metric, e.g., user engagement, revenue].',
              'Defined and prioritized product roadmap based on market research, customer feedback, and business goals.',
              'Collaborated with engineering, design, and marketing teams to ensure successful product delivery.'
            ]
          },
          {
            company: 'Zenith Bank',
            location: 'Lagos, Nigeria',
            title: 'Product Manager',
            period: 'March 2019 - February 2023',
            achievements: [
              'Conducted user research and analysis to identify customer pain points and inform product decisions.',
              'Utilized data analytics to track product performance and identify areas for improvement.',
              'Implemented agile methodologies to streamline product development processes.',
              'Managed a product backlog, and ran sprint planning, reviews and retrospectives.'
            ]
          }
        ],
        education: {
          institution: 'Babcock University',
          location: 'Nigeria',
          degree: 'Bachelor of Science in Computer Science',
          graduationDate: 'May 2018',
          achievements: [
            'Completed thesis on \'The Rise of a Digital Age\'',
            'Lead presentations and managed multiple class tutorials'
          ]
        },
        certifications: [
          'Certified Scrum Product Owner (CSPO)',
          'Product Management Foundations, Coursera'
        ]
      }
    },
    // Other candidates would be here
  ]);

  const [selectedCandidate, setSelectedCandidate] = useState(candidates[0]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Head>
        <title>ElevateHR - Product Manager Candidates</title>
        <meta name="description" content="Product Manager candidates for review" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <Navbar /> */}
      
      <Container maxWidth="lg" sx={{ flexGrow: 1, py: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <IconButton
            sx={{ mr: 2 }}
            aria-label="back"
          >
            &#8592;
          </IconButton>
          <Typography variant="h5" component="h1" fontWeight="bold">
            Product Manager
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 3 }}>
          <Box sx={{ width: 300, flexShrink: 0 }}>
            {candidates.map((candidate) => (
              <Box
                key={candidate.id}
                sx={{
                  p: 2,
                  mb: 2,
                  border: '1px solid #e0e0e0',
                  borderRadius: 1,
                  cursor: 'pointer',
                  bgcolor: selectedCandidate.id === candidate.id ? '#f5f5f5' : 'white'
                }}
                onClick={() => setSelectedCandidate(candidate)}
              >
                <Typography variant="subtitle1" fontWeight="bold">
                  {candidate.name}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', mr: 2, color: 'text.secondary', fontSize: '0.875rem' }}>
                    ⏱ {candidate.availability}
                  </Box>
                  <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', color: 'text.secondary', fontSize: '0.875rem' }}>
                    🔍 Open to trial
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', mr: 2, color: 'text.secondary', fontSize: '0.875rem' }}>
                    📅 {candidate.experience}
                  </Box>
                  <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', color: 'text.secondary', fontSize: '0.875rem' }}>
                    💰 {candidate.salary}
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>

          <CandidateProfile candidate={selectedCandidate} />
        </Box>
      </Container>
    </Box>
  );
}