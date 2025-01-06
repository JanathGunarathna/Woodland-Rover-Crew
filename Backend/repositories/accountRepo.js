import { account } from "../models/account.js";

export const createAccount = async (name,email,password,role,address,roverRegistrationNumber,idNumber,crewOrSchool) => {
    try {
        const result = await account.create({
            name: name,
            email: email,
            password: password,
            role: role,
            address: address,
            roverRegistrationNumber: roverRegistrationNumber,
            idNumber: idNumber,
            crewOrSchool: crewOrSchool
        });
        return result;
    } catch (error) {
        throw error;
    }
};

export const getAllAccount = async () =>{
    try {
        const result = await account.findAll();
        return result;
    } catch (error) {
        throw error;
    }
};

export const getAccountById = async(id)=>{
    try {
        const result = await account.findOne({where : {id:id}});
        return result;
    } catch (error) {
        throw error;
    }
};

export const updateAccount = async (data)=> {
    try {
        const [name,email,password,role,address,roverRegistrationNumber,idNumber,crewOrSchool,id]= data;
        const result = await account.update ({
            name: data.name,
            email: data.email,
            password: data.password,
            role: data.role,
            address: data.address,
            roverRegistrationNumber: data.roverRegistrationNumber,
            idNumber: data.idNumber,
            crewOrSchool: data.crewOrSchool,
        },{
            where :{id:id}
        });
        return result;
    } catch (error) {
        throw error;
    }
};

export const deleteAccount = async(id)=>{
    try {
        const result = await account.destroy({
            where: {id:id}
        });
        return result;
    } catch (error) {
        throw error;
    }
}