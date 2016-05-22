
exports.handleVerify = function(req, res, next){
  console.log('je suis passe dans handleVerify!!');
  if (req.query['hub.verify_token'] === conf.VERIFY_TOKEN) {
    console.log('handleVerify success!!');
    return res.send(req.query['hub.challenge']);
  }
  console.log('handleVerify fail!!');
  res.send('Validation failed, Verify token mismatch');
}