import Scrolly from './scrolly';

const useScrolly = (rangeFunction, compareFunction) => {
    const scrolly = new Scrolly();
    
    if (!rangeFunction) {
        throw new Error("The 'rangeFunction' prop is required.");
    }
    
    scrolly.setRangeFunction(rangeFunction);

    if (compareFunction) {
        scrolly.setCompareFunction(compareFunction);    
    } else {
        compareFunction = (a, b) => a < b;
    }

    return scrolly;
};

export default useScrolly;