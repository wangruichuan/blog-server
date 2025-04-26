const response = {
  success: (data = null, msg = '') => ({
    code: 0,
    msg,
    data
  }),
  
  error: (msg = '', code = -1) => ({
    code,
    msg,
    data: null
  })
};

module.exports = response;