import React, { createContext, useState } from 'react';

// Create the CursorContext
const CursorContext = createContext();

// Create a CursorProvider component to provide the context value
const CursorProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);

    // Function to set the cursor to loading
    const setCursorLoading = () => {
        setIsLoading(true);
    };

    // Function to set the cursor back to normal
    const setCursorNormal = () => {
        setIsLoading(false);
    };

    // Value object to be provided by the context
    const value = {
        isLoading,
        setCursorLoading,
        setCursorNormal,
    };

    return (
        <CursorContext.Provider value={value}>
            {children}
        </CursorContext.Provider>
    );
};

export { CursorContext, CursorProvider };