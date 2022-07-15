'use strict';

import dotenv from 'dotenv';
import app from './app/app.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {  // initialize server
    console.log(`I am up and running at http://localhost:${PORT}`);
});
