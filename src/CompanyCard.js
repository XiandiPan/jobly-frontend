import React, { useState, useEffect } from "react";


function CompanyCard({company}){

  return (
    <div>
      <ul>
        <li>{company.name}</li>
        <li>{company.description}</li>
        <img src={company.logoUrl}></img>
      </ul>
    </div>
  )

}












export default CompanyCard