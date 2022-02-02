const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const dbName = 'bowl';

async function main() {
  await client.connect();
  try {
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('city');

    const insertResult = await collection.insertOne({
      ID: 4080,
      Name: 'Malatia',
      CountryCode: 'MLY',
      District: 'Malatia',
      Population: 900000,
    });
    console.log('Inserted city values into city collection =>', insertResult);

    const updateResult = await collection.updateOne(
      { ID: 4080 },
      { $set: { Population: 950000 } },
    );
    console.log('Updated city population value =>', updateResult);

    const findResult = await collection.find({ Name: 'Malatia' }).toArray();
    console.log('Found city by city name =>', findResult);
    const findResult2 = await collection.find({ CountryCode: 'MLY' }).toArray();
    console.log('Found city by country code =>', findResult2);

    const deleteResult = await collection.deleteMany({ ID: 4080 });
    console.log('Deleted city collection =>', deleteResult);
  } catch (error) {
    if (error) {
      console.error(error);
      await client.close();
    }
  }
  await client.close();
}

main();
