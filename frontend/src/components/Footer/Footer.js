import React from 'react';
import './Footer.css';
import githubLogo from './github-logo.png';

function Footer() {
  return (
    <footer>
      <p><br></br><br></br><br />2023 © Copyright Reddy Harika. All Rights Reserved.</p>
      <a href="https://github.com/harika136" className="github-link">
          <img src={githubLogo} alt="GitHub Logo" className="github-logo" />
          </a>
      </footer>
  );
}

export default Footer;


