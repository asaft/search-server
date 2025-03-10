import { Client } from "@elastic/elasticsearch";


export interface IElasticSearchService{
    getClient:()=>Client
}