import {
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    orderBy,
    query,
    serverTimestamp,
    setDoc,
    updateDoc,
    where,
} from "firebase/firestore";
import {
    deleteObject,
    getDownloadURL,
    getStorage,
    ref,
    uploadBytes,
} from "firebase/storage";

import app from "../firebase/firebase";
import db from "../firebase/firestore";

const storage = getStorage(app);
const materialsCollection = collection(db, "materials");

function getStorageFileName(fileName) {
    return fileName.replace(/[\\/]/g, "_");
}

/**
 * Uploads a material file to Storage and records its metadata in Firestore.
 */
export async function uploadMaterial(userId, file) {
    let storageMaterialRef;
    let materialDocumentCreated = false;

    try {
        const materialRef = doc(materialsCollection);
        const storagePath = `users/${userId}/materials/${materialRef.id}-${getStorageFileName(file.name)}`;

        storageMaterialRef = ref(storage, storagePath);

        await uploadBytes(storageMaterialRef, file);

        const downloadURL = await getDownloadURL(storageMaterialRef);
        const materialData = {
            userId,
            originalFileName: file.name,
            storagePath,
            downloadURL,
            fileSize: file.size,
            mimeType: file.type || "application/octet-stream",
            uploadedAt: serverTimestamp(),
        };

        await setDoc(materialRef, materialData);
        materialDocumentCreated = true;

        const createdMaterial = await getDoc(materialRef);

        return {
            id: createdMaterial.id,
            ...createdMaterial.data(),
        };
    } catch (error) {
        // Avoid leaving an uploaded file behind if its Firestore record fails.
        if (storageMaterialRef && !materialDocumentCreated) {
            try {
                await deleteObject(storageMaterialRef);
            } catch (cleanupError) {
                console.error("Error cleaning up uploaded material:", cleanupError);
            }
        }

        console.error("Error uploading material:", error);
        throw error;
    }
}

/**
 * Retrieves all materials uploaded by a user, newest first.
 */
export async function getUserMaterials(userId) {
    try {
        const materialsQuery = query(
            materialsCollection,
            where("userId", "==", userId),
            orderBy("uploadedAt", "desc")
        );
        const querySnapshot = await getDocs(materialsQuery);

        return querySnapshot.docs.map((material) => ({
            id: material.id,
            ...material.data(),
        }));
    } catch (error) {
        console.error("Error fetching user materials:", error);
        throw error;
    }
}

/**
 * Updates the display name stored for a material.
 */
export async function renameMaterial(materialId, originalFileName) {
    try {
        await updateDoc(doc(db, "materials", materialId), {
            originalFileName,
        });
    } catch (error) {
        console.error("Error renaming material:", error);
        throw error;
    }
}

/**
 * Deletes a material's Storage object and its Firestore record.
 */
export async function deleteMaterial(materialId) {
    try {
        const materialRef = doc(db, "materials", materialId);
        const materialSnapshot = await getDoc(materialRef);

        if (!materialSnapshot.exists()) {
            return;
        }

        const { storagePath } = materialSnapshot.data();

        await deleteObject(ref(storage, storagePath));
        await deleteDoc(materialRef);
    } catch (error) {
        console.error("Error deleting material:", error);
        throw error;
    }
}
