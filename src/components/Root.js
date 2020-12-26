import React, {useState, useEffect} from "react";
import {Alert, Button, Container} from "react-bootstrap";
import {useHistory} from 'react-router-dom';

import constants from '../shared/constants';
import {AuthUtil, isValidRedirectURL} from '../shared/utils';

function Root(props) {
  const history = useHistory();
  const authUtil = new AuthUtil(props.location.search);

  const [isCheckingAuth, setIsCheckingAuth] = useState(false);

  if (authUtil.shouldInitiateAuth()) {
    const redirectUrl = authUtil.getParam('redirectTo');
    localStorage.setItem('redirectUrl', redirectUrl);
  }

  useEffect(() => {
    const history = useHistory();
    const authUtil = new AuthUtil(props.location.search);

    if (authUtil.shouldInitiateAuth() === false) {
      return;
    }

    setIsCheckingAuth(true);
    fetch(`${constants.apiUrl}/auth/verify`, {
      credentials: "include"
    })
      .then(res => res.json())
      .then(res => {
        if (res.message === "SUCCESS") {
          return history.push("/?loginSuccess")
        }
        console.log(res);
      })
      .catch(console.log)
      .finally(() => {
        setIsCheckingAuth(false);
      })
  }, []);

  if (authUtil.hasLoginSucceeded) {
    const redirectUrl = localStorage.getItem('redirectUrl')
    if (isValidRedirectURL(redirectUrl)) {
      localStorage.removeItem('redirectUrl');
      window.location.href = decodeURIComponent(redirectUrl);
      return null;
    }
  }

  const accessDeniedGithub = authUtil.getParam('error') === 'access_denied';
  if (accessDeniedGithub) {
    history.push("/?accessDenied");
    return null;
  }

  const alertLoginSuccess = authUtil.hasLoginSucceeded && (
    <Alert variant={"success"}>Log in successful.</Alert>
  );

  const alertLoginFailed = authUtil.hasLoginFailed && (
    <Alert variant={"danger"}>Failed to login. Try again.</Alert>
  );

  const accessDeniedAlert = authUtil.accessDenied && (
    <Alert variant={"danger"}>You denied access. Github public data access is needed.</Alert>
  );

  const body = (
    <React.Fragment>
      {alertLoginSuccess}
      {alertLoginFailed}
      {accessDeniedAlert}
      <h3>
        Auth portal for &nbsp;
        <a href="https://apps.vighnesh153.com" target="_blank" rel="noreferrer">
          *.vighnesh153.com
        </a>
      </h3>
      {
        authUtil.hasLoginSucceeded === false && (
          <Button
            variant="dark"
            href={`${constants.apiUrl}/auth/github`}
            style={{marginTop: 20, width: 200}}
            disabled={isCheckingAuth}
          >
            {isCheckingAuth ? 'Wait...' : 'Login with github'}
          </Button>
        )
      }
    </React.Fragment>
  );

  return (
    <Container style={{marginTop: 20, textAlign: 'center', maxWidth: 700}}>
      {body}
    </Container>
  );
}

export default Root;
