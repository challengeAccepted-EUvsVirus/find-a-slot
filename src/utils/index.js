/* eslint-disable */

// for backend
export const backendUrl = 
  process.env.NODE_ENV == 'production'
    ? 'CHANGE_ME/prediction/'
    : 'http://127.0.0.1:5000/prediction/'
