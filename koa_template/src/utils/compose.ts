// export type Next = <T, U>(ctx?: T) => Promise<U>;

// const compose = <T>(...fns: ((ctx: T, next?: Next) => Promise<unknown>)[]) => {
//   return (ctx: T, next?: Next) => {
//     let index = -1;
//     const dispatch = (i) => {
//       console.log('...start...', i);
//       if (i <= index)
//         return Promise.reject(new Error('next() called multiple times'));
//       index = i;
//       console.log('...debug...', i);
//       if (i === fns.length) {
//         // fn = next
//         console.log('...next...', next);
//         return (next && Promise.resolve(next(ctx))) || Promise.resolve(123);
//       }
//       const fn = fns[i];
//       console.log('...', !!fn);
//       if (!fn) return Promise.resolve();
//       try {
//         console.log('...resolve...', i);
//         return Promise.resolve(fn(ctx, dispatch.bind(null, i + 1)));
//       } catch (err) {
//         return Promise.reject(err);
//       }
//     };
//     return dispatch(0);
//   };
// };

const compose = (
  ...fns: ((next?: () => Promise<unknown>) => Promise<unknown>)[]
) => {
  return (...args) => {
    if (fns.length === 0) {
      return;
    }
    if (fns.length === 1) {
      return fns[0](...args);
    }

    const dispatch = (i) => {
      if (i >= fns.length) return;
      if (i === fns.length - 1) return Promise.resolve(fns[i](...args));
      const fn = fns[i];
      if (!fn) return Promise.resolve();
      try {
        return Promise.resolve(fn(dispatch(i + 1)));
      } catch (err) {
        return Promise.reject(err);
      }
    };
    return dispatch(0);
  };
};

export default compose;
