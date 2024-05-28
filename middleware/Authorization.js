// const jwt = require('jsonwebtoken');

// const authenticateToken = (req, res, next) => {
//     const { token } = req.headers;
//     if (!token) {
//         return res.status(401).json({ error: "Unauthorized: No token provided" });
//     }

//     jwt.verify(token, process.env.KEY, (err, decoded) => {
//         if (err) {
//             console.error(err); 
//             return res.status(403).json({ error: "Unauthorized: Invalid token" });
//         }
//         req.user = decoded; // Assuming the token contains user information
//         next();
//     });
// };

// module.exports = { authenticateToken };



const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return res.status(401).json({ error: res.__("authenticate.noToken") });
    }

    jwt.verify(token, process.env.KEY, (err, decoded) => {
        if (err) {
            console.error(err);
            return res.status(403).json({ error: res.__("authenticate.invalid") });
        }
        req.user = decoded; // Assuming the token contains user information

        // Check if the decoded token has an admin role
        if (decoded.Role  === 'admin') {
  
            next();
        } else {
            return res.status(403).json({ error: res.__('authenticate.notadmin') });
        }
    });
};

module.exports = { authenticateToken };
