// // tslint:disable:no-console
// const fast = (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
//     console.log(target);
//     console.log('---------');
//     console.log(propertyKey);
//     console.log('---------');
//     console.log(descriptor);
//     console.log('---------');
//     target.speed = 20;
//     const run = descriptor.value;
//     descriptor.value = () => {
//         run();
//         console.log(`speed ${target.speed}`);
//     };

//     return descriptor;
// };

// class Rabbit {
//     @fast
//     public run() {
//         console.log('running~');
//     }
// }

// let bunny = new Rabbit();
// bunny.run();

const calculate = new Promise((res, rej) => {
    setTimeout(() => {
        let sum = 0;
        for (let i = 0; i < 10000000; i++) {
            sum += i;
            // tslint:disable-next-line:no-console
            // console.log();
        }
        res(sum);
    }, 0);
});

calculate.then((sum) => {
    // tslint:disable-next-line:no-console
    console.log(sum);
});

Promise.resolve().then(() => {
    // tslint:disable-next-line:no-console
    console.log('too slow....');
});

Promise.resolve().then(() => {
    // tslint:disable-next-line:no-console
    console.log('finish....');
});