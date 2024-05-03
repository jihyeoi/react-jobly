import React from "react";

import "./CompanyCard.css";

/**
 * Presentational component to display a Company's details
 *
 * Props:
 * - name
 * - description
 *
 * State:
 * - None
 *
 * CompanyList -> CampanyCard
 */
function CompanyCard({name, description}) {
  return (
    <div className="CompanyCard">
      <div className="CompanyCard-name">
        <h6>{name}</h6>
      </div>
      <div className="CompanyCard-description">
        <p>{description}</p>
      </div>
    </div>
  );
}

export default CompanyCard;
