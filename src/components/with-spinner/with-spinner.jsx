import React from "react";

import { SpinnerOverlay, SpinnerContainer } from "./with-spinner.style";

export const WithSpinner = (TheComponentToWrap) => ({ isLoading, ...otherProps }) => {
    return (
        isLoading ? (
            <SpinnerOverlay>
                <SpinnerContainer />
            </SpinnerOverlay>
        ) : (
            <TheComponentToWrap { ...otherProps } />
        )
    );
}

export const Spinner = () => {
    return (
        <SpinnerOverlay>
            <SpinnerContainer />
        </SpinnerOverlay>
    );
}