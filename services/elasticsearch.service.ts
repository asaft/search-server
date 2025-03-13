import { Client } from "@elastic/elasticsearch";
import { IElasticSearchService } from "../interfaces/ielasticesearch";
const fs = require('fs');

export class ElasticsearchService implements IElasticSearchService{
   client = this.getClient()
    async insert (item:any,id:string,index:string = "streets"){
     
          await this.client.index({
              index,
              id: id,
              document:item,
            })
     

    }
    
    
    getClient ():Client {
        const client = new Client({
            node: 'http://localhost:9200', // Replace with your Elasticsearch node URL
          
            auth: {
              username: 'elastic', // Replace with your Elasticsearch username
              password: 'your password', // Replace with your Elasticsearch password
            }
            
          })
          return client;
    }
}

