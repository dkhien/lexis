import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import PropTypes from 'prop-types';
import useDocumentStore from '../../store/documentStore';

export default function LanguageSelect({ documentId }) {
  const [language, setLanguage] = React.useState('');
  const addLanguageToDocument = useDocumentStore((state) => state.addLanguageToDocument);

  const handleChange = (event) => {
    setLanguage(event.target.value);
    addLanguageToDocument(documentId, language);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <Select
          value={language}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="vi">Vietnamese</MenuItem>
          <MenuItem value="en">English</MenuItem>
        </Select>
        <FormHelperText>Select Language</FormHelperText>
      </FormControl>
    </div>
  );
}

LanguageSelect.propTypes = {
  documentId: PropTypes.string.isRequired,
};
