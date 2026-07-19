import { doc, updateDoc } from "firebase/firestore";

import db from "../firebase/firestore";

const progressFeatures = ["summary", "flashcards", "quiz", "mindmap"];

export function updateProgress(sessionId, feature) {
    if (!progressFeatures.includes(feature)) {
        return Promise.reject(new Error("Invalid study progress feature."));
    }

    return updateDoc(doc(db, "sessions", sessionId), {
        [`progress.${feature}`]: true,
    });
}

export function getProgressPercentage(progress) {
    const completed = progressFeatures.filter((feature) => progress?.[feature]).length;

    return (completed / progressFeatures.length) * 100;
}
