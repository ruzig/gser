import PouchDB from 'pouchdb';

var gserDB = new PouchDB('gser');

export const getDB = () => gserDB;

