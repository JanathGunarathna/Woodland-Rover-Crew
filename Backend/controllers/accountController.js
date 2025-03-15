import * as accountService from "../services/accountService.js";

const createAccount = async (req, res) => {
    try {        
        const {name,email,password,role,address,roverRegistrationNumber,idNumber,crewOrSchool  } = req.body;
            const result = await accountService.createAccount( name,email,password,role,address,roverRegistrationNumber,idNumber,crewOrSchool);
            if(result.status){
                return res.status(201).json({result: result, status: true});    
            }else{
                return res.status(500).json({message: "Internal server error", status: false});
            }
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error"});
    }
};


const getAllAccount = async (req, res) => {
    try {
        const result = await accountService.getAllAccount();
        if(result.status){
            return res.status(200).send(result);
        }else{
            return res.status(404).send({message: "No Account found", status: false});
        }
    } catch (error) {
        return res.status(500).send({message: "Account fetch failed", status: false});
    }
};

const getAccountById = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await accountService.getAccountById(id);
        if(result.status){
            return res.status(200).json({
                response_code: 200,
                result
            });
        }else if (result.status == false){
            return res.status(404).json(result);
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Account fetch failed", status: false});
    }
};

const updateAccount = async (req, res) => {
    if(!req.params.id){
        return res.status(400).json({message: "Account id not found", status: false});
    }
    const {name,email,password,role,address,roverRegistrationNumber,idNumber,crewOrSchool } = req.body;
    if(!name || !email || !password || !role || !address || !roverRegistrationNumber || !idNumber || !crewOrSchool){
        return res.status(400).json({message: "Account data not found", status: false});
    }
    const id = req.params.id;
    const dataToUpdate = [name,email,password,role,address,roverRegistrationNumber,idNumber,crewOrSchool,id];
    try {
        const result = await accountService.updateAccount(dataToUpdate);
        if(result.status){
            return res.status(200).json({result: result, status: true});
        }else{
            return res.status(500).json({message: "Internal server error", status: false});
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Internal server error"});
    }
};

const deleteAccount = async (req, res) => {
    if(!req.params.id){
        return res.status(400).json({message: "Account id not found", status: false});
    }
    const id = req.params.id;
    try {
        const result = await accountService.deleteAccount(id);
        if(result.status){
            return res.status(200).json({message: "Account deleted", status: true});
        }else{
            return res.status(500).json({message: "Account delete failed", status: false});
        }
    } catch (error) {
        return res.status(500).json({message: "Internal server error"});
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await accountService.login(email, password);
        
        if (result.status) {
            return res.status(200).json({
                status: true,
                message: "Login successful",
                data: result.data
            });
        } else {
            return res.status(401).json({
                status: false,
                message: result.message
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            status: false
        });
    }
};

export default {
    createAccount,
    getAllAccount,
    getAccountById,
    updateAccount,
    deleteAccount,
    login   
};