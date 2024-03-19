import React, { useState, useEffect, useRef } from 'react';
import { CompanyForm } from '../../forms';
import { CompanyTable } from '../../tables';

export const Company  = () => {

    return(
        <div >
            {/* Add Company Button */}
           

            {/* Company Form */}
            
            <div className="mb-4">
                <CompanyForm />
            </div>
            

            {/* Company Table */}
            <div>
                
            <CompanyTable />
            </div>
         </div>
    )

}