import * as registrationService from "../services/registrationService.js";

export const addRegistration = async (req, res) => {
    try {
        const registrationData = {
            projectId: req.body.projectId,
            fullName: req.body.fullName,
            school: req.body.school,
            scoutLevel: req.body.scoutLevel,
            paymentMethod: req.body.paymentMethod,
            amount: req.body.amount,
            transactionId: req.body.transactionId,
            notes: req.body.notes,
            accountId: req.user?.id || 1 // Assuming user is authenticated and ID is available in req.user
        };

        const result = await registrationService.addRegistration(registrationData);
        if (result.status) {
            return res.status(201).json({ result: result, status: true });
        } else {
            return res.status(500).json({ message: "Registration failed", status: false });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const getAllRegistrations = async (req, res) => {
    try {
        const result = await registrationService.getAllRegistrations();
        if (result.status) {
            return res.status(200).send(result);
        } else {
            return res.status(404).send({ message: "No registrations found", status: false });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Failed to fetch registrations", status: false });
    }
};

export const getRegistrationById = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await registrationService.getRegistrationById(id);
        if (result.status) {
            return res.status(200).send({
                response_code: 200,
                result
            });
        } else {
            return res.status(404).send(result);
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Failed to fetch registration" });
    }
};

export const getRegistrationsByProjectId = async (req, res) => {
    try {
        const projectId = req.params.projectId;
        const result = await registrationService.getRegistrationsByProjectId(projectId);
        if (result.status) {
            return res.status(200).send({
                response_code: 200,
                result
            });
        } else {
            return res.status(404).send(result);
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Failed to fetch registrations" });
    }
};

export const getMyRegistrations = async (req, res) => {
    try {
        const accountId = req.user?.id;
        if (!accountId) {
            return res.status(401).send({ message: "Unauthorized", status: false });
        }
        
        const result = await registrationService.getRegistrationsByAccountId(accountId);
        if (result.status) {
            return res.status(200).send({
                response_code: 200,
                result
            });
        } else {
            return res.status(404).send(result);
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Failed to fetch registrations" });
    }
};

export const updateRegistration = async (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({ message: "Registration ID not found", status: false });
    }
    
    try {
        const id = req.params.id;
        const registrationData = {
            fullName: req.body.fullName,
            school: req.body.school,
            scoutLevel: req.body.scoutLevel,
            paymentMethod: req.body.paymentMethod,
            amount: req.body.amount,
            transactionId: req.body.transactionId,
            notes: req.body.notes,
            status: req.body.status
        };
        
        const result = await registrationService.updateRegistration(id, registrationData);
        if (result.status) {
            return res.status(200).json({ result: result, status: true });
        } else {
            return res.status(404).json({ message: result.message, status: false });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const updateRegistrationStatus = async (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({ message: "Registration ID not found", status: false });
    }
    
    if (!req.body.status) {
        return res.status(400).json({ message: "Status is required", status: false });
    }
    
    try {
        const id = req.params.id;
        const status = req.body.status;
        
        const result = await registrationService.updateRegistrationStatus(id, status);
        if (result.status) {
            return res.status(200).json({ result: result, status: true });
        } else {
            return res.status(404).json({ message: result.message, status: false });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteRegistration = async (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({ message: "Registration ID not found", status: false });
    }
    
    try {
        const id = req.params.id;
        const result = await registrationService.deleteRegistration(id);
        if (result.status) {
            return res.status(200).json({ message: "Registration deleted", status: true });
        } else {
            return res.status(404).json({ message: result.message, status: false });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
export default {
    addRegistration,
    getAllRegistrations,
    getRegistrationById,
    getRegistrationsByProjectId,
    getMyRegistrations,
    updateRegistration,
    updateRegistrationStatus,
    deleteRegistration
}