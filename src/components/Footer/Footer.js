import React from "react";

import "./Footer.css";

function Footer({children}) {
  return (
    <footer>
      <p className="copyright">{children}</p>
    </footer>
  );
}

export default Footer;
