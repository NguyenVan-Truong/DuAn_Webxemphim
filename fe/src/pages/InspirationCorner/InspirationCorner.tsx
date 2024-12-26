import ViewAll from "../Introduce/Components/ViewAll/ViewAll";
//import Carousle from './Components/Carousle/Carousle';
import Banner from "./Components/Banner/Banner";
import InspirationCornerContent from "./Components/InspirationCornerContent/InspirationCorner";

const InspirationCorner = () => {
    return (
        <div>
            <Banner />
            <InspirationCornerContent />
            {/*<Carousle />*/}
            <ViewAll />
        </div>
    );
};

export default InspirationCorner;
