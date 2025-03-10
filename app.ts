import * as fs from "fs";
import * as path from "path";
import { parse } from 'csv-parse';
import { getClient } from "./database/client";

type WorldCity = {
  name: string;
  country: string;
  subCountry: string;
  geoNameId: number;
};

(async () => {
    const client = getClient()
    await client.index({
        index: 'my_index',
        id: 'my_document_id',
        document: {
          foo: 'foo',
          bar: 'bar',
        },
      })
     const res =  await client.get({
        index: 'my_index',
        id: 'my_document_id',
      })
  const csvFilePath = path.resolve(__dirname, 'files/world-streets.csv');

  const headers = ['שם ראשי', 'תואר', 'שם מישני', 'קבוצה','','','',''];

  const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });

  parse(fileContent, {
    delimiter: ',',
    columns: headers,
  }, (error, result: WorldCity[]) => {
    if (error) {
      console.error(error);
    }

    console.log("Result", result);
  });
})();