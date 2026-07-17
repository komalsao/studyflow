import "./Dashboard.css";

import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";

import auth from "../../firebase/auth";
import db from "../../firebase/firestore";

import { getUserSessions } from "../../services/sessionService";

import AppHeader from "../../components/Shared/AppHeader/AppHeader";
import HeroCard from "../../components/Dashboard/HeroCard";
import StartSessionCard from "../../components/Dashboard/StartSessionCard";
import RecentSessions from "../../components/Dashboard/RecentSessions";
import TipCard from "../../components/Dashboard/TipCard";

function Dashboard() {

    const navigate = useNavigate();

    const [name, setName] = useState("");

    const [recentSessions, setRecentSessions] = useState([]);

    const handleLogout = async () => {

        try {

            await signOut(auth);

            alert("Logged out successfully!");

            navigate("/login");

        } catch (error) {

            alert(error.message);

        }

    };

    useEffect(() => {

        const loadUser = async () => {

            const user = auth.currentUser;

            if (!user) return;

            const snap = await getDoc(doc(db, "users", user.uid));

            if (snap.exists()) {

                setName(snap.data().name);

            }

        };

        loadUser();

    }, []);

    useEffect(() => {

        let isActive = true;

        const unsubscribe = onAuthStateChanged(auth, async (user) => {

            if (!user) {

                if (isActive) {

                    setRecentSessions([]);

                }

                return;

            }

            try {

                const sessions = await getUserSessions(user.uid);

                if (isActive) {

                    setRecentSessions(sessions.slice(0, 6));

                }

            } catch (error) {

                console.error("Unable to load recent study sessions:", error);

            }

        });

        return () => {

            isActive = false;

            unsubscribe();

        };

    }, []);

    return (

        <>

            <AppHeader
                name={name}
                onLogout={handleLogout}
            />

            <div className="dashboard">

                <HeroCard
                    name={name}
                    session={recentSessions[0]}
                />

                <div className="dashboard-grid">

                    <div className="dashboard-start">

                        <StartSessionCard />

                    </div>

                    <div className="dashboard-recent">

                        <RecentSessions
                            sessions={recentSessions}
                        />

                    </div>

                    <div className="dashboard-tip">

                        <TipCard />

                    </div>

                </div>

            </div>

        </>

    );

}

export default Dashboard;