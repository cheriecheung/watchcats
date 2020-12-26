import styled from 'styled-components';
import { themeColor } from '../../../style/theme'

const ResponsiveDivider = styled.div`
    width: 1px;
    height: 95px;
    background-color: ${themeColor.lightGrey};
    margin: 0 10px;

    @media (max-width: 800px) {
        width: 100%;
        height: 1px;
        margin: 20px 0;
    }
`

export default ResponsiveDivider