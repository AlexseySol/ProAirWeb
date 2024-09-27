import React from 'react';

const RefundPolicy = () => {
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <object
        data="/Правила та умови використання.pdf" // Путь к файлу PDF в папке public
        type="application/pdf"
        width="100%"
        height="100%"
        style={{ border: 'none' }}
      >
        <p>Your browser does not support PDFs. 
           <a href="/Правила та умови використання.pdf">Download the PDF</a>.</p>
      </object>
    </div>
  );
};

export default RefundPolicy;
