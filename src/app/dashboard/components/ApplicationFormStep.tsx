import React from 'react';
import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Typography,
  Paper,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const ApplicationFormBuilder = ({ onNext, onBack,formData, setFormData }) => {

  const handleChange = (fieldId, key, value) => {
    setFormData(prevData => {
      const updatedFields = prevData.formFields.map(field => {
        if (field.id === fieldId) {
          return { ...field, [key]: value };
        }
        return field;
      });
      return { ...prevData, formFields: updatedFields };
    });
  };

  const handleAddField = () => {
    const newId = formData.formFields.length > 0 ? Math.max(...formData.formFields.map(field => field.id)) + 1 : 1;
    setFormData(prevData => ({
      ...prevData,
      formFields: [...prevData.formFields, { id: newId, question: "New Question", type: "open question" }]
    }));
  };

  const handleDeleteField = (id) => {
    setFormData(prevData => ({
      ...prevData,
      formFields: prevData.formFields.filter(field => field.id !== id)
    }));
  };

  const handleAddOption = (fieldId) => {
    setFormData(prevData => {
      const updatedFields = prevData.formFields.map(field => {
        if (field.id === fieldId) {
          return { ...field, options: [...field.options, "New Option"] };
        }
        return field;
      });
      return { ...prevData, formFields: updatedFields };
    });
  };

  const handleDeleteOption = (fieldId, index) => {
    setFormData(prevData => {
      const updatedFields = prevData.formFields.map(field => {
        if (field.id === fieldId) {
          const newOptions = field.options.filter((_, i) => i !== index);
          return { ...field, options: newOptions };
        }
        return field;
      });
      return { ...prevData, formFields: updatedFields };
    });
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ bgcolor: 'blue.600', color: 'white', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', mr: 1 }}>
            2
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 'semibold' }}>
            Application Form
          </Typography>
        </Box>
      </Box>

      <Box sx={{ mt: 2, mb: 3 }}>
        {formData.formFields.map((field) => (
          <Paper key={field.id} sx={{ p: 3, mb: 2, position: 'relative' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <TextField
                fullWidth
                variant="outlined"
                value={field.question}
                onChange={(e) => handleChange(field.id, 'question', e.target.value)}
                sx={{ mr: 2 }}
              />
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <FormControl sx={{ minWidth: 120, mr: 1 }}>
                  <InputLabel>Type</InputLabel>
                  <Select
                    value={field.type}
                    onChange={(e) => handleChange(field.id, 'type', e.target.value)}
                    label="Type"
                  >
                    <MenuItem value="open question">Open question</MenuItem>
                    <MenuItem value="multi choice">Multi choice</MenuItem>
                    <MenuItem value="attachment">Attachment</MenuItem>
                  </Select>
                </FormControl>
                <IconButton onClick={() => handleDeleteField(field.id)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>

            {field.type === "open question" && (
              <Box sx={{ bgcolor: 'grey.200', p: 2, borderRadius: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Response field
                </Typography>
              </Box>
            )}

            {field.type === "multi choice" && (
              <Box>
                {field.options.map((option, idx) => (
                  <Box key={idx} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <TextField
                      value={option}
                      onChange={(e) => handleChange(field.id, 'options', e.target.value, idx)}
                      sx={{ flex: 1, mr: 1 }}
                    />
                    {field.options.length > 1 && (
                      <IconButton onClick={() => handleDeleteOption(field.id, idx)}>
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </Box>
                ))}
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<AddIcon />}
                  onClick={() => handleAddOption(field.id)}
                  sx={{ mt: 1 }}
                >
                  Add Option
                </Button>
              </Box>
            )}

            {field.type === "attachment" && (
              <Box sx={{ bgcolor: 'grey.200', p: 2, borderRadius: 1, mt: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Attachment field
                </Typography>
              </Box>
            )}
          </Paper>
        ))}

        <Button
          variant="outlined"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddField}
          sx={{ mt: 2 }}
        >
          Add Question
        </Button>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={onNext}
          endIcon={<span>→</span>}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default ApplicationFormBuilder;
