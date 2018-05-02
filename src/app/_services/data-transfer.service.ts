import { Injectable } from "@angular/core";


@Injectable()
export class DataTransferService {

    private dataMap: Map<String, any> = new Map();

    storeData(key: String, data: any) {
        this.dataMap.set(key, data);
    }

    getData(key: String) {
        if (this.dataMap.has(key))
            return this.dataMap.get(key);
        else return null;
    }


}