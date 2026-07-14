import "./MaterialsView.css";
import { forwardRef } from "react";

import MaterialsPreview from "../WelcomeView/MaterialsPreview";

const MaterialsView = forwardRef(({ open }, ref) => {

    return (

        <aside
            ref={ref}
            className={`materials-panel ${open ? "open" : ""}`}
        >

            <div className="materials-tail" />

            <div className="materials-content">

                <MaterialsPreview popup />

            </div>

        </aside>

    );

});

export default MaterialsView;