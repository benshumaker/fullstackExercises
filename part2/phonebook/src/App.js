import { useState, useEffect } from "react";
import List from "./components/List";
import AddNameForm from "./components/AddNameForm";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import api from "./services/api";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.getAll().then((newPersons) => {
      setPersons(newPersons);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (persons.find((person) => person.name === newName)) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const person = persons.find((person) => person.name === newName);
        const changedPerson = { ...person, number: newNumber };
        api
          .update(person.id, changedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== returnedPerson.id ? person : returnedPerson
              )
            );
            setMessage(
              `Updated ${returnedPerson.name}'s number to ${returnedPerson.number}`
            );
            setTimeout(() => {
              setMessage(null);
            }, 5000);
          })
          .catch((error) => {
            setMessage(
              `Information of ${person.name} has already been removed from server`
            );
            setError(true);
            setTimeout(() => {
              setMessage(null);
              setError(false);
            }, 5000);
            setPersons(persons.filter((p) => p.id !== person.id));
          });
      }
      return;
    }
    api.create({ name: newName, number: newNumber }).then((newPerson) => {
      setPersons(persons.concat(newPerson));
      setMessage(
        `Added ${newPerson.name} with number ${newPerson.number} to phonebook`
      );
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    });
    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} error={error} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>Add New</h2>
      <AddNameForm
        handleSubmit={handleSubmit}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <List
        persons={persons.filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        )}
        setPersons={setPersons}
      />
    </div>
  );
};

export default App;
