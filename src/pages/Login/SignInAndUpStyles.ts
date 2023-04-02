import styled from 'styled-components';

export const FormWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 300px;
    align-items: flex-start;

    & > h2 {
        margin-bottom: 15px;
        align-self: center;
    }

    & > div > label {
        color: #1976d2;
    }

    & > div > div > input {
        color: white;
    }

    & > div > div > fieldset {
        border-color: #1976d2;
    }

    & > div > div:hover fieldset {
        border-color: #1976d2!important;
    }
`;
