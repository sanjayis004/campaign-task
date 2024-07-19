import React from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { TextField } from 'formik-mui';
import {
  Grid,
  Paper,
  Card,
  CardContent,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@mui/material';

const validationSchema = Yup.object({
  type: Yup.string().required('Campaign type is required'),
  startDate: Yup.date().required('Start date is required'),
  endDate: Yup.date().required('End date is required'),
  schedule: Yup.array()
    .of(
      Yup.object().shape({
        day: Yup.string().required('Day is required').min(1, 'Day must be between 1 and 7')
          .max(7, 'Day must be between 1 and 7'),
        startTime: Yup.string().required('Start time is required'),
        endTime: Yup.string().required('End time is required'),
      })
    )
    .required('Schedule is required'),
});

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const CampaignForm = ({ addCampaign, updateCampaign, editingCampaign, setEditingCampaign }) => {
  const initialValues = editingCampaign
    ? {
        ...editingCampaign,
        startDate: formatDate(editingCampaign.startDate),
        endDate: formatDate(editingCampaign.endDate),
      }
    : {
        type: '',
        startDate: '',
        endDate: '',
        schedule: [{ day: '', startTime: '', endTime: '' }],
      };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      if (editingCampaign) {
        const response = await axios.put(`http://localhost:3102/api/campaigns/${editingCampaign.id}`, values);
        updateCampaign(response.data);
      } else {
        const response = await axios.post('http://localhost:3102/api/campaigns', values);
        addCampaign(response.data);
      }
      setEditingCampaign(null);
    } catch (error) {
      console.error('Error saving campaign:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Paper style={{ padding: 16 }}>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {editingCampaign ? 'Edit Campaign' : 'Create New Campaign'}
          </Typography>
          <Formik
            initialValues={initialValues}
            enableReinitialize
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
              <Form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="type-label">Campaign Type</InputLabel>
                      <Select
                        labelId="type-label"
                        label="Campaign Type"
                        id="type"
                        name="type"
                        value={values.type}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <MenuItem value="Cost per Order">Cost per Order</MenuItem>
                        <MenuItem value="Cost per Click">Cost per Click</MenuItem>
                        <MenuItem value="Buy One Get One">Buy One Get One</MenuItem>
                      </Select>
                      <ErrorMessage name="type" component={FormHelperText} />
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      component={TextField}
                      name="startDate"
                      type="date"
                      label="Start Date"
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      component={TextField}
                      name="endDate"
                      type="date"
                      label="End Date"
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <FieldArray name="schedule">
                    {({ push, remove }) => (
                      <>
                        {values.schedule.map((schedule, index) => (
                          <React.Fragment key={index}>
                            <Grid item xs={4}>
                              <Field
                                component={TextField}
                                name={`schedule.${index}.day`}
                                type="text"
                                label="Day"
                                fullWidth
                              />
                            </Grid>
                            <Grid item xs={4}>
                              <Field
                                component={TextField}
                                name={`schedule.${index}.startTime`}
                                type="time"
                                label="Start Time"
                                fullWidth
                                InputLabelProps={{
                                  shrink: true,
                                }}
                              />
                            </Grid>
                            <Grid item xs={4}>
                              <Field
                                component={TextField}
                                name={`schedule.${index}.endTime`}
                                type="time"
                                label="End Time"
                                fullWidth
                                InputLabelProps={{
                                  shrink: true,
                                }}
                              />

                            </Grid>
                            <Grid item xs={12}>
                              <Button
                                type="button"
                                variant="contained"
                                color="secondary"
                                onClick={() => remove(index)}
                                disabled={values.schedule.length === 1}
                                
                              >
                                remove Schedule
                              </Button>
                            </Grid>
                          </React.Fragment>
                        ))}
                        <Grid item xs={12}>
                          <Button
                            type="button"
                            variant="contained"
                            color="primary"
                            onClick={() => push({ day: '', startTime: '', endTime: '' })}
                          >
                            Add More Schedule
                          </Button>
                        </Grid>
                      </>
                    )}
                  </FieldArray>
                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary" disabled={isSubmitting} style={{position:"relative",left:"00px",width:"1090px",backgroundColor:"green"}}>
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </Paper>
  );
};

export default CampaignForm;


