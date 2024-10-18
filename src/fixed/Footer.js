import React from 'react';

const Footer = ({ className }) => {
  return (
    <footer className={`bg-dark text-light text-center py-3 ${className}`}>
      <div className="container">
        <p className="mb-0">&copy; {new Date().getFullYear()} Power by Degordian.</p>
      </div>
    </footer>
  );
};

export default Footer;
