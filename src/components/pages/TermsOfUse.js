import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <object
        data="/Politika Proair.pdf"
        type="application/pdf"
        width="100%"
        height="100%"
        style={{ border: 'none' }}
      >
        <p>Your browser does not support PDFs. 
           <a href="/Politika Proair.pdf">Download the PDF</a>.</p>
      </object>
    </div>
  );
};

export default PrivacyPolicy;