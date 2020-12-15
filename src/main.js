import React, {useState, useEffect} from "react";

import { useHistory } from 'react-router-dom';

import {Alert, Button, Container} from "react-bootstrap";

const isDevelopment = window.location.href.toString().startsWith('http://localhost:3000');
const apiUrl = isDevelopment ? 'http://localhost:3001' : 'https://api.vighnesh153.com';

function Main(props) {
  const { location } = props;
  const history = useHistory();

  const searchParams = new URLSearchParams(location.search);

  const hasLoginSucceeded = searchParams.has('loginSuccess');
  const hasLoginFailed = searchParams.has('failed');
  const accessDenied = searchParams.has('accessDenied');

  const [isCheckingAuth, setIsCheckingAuth] = useState(false);

  if (!hasLoginSucceeded && !hasLoginSucceeded && !accessDenied) {
    const redirectUrl = searchParams.get('redirectTo');
    localStorage.setItem('redirectUrl', redirectUrl);
  }

  useEffect(() => {
    if (!hasLoginSucceeded && !hasLoginSucceeded && !accessDenied) {
      setIsCheckingAuth(true);
    }

    fetch(`${apiUrl}/auth/verify`, {
      credentials: "include"
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
  }, []);

  if (hasLoginSucceeded) {
    const redirectUrl = localStorage.getItem('redirectUrl')
    if (redirectUrl && redirectUrl !== "null") {
      console.log(redirectUrl);
      console.log(typeof redirectUrl);
      localStorage.removeItem('redirectUrl');
      history.push(atob(redirectUrl));
      return null;
    }
  }

  const accessDeniedGithub = searchParams.get('error') === 'access_denied';
  if (accessDeniedGithub) {
    history.push("/?accessDenied");
    return null;
  }

  const alertLoginSuccess = hasLoginSucceeded && (
    <Alert variant={"success"}>Log in successful.</Alert>
  );

  const alertLoginFailed = hasLoginFailed && (
    <Alert variant={"danger"}>Failed to login. Try again.</Alert>
  );

  const accessDeniedAlert = accessDenied && (
    <Alert variant={"danger"}>You denied access. Github public data access is needed.</Alert>
  );

  return (
    <Container style={{marginTop: 20}}>
      { alertLoginSuccess }
      { alertLoginFailed }
      { accessDeniedAlert }
      <h3>Welcome to Auth portal for https://*.vighnesh153.com</h3>
      {
        hasLoginSucceeded === false && (
          <Button
            variant="dark"
            href={`${apiUrl}/auth/github`}
            style={{marginTop: 20}}
          >
            Login
          </Button>
        )
      }
    </Container>
  );
}

export default Main;
