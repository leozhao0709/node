// tslint:disable:no-console
const fast = (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    console.log(target);
    console.log('---------');
    console.log(propertyKey);
    console.log('---------');
    console.log(descriptor);
    console.log('---------');
    target.speed = 20;
    const run = descriptor.value;
    descriptor.value = () => {
        run();
        console.log(`speed ${target.speed}`);
    };

    return descriptor;
};

class Rabbit {
    @fast
    public run() {
        console.log('running~');
    }
}

let bunny = new Rabbit();
bunny.run();
