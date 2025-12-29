import { Sequelize } from "sequelize";
import databaseConfig from "../config/database.cjs";

import Customer from "../app/models/Customer.js";

const models = [Customer];

class Database {
    constructor() {
        this.connection = new Sequelize(databaseConfig);
        this.init();
    }

    init() {
        models.forEach(model => model.init(this.connection));
    }
}

export default new Database();