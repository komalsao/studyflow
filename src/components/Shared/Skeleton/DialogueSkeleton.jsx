import SkeletonBlock from "./SkeletonBlock";
import "./Skeleton.css";

function DialogueSkeleton() {

    return (

        <div className="dialogue-skeleton">

            <div className="dialogue-row left">

                <SkeletonBlock
                    width={42}
                    height={42}
                    borderRadius="50%"
                />

                <div className="dialogue-content">

                    <SkeletonBlock width="70%" height={18} />

                    <SkeletonBlock width="100%" height={14} />

                    <SkeletonBlock width="85%" height={14} />

                </div>

            </div>

            <div className="dialogue-row right">

                <div className="dialogue-content">

                    <SkeletonBlock width="60%" height={18} />

                    <SkeletonBlock width="90%" height={14} />

                </div>

            </div>

            <div className="dialogue-row left">

                <SkeletonBlock
                    width={42}
                    height={42}
                    borderRadius="50%"
                />

                <div className="dialogue-content">

                    <SkeletonBlock width="55%" height={18} />

                    <SkeletonBlock width="100%" height={14} />

                    <SkeletonBlock width="75%" height={14} />

                </div>

            </div>

        </div>

    );

}

export default DialogueSkeleton;