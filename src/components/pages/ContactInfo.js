import React from 'react';

const ContactInfo = () => {
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <object
        data="/Контактна інформація.pdf" // Путь к файлу PDF в папке public
        type="application/pdf"
        width="100%"
        height="100%"
        style={{ border: 'none' }}
      >
        <p>Your browser does not support PDFs. 
           <a href="/Контактна інформація.pdf">Download the PDF</a>.</p>
      </object>
    </div>
  );
};

export default ContactInfo;
