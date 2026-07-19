import "./Skeleton.css";

function SkeletonBlock({
    width = "100%",
    height = 16,
    borderRadius = 12,
    className = "",
}) {

    return (

        <div
            className={`skeleton-block ${className}`}
            style={{
                width,
                height,
                borderRadius,
            }}
        />

    );

}

export default SkeletonBlock;