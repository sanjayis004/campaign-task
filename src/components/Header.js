import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import { Add , List } from '@mui/icons-material';

const Header = ({ onCreateCampaign, handleSetShowList ,showList}) => {
  return (
    <AppBar position="static" style={{ marginBottom: '16px' }}>
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Campaign
        </Typography>
        { showList ? <Button 
          color="inherit" 
          startIcon={<Add />} 
          onClick={handleSetShowList}
        > 

          Create Campaign
        </Button> : <Button 
          color="inherit" 
          startIcon={<List />} 
          onClick={handleSetShowList}
        > 
          Show List
        </Button> } 
      </Toolbar>
    </AppBar>
  );
};

export default Header;
