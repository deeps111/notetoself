import React, { Component } from 'react'
import { Form, FormControl,Button } from 'react-bootstrap'
import Note from './Note';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies'

const cookie_key = "NOTES";

class App extends Component {
    state = {
        text: '',
        notes: []
    }

    componentDidMount() {
        this.setState({ notes: read_cookie(cookie_key) });
    }

    handleSubmit = () => {
        const { notes, text } = this.state;
        notes.push({ text });
        // console.log("text : "+text);
        this.setState({ notes });
        bake_cookie(cookie_key, notes);
    }

    handleRemove = () => {
        delete_cookie(cookie_key)
        // this.setState({ notes : delete_cookie(cookie_key)}); notes &&
        this.setState({ notes: [] });
    }

    render() {
        const { notes } = this.state;
        return (
            <div>
                <h2>Note to Self</h2>
                <Form>
                    <FormControl onChange={event => this.setState({ text: event.target.value })} /> <br/> {" "}
                    <Button onClick={this.handleSubmit}>Submit</Button><br />
                </Form>
                    {notes.map((item, index) => {
                        return (
                            <Note key={index} note={item} />
                              )
                    }
                    )}                  
              
                <hr />  
                <Button onClick={this.handleRemove}>Clear Notes</Button>
            </div>
        )
    }
}

export default App;