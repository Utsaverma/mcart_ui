import { useEffect, useState } from "react";
import "./filters.css";
import { Button } from "react-bootstrap";

export const Filters = ({filters, setFilters}) => {

    const handleFilters = (e) => {
        const { name, value } = e.target;
        console.group(name,value)
        setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
    };

    const clearFilters = () => {
        setFilters({
            gender: '',
            sort: ''
        })
    }

    return(
        <div className="FiltersContainer">
            <div className="genderSelection">
                <span> Quick Filters</span>
                <input
                    className="genderRadio"
                    type="radio"
                    value="Men"
                    name="gender"
                    checked={filters.gender === 'Men'}
                    onChange={handleFilters}
                />
                <label className="genderLabel">Male</label>
                <input
                    className="genderRadio"
                    type="radio"
                    value="Women"
                    name="gender"
                    checked={filters.gender === 'Women'}
                    onChange={handleFilters}
                />
                <label className="genderLabel">Female</label>
            </div>
            <div className="priceSortContainer">
                <span> Sort by Price</span>
                <input
                    className="priceSort"
                    type="radio"
                    value="asc"
                    name="sort"
                    checked={filters.sort === 'asc'}
                    onChange={handleFilters}
                />
                <label className="sortLabel">Asc</label>
                <input
                    className="priceSort"
                    type="radio"
                    value="desc"
                    name="sort"
                    checked={filters.sort === 'desc'}
                    onChange={handleFilters}
                />
                <label className="sortLabel">Desc</label>
            </div>
        
          <Button variant="primary" className="clearFilters" onClick={clearFilters}>clear</Button>
        </div>

    )
}