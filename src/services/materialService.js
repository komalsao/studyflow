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
import db from "../firebase/firestore";
import supabase from "../supabase";

const materialsCollection = collection(db, "materials");
const materialsBucket = "materials";
const studyApiUrl = "http://localhost:3001/api/study";

function getStorageFileName(fileName) {
    return fileName.replace(/[\\/]/g, "_");
}

/**
 * Uploads a material file to Storage and records its metadata in Firestore.
 */
export async function uploadMaterial(userId, file) {
    let storagePath;
    let materialDocumentCreated = false;

    try {
        const materialRef = doc(materialsCollection);
        storagePath = `users/${userId}/materials/${materialRef.id}-${getStorageFileName(file.name)}`;

        const { error: uploadError } = await supabase.storage
            .from(materialsBucket)
            .upload(storagePath, file);

        if (uploadError) {
            throw uploadError;
        }

        const { data: publicUrlData } = supabase.storage
            .from(materialsBucket)
            .getPublicUrl(storagePath);
        const downloadURL = publicUrlData.publicUrl;
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
        if (storagePath && !materialDocumentCreated) {
            try {
                const { error: cleanupError } = await supabase.storage
                    .from(materialsBucket)
                    .remove([storagePath]);

                if (cleanupError) {
                    throw cleanupError;
                }
            } catch (cleanupError) {
                console.error("Error cleaning up uploaded material:", cleanupError);
            }
        }

        console.error("Error uploading material:", error);
        throw error;
    }
}

/**
 * Generates study resources from an uploaded material through the backend.
 */
export async function generateStudyResources(downloadURL, mimeType) {
    const response = await fetch(`${studyApiUrl}/generate`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            downloadURL,
            mimeType,
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Unable to generate study resources.");
    }

    return data;
}

/**
 * Generates a suggested session title from an uploaded material.
 */
export async function generateSessionTitle(downloadURL, mimeType) {
    const response = await fetch(`${studyApiUrl}/title`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            downloadURL,
            mimeType,
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Unable to generate a session title.");
    }

    return data.title;
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

        const { error: storageError } = await supabase.storage
            .from(materialsBucket)
            .remove([storagePath]);

        if (storageError) {
            throw storageError;
        }

        await deleteDoc(materialRef);
    } catch (error) {
        console.error("Error deleting material:", error);
        throw error;
    }
}
