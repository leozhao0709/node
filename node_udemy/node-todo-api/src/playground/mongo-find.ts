import { MongoClient } from 'mongodb';

const url = 'mongodb://localhost:27017';
const dbName = 'TodoApp';

MongoClient.connect(url, (err, client) => {
    if (err) {
        // tslint:disable-next-line:no-console
        return console.log('Unable to connect to MongoDb server');
    }

    // tslint:disable-next-line:no-console
    console.log(`connect to MongoDb server`);

    const db = client.db(dbName);

    // db.collection('Todos').find({
    //     completed: true,
    // }).toArray()
    //     .then((docs) => {
    //         // tslint:disable-next-line:no-console
    //         console.log(JSON.stringify(docs, undefined, 2));
    //     }).catch(error => {
    //         // tslint:disable-next-line:no-console
    //         console.log(error);
    //     });

    db.collection('Todos').find({
        completed: false,
    }).count()
        .then((docs) => {
            // tslint:disable-next-line:no-console
            console.log(JSON.stringify(docs, undefined, 2));
        }).catch(error => {
            // tslint:disable-next-line:no-console
            console.log(error);
        });

    client.close();
});