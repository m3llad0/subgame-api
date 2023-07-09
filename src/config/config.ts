import { 
  DB_NAME, 
  DB_USER, 
  DB_PASSWORD, 
  DB_HOST,
  DB_NAME_TEST,
  DB_USER_TEST,
  DB_PASSWORD_TEST,
  DB_HOST_TEST } from ".";
export default {
  "development": {
    "username": DB_USER,
    "password": DB_PASSWORD,
    "database": DB_NAME,
    "host": DB_HOST,
    "dialect": "mysql"
  },
  "test": {
    "username": DB_USER_TEST,
    "password": DB_PASSWORD_TEST,
    "database": DB_NAME_TEST,
    "host": DB_HOST_TEST,
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}