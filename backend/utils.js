const jwt= require( 'jsonwebtoken');
const TeamLeader = require('./model/teamLeaderModel'); // Adjust the path to your model file

const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isTeamLeader:user.isTeamLeader,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '30d',
    }
  );
};

const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
    // console.log(token);
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        res.status(401).send({ message: 'Invalid Token' });
      } else {
        req.user = decode;
        next();
      }
    });
  } else {
    res.status(401).send({ message: 'No Token' });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: 'Invalid Admin Token' });
  }
};


// Define a middleware function to access the isTeamLeader property
const accessIsTeamLeader = (req, res, next) => {
  if (req.user && req.user.isTeamLeader) {
    next();
  } else {
    return res.status(403).json({ message: 'Access denied. Not a team leader.' });
  }
};

// module.exports = accessIsTeamLeader;
// accessIsTeamLeader();

module.exports = {
  generateToken,
  isAuth,
  isAdmin,
  accessIsTeamLeader
};
