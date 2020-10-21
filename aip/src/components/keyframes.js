import{keyframes} from 'styled-components';

export const showUP =keyframes`
    0% {transform: translateY(800px);
        animation-timing-function: ease-out;
    }
    60% {transform: translateY(-2px);
        animation-timing-function: ease-in;
    }
    80% {transform: translateY(5px);
        animation-timing-function: ease-out;
    }
    100% {transform: translateY(0);
        animation-timing-function: ease-in;
    }
` 
export const fadeIn =keyframes`
    from {
        opacity:0
    }
    to {
        opacity:1
    }
` 