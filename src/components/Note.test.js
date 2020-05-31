import React from 'react'
import { mount } from 'enzyme'
import Note from './Note'

const props = { note: { text: 'text note' }} ;
describe('Note' , () => {
  // let note = mount(<Note note = {props.note} />);
    let note = mount(<Note {...props} />);
    //console.log({...props});
   it('note renders text' , () => {
      // console.log(note.debug());
      // console.log(note.find('p').text());
       expect(note.find('p').text()).toEqual('text note');
   })
});