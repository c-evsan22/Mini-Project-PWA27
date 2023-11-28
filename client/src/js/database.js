// TODO: Install the following package:
import { openDB } from 'idb';

// TODO: Complete the initDb() function below:
const initdb = async () => 
    openDB('Mini Project', 1, {
        upgrade(db) {
          if (db.objectStoreNames.contains('Mini Project')) {
            console.log('Mini Project database already exists');
            return;
          }
          db.createObjectStore('Mini Project', { keyPath: 'id', autoIncrement: true });
          console.log('Mini Project database created');
        },
});


// TODO: Complete the postDb() function below:
export const postDb = async (name, home, cell, email)  => {
    console.log('Post to the ase');
    const todosDb = await openDB('Mini Project', 1);
    const tx = todosDb.transaction('Mini Project', 'readwrite');
    const store = tx.objectStore('Mini Project');
    const request = store.add({ name: name, home: home_phone, cell: cell_phone, email: email, });
    const result = await request;
    console.log('Data saved to the database', result);
};

// TODO: Complete the getDb() function below:
export const getDb = async () => {
    console.log('GET from the database');
    const todosDb = await openDB('Mini Project', 1);
    const tx = todosDb.transaction('Mini Project', 'readonly');
    const store = tx.objectStore('Mini Project');
    const request = store.get();
    const result = await request;
    console.log('result.value', result);
    return result;
};

// TODO: Complete the deleteDb() function below:
export const deleteDb = async (id) => {
    console.log('DELETE from the database', id);
    const todosDb = await openDB('Mini Project', 1);
    const tx = todosDb.transaction('Mini Project', 'readwrite');
    const store = tx.objectStore('Mini Project');
    const request = store.delete(id);
    const result = await request;
    console.log('result.value', result);
    return result;
};

initdb();
