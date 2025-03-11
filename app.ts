import * as fs from "fs";
import * as path from "path";
import { parse } from 'csv-parse';
import express from 'express';
import { CsvService } from "./services/csv.service";

import streetsRoutes from './routes/streets.routes';


const app = express();
const port = 3000;

global.rootPath = __dirname;

// Middleware
app.use(express.json());

// Routes
app.use('/streets', streetsRoutes);

initApp();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

function initApp(){
  const csvService:CsvService = new CsvService()
  const res:any = csvService.foo()
  res.then((reults)=>{
    debugger
  })
}

import { getClient } from "./database/client";




// (async () => {
//     // const client = getClient()
//     // await client.index({
//     //     index: 'my_index',
//     //     id: 'my_document_id',
//     //     document: {
//     //       foo: 'foo',
//     //       bar: 'bar',
//     //     },
//     //   })
//     //  const res =  await client.get({
//     //     index: 'my_index',
//     //     id: 'my_document_id',
//     //   })
//   const csvFilePath = path.resolve(__dirname, 'files/streets.csv');

//   const headers = ['שם ראשי', 'תואר', 'שם מישני', 'קבוצה','קבוצה נוספת','סוג','קוד','שכונה'];

//   const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });

//   parse(fileContent, {
//     delimiter: ',',
//     columns: headers,
//   }, (error, result: WorldCity[]) => {
//     if (error) {
//       console.error(error);
//     }

//     console.log("Result", result);
//   });
// })();