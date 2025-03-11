import { Street } from "../types/streets.type";

export class StreetUtil {
    
    static convertCsvRecordToStreetType(csvRecord:{}):Street{
        const headers = ['שם ראשי', 'תואר', 'שם מישני', 'קבוצה','קבוצה נוספת','סוג','קוד','שכונה'];

        const obj:Street ={
            id:csvRecord['id'],
            mainName:csvRecord[headers[0]],
            title:csvRecord[headers[1]],
            secondaryName:csvRecord[headers[2]],
            group:csvRecord[headers[3]],
            anotherGroup:csvRecord[headers[4]],
            placeType:csvRecord[headers[5]],
            code:csvRecord[headers[6]],
            neighborhood:csvRecord[headers[7]],
            isActive:true
        }
        return  obj;

    }
}