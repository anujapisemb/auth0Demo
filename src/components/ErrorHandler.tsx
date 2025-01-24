import React from 'react';
import {ErrorBoundary} from 'react-error-boundary';
import ErrorScreen from '../screens/ErrorScreen/ErrorScreen';

const ErrorHandler = ({children}) => {
    const errorRef = React.useRef(null);

    const errorHandler = (error) => {
        try {
            if (errorRef) {
                errorRef.current = error;
            }
            console.log('ERROR HANDLER', error);
        } catch (e) {}
    };

    function renderErrorScreen() {
        return <ErrorScreen error={errorRef.current} />;
    }
    return (
        <ErrorBoundary
            FallbackComponent={renderErrorScreen}
            onError={errorHandler}
        >
            {children}
        </ErrorBoundary>
    );
};

export default ErrorHandler;
