const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div>
      <p>Filter</p>
      <input value={filter} onChange={handleFilterChange} />
    </div>
  );
};

export default Filter;
