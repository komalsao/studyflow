import "./PageHeader.css";
import lumi from "../../../assets/lumi/start.png";

function PageHeader() {

    return (

        <section className="page-header">

            <div className="page-title">

            
                <h1>Create New Study Session</h1>

                <p>

                    Upload your study materials and let Lumi build
                    your personalized study experience.

                </p>

            </div>

            <div className="lumi-area">

                <img src={lumi} alt="Lumi" />

            </div>

        </section>

    );

}

export default PageHeader;