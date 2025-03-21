import * as accountRepo from '../repositories/accountRepo.js';


export const createAccount = async (name,email,password,role,address,roverRegistrationNumber,idNumber,crewOrSchool) => {
    try {
        const result = await accountRepo.createAccount(name,email,password,role,address,roverRegistrationNumber,idNumber,crewOrSchool);
        if (result == null){
            return {status: false, message: "Account creation is failed"}
        }else { 
            return {status: true, message: "Account created successfully", data: result};   
    } }
    catch (error) {
        throw error;
    }
    };
    
   
export const getAllAccount  = async ()=>{
    try {
        const result = await accountRepo.getAllAccount();
        if(result.length == 0){
            return {status: false, message: "No Account found"};
        }else{
            return {status: true, message: "Account fetched successfully", data: result};
        }
    } catch (error) {
        throw error;
    }
};

export const getAccountById = async(id)=>{
    try {
        const result = await accountRepo.getAccountById(id);
        if(result == null){
            return {status: false, message: "Account not found"};
        } else {
            return {status: true, message: "Account fetched successfully", data: result};
        }
    } catch (error) {
        throw error;
        
    }
};

export const updateAccount = async (data) => {
    try {
        const [name,email,password,role,address,roverRegistrationNumber,idNumber,crewOrSchool ,id]= data;
        const exAccount = await accountRepo.getAccountById(id);
        if(exAccount == null){
            return {status: false, message: "Account update failed"};
        }
        const dataToUpdate =[name,email,password,role,address,roverRegistrationNumber,idNumber,crewOrSchool,id];
        const result = await accountRepo.updateAccount(dataToUpdate);
        if(result){
            return {status: true, message: "Account updated successfully", data: result};
        }else {
            return {status: false, message: "Account update failed"};
        }
    } catch (error) {
        throw error;
    }
};

export const deleteAccount = async(id)=>{
    try {
        const exAccount = await accountRepo.getAccountById(id);
        if(exAccount   != null){
        const result = await accountRepo.deleteAccount(id);
        if(result){
            return {status: true, message: "Account deleted successfully"};
        }else{
                return {status: false, message: "Account delete failed"};
        }
        }    
    } catch (error) {
        throw error;
    }
 }; 

 export const login = async (email, password) => {
    try {
        const user = await accountRepo.findByEmail(email);
        
        if (!user) {
            return {
                status: false,
                message: "Invalid email or password"
            };
        }

        // Simple password check (you should use bcrypt in production)
        if (user.password !== password) {
            return {
                status: false,
                message: "Invalid email or password"
            };
        }

        // Don't send password back to client
        const userData = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        };

        return {
            status: true,
            message: "Login successful",
            data: userData
        };
    } catch (error) {
        throw error;
    }
};