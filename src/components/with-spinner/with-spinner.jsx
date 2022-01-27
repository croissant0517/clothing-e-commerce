import React from "react";

import { SpinnerOverlay, SpinnerContainer, RelativeSpinnerOverlay } from "./with-spinner.style";

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

export const RelativeSpinner = () => {
    return (
        <RelativeSpinnerOverlay>
            <SpinnerContainer />
        </RelativeSpinnerOverlay>
    );
}