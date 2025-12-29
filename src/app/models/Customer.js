import Sequelize, { Model } from "sequelize";

class Customer extends Model {
    static init(sequelize) {
        super.init({
            name: Sequelize.STRING,
            email: Sequelize.STRING,
        },
        {
            sequelize,
            tableName: 'customers',
            timestamps: false,
        }
    );
    }
}

export default Customer;