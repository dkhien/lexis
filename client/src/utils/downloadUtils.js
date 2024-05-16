import axios from 'axios';
import { MimeType } from '../constants';

export default function handleDownloadUtil(document) {
  const localStorageKeys = ['newTextColor', 'newLinkColor', 'newBackgroundColor', 'fontFamilyValue', 'headerFontSizeValue', 'textFontSizeValue'];
  const downloadAPI = `${process.env.REACT_APP_SERVER_URL}/api/download/${document.resultFile}`;
  const localStorageData = {};
  localStorageKeys.forEach((key) => {
    if (localStorage.getItem(key)) {
      localStorageData[key] = localStorage.getItem(key);
    }
  });
  axios({
    method: 'get',
    url: downloadAPI,
    params: { style: localStorageData },
    responseType: 'blob',
  }).then((response) => {
    const url = window.URL.createObjectURL(
      new Blob([response.data]),
      { type: MimeType.PDF },
    );
    const link = window.document.createElement('a');
    link.href = url;
    const filename = `${document.resultFile}.pdf`;
    link.setAttribute(
      'download',
      filename,
    );
    // Append to html link element page
    window.document.body.appendChild(link);

    // Start download
    link.click();

    // Clean up and remove the link
    URL.revokeObjectURL(url);
  });
}
