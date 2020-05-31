import React from 'react'
import { mount } from 'enzyme'
import App from './App'

describe('App' , () => {

    let app = mount(<App/>);
    it('if App render the title' , () => {
        //console.log(app.debug()); --> used to get id's and classes
        expect(app.find('h2').text()).toEqual('Note to Self');
    });

    it('renders clear button' ,() => {
        expect(app.find('.btn').at(1).text()).toEqual('Clear Notes');
    });

    describe('when rendersing  App Form' , () => {
        it('creates Form' , () => {
          expect(app.find('Form').exists()).toBe(true);
        });

        it('renders Form Control', () => {
            expect(app.find('FormControl').exists()).toBe(true);
        });

        it('renders submit button', () => {
            expect(app.find('.btn').at(0).text()).toEqual('Submit');
        });
    });

    describe('when creating a note' , () => {
        let testnote = 'test note' ;
        // beforeEach is used to do teh task before actual testing 
        /*
           If you have code that’s common across multiple tests, you can use beforeEach to do 
           some setup before each test runs in order to avoid repetition. In this case, if you 
           have multiple tests that shallow mount Component, you can move the shallow mount to 
           a beforeEach, and the component will be mounted when every test runs. Generally you’ll 
           want to pair this with an afterEach, where you call wrapper.unmount().

        */
        beforeEach(() => {
             app.find('FormControl').simulate('change' , { target : { value :testnote }
           });
        });

        it('updates text value to state' , () => {
            // console.log(app.state());
           expect(app.state().text).toEqual(testnote);
        });

        describe('updates value in state' , () => {

            beforeEach(() => {
                app.find('.btn').at(0).simulate('click');
                });
            
            // stop submitting text twice , after submit clear the text
            afterEach(() => {
                app.find('.btn').at(1).simulate('click');
            });
                       
            it('check state' , () => {
                // console.log(app.state()); { text: 'test note', notes: [ { text: 'test note' } ] }
                expect(app.state().notes).toEqual([{ text: 'test note' }]);
            });

            describe('remounts the component', () => {
                let app2;

                beforeEach(() => {
                    app2 = mount(<App />);
                });

                it('reads data from cookies', () => {
                    console.log(app.state());
                    expect(app2.state().notes[0].text).toEqual(testnote);
                });
            });
        });       


        describe('clears the state' , () => {
            let notes = []; 
            beforeEach(() => {
                app.find('.btn').at(1).simulate('click');
            });

            it('when text is cleared from state' , () => {
               // console.log(app.state()); 
                    expect(app.state().notes).toEqual(notes);
            });
        });
    });
});


/* 
 test coverage command --> $ npm test -- --coverage

> notetoself@0.1.0 test C:\Deepa\react_testing\notetoself
> react-scripts test "--coverage"

PASS src/components/Note.test.js
PASS src/components/App.test.js
  ● Console

    console.log src/components/App.test.js:76
      { text: 'test note', notes: [ { text: 'test note' } ] }

----------------|----------|----------|----------|----------|-------------------|
File            |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
----------------|----------|----------|----------|----------|-------------------|
All files       |    94.44 |      100 |      100 |    94.44 |                   |
 src            |        0 |      100 |      100 |        0 |                   |
  index.js      |        0 |      100 |      100 |        0 |                 6 |
 src/components |      100 |      100 |      100 |      100 |                   |
  App.js        |      100 |      100 |      100 |      100 |                   |
  Note.js       |      100 |      100 |      100 |      100 |                   |
----------------|----------|----------|----------|----------|-------------------|

Test Suites: 2 passed, 2 total
Tests:       10 passed, 10 total
Snapshots:   0 total
Time:        6.959s
Ran all test suites related to changed files.

*/