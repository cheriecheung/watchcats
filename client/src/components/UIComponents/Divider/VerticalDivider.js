import styled from 'styled-components';

const VerticalDivider = styled.div`
    width: 1px;
    height: 95px;
    background: #929292;
    margin: 0 20px;

    @media (max-width: 769px) {
        display: none;
    }
`

export default VerticalDivider