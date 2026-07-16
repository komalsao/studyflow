import {
    addDoc,
    arrayRemove,
    arrayUnion,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    orderBy,
    query,
    serverTimestamp,
    updateDoc,
    where
} from "firebase/firestore";

import db from "../firebase/firestore";

const sessionsCollection = collection(db, "sessions");

/* ------------------------------------------ */
/* Create Session */
/* ------------------------------------------ */

export async function createSession(userId, sessionData) {

    try {

        const sessionRef = await addDoc(sessionsCollection, {

            userId,

            title: sessionData.title || "",

            description: sessionData.description || "",

            subject: sessionData.subject || "",

            icon: sessionData.icon || "📚",

            createdAt: serverTimestamp(),

            updatedAt: serverTimestamp(),

            lastOpened: serverTimestamp(),

            progress: {

                summary: false,

                flashcards: false,

                quiz: false,

                mindmap: false

            },

            status: "active"

        });

        return {

            id: sessionRef.id,

            userId,

            ...sessionData,

            status: "active"

        };

    } catch (error) {

        console.error("Error creating study session:", error);

        throw error;

    }

}

/* ------------------------------------------ */
/* Get All Sessions */
/* ------------------------------------------ */

export async function getUserSessions(userId) {

    try {

        const sessionsQuery = query(

            sessionsCollection,

            where("userId", "==", userId),

            orderBy("lastOpened", "desc")

        );

        const querySnapshot = await getDocs(sessionsQuery);

        return querySnapshot.docs.map(session => ({

            id: session.id,

            ...session.data()

        }));

    } catch (error) {

        console.error("Error fetching study sessions:", error);

        throw error;

    }

}

/* ------------------------------------------ */
/* Get Single Session */
/* ------------------------------------------ */

export async function getSession(sessionId) {

    try {

        const sessionRef = doc(db, "sessions", sessionId);

        const sessionSnapshot = await getDoc(sessionRef);

        if (!sessionSnapshot.exists()) {

            return null;

        }

        return {

            id: sessionSnapshot.id,

            ...sessionSnapshot.data()

        };

    } catch (error) {

        console.error("Error fetching session:", error);

        throw error;

    }

}

/* ------------------------------------------ */
/* Rename Session */
/* ------------------------------------------ */

export async function renameSession(sessionId, newTitle) {

    try {

        await updateDoc(doc(db, "sessions", sessionId), {

            title: newTitle,

            updatedAt: serverTimestamp()

        });

    } catch (error) {

        console.error("Error renaming session:", error);

        throw error;

    }

}

/* ------------------------------------------ */
/* Delete Session */
/* ------------------------------------------ */

export async function deleteSession(sessionId) {

    try {

        // TODO:
        // Delete related materials, chats,
        // summaries, flashcards, quizzes,
        // and mind maps before deleting
        // the session document.

        await deleteDoc(doc(db, "sessions", sessionId));

    } catch (error) {

        console.error("Error deleting session:", error);

        throw error;

    }

}

/* ------------------------------------------ */
/* Update Last Opened */
/* ------------------------------------------ */

export async function updateLastOpened(sessionId) {

    try {

        await updateDoc(doc(db, "sessions", sessionId), {

            lastOpened: serverTimestamp(),

            updatedAt: serverTimestamp()

        });

    } catch (error) {

        console.error("Error updating last opened:", error);

        throw error;

    }

}

/* ------------------------------------------ */
/* Session Materials */
/* ------------------------------------------ */

export async function attachMaterialToSession(sessionId, materialId) {

    try {

        await updateDoc(doc(db, "sessions", sessionId), {

            materialIds: arrayUnion(materialId),

            updatedAt: serverTimestamp()

        });

    } catch (error) {

        console.error("Error attaching material to session:", error);

        throw error;

    }

}

export async function removeMaterialFromSession(sessionId, materialId) {

    try {

        await updateDoc(doc(db, "sessions", sessionId), {

            materialIds: arrayRemove(materialId),

            updatedAt: serverTimestamp()

        });

    } catch (error) {

        console.error("Error removing material from session:", error);

        throw error;

    }

}

export async function getSessionMaterials(sessionId) {

    try {

        const sessionSnapshot = await getDoc(doc(db, "sessions", sessionId));

        if (!sessionSnapshot.exists()) {

            return [];

        }

        const materialIds = sessionSnapshot.data().materialIds || [];

        const materials = await Promise.all(
            materialIds.map(async (materialId) => {

                const materialSnapshot = await getDoc(
                    doc(db, "materials", materialId)
                );

                if (!materialSnapshot.exists()) {

                    return null;

                }

                return {
                    id: materialSnapshot.id,
                    ...materialSnapshot.data()
                };

            })
        );

        return materials.filter(Boolean);

    } catch (error) {

        console.error("Error fetching session materials:", error);

        throw error;

    }

}
