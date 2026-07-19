import { doc, getDoc } from "firebase/firestore";
import db from "../firebase/firestore";

export async function getCurrentUserProfile(uid) {

    const snapshot = await getDoc(doc(db, "users", uid));

    if (!snapshot.exists()) {

        return null;

    }

    return snapshot.data();

}