import ProductList from "../ProductList/ProductList";

export const CategorySearchList = ({ gender, category, subCategory }) => {

    return (
        <div>
            Showing Results for {gender} &gt; {category} &gt; {subCategory}
            <ProductList source="category" category={subCategory} />
        </div>
    )
}