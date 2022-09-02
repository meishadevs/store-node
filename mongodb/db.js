import mongoose from 'mongoose';
import config from 'config-lite';

console.log("config:", config);

mongoose.connect(config.url);