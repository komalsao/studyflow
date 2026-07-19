import "./SearchBar.css";
import { Search } from "lucide-react";
import { useRef } from "react";

function SearchBar({
    value,
    onChange,
    onSearch
}) {

    const inputRef = useRef(null);

    return (

        <div
            className="search-bar"
            onClick={() => inputRef.current?.focus()}
        >

            <Search
                size={20}
                className="search-icon"
            />

            <input
                ref={inputRef}
                type="text"
                placeholder="Search study sessions..."
                value={value}
                onChange={(e) => {

                    const newValue = e.target.value;

                    onChange(newValue);

                    // Restore all sessions immediately when cleared
                    if (newValue.trim() === "") {

                        onSearch("");

                    }

                }}
                onKeyDown={(e) => {

                    if (e.key === "Enter") {

                        onSearch(value);

                    }

                }}
            />

        </div>

    );

}

export default SearchBar;