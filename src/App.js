import './App.css';
// бібліотеки json //

import { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

// all import //
import Container from './components/Container/Container';
import ContactForm from './components/ContactForm';
import Filter from './components/Filter';
import ContactList from './components/ContactList';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  formSubmitHandler = data => {
    const { contacts } = this.state;

    if (contacts.some(el => el.name === data.name)) {
      return alert(`${data.name} is already in contacts`);
    } else {
      contacts.push({
        id: uuidv4(),
        name: data.name,
        number: data.number,
      });
      this.setState({ ...contacts });
    }
    return;
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  deleteContacts = idContacts => {
    this.setState(prev => ({
      contacts: prev.contacts.filter(el => el.id !== idContacts),
    }));
  };
  render() {
    const { filter, contacts } = this.state;

    const normalize = filter.toLowerCase();
    const visibleFilter = contacts.filter(el =>
      el.name.toLowerCase().includes(normalize),
    );
    return (
      <div className="App">
        <Container>
          <h1>Phonebook</h1>
          <ContactForm onSubmit={this.formSubmitHandler} />
          <h2>Contacts</h2>
          <Filter filter={this.state.filter} changeFilter={this.changeFilter} />
          <ContactList
            contacts={visibleFilter}
            onDelete={this.deleteContacts}
          ></ContactList>
        </Container>
      </div>
    );
  }
}

export default App;