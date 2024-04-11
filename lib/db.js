import { MongoClient } from 'mongodb'

export async function connectToDatabase() {
  const client = await MongoClient.connect(
    'mongodb+srv://garsinaanna32778:dBUv8804eZ5aRyVH@cluster0.h1shzi1.mongodb.net/?retryWrites=true&w=majority&appName=events-app'
  )

  return client
}
// dBUv8804eZ5aRyVH
