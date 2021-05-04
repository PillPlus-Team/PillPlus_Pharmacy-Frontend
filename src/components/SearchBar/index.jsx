import { useState } from 'react';

const SearchBar = ({ onSearchClick = () => {} }) => {
    const [keyword, setKeyword] = useState('');

    const searchHandler = () => {
        onSearchClick(keyword);
        setKeyword('');
    };

    return (
        <div className="flex flex-row justify-center items-center h-12">
            <div className="mr-2">
                <input
                    className="w-full p-2 pl-4 rounded-lg border-2 focus:outline-none border-gray-200  focus:border-green-500"
                    id="input-search"
                    name="search"
                    type="text"
                    placeholder="ค้นหา"
                    value={keyword}
                    autoComplete="off"
                    onChange={(event) => {
                        setKeyword(event.target.value);
                    }}
                />
            </div>
            <button
                className="w-24 p-2 bg-green-500 text-white rounded-lg focus:outline-none hover:bg-green-800"
                type="button"
                onClick={searchHandler}
            >
                ค้นหา
            </button>
        </div>
    );
};

export default SearchBar;
