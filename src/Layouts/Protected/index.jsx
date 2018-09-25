import React from 'react';
import PropTypes from 'prop-types';
import Banner from '../../components/Banner';
import Footer from '../../components/Footer';
import SearchBar from '../../components/SearchBar';

const PrivateLayout = ({ children }) => (
  <div>
    <Banner />
    <SearchBar />
    <main>{children}</main>
    <Footer />
  </div>
);

PrivateLayout.propTypes = {
  children: PropTypes.element.isRequired
};

export default PrivateLayout;
