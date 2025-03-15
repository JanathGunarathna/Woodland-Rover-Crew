import * as registrationRepo from '../repositories/registrationRepo.js';

export const addRegistration = async (registrationData) => {
    try {
        const result = await registrationRepo.addRegistration(registrationData);
        if (result == null) {
            return { status: false, message: "Registration failed" };
        } else {
            return { status: true, message: "Registration completed successfully", data: result };
        }
    } catch (error) {
        throw error;
    }
};

export const getAllRegistrations = async () => {
    try {
        const result = await registrationRepo.getAllRegistrations();
        if (result.length == 0) {
            return { status: false, message: "No registrations found" };
        } else {
            return { status: true, message: "Registrations fetched successfully", data: result };
        }
    } catch (error) {
        throw error;
    }
};

export const getRegistrationById = async (id) => {
    try {
        const result = await registrationRepo.getRegistrationById(id);
        if (result == null) {
            return { status: false, message: "Registration not found" };
        } else {
            return { status: true, message: "Registration fetched successfully", data: result };
        }
    } catch (error) {
        throw error;
    }
};

export const getRegistrationsByProjectId = async (projectId) => {
    try {
        const result = await registrationRepo.getRegistrationsByProjectId(projectId);
        if (result.length == 0) {
            return { status: false, message: "No registrations found for this project" };
        } else {
            return { status: true, message: "Registrations fetched successfully", data: result };
        }
    } catch (error) {
        throw error;
    }
};

export const getRegistrationsByAccountId = async (accountId) => {
    try {
        const result = await registrationRepo.getRegistrationsByAccountId(accountId);
        if (result.length == 0) {
            return { status: false, message: "No registrations found for this account" };
        } else {
            return { status: true, message: "Registrations fetched successfully", data: result };
        }
    } catch (error) {
        throw error;
    }
};

export const updateRegistration = async (id, registrationData) => {
    try {
        const existingRegistration = await registrationRepo.getRegistrationById(id);
        if (existingRegistration == null) {
            return { status: false, message: "Registration not found" };
        }
        
        const result = await registrationRepo.updateRegistration(id, registrationData);
        if (result) {
            return { status: true, message: "Registration updated successfully" };
        } else {
            return { status: false, message: "Registration update failed" };
        }
    } catch (error) {
        throw error;
    }
};

export const updateRegistrationStatus = async (id, status) => {
    try {
        const existingRegistration = await registrationRepo.getRegistrationById(id);
        if (existingRegistration == null) {
            return { status: false, message: "Registration not found" };
        }
        
        const result = await registrationRepo.updateRegistrationStatus(id, status);
        if (result) {
            return { status: true, message: `Registration status updated to ${status}` };
        } else {
            return { status: false, message: "Status update failed" };
        }
    } catch (error) {
        throw error;
    }
};

export const deleteRegistration = async (id) => {
    try {
        const existingRegistration = await registrationRepo.getRegistrationById(id);
        if (existingRegistration == null) {
            return { status: false, message: "Registration not found" };
        }
        
        const result = await registrationRepo.deleteRegistration(id);
        if (result) {
            return { status: true, message: "Registration deleted successfully" };
        } else {
            return { status: false, message: "Registration delete failed" };
        }
    } catch (error) {
        throw error;
    }
};
