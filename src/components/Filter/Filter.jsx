
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from 'redux/filterSlice';
import { selectFilter } from 'redux/selectors';


const Filter = () => { 
  
  const dispatch = useDispatch();
  const filterTerm = useSelector(selectFilter);
  
  const handleFilterTerm = ({ target: { value } }) => {
    dispatch(setFilter(value));
  };
  

  return(
  <div>
    <h4>Find contacts by name</h4>
    <input
      type="text"
      name="filter"
      id="filter"
      value={filterTerm}
      onChange={handleFilterTerm}
      placeholder="Search..."
    />
  </div>
)};



export default Filter;