import * as SQLite from 'expo-sqlite';

let databaseInstance: SQLite.SQLiteDatabase | null = null;

export const getDatabase = (): SQLite.SQLiteDatabase => {
  if (!databaseInstance) {
    databaseInstance = SQLite.openDatabaseSync('photoflow.db');
  }
  return databaseInstance;
};