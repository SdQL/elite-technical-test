import sequelize from "../config/database.js";
import User from "./User.js";

export const syncDatabase = async () => {
    try {
        await sequelize.sync({ force: false });
        console.log("All models were synchronized successfully.");
    } catch (error) {
        console.error("Error synchronizing models:", error);
    }
}

export { User}