import SkeletonBlock from "./SkeletonBlock";
import "./Skeleton.css";

function RecentSessionsSkeleton() {

    return (

        <div className="recent-card">

            <SkeletonBlock
                width={240}
                height={36}
            />

            <div className="recent-skeleton-list">

                {[1,2,3,4,5].map((item) => (

                    <div
                        key={item}
                        className="recent-skeleton-row"
                    >

                        <SkeletonBlock
                            width={46}
                            height={46}
                            borderRadius={14}
                        />

                        <div className="recent-skeleton-content">

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
                            height={16}
                        />

                        <SkeletonBlock
                            width={42}
                            height={42}
                            borderRadius={12}
                        />

                    </div>

                ))}

            </div>

            <div className="recent-skeleton-footer">

                <SkeletonBlock
                    width={150}
                    height={20}
                />

            </div>

        </div>

    );

}

export default RecentSessionsSkeleton;