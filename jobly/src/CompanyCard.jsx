import React from "react";

import "./CompanyCard.css";

function CompanyCard({name, description}) {
  return (
    <div className="CompanyCard">
      <div className="CompanyCard-name">
        <h4>{name}</h4>
      </div>
      <div className="CompanyCard-description">
        <p>{description}</p>
      </div>
    </div>
  );
}

export default CompanyCard;
