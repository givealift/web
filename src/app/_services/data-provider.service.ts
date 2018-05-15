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

    storeUserData(id: number, userData: User) {
        this.dataMap.set('user/' + id, userData);
    }

    getUserData(id: number) {
        if (this.dataMap.has('user/' + id))
            return this.dataMap.get('user/' + id);
        else return null;
    }

    taggedResults(fromCityId: number | string, toCityId: number | string, date: string) {
        return `${fromCityId}:${toCityId}:${date}`
    }
}