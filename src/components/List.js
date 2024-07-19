import React from 'react';
import { Grid, Card, CardContent, Typography, Button } from '@mui/material';
import { makeStyles } from '@mui/styles'


const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: "4px",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
    transition: 'transform 0.2s',
    '&:hover': {
      transform: 'scale(1.05)',
    },
    margin: "5px",
  },
  cardContent: {
    padding: "10px",
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: "primary",
    margin:"5px"
  },
  textSecondary: {
    color: "black",
    marginBottom: "5px",
    margin:"5px"
  },
  button: {
    marginTop: "5px",
    backgroundColor: "primary",
    color: '#fff',
    margin:"5px",
    '&:hover': {
      backgroundColor: "teal",
    },
  },
}));

const CampaignList = ({ campaigns, setEditingCampaign }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={3} className={classes.container}>
      {campaigns && campaigns.map((campaign) => (
        <Grid item xs={12} sm={6} md={4} key={campaign.id}>
          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
              <Typography className={classes.title} variant="h6" component="h2">
                {campaign.type}
              </Typography>
              <Typography className={classes.textSecondary}>
                Start Date: {new Date(campaign.startDate).toLocaleDateString()}
              </Typography>
              <Typography className={classes.textSecondary}>
                End Date: {new Date(campaign.endDate).toLocaleDateString()}
              </Typography>
              <Typography className={classes.textSecondary}>
                Next Activation: {campaign.nextActivation ? new Date(campaign.nextActivation).toLocaleString() : 'N/A'}
              </Typography>
              <Button
                variant="contained"
                className={classes.button}
                onClick={() => setEditingCampaign(campaign)}
              >
                Edit
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default CampaignList;
