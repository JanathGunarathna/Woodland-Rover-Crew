import jwt from "jsonwebtoken";

export const createToken = async (id, email, role) => {
  try {
  
    const accessToken = await jwt.sign(
      { id: id, email: email, role: role },
      "JWT_SECRET",
      { expiresIn: "30d" }
    );
   
    return accessToken;
  } catch (error) {
   
    throw error;
  }
};

export const ValidateAdmin = async (req, res, next) => {
  const authToken = req.headers.authorization;

  if (!authToken) {
    res.status(401).json({ status: false, message: "Aadmin access requirred" });
    return;
  }
  const accessToken = authToken.replace("Bearer ", "");
  jwt.verify(accessToken, "JWT_SECRET", (error, decoded) => {
    if (error) {
      console.log("vinuka navod :", accessToken);
      res.status(401).json({ status: false, message: error.message });
      return;
    }

    if (decoded.role !== "admin") {
      res.status(403).json({ status: false, message: "Access denied!" });
      return;
    }

    next();
  });
};

export const ValidateSuperAdmin = async (req,res,next)=> {
    const authToken =req.headers.authorization;
    if(!authToken){
        res.status(401).json({ status: false, message: "super admin access requirred" });
        return;
    }
    const accessToken = authToken.replace("Bearer ", "");
    jwt.verify(accessToken, "JWT_SECRET", (error, decoded) => {
      if (error) {
        console.log("vinuka navod :", accessToken);
        res.status(401).json({ status: false, message: error.message });
        return;
      }
  
      if (decoded.role !== "super admin") {
        res.status(403).json({ status: false, message: "Access denied!" });
        return;
      }
  
      next();
    });
}


