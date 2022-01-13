import styled from 'styled-components';

export const ErrorImageOverlay = styled.div`
    padding-top: 70px;
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #1c1d1f;
`;

export const ErrorImageContainer = styled.div`
    background-image: ${({ imageUrl }) => `url(${imageUrl})`};
    background-size: cover;
    background-position: center;
    width: 40vh;
    height: 40vh;
`;

export const ErrorImageText = styled.h2`
    font-size: clamp(1rem, 3vw, 2rem);
    color: white
`;
