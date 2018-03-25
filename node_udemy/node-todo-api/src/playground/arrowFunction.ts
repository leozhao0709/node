const user = {
    name: 'Lei',
    sayHi() {
        // tslint:disable-next-line:no-console
        console.log(this);
        const say = () => {
            // tslint:disable-next-line:no-console
            console.log(`.....${this.name}`);
        };
        say();
    }
};

user.sayHi();