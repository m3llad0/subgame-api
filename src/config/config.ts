import { 
  DB_NAME, 
  DB_USER, 
  DB_PASSWORD, 
  DB_HOST,
  DB_NAME_TEST,
  DB_USER_TEST,
  DB_PASSWORD_TEST,
  DB_HOST_TEST,
  DB_NAME_PROD,
  DB_USER_PROD,
  DB_HOST_PROD,
  DB_PASSWORD_PROD } from ".";
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
    "username": DB_USER_PROD,
    "password": DB_PASSWORD_PROD,
    "database": DB_NAME_PROD,
    "host": DB_HOST_PROD,
    "dialect": "mysql"
  }
}