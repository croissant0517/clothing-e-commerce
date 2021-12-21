import React from "react";

import { SpinnerOverlay, SpinnerContainer } from "./with-spinner.style";

const WithSpinner = (TheComponentToWrap) => ({ isLoading, ...otherProps }) => {
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

export default WithSpinner;