
const boundUIs = {};
import window from 'global/window';

let scrollValue = 0;

const init = () => {
    window.addEventListener('scroll', this.handleScroll, { passive: true });
    window.addEventListener('screen', this.handleScroll, { passive: true });
};

export const scrollEvent = () => {

    
};