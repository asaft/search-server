

import { IElasticSearchService } from "../interfaces/ielasticesearch";
import { Street } from "../types/streets.type";

export class StreetService {
    /**
     *
     */
    index = "streets";
    constructor(private elasticService:IElasticSearchService) {
      
        
    }
    async getById(){
        const client = this.elasticService.getClient()
        const res2 =  await client.get({
        index:this.index,
        id: '1',
      })
    }
    async insert(item:Street){
        item.isActive = true;
        await this.elasticService.insert(item,item.id.toString(),this.index)
    }
    async bulkInsert(items:Street[]){
        for(let i = 0; i < items.length; i++){
            await this.insert(items[0])
        }
    }
    async foo(field:string,term:string){
       const client =  this.elasticService.getClient();
       const obj = {field,term}
        const res3 = await client.search({
              query: {
                match: obj
              }
            })
    }
    async searchByAllFields(term:string){
        const client =  this.elasticService.getClient()
         const results = await client.search({
             "from" : 0, "size" : 6,
               query: {
                 match: { "_all": term }
               }
             })
     }
    delete(){}

}