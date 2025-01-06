import * as projectRepo from '../repositories/projectRepo.js';


export const addProject = async (projectName, projectDate, projectTime, projectLocation, projectDescription) => {
    try {
        const result = await projectRepo.addProject(projectName, projectDate, projectTime, projectLocation, projectDescription);
        if (result == null){
            return {status: false, message: "Project creation is failed"}
        }else { 
            return {status: true, message: "Project created successfully", data: result};   
    } }
    catch (error) {
        throw error;
    }
    };
    
   
export const getAllProjects  = async ()=>{
    try {
        const result = await projectRepo.getAllProjects();
        if(result.length == 0){
            return {status: false, message: "No proejcts found"};
        }else{
            return {status: true, message: "Projects fetched successfully", data: result};
        }
    } catch (error) {
        throw error;
    }
};

export const getProject = async(id)=>{
    try {
        const result = await projectRepo.getProject(id);
        if(result == null){
            return {status: false, message: "project not found"};
        } else {
            return {status: true, message: "Project fetched successfully", data: result};
        }
    } catch (error) {
        throw error;
        
    }
};

export const updateProject = async (data) => {
    try {
        const [projectName,projectDate,projectTime,projectLocation,projectDescription ,id]= data;
        const exProject = await projectRepo.getProject(id);
        if(exProject == null){
            return {status: false, message: "Project update failed"};
        }
        const dataToUpdate =[projectName,projectDate,projectTime,projectLocation,projectDescription ,id];
        const result = await projectRepo.updateProject(dataToUpdate);
        if(result){
            return {status: true, message: "Project updated successfully", data: result};
        }else {
            return {status: false, message: "Project update failed"};
        }
    } catch (error) {
        throw error;
    }
};

export const deleteProject = async(id)=>{
    try {
        const exProject = await projectRepo.getProject(id);
        if(exProject   != null){
        const result = await projectRepo.deleteProject(id);
        if(result){
            return {status: true, message: "Project deleted successfully"};
        }else{
                return {status: false, message: "Project delete failed"};
        }
        }    
    } catch (error) {
        throw error;
    }
 }; 