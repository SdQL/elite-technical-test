import sequelize from "../config/database";
import User from "./User";

export const syncDatabase = async () => {
    try {
        await sequelize.sync({ force: false });
        console.log("All models were synchronized successfully.");
    } catch (error) {
        console.error("Error synchronizing models:", error);
    }
}

export { User}