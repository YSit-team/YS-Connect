import React, { useState } from 'react';
import Menubar from '../components/Menubar';

const products = [
{
    "id" : 1,
    "name" : "Canon XF705",
    "sort" : "Camera",
    "url" : "CanonXf705.png",
    "amount" : 1,
    "isChecked" : true
},
{
    "id" : 2,
    "name" : "Canon light",
    "sort" : "light",
    "url" : "CanonEOSR6.png",
    "amount" : 1,
    "isChecked" : true
},
{
    "id" : 3,
    "name" : "Canon mic",
    "sort" : "mic",
    "url" : "CanonXf705.png",
    "amount" : 1,
    "isChecked" : true
}
];

const Test = () => {
const [selectedSort, setSelectedSort] = useState('all');
const [searchQuery, setSearchQuery] = useState('');

const handleSortClick = (sort:any) => {
    setSelectedSort(sort);
};

const handleSearchChange = (event:any) => {
    setSearchQuery(event.target.value);
};

const filteredProducts = products.filter(product => {
    const nameMatch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const sortMatch = selectedSort === 'all' || product.sort === selectedSort;
    return nameMatch && sortMatch;
});

return (
    <>
    <Menubar/>
    <div>
    <label htmlFor="sort-select">Sort by:</label>
    <div>
        <button onClick={() => handleSortClick('all')}>All</button>
        <button onClick={() => handleSortClick('Camera')}>Camera</button>
        <button onClick={() => handleSortClick('light')}>Light</button>
        <button onClick={() => handleSortClick('mic')}>Mic</button>
    </div>
    <input type="text" value={searchQuery} onChange={handleSearchChange} placeholder="Search products" />
    <button onClick={() => setSearchQuery('')}>Clear search</button>
    <ul>
        {filteredProducts.map(product => (
        <li key={product.id}>
            <img src={`product/${product.url}`} alt={product.name} />
            <p>{product.name}</p>
        </li>
        ))}
    </ul>
    </div>
    </>
);
};

export default Test;

