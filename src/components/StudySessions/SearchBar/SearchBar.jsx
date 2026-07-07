import "./SearchBar.css";
import { Search } from "lucide-react";

function SearchBar() {
    return (

        <div className="search-bar">

            <Search
                size={20}
                className="search-icon"
            />

            <input
                type="text"
                placeholder="Search study sessions..."
            />

        </div>

    );
}

export default SearchBar;