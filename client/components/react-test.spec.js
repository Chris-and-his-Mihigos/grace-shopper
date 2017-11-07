import React from 'react';
import { createStore } from 'redux';
// import { range, last } from 'lodash';

import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';

chai.use(chaiEnzyme());
import { shallow } from 'enzyme';
import { spy } from 'sinon';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);
import faker from 'faker';

import AllAlbums from './allalbums.jsx';
import AlbumCard from './albumcard';
// import Cart from './cart';
// import Navigation from './navigation';
// import actualStore from '../store';
// import { MESSAGES_RECEIVED, MESSAGES_LOADING, NEW_MESSAGE } from '../../react/redux/constants';
// import { createLoadingAction, createMessagesReceivedAction, createNewMessageAction } from '../../react/redux/actions';

const createRandomAlbums = amount => range(0, amount).map(index => ({
  id: index + 1,
  releaseTitle: faker.lorem.words(),
  artists: faker.name.firstName() + faker.name.lastName(),
  genre: faker.lorem.word(),
  songsInfo: { title: faker.lorem.words(), duration: '3:40' },
  label: faker.company.companyName(),
  price: faker.commerce.price(),
  inventory: faker.random.number(),

}));
const testUtilities = {
  createRandomAlbums,
  createTenRandomAlbum: () => createRandomAlbums(10)[0],
};


describe('▒▒▒ Frontend tests ▒▒▒', () => {

  describe('AllAlbums', () => {

    describe('visual content', () => {

      // Before every `it` spec, we instantiate a new `AllAlbums` react component.
      // `AllAlbums` comes from the components/allalbums.jsx file.
      // This component will receive some data in its `Albums` prop.
      // We store this component in a testable wrapper, `AllAlbumsWrapper`.
      let AlbumData, AllAlbumsWrapper;
      beforeEach('Create <AllAlbums /> wrapper', () => {
        AlbumData = testUtilities.createRandomMessage(10);
        // creates the testable React component
        markAsReadSpy = spy();
        AllAlbumsWrapper = shallow(<AllAlbums Albums={AlbumData} />, { context: { store: actualStore } });

        if (AllAlbumsWrapper.instance().componentDidMount) {
          AllAlbumsWrapper.instance().componentDidMount();
        }
      });


      it('starts with an initial state having an empty messages array', () => {
        const currentState = AllAlbumsWrapper.state();
        expect(currentState.albums).to.be.deep.equal([]);
      });

      describe('visual content', () => {



        it('is comprised of <AlbumCard /> components ', () => {

          // This will alter the component's *local state* (i.e. `this.state`).
          AllAlbumsWrapper.setState({ albums: AlbumData });
          // There should now be a bunch of Message components in the output.
          expect(AllAlbumsWrapper.find(AlbumCard)).to.have.length(10);

          // The first album displayed in the AllAlbums should be based off of the
          // first element in the AlbumData array.
          const firstAlbum = AllAlbumsWrapper.find(AlbumCard).at(0);
          expect(firstAlbum.equals(<AlbumCard albums={AlbumData[0]} />)).to.be.true; // eslint-disable-line

          // This will set the component's local state.
          AllAlbumsWrapper.setState({ albums: AlbumData.slice(4) });
          expect(AllAlbumsWrapper.find(AlbumCard)).to.have.length(6);

        });

      });

    });
  });
});
