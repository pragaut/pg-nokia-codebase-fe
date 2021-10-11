export default (num, fixed) => {
    if (isNaN(num)) {
      return 0;
    }
    const re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
      return num.toString().match(re)[0];
    };
    