import React from 'react'

export default function Header() {
  
  return (
      <header>
        
          <div className="abc-logo">
             <img src="abc_logo.png" alt="ABC Products"
             style={{height: "50px"}}/>
          </div>
          <div className="hrc-logo">
             <img src="hrc_logo.png" alt="HighRadius" 
             style={{height: "50px"}}/>
          </div>
          <div className="invoice-list">
             Invoice List
          </div>
      </header> 
  )
};
