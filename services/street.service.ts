

import { default as Client } from "@elastic/elasticsearch";
import { IElasticSearchService } from "../interfaces/ielasticesearch";
import { Street } from "../types/streets.type";

export class StreetService {
    /**
     *
     */
    index = "streets";
    constructor(private elasticService:IElasticSearchService) {
      
        
    }
    async getById(id){
        const client = this.elasticService.getClient()
        const res =  await client.get({
        index:this.index,
        id: id.toString()
      })
      return res._source
    }
    async insert(item:Street){
        item.isActive = true;
        await this.elasticService.insert(item,item.id.toString(),this.index)
    }
    async bulkInsert(items:Street[]){
        for(let i = 0; i < items.length; i++){
            await this.insert(items[i])
        }
    }
    async searchByField(field:string,term:string){
       const client =  this.elasticService.getClient();
       let obj:any = {};
        obj[field] = term;
        const res3 = await client.search({
            "from" : 0, "size" : 6,
           index:this.index,
              query: {
                match: obj
              }
            })
            return res3.hits.hits as any[];
    }
    async searchByAllFields(term:string){
        const client =  this.elasticService.getClient()
         const results = await client.search({
            index:this.index,
             "from" : 0, "size" : 6,
               query: {
                 match: { "_all": term }
               }
             })
     }
     async update(item:Street){
        const client =  this.elasticService.getClient()
        await client.update({
          index:this.index,
          id: item.id.toString(),
          doc: item
        })
      }
    
  async delete(item:any){
      item.isActive = false;
      const client =  this.elasticService.getClient()
      await client.update({
        index:this.index,
        id: item.id.toString(),
        doc: item
      })
    }

}