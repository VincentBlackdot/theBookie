import { MongoClient } from 'mongodb';
import * as bcrypt from 'bcrypt';

async function createAdmin() {
  const uri = 'mongodb+srv://vincentsiame71596:emurn1omEc8UP7bz@cluster0.b1ao9.mongodb.net/myDatabaseName';
  const client = await MongoClient.connect(uri);
  const db = client.db('myDatabaseName');

  const adminEmail = 'admin@thebookie.com';
  const adminPassword = 'admin123'; // Change this to a secure password
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  try {
    await db.collection('users').insertOne({
      email: adminEmail,
      password: hashedPassword,
      role: 'admin',
      createdAt: new Date(),
    });
    console.log('Admin user created successfully!');
    console.log('Email:', adminEmail);
    console.log('Password:', adminPassword);
  } catch (error) {
    if (error.code === 11000) {
      console.log('Admin user already exists!');
    } else {
      console.error('Error creating admin:', error);
    }
  } finally {
    await client.close();
  }
}

createAdmin();
