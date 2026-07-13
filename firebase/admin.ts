import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

let initialized = false;

function ensureInitialized() {
    if (initialized) return;
    const apps = getApps();
    if (!apps.length) {
        const projectId = process.env.FIREBASE_PROJECT_ID;
        const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
        const privateKey = process.env.FIREBASE_PRIVATE_KEY;

        if (!projectId || !clientEmail || !privateKey) {
            throw new Error(
                "Firebase Admin environment variables (FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY) are missing or undefined."
            );
        }

        initializeApp({
            credential: cert({
                projectId,
                clientEmail,
                privateKey: privateKey.replace(/\\n/g, "\n"),
            }),
        });
    }
    initialized = true;
}

export const auth = new Proxy({} as ReturnType<typeof getAuth>, {
    get(target, prop, receiver) {
        ensureInitialized();
        const actualAuth = getAuth();
        const value = Reflect.get(actualAuth, prop, receiver);
        return typeof value === 'function' ? value.bind(actualAuth) : value;
    }
});

export const db = new Proxy({} as ReturnType<typeof getFirestore>, {
    get(target, prop, receiver) {
        ensureInitialized();
        const actualDb = getFirestore();
        const value = Reflect.get(actualDb, prop, receiver);
        return typeof value === 'function' ? value.bind(actualDb) : value;
    }
});