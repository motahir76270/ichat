const mongoose = require('mongoose');
const dotenv =require('dotenv');

dotenv.config();

const db_url = process.env.Mongodb_url;

async function main() {
   mongoose.connect(db_url)
    // mongoose.connect('mongodb:127.0.0.1:27017/iChat')

}


