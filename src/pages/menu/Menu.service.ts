import type {MenuProps} from "./Menu.types.ts";
import type {ApiClient} from "../../_utils/common/model/api.ts";

export class MenuService {
    private readonly api: ApiClient;

    constructor(api: ApiClient) {
        this.api = api;
    }

    // example GET
    getAll() {
        return this.api.get<MenuProps[]>('/menu');
    }

    // example POST
    create(data: MenuProps) {
        return this.api.post<MenuProps, MenuProps>('/menu', data);
    }
}
