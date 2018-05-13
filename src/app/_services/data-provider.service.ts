import { Injectable } from "@angular/core";
import { User } from "../_models";
import { UserService } from "./user.service";


@Injectable()
export class DataProviderService {

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