// 'use'
// import React from 'react';
// import {
//   Typography,
//   Box,
//   Button,
//   Divider,
//   TextField,
//   List,
//   ListItem,
//   MenuItem
// } from '@mui/material';
// import dynamic from 'next/dynamic';
// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
// import 'react-quill/dist/quill.snow.css';

// const AboutJobStep = ({ onNext, formData, setFormData }) => {

//   const modules = {
//     toolbar: [
//       ['bold', 'italic', 'underline'],
//       [{ 'list': 'ordered'}, { 'list': 'bullet' }],
//       ['clean']
//     ],
//   };

//   const handleChange = (field) => (value) => {
//     setFormData({
//       ...formData,
//       [field]: value,
//     });
//   };

//   const handleAddExpectation = () => {
//     setFormData({
//       ...formData,
//       expectations: [...formData.expectations, ""]
//     });
//   };

//   return (
//     <Box>
//       <Box sx={{ mb: 4, display: 'flex', gap: 4 }}>
//         <Box sx={{ width: '30%' }}>
//           <Typography variant="subtitle1" fontWeight="bold">Job Title</Typography>
//           <Typography variant="body2" color="text.secondary">A descriptive job title</Typography>
//         </Box>
//         <Box sx={{ width: '70%' }}>
//           <TextField
//             fullWidth
//             variant="outlined"
//             value={formData.jobTitle}
//             onChange={handleChange('jobTitle')}
//           />
//         </Box>
//       </Box>

//       <Divider sx={{ my: 3 }} />

//       <Box sx={{ mb: 4, display: 'flex', gap: 4 }}>
//         <Box sx={{ width: '30%' }}>
//           <Typography variant="subtitle1" fontWeight="bold">About the Role</Typography>
//           <Typography variant="body2" color="text.secondary">More information on the role</Typography>
//         </Box>
//         <Box sx={{ width: '70%' }}>
//           <ReactQuill
//             value={formData.aboutRole}
//             onChange={handleChange('aboutRole')}
//             modules={modules}
//             style={{ height: '200px', marginBottom: '40px' }}
//           />
//         </Box>
//       </Box>

//       <Divider sx={{ my: 3 }} />

//       <Box sx={{ mb: 4, display: 'flex', gap: 4 }}>
//         <Box sx={{ width: '30%' }}>
//           <Typography variant="subtitle1" fontWeight="bold">Job Responsibilities</Typography>
//           <Typography variant="body2" color="text.secondary">What you will do in this role</Typography>
//         </Box>
//         <Box sx={{ width: '70%' }}>
//           <ReactQuill
//             value={formData.responsibilities}
//             onChange={handleChange('responsibilities')}
//             modules={modules}
//             style={{ height: '250px', marginBottom: '40px' }}
//           />
//         </Box>
//       </Box>

//       <Divider sx={{ my: 3 }} />

//       <Box sx={{ mb: 4, display: 'flex', gap: 4 }}>
//         <Box sx={{ width: '30%' }}>
//           <Typography variant="subtitle1" fontWeight="bold">Expectations of this Role</Typography>
//           <Typography variant="body2" color="text.secondary">What you bring to this role</Typography>
//         </Box>
//         <Box sx={{ width: '70%' }}>
//           <List disablePadding>
//             {formData.expectations.map((item, index) => (
//               <ListItem key={index} disableGutters sx={{ py: 1 }}>
//                 <TextField
//                   fullWidth
//                   variant="outlined"
//                   value={item}
//                   onChange={handleChange(`expectations[${index}]`)(e => e.target.value)}
//                   size="small"
//                 />
//               </ListItem>
//             ))}
//           </List>
//           <Button
//             variant="outlined"
//             size="small"
//             sx={{ mt: 2 }}
//             onClick={handleAddExpectation}
//           >
//             + Add Expectation
//           </Button>
//         </Box>
//       </Box>

//       <Divider sx={{ my: 3 }} />

//       <Box sx={{ mb: 4, display: 'flex', gap: 4 }}>
//         <Box sx={{ width: '30%' }}>
//           <Typography variant="subtitle1" fontWeight="bold">Salary</Typography>
//           <Typography variant="body2" color="text.secondary">Add numeration</Typography>
//         </Box>
//         <Box sx={{ width: '70%', display: 'flex', alignItems: 'center', gap: 2 }}>
//           <Box sx={{ width: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #ccc', borderRadius: 1, p: 1 }}>
//             $
//           </Box>
//           <TextField
//             variant="outlined"
//             value={formData.salary}
//             onChange={handleChange('salary')}
//             sx={{ flexGrow: 1 }}
//           />
//           <TextField
//             select
//             variant="outlined"
//             value={formData.salaryType}
//             onChange={handleChange('salaryType')}
//             sx={{ width: 120 }}
//           >
//             <MenuItem value="Monthly">Monthly</MenuItem>
//             <MenuItem value="Yearly">Yearly</MenuItem>
//             <MenuItem value="Hourly">Hourly</MenuItem>
//           </TextField>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default AboutJobStep;

import React, { useState } from 'react';
import {
  Stepper,
  Step,
  StepLabel,
  Box,
  Container,
  AppBar,
  Toolbar,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Button,
  Typography,
  Stack,
  TextField,
} from '@mui/material';
import { Add, AddOutlined } from '@mui/icons-material';
import ReactQuill from 'react-quill';
import NotificationsIcon from '@mui/icons-material/Notifications';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import AboutJobStep from '../components/AboutJobStep';
import ApplicationFormBuilder from '../components/ApplicationFormStep';
import AssessmentStep from '../components/AssessmentStep';
import RefreshIcon from '@mui/icons-material/Refresh';
const Field = ({ label, description, value, onChange, multiline = false }) => {
  return (
    <Stack direction="row" spacing={3} alignItems="flex-start" marginBottom="20px">
      <Stack spacing={1} minWidth={'280px'}>
        <Typography variant="subtitle1">{label}</Typography>
        <Typography variant="body2" color="textSecondary">
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
        style={{ marginLeft: 0 }}
      />
    </Stack>
  );
};
const TextEditor = ({ label, description, value, onChange, onRegenerate }) => {
  return (
    <Stack direction="row" spacing={3} alignItems="flex-start" marginBottom="20px" width={'100%'}>
      <Stack spacing={1} minWidth={'280px'}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="subtitle1">{label}</Typography>
          <IconButton size="small" onClick={onRegenerate}>
            <RefreshIcon />
          </IconButton>
        </Stack>
        <Typography variant="body2" color="textSecondary">
          {description}
        </Typography>
      </Stack>
      <ReactQuill
        value={value}
        onChange={onChange}
        style={{ height: '150px', flex: 2, border: '1px solid #ccc', borderRadius: '4px', marginLeft: 0 }}
      />
    </Stack>
  );
};

const AboutJobStep = ({ onNext, formData, setFormData }) => {
  return (<>
    <Field
      label="Job Title"
      description="A descriptive job title."
      value={formData.jobTitle}
      onChange={(e) => handleChange('jobTitle')(e.target.value)}
    />
    <TextEditor
      label="About the Role"
      description="More information on the role."
      value={formData.aboutTheRole}
      onChange={handleChange('aboutTheRole')}
      onRegenerate={handleRegenerate('aboutTheRole')}
    />
    <TextEditor
      label="Job Responsibilities"
      description="What you will do in this role."
      value={formData.jobResponsibilities}
      onChange={handleChange('jobResponsibilities')}
      onRegenerate={handleRegenerate('jobResponsibilities')}
    />
    <Stack spacing={1} marginBottom="10px" direction="row">
      <Stack spacing={1} minWidth={'280px'}>
        <Typography variant="subtitle1">Expectation</Typography>
        <Typography variant="body2" color="textSecondary">
          What you&rsquo;re bringing to this role.
        </Typography>
      </Stack>
      <Stack spacing={1} width={'100%'}>
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
            style={{ margin: 0 }}
          />
        ))}
        <Button
          startIcon={<AddOutlined />}
          onClick={addExpectation}
          style={{ marginTop: '10px' }}
        >
          Add Expectation
        </Button>
      </Stack>
    </Stack>
    <Field
      label="Salary"
      description="Add numeration."
      value={formData.salary}
      onChange={(e) => handleChange('salary')(e.target.value)}
    />
  </>)
}