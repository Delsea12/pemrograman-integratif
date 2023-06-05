// membuat koneksi ke server gRPC dan memanggil metode-metode yang didefinisikan
// membuat koneksi dan membuat file dari proto
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync('./example.proto');
const grpcObject = grpc.loadPackageDefinition(packageDefinition);
const client = new grpcObject.mypackage.DataService('localhost:50051', grpc.credentials.createInsecure());

function createData() {
  const data = {
    id: '4',
    name: 'nara',
  };
  client.CreateData(data, (error, response) => {
    if (error) {
      console.error(error);
    } else {
      console.log(response);
    }
  });
}

function readData() {
  const id = '2';
  const request = { id: id };
  client.ReadData(request, (error, response) => {
    if (error) {
      console.error(error);
    } else {
      console.log(response);
    }
  });
}

function updateData() {
  const data = {
    id: '2',
    name: 'Del',
  };
  client.UpdateData(data, (error, response) => {
    if (error) {
      console.error(error);
    } else {
      console.log(response);
    }
  });
}

function deleteData() {
  const id = '3';
  const request = { id: id };
  client.DeleteData(request, (error, response) => {
    if (error) {
      console.error(error);
    } else {
      console.log(response);
    }
  });
}

// createData();
// readData();
updateData();
// deleteData();