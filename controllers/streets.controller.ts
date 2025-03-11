import express from 'express';
import { IElasticSearchService } from '../interfaces/ielasticesearch';
 export class StreetsController{
    /**
     *
     */
    constructor(private service:IElasticSearchService) {
        
        
    }

    async get(req: express.Request, res: express.Response){
        const client = this.service.getClient()
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
    put(){

    }
    delete(){
        
    }

}
