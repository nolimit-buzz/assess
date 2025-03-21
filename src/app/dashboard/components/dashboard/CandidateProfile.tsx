// components/CandidateProfile.js
import { Box, Typography, Button, Paper } from '@mui/material';
import SkillTag from './SkillTag';

export default function CandidateProfile({ candidate }) {
  if (!candidate) return null;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Paper elevation={0} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
          <Box>
            <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom>
              {candidate.name}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', mr: 2 }}>
                📍 {candidate.location}
              </Box>
              <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center' }}>
                ✉️ {candidate.email}
              </Box>
            </Box>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, my: 2 }}>
              {candidate.skills.map((skill, idx) => (
                <SkillTag key={idx} label={skill} />
              ))}
            </Box>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                  📅
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {candidate.experience}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                  💰
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {candidate.salary}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                  ⏱
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {candidate.availability}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                  🔍
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Open to trial
                </Typography>
              </Box>
            </Box>
          </Box>
          
          <Button variant="outlined" size="small" sx={{ borderRadius: 2, px: 2 }}>
            Portfolio ↗
          </Button>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Why should we hire you?
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {candidate.statement}
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Resume
          </Typography>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Summary
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {candidate.resume.summary}
            </Typography>
          </Box>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Skills
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {candidate.skills.map((skill, idx) => (
                <SkillTag key={idx} label={skill} />
              ))}
            </Box>
          </Box>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Experience
            </Typography>
            
            {candidate.resume.experience.map((exp, idx) => (
              <Box key={idx} sx={{ mb: 2 }}>
                <Typography variant="subtitle2" fontWeight="bold">
                  {exp.company}, {exp.location}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {exp.title} | {exp.period}
                </Typography>
                <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
                  {exp.achievements.map((achievement, aidx) => (
                    <li key={aidx} style={{ marginBottom: '4px' }}>
                      <Typography variant="body2" color="text.secondary">
                        {achievement}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </Box>
            ))}
          </Box>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Education
            </Typography>
            <Typography variant="subtitle2" fontWeight="bold">
              {candidate.resume.education.institution}, {candidate.resume.education.location}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {candidate.resume.education.degree} | {candidate.resume.education.graduationDate}
            </Typography>
            <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
              {candidate.resume.education.achievements.map((achievement, idx) => (
                <li key={idx} style={{ marginBottom: '4px' }}>
                  <Typography variant="body2" color="text.secondary">
                    {achievement}
                  </Typography>
                </li>
              ))}
            </ul>
          </Box>
          
          <Box>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Certifications
            </Typography>
            <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
              {candidate.resume.certifications.map((cert, idx) => (
                <li key={idx} style={{ marginBottom: '4px' }}>
                  <Typography variant="body2" color="text.secondary">
                    {cert}
                  </Typography>
                </li>
              ))}
            </ul>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button 
            variant="outlined" 
            color="error" 
            startIcon="✕" 
            sx={{ 
              borderRadius: 2,
              px: 3
            }}
          >
            Reject
          </Button>
          <Button 
            variant="contained" 
            color="primary" 
            startIcon="✓" 
            sx={{ 
              borderRadius: 2,
              px: 3,
              bgcolor: '#4f46e5',
              '&:hover': {
                bgcolor: '#4338ca'
              }
            }}
          >
            Move to Assessment
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}