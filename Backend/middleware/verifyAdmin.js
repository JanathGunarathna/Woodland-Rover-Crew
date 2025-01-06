import jwt from 'jsonwebtoken';
import { Admin } from "../models/admin.model.js"


const verifyAdmin = async (req, res) => {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            return res.status(401).json({
                status: false,
                message: "Authorization token required"
            });
        }
        const token = authorization.split(" ")[1];
        const { AdminId } = jwt.verify(token, process.env.SECRET);
        const admin=await Admin.findByPk(AdminId);
        if (admin) {
            res.status(200).json({
                response_code: 200,
                message: "Authenticated successfully",
                status: true,})
        } else {
            res.status(401).json({
                status: false,
                message: "Admin not authenticated"
            });
        }
        
    } catch (error) {
        res.status(401).json({
            status: false,
            error: "Request is not authorized"
        });
    }
};

export default verifyAdmin;