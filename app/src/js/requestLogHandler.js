import errorHandler from './errorHandler';

const requestLogHandler = {
    get(target, prop) {
        if (typeof target[prop] === 'function') {
            // method call
            console.log('method called:', prop);
            return new Proxy(target[prop], {
                apply(targ, self, args) {
                    try {
                        console.log('arguments:', ...args);
                        return targ.apply(self, args);
                    } catch (error) {
                        errorHandler.handle(error.message);
                        throw new Error(error);
                    }
                },
            });
        }
        return target[prop];
    },
    // get: (target, name, receiver) => (...args) => Reflect
    //     .get(target, name, receiver)
    //     .apply(target, args)
    //     .catch((error) => {
    //         console.log('caught error', error);
    //         errorHandler.handle(error.message);
    //     }),
    // get(target, prop) {
    //     if (typeof target[prop] === 'function') {
    //         console.log('method called:', prop);
    //         return target[prop];
    //     }
    //     return target[prop];
    // },
};

export default requestLogHandler;
