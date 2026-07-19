import SkeletonBlock from "./SkeletonBlock";
import "./Skeleton.css";

function SessionCardSkeleton() {

    return (

        <div className="session-skeleton-card">

            <div className="session-skeleton-top">

                <SkeletonBlock
                    width={54}
                    height={54}
                    borderRadius={16}
                />

                <div className="session-skeleton-info">

                    <SkeletonBlock
                        width="55%"
                        height={20}
                    />

                    <SkeletonBlock
                        width="35%"
                        height={14}
                    />

                </div>

            </div>

            <SkeletonBlock
                width="100%"
                height={8}
                borderRadius={999}
            />

        </div>

    );

}

function SessionsSkeleton() {

    return (

        <div className="sessions-skeleton">

            <SessionCardSkeleton />
            <SessionCardSkeleton />
            <SessionCardSkeleton />
            <SessionCardSkeleton />

        </div>

    );

}

export default SessionsSkeleton;