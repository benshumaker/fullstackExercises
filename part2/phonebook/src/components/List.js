import api from "../services/api";

const List = ({ persons, setPersons }) => {
  const deletePerson = (id) => {
    const person = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${person.name}?`)) {
      api.deletePerson(id);
      setPersons(persons.filter((person) => person.id !== id));
    }
  };

  return (
    <ul>
      {persons.map((person) => (
        <li key={person.name}>
          {person.name} : {person.number}{" "}
          <button onClick={() => deletePerson(person.id)}>delete</button>
        </li>
      ))}
    </ul>
  );
};

export default List;
