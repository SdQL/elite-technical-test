import app from './app';
import { PORT } from './config/env';
import { testConnection } from './config/database';
import { syncDatabase } from './models/index';

const startServer = async () => {
    await syncDatabase();
    app.listen(PORT, () => {
        console.log('Server is running on port', PORT);
    });
}

startServer();