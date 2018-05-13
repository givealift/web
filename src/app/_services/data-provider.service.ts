import { Injectable } from "@angular/core";
import { User } from "../_models";
import { UserService } from "./user.service";


@Injectable()
export class DataProviderService {

    private dataMap: Map<string, any> = new Map();

    storeData(key: string, data: any) {
        this.dataMap.set(key, data);
    }

    getData(key: string) {
        if (this.dataMap.has(key))
            return this.dataMap.get(key);

        else return null;
    }
}