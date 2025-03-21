import React, { useState } from 'react';
import { 
  Typography, 
  Box, 
  Button, 
  Divider, 
  TextField,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
  FormControl,
  FormLabel,
  Grid,
  Paper,
  Stack,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';

const AssessmentStep = ({formData,setFormData}) => {
  const assessments = ['Assessment 1', 'Assessment 2', 'Assessment 3'];
  const handleAssessmentChange = (value) => {
    setFormData({
      ...formData,
      assessment: value,
    });
  };

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
          value={formData.assessment}
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
export default AssessmentStep;