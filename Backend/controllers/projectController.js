import * as projectService from "../services/projectService.js";

export const addProject = async (req, res) => {
    try {        
        const {projectName,projectDate,projectTime,projectLocation,projectDescription  } = req.body;
            const result = await projectService.addProject( projectName,projectDate,projectTime,projectLocation,projectDescription );
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


export const getAllProjects = async (req, res) => {
    try {
        const result = await projectService.getAllProjects();
        if(result.status){
            return res.status(200).send(result);
        }else{
            return res.status(404).send({message: "No Project found", status: false});
        }
    } catch (error) {
        return res.status(500).send({message: "Project fetch failed", status: false});
    }
};

export const getProject = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await projectService.getProject(id);
        if(result.status){
            return res.status(200).send({
                response_code: 200,
                result});
        }else if (result.status== false){
            return res.status(404).send(result);
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({message: "Project fetch failed"});
    }
};

export const updateProject = async (req, res) => {
    if(!req.params.id){
        return res.status(400).json({message: "Project id not found", status: false});
    }
    const {projectName,projectDate,projectTime,projectLocation,projectDescription } = req.body;
    if(!projectName || !projectDate || !projectTime || !projectLocation || !projectDescription){
        return res.status(400).json({message: "Project data not found", status: false});
    }
    const id = req.params.id;
    const dataToUpdate = [projectName,projectDate,projectTime,projectLocation,projectDescription ,id];
    try {
        const result = await projectService.updateProject(dataToUpdate);
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

export const deleteProject = async (req, res) => {
    if(!req.params.id){
        return res.status(400).json({message: "Project id not found", status: false});
    }
    const id = req.params.id;
    try {
        const result = await projectService.deleteProject(id);
        if(result.status){
            return res.status(200).json({message: "Project deleted", status: true});
        }else{
            return res.status(500).json({message: "Project delete failed", status: false});
        }
    } catch (error) {
        return res.status(500).json({message: "Internal server error"});
    }
};