import React from 'react';
import Header from './Header';
import { MainContainer } from '../styles/ComponentStyles';

function Layout({ children }) {
  return (
    <>
      <Header />
      <MainContainer>{children}</MainContainer>
    </>
  );
}

export default Layout;
