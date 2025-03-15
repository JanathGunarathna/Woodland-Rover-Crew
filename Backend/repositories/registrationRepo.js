// registrationRepo.js
import { registration } from "../models/registrationProject.js";
import project from "../models/project.js";

export const addRegistration = async (registrationData) => {
    try {
        const result = await registration.create({
            projectId: registrationData.projectId,
            fullName: registrationData.fullName,
            school: registrationData.school,
            scoutLevel: registrationData.scoutLevel,
            paymentMethod: registrationData.paymentMethod,
            paymentAmount: registrationData.amount,
            paymentReference: registrationData.transactionId || null,
            paymentDate: new Date(),
            notes: registrationData.notes || null,
            status: 'pending',
            accountId: registrationData.accountId
        });
        return result;
    } catch (error) {
        throw error;
    }
};

export const getAllRegistrations = async () => {
    try {
        const result = await registration.findAll({
            include: [{ model: project }]
        });
        return result;
    } catch (error) {
        throw error;
    }
};

export const getRegistrationById = async (id) => {
    try {
        const result = await registration.findOne({ 
            where: { id: id },
            include: [{ model: project }]
        });
        return result;
    } catch (error) {
        throw error;
    }
};

export const getRegistrationsByProjectId = async (projectId) => {
    try {
        const result = await registration.findAll({ 
            where: { projectId: projectId },
            include: [{ model: project }]
        });
        return result;
    } catch (error) {
        throw error;
    }
};

export const getRegistrationsByAccountId = async (accountId) => {
    try {
        const result = await registration.findAll({ 
            where: { accountId: accountId },
            include: [{ model: project }],
            order: [['createdAt', 'DESC']]
        });
        return result;
    } catch (error) {
        throw error;
    }
};

