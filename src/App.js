
import React, { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import CampaignList from './components/List';
import CampaignForm from './components/Form';
import Header from './components/Header';

const App = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [editingCampaign, setEditingCampaign] = useState(null);
  const [showList, setShowList] = useState(true);

  useEffect(() => {
    // Fetch campaigns from the server
    fetch('http://localhost:3102/api/campaigns')
      .then(res => res.json())
      .then(data => setCampaigns(data))
      .catch(error => console.error('Error fetching campaigns:', error));
  }, []);

  const addCampaign = campaign => {
    setCampaigns([...campaigns, campaign]);
    setShowList(true);
  };

  const updateCampaign = updatedCampaign => {
    setCampaigns(campaigns.map(campaign => (campaign.id === updatedCampaign.id ? updatedCampaign : campaign)));
    setShowList(true);
  };

  const handleSetShowList = () => {
    setShowList(!showList);
    setEditingCampaign(null); // Reset editing campaign when toggling
  };
  const handleEditCampaign = (campaign) => {
    setEditingCampaign(campaign);
    setShowList(false); // Switch to form view for editing
  };

  return (
    <Container>
      <Header handleSetShowList={handleSetShowList} showList={showList} />
      {showList ? (
        <CampaignList campaigns={campaigns} setEditingCampaign={handleEditCampaign} />
      ) : (
        <CampaignForm
          addCampaign={addCampaign}
          updateCampaign={updateCampaign}
          editingCampaign={editingCampaign}
          setEditingCampaign={setEditingCampaign}
        />
      )}
    </Container>
  );
};

export default App;
