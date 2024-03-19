import React, { useState, useEffect, useRef } from 'react';
import {  } from '../../forms';
import { AdminTable } from '../../tables';
import { ActivateAdmin } from '../../forms';

export const Admin  = () => {

    return(
        <div >
            {/* Admin Table */}
            <div>
            <ActivateAdmin />
            <AdminTable />
            </div>
         </div>
    )

}