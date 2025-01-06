import serviceAccount from "./notification-245e7-firebase-adminsdk-zg1bc-794e80dd34.json" assert { type: "json" };
import { initializeApp } from 'firebase-admin/app';
import { getMessaging } from "firebase-admin/messaging";
import admin from "firebase-admin";
initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: "notification-245e7",
});

export const sendNotification = async (data) => {
    const message = {
        notification: {
            title: data.title,
            body: data.body,
            image: data.image
        },
        token: data.token
    };
    try {
        const response = await getMessaging().send(message);
        console.log("Successfully sent message:", response);
        return {
            status: true,
            message: "Successfully sent message",
            token: data.token
        };
    } catch (error) {
        return {
            status: false,
            message: "Notification not sent",
            error: error.message,
        };
    }
}