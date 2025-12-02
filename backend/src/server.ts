import app from './app.js';
import { PORT } from './config/env.js';
import { testConnection } from './config/database.js';
import { syncDatabase } from './models/index.js';

const startServer = async () => {
    await syncDatabase();
    app.listen(PORT, () => {
        console.log('Server is running on port', PORT);
    });
}

startServer();