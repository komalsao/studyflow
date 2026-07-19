import "./Skeleton.css";
import SkeletonBlock from "./SkeletonBlock";

function DashboardSkeleton() {

    return (

        <div className="dashboard-skeleton">

            {/* Hero */}

            <div className="dashboard-skeleton-hero">

                <div className="dashboard-skeleton-left">

                    <SkeletonBlock
                        width={170}
                        height={34}
                        borderRadius={999}
                    />

                    <SkeletonBlock
                        width="62%"
                        height={58}
                    />

                    <SkeletonBlock
                        width="40%"
                        height={18}
                    />

                    <SkeletonBlock
                        width={230}
                        height={54}
                        borderRadius={16}
                    />

                </div>

                <div className="dashboard-skeleton-right">

                    <SkeletonBlock
                        width={330}
                        height={330}
                        borderRadius="50%"
                    />

                </div>

            </div>

            {/* Bottom Grid */}

            <div className="dashboard-skeleton-grid">

                {/* Start Session */}

                <div className="dashboard-skeleton-card">

                    <SkeletonBlock
                        width={60}
                        height={60}
                        borderRadius={18}
                    />

                    <SkeletonBlock
                        width="70%"
                        height={34}
                    />

                    <SkeletonBlock
                        width="90%"
                        height={18}
                    />

                    <SkeletonBlock
                        width="72%"
                        height={18}
                    />

                </div>

                {/* Recent Sessions */}

                <div className="dashboard-skeleton-card">

                    <SkeletonBlock
                        width="45%"
                        height={34}
                    />

                    <div className="dashboard-skeleton-session-list">

                        {[1,2,3,4,5].map((item)=>(

                            <div
                                key={item}
                                className="dashboard-skeleton-session"
                            >

                                <SkeletonBlock
                                    width={44}
                                    height={44}
                                    borderRadius={14}
                                />

                                <div className="dashboard-skeleton-session-content">

                                    <SkeletonBlock
                                        width="75%"
                                        height={18}
                                    />

                                    <SkeletonBlock
                                        width="100%"
                                        height={6}
                                        borderRadius={999}
                                    />

                                </div>

                                <SkeletonBlock
                                    width={34}
                                    height={18}
                                />

                                <SkeletonBlock
                                    width={40}
                                    height={40}
                                    borderRadius={12}
                                />

                            </div>

                        ))}

                    </div>

                </div>

                {/* Tip */}

                <div className="dashboard-skeleton-tip">

                    <SkeletonBlock
                        width="42%"
                        height={36}
                    />

                    <SkeletonBlock
                        width="80%"
                        height={22}
                    />

                    <SkeletonBlock
                        width="74%"
                        height={22}
                    />

                    <SkeletonBlock
                        width="52%"
                        height={22}
                    />

                </div>

            </div>

        </div>

    );

}

export default DashboardSkeleton;