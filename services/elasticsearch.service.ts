import { Client } from "@elastic/elasticsearch";
import { IElasticSearchService } from "../interfaces/ielasticesearch";
const fs = require('fs');

export class ElasticsearchService implements IElasticSearchService{
   client = this.getClient()
    async insert (item:any){
      await this.client.index({
        index: 'streets',
        body: item
      })

    }
    getClient ():Client {
        const client = new Client({
            node: 'http://localhost:9200', // Replace with your Elasticsearch node URL
          
            auth: {
              username: 'elastic', // Replace with your Elasticsearch username
              password: 'asafme14', // Replace with your Elasticsearch password
            }, tls: {
              ca: fs.readFileSync(__dirname+ '/ca.crt'),
              // For development purposes only; not recommended for production
              rejectUnauthorized: false,
            },
            
          })
          return client;
    }
}

