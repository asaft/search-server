import { Client } from "@elastic/elasticsearch";


export interface IElasticSearchService{
    getClient:()=>Client
    insert:(item:any)=>void
}