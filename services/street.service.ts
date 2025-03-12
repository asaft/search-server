

import { default as Client } from "@elastic/elasticsearch";
import { IElasticSearchService } from "../interfaces/ielasticesearch";
import { Street } from "../types/streets.type";

export class StreetService {
    /**
     *
     */
    index = "streets";
    All_FIELDS_SEARCH_ONE_WORD = 2;
    All_FIELDS_SEARCH = 3;
    constructor(private elasticService:IElasticSearchService) {
      
        
    }
    async getById(id){
        const client = this.elasticService.getClient()
        const res =  await client.get({
        index:this.index,
        id: id.toString()
      })
      return res
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
    async searchByMainNameField(term:string){
       const client =  this.elasticService.getClient();
      
        const res = await client.search({
            "from" : 0, "size" : 6,
           index:this.index,
              "query": {
             "bool": {
                  "must": [
                    {
                      "match": {
                        "mainName": term
                      }
                    },
                    {
                      "match": {
                        "isActive": true
                      }
                    }
                  ]
                }
              }
            })
            return res.hits.hits as any[];
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
     async searchAllFields(val:string,searchType:number){
      {

        const client =  this.elasticService.getClient();
        let query;
        if(searchType === this.All_FIELDS_SEARCH_ONE_WORD){
           query = this.getAllFieldsContainsQuery(val) 
        }else{
           query = this.getAllFieldsMatch(val) 
        }
        
        const results = await client.search({
          index:this.index,
           "from" : 0, "size" : 6,
           "query": query
        })
           return results.hits.hits as any[];
        
      }
     }
     async update(item:Street){
        const client =  this.elasticService.getClient()
        await client.update({
          index:this.index,
          id: item.id.toString(),
          doc: item
        })
      }
   getAllFieldsMatch(val){
    return {
      "bool": {
        "must": [
          {
            "multi_match": {
              "query": val,
              "type": "best_fields",
              "fields": ["*"]
            }
          },
          {
            "match": {
              "isActive": true
            }
          }
        ]
      }
    }
  
   }   
   getAllFieldsContainsQuery(val):object{
    return {
      "bool": {
        "must": [
          {
            "multi_match": {
              "query": val,
              "type": "phrase",
              "fields": ["*"]
            }
          },
          {
            "match": {
              "isActive": true
            }
          }
        ]
      }
    }
   } 
  async delete(item:any){
      item.isActive = false;
      const client =  this.elasticService.getClient();
      try{
      await client.update({
        index:this.index,
        id: item.id.toString(),
        doc: item
      })
    }catch(e){
      return false
    }
      return true;
    }

}