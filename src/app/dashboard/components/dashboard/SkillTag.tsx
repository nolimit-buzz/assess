// components/Navbar.js
import { AppBar, Toolbar, Box, Typography, Avatar, Button, IconButton } from '@mui/material';
import Image from 'next/image';


// components/SkillTag.js
import { Chip } from '@mui/material';

// Function to get background color based on label
function getBackgroundColor(label) {
  switch (label.toLowerCase()) {
    case 'communication':
      return '#FFF4E5';
    case 'data analysis':
      return '#E8F4FD';
    case 'strategic thinking':
      return '#EFE6FD';
    case 'empathy':
      return '#D1FADF';
    case 'prioritization':
      return '#E8EAED';
    default:
      return '#F5F5F5';
  }
}

// Function to get text color based on label
function getTextColor(label) {
  switch (label.toLowerCase()) {
    case 'communication':
      return '#B54708';
    case 'data analysis':
      return '#175CD3';
    case 'strategic thinking':
      return '#6941C6';
    case 'empathy':
      return '#027A48';
    case 'prioritization':
      return '#344054';
    default:
      return '#616161';
  }
}

export default function SkillTag({ label }) {
  return (
    <Chip
      label={label}
      sx={{
        borderRadius: 1,
        backgroundColor: getBackgroundColor(label),
        color: getTextColor(label),
        fontSize: '0.75rem',
        height: 28,
        '& .MuiChip-label': {
          px: 1.5,
        }
      }}
    />
  );
}