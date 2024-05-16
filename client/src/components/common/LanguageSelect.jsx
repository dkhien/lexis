import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import PropTypes from 'prop-types';
import useDocumentStore from '../../store/documentStore';
import { Languages } from '../../constants';

export default function LanguageSelect({ documentId }) {
  const [language, setLanguage] = React.useState(Languages.English);
  const addLanguageToDocument = useDocumentStore((state) => state.addLanguageToDocument);
  const documents = useDocumentStore((state) => state.documents);

  const handleChange = async (event) => {
    const selectedLanguage = event.target.value;
    setLanguage(selectedLanguage);
    addLanguageToDocument(documentId, selectedLanguage);
  };

  React.useEffect(() => {
    const doc = documents.find((document) => document.id === documentId);
    if (doc) {
      setLanguage(doc.language);
    }
  }, [documentId, documents]);

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <Select
          value={language}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value={Languages.English}>English</MenuItem>
          <MenuItem value={Languages.Vietnamese}>Vietnamese</MenuItem>
        </Select>
        <FormHelperText>Select Language</FormHelperText>
      </FormControl>
    </div>
  );
}

LanguageSelect.propTypes = {
  documentId: PropTypes.string.isRequired,
};
