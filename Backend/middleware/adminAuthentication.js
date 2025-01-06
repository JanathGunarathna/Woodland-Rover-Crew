import jwt from 'jsonwebtoken';
import  {Admin}  from "../models/admin.model.js";


const adminAuthentication = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }
  const token = authorization.split(" ")[1];
  try {
    const { AdminId } = jwt.verify(token, process.env.SECRET);
    req.AdminId = await Admin.findByPk(AdminId);
    next();
  } catch (error) {
    res.status(401).json({ error: "Request is not authorized" });
  }
};

export default adminAuthentication;