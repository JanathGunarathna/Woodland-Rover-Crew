import { project } from "../models/project.js";

export const addProject = async (projectName, projectDate, projectTime, projectLocation, projectDescription) => {
    try {
        const result = await project.create({
            projectName: projectName,
            projectDate: projectDate,
            projectTime: projectTime,
            projectLocation: projectLocation,
            projectDescription: projectDescription
        });
        return result;
    } catch (error) {
        throw error;
    }
};

export const getAllProjects = async () =>{
    try {
        const result = await project.findAll();
        return result;
    } catch (error) {
        throw error;
    }
};

export const getProject = async(id)=>{
    try {
        const result = await project.findOne({where : {id:id}});
        return result;
    } catch (error) {
        throw error;
    }
};

export const updateProject = async (data)=> {
    try {
        const [projectName,projectDate,projectTime,projectLocation,projectDescription,id]= data;
        const result = await project.update ({
            projectName: data.projectName,
            projectDate: data.projectDate,
            projectTime: data.projectTime,
            projectLocation: data.projectLocation,
            projectDescription: data.projectDescription,
        },{
            where :{id:id}
        });
        return result;
    } catch (error) {
        throw error;
    }
};

export const deleteProject = async(id)=>{
    try {
        const result = await project.destroy({
            where: {id:id}
        });
        return result;
    } catch (error) {
        throw error;
    }
}