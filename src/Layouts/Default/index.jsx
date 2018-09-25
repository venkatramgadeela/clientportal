import React from 'react';
import PropTypes from 'prop-types';
import Banner from '../../components/Banner';
import Footer from '../../components/Footer';

const DefaultLayout = ({ children }) => (
  <div>
    <Banner />
    <main>{children}</main>
    <Footer />
  </div>
);

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired
};

export default DefaultLayout;
