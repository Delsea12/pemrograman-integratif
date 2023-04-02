const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const firebase = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

const packageDefinition = protoLoader.loadSync('./example.proto');
const grpcObject = grpc.loadPackageDefinition(packageDefinition);
const service = grpcObject.mypackage.DataService;

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
});

const db = firebase.firestore();

async function createData(call, callback) {
  const data = call.request;
  const docRef = db.collection('data').doc(data.id);
  try {
    await docRef.set(data);
    callback(null, data);
  } catch (error) {
    callback(error, null);
  }
}

async function readData(call, callback) {
  const id = call.request.id;
  const docRef = db.collection('data').doc(id);
  try {
    const doc = await docRef.get();
    if (doc.exists) {
      callback(null, doc.data());
    } else {
      const error = new Error('Data not found');
      callback(error, null);
    }
  } catch (error) {
    callback(error, null);
  }
}

async function updateData(call, callback) {
  const data = call.request;
  const docRef = db.collection('data').doc(data.id);
  try {
    await docRef.update(data);
    callback(null, data);
  } catch (error) {
    callback(error, null);
  }
}

async function deleteData(call, callback) {
  const id = call.request.id;
  const docRef = db.collection('data').doc(id);
  try {
    await docRef.delete();
    callback(null, { id: id });
  } catch (error) {
    callback(error, null);
  }
}

function main() {
  const server = new grpc.Server();
  server.addService(service.service, {
    CreateData: createData,
    ReadData: readData,
    UpdateData: updateData,
    DeleteData: deleteData,
  });
  server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err != null) {
      console.error(err);
      return;
    }
    console.log(`Server running on port ${port}`);
    server.start();
  });
}

main();
