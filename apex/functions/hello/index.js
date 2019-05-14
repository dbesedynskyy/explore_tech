exports.handle = function(e, ctx, cb) {
  const response = {
    statusCode: 200,
    body: JSON.stringify('Hello ExploreTech Toronto from AWS Lambda!'),
};
    cb(null, response);
}
