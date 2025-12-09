import * as SQLite from 'expo-sqlite';
import { CREATE_MOVIES_TABLE } from './schema';

let db: SQLite.SQLiteDatabase | null = null;

export const initDatabase = async () => {
  try {
    db = await SQLite.openDatabaseAsync('movietracker.db');
    await db.execAsync(CREATE_MOVIES_TABLE);
    console.log('Database initialized');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

export const getDatabase = (): SQLite.SQLiteDatabase => {
  if (!db) {
    throw new Error('Database not initialized');
  }
  return db;
};