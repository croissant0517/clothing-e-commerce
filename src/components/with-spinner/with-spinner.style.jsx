import styled from 'styled-components';

export const SpinnerOverlay = styled.div`
    height: 60vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
`;

export const RelativeSpinnerOverlay = styled.div`
    height: 100%;
    width: 100%;
    position: fixed;
    display: flex;
    bottom: 0;
    right: 0;
    justify-content: center;
    align-items: center;
    z-index: 100;
    background: rgba(0, 0, 0, 0.8);
`;

export const SpinnerContainer = styled.div`
    display: inline-block;
    width: 50px;
    height: 50px;
    border: 3px solid rgba(195, 195, 195, 0.6);
    border-radius: 50%;
    border-top-color: #636767;
    animation: spin 1s ease-in-out infinite;
    -webkit-animation: spin 1s ease-in-out infinite;
    @keyframes spin {
        to {
        -webkit-transform: rotate(360deg);
        }
    }
    @-webkit-keyframes spin {
        to {
        -webkit-transform: rotate(360deg);
        }
    }
`;