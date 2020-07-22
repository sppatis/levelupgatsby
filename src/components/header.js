import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { Component, createRef } from "react"
import styled from 'styled-components'

import logo from '../images/logo.svg';
import Img from 'gatsby-image';
const HeaderContainer = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 1.45rem 1.0875rem;
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: space-between;
`;
const HeaderWrapper = styled.header`
  background: #524763;
  margin-bottom: 1.45rem;
  overflow: hidden;
  position: relative;
  height: ${({isHome}) => (
    isHome ? '70vh' : '20vh'
  )};
  h1 {
    img {
      height: 80px
    }
  }
`;
const MainNav = styled.nav`
  ul {
    display: flex;
    list-style: none;

    li {
      margin-left: 10px;

      a {
        color: white;
        text-decoration: none;
        &:hover {
          border-bottom: 3px solid #524763;
        }
      }
    }
  }
`;

const wrapper = createRef();

export default class Header extends Component {
  componentDidUpdate = (prevProps, prevState) => {
    const { location } = this.props;
    if (location.pathname !== prevProps.location.pathname) {
      if (location && location.pathname === '/') {
        wrapper.current.animate([
          { height: "20vh" },
          { height: "70vh"}
        ], {
          duration: 300,
          fill: "forwards",
          easing: "cubic-bezier(0.86, 0, 0.07, 1)",
          iterations: 1
        })
      } else {
        wrapper.current.animate([
          { height: "70vh" },
          { height: "20vh"}
        ], {
          duration: 300,
          fill: "forwards",
          easing: "cubic-bezier(0.86, 0, 0.07, 1)",
          iterations: 1
        })
      }
    }
  };
  render() {
    const { data, location } = this.props;
    return (
      <HeaderWrapper ref={wrapper} isHome={location && location.pathname === '/'}>
        <HeaderContainer>
          <h1 style={{ margin: 0 }}>
            <Link
              to="/"
              style={{
                color: `white`,
                textDecoration: `none`,
              }}
            >
            <img src={logo} alt="Level Up Tuts Logo" />
          </Link>
          </h1>
          <MainNav>
            <ul>
              <li>
                <Link to="/">
                    Home
                </Link>
              </li>
              <li>
                <Link to="/about">
                  About
                </Link>
              </li>
            </ul>
          </MainNav>
        </HeaderContainer>
        <Img
          style={{
            position: 'absolute',
            left:0,
            top:0,
            width: '100%',
            height: '100%',
            opacity: 0.3
          }}
          sizes={data.background.childImageSharp.fluid}
        />
      </HeaderWrapper>
    );
  }
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}
