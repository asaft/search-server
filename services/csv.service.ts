import * as fs from "fs";
import * as path from "path";
import { parse } from 'csv-parse';
import { ElasticsearchService } from "./elasticsearch.service";
import { IElasticSearchService } from "../interfaces/ielasticesearch";
import { StreetService } from "./street.service";

export class CsvService {

    foo(){

        const headers = ['שם ראשי', 'תואר', 'שם מישני', 'קבוצה','קבוצה נוספת','סוג','קוד','שכונה'];
        const csvFilePath = path.resolve(global.rootPath, 'files/streets.csv');
  const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });

  return new Promise(function(resolve,reject){
    parse(fileContent, {
      delimiter: ',',
      columns: headers,
    }, async (error, result: any[]) => {
      const elastic:IElasticSearchService = new ElasticsearchService()
      const service = new StreetService(elastic);
      result.shift();
      for(let i =0;i < result.length;i++){
        result[i].id = i +1;
          //await service.insert(result[i])
      }
      
      if (error) {
        reject(error)
      }
  
      resolve(result);
    });
  })  
    }
}