import React, { useState, useEffect, useRef } from 'react';
import {  } from '../../forms';
import { AdminTable, AddAdminTable } from '../../tables';
import { ActivateAdmin } from '../../forms';

export const Admin  = () => {

    return(
        <div >
            {/* Admin Table */} 
            <div>
            <AddAdminTable />
            <ActivateAdmin />
            <AdminTable />
            </div>
         </div>
    )

}