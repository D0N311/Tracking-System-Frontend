import React, { useState, useEffect, useRef } from 'react';
import { AdminTable,  } from '../../tables';
import { ActivateAdmin } from '../../forms';

export const Admin  = () => {

    return(
        <div >
            {/* Admin Table */} 
            <h2 class="text-4xl -mt-10 font-extrabold dark:text-white">Admin Management</h2>
            <div>
            
            <ActivateAdmin />
            <AdminTable />
            </div>
         </div>
    )

}