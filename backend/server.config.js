const fs = require('fs');

module.exports = {
  get jwtToken() {
    return Buffer.from(fs.readFileSync('/run/secrets/jwt.key'), 'hex');
  },
  port: 7778,
  db: {
    name: 'products',
    host: 'db',
    port: 27017,
  },
};
