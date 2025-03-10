const { Client,HttpConnection } = require('@elastic/elasticsearch');
const fs = require('fs');;

export function getClient(){
const client = new Client({
  node: 'http://localhost:9200', // Replace with your Elasticsearch node URL

  auth: {
    username: 'elastic', // Replace with your Elasticsearch username
    password: 'hKAwRJ7lg+*apliXUEm9', // Replace with your Elasticsearch password
  }, tls: {
    ca: fs.readFileSync(__dirname+ '/localhost-cert.pem'),
    // For development purposes only; not recommended for production
    rejectUnauthorized: false,
  },
  
})
return client;
}
