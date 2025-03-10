//NOTE - конфигурация для jwt-токенов

module.exports = {
  //* конфиг для кратковременного токена
  access: {
    expiresIn: 1000 * 60 * 3, //? время жизни
  },

  //* конфиг для долгоживущего токена
  refresh: {
    expiresIn: 1000 * 60 * 60 * 24, //? время жизни
  },
};
