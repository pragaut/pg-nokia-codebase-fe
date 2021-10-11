/**
 * This file will be used for printing logs
 */

/**
 * We need to print lot of logs at console for testing, or staging. So we can diagnose problems easily
 * 
 * @param {*} identifier the text to identify the print, for example, console.log('data received', data), 'data received' is the identifier
 * @param {*} toPrint the actual object to print in the console window
 * @param {*} logType log type, default is normal, 
 * @param {*} forcePrint 
 * @param {*} priority 
 */

export const log = (identifier, toPrint, logType = 'normal', forcePrint = false, priority = 1) => {
     
    if ((process.env.MODE !== 'production' || forcePrint) && priority >= process.env.DEFAULT_LOG_PRIORITY ) {
        switch(logType) {
            case 'warn':
                console.warn(identifier, `printed at ${new Date().toLocaleDateString()} ==> `, toPrint);

                break;
            case 'error':
                console.error(identifier, `printed at ${new Date().toLocaleDateString()} ==> `, toPrint);

                break;
            default:
                console.log(identifier, `printed at ${new Date().toLocaleDateString()} ==> `, toPrint);
        }
    }
 };

