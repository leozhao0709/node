import { MongoClient } from 'mongodb';

const url = 'mongodb://localhost:27017';
const dbName = 'TodoApp';

// MongoClient.connect(url, (err, client) => {
//     if (err) {
//         // tslint:disable-next-line:no-console
//         return console.log('Unable to connect to MongoDb server');
//     }

//     // tslint:disable-next-line:no-console
//     console.log(`connect to MongoDb server`);

//     const db = client.db(dbName);

//     db.collection('Todos').insertOne({
//         text: 'Something to do 1',
//         completed: false
//     }, (error, result) => {
//         if (err) {
//             // tslint:disable-next-line:no-console
//             return console.log(`unable to insert to do: ${error}`);
//         }

//         // tslint:disable-next-line:no-console
//         console.log(JSON.stringify(result.ops, undefined, 2));
//     });

//     client.close();
// });

MongoClient.connect(url)
    .then((client) => {
        // tslint:disable-next-line:no-console
        console.log(`connect to MongoDb server`);

        const db = client.db(dbName);

        db.collection('Todos').insertOne({
            text: 'Something to do 2',
            completed: false
        }).then(res => {
            // tslint:disable-next-line:no-console
            console.log(JSON.stringify(res.ops, undefined, 2));
        }).catch(err => {
            // tslint:disable-next-line:no-console
            console.log(`unable to insert to do: ${err}`);
        });

        client.close();
    })
    .catch((err) => {
        // tslint:disable-next-line:no-console
        console.log(err);
    });