const middleware = {}

middleware['guest'] = require('..\\middleware\\guest.js')
middleware['guest'] = middleware['guest'].default || middleware['guest']

middleware['realEstateId'] = require('..\\middleware\\realEstateId.js')
middleware['realEstateId'] = middleware['realEstateId'].default || middleware['realEstateId']

export default middleware
