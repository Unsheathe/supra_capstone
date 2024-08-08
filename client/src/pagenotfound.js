import React from 'react';
import Header from './header'

const PageNotFound = () => {
  return (<>
    <Header />
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  </>
    
  );
};

export default PageNotFound;