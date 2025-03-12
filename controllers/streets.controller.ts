import express from 'express';
import { IElasticSearchService } from '../interfaces/ielasticesearch';
import { StreetService } from '../services/street.service';
import { StreetUtil } from '../utils/street.util';
import { Street } from '../types/streets.type';
 export class StreetsController{
    /**
     *
     */
    constructor(private service:StreetService) {
        
        
    }

    async getById(req: express.Request, res: express.Response){
      const id = req.params.id
      const result = await this.service.getById(id);
     
      res.send(result._source)
    }
    async getByQuery(req: express.Request, res: express.Response){
      const results = await this.service.searchByField('neighborhood','ב')
      const streets = StreetUtil.convertQueryResults(results)
      res.send(streets)
    }
    async get(req: express.Request, res: express.Response){
     //   const client = this.service.getClient()
      //      await client.index({
      //   index: 'my_index',
      //   id: 'my_document_id2',
      //   document: {
      //     foo: 'foo',
      //     bar: 'bar',
      //   },
      // })
    //  const res2 =  await client.get({
    //     index: 'my_index',
    //     id: 'my_document_id2',
    //   })
      // const res3 = await client.search({
      //   query: {
      //     match: {
      //       foo: 'foo'
      //     }
      //   }
      // })
        res.status(201).send({result:"success"})
    }
    post(){

    }
    put(req: express.Request, res: express.Response){
     const street =  req.body as Street
      this.service.update(street)
    }
    async delete(req: express.Request, res: express.Response){
        const id = req.params.id;
        const item = await this.service.getById(id)
        this.service.delete(item)
    }

}
