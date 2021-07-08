module.exports.controllerHandler = (promise, ...options) => async (req, res, next) => {
  console.log("debut");
  const status = (options && typeof options[0] === 'number' && options[0]) || 200;
  const paramFn =
    (options && typeof options[0] === 'function' && options[0]) ||
    (options && typeof options[1] === 'function' && options[1]);

  try {
    const boundParams = paramFn ? paramFn(req, res, next) : [];
    
    const result = await promise(...boundParams);

    const TRANSACTION_ID = 'transactionId';

    if (result) {
      const transactionResult = { payload: result };
      const transactionId = req.query[TRANSACTION_ID];
      if (transactionId !== undefined) transactionResult[TRANSACTION_ID] = transactionId;
      return res.status(status).json(transactionResult);
    }
    return res.sendStatus(status);
  } catch (error) {
    return next(error);
  }
};

module.exports.formatResponse = (data, filters) => {
  return { data, filters };
};
