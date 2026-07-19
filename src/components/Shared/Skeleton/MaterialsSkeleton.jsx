import SkeletonBlock from "./SkeletonBlock";
import "./Skeleton.css";

function MaterialItem() {

    return (

        <div className="material-skeleton-item">

            <SkeletonBlock
                width={42}
                height={42}
                borderRadius={12}
            />

            <div className="material-skeleton-content">

                <SkeletonBlock
                    width="70%"
                    height={16}
                />

                <SkeletonBlock
                    width="40%"
                    height={12}
                />

            </div>

        </div>

    );

}

function MaterialsSkeleton() {

    return (

        <div className="materials-skeleton">

            <MaterialItem />
            <MaterialItem />
            <MaterialItem />
            <MaterialItem />

        </div>

    );

}

export default MaterialsSkeleton;