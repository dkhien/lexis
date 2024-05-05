/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Tabs, Tab, Box,
} from '@mui/material';
import FileUploadDropzone from './FileUploadDropzone';
import TextUpload from './TextUpload';

// Tab list for the upload modal
const tabs = [
  { label: 'From file', component: <FileUploadDropzone /> },
  { label: 'From text', component: <TextUpload /> },
];

/**
   * Renders a custom tab panel for the upload modal.
   */
function CustomTabPanel(props) {
  const {
    children, value, index, ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
      <Box sx={{ p: 3, height: '450px' }}>
        {children}
      </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

CustomTabPanel.defaultProps = {
  children: null,
};

function a11yProps(index) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
}

/**
   * Renders a tabbed view for the upload modal.
   */
function UploadTabs({ closeModal }) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="upload modal options"
          indicatorColor="secondary"
          textColor="secondary"
        >
          {tabs.map((tab, index) => (
            <Tab
              key={tab.label}
              label={tab.label}
              {...a11yProps(index)}
              sx={{ textTransform: 'none' }}
            />
          ))}
        </Tabs>
      </Box>
      {tabs.map((tab, index) => (
        <CustomTabPanel key={tab.label} value={value} index={index}>
          {React.cloneElement(tab.component, { closeModal })}
        </CustomTabPanel>
      ))}
    </>
  );
}

UploadTabs.propTypes = {
  closeModal: PropTypes.func,
};

UploadTabs.defaultProps = {
  closeModal: () => {},
};

export default UploadTabs;
