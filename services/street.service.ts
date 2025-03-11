import { IElasticSearchService } from "../interfaces/ielasticesearch";
import { Street } from "../types/streets.type";

export class StreetService {
    /**
     *
     */
    constructor(private elasticService:IElasticSearchService) {
      
        
    }
    async insert(item:Street){
        item.isActive = true;
        await this.elasticService.insert(item)
    }
    async bulkInsert(items:Street[]){
        for(let i = 0; i < items.length; i++){
            await this.insert(items[0])
        }
    }
    delete(){}

}