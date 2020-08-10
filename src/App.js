import React, { useState, useEffect } from "react";
import Amplify, { Auth } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import awsconfig from "./aws-exports";
import { CustomStorage } from "./CustomStorage";

Amplify.configure({
  Auth: {
    identityPoolId: awsconfig.aws_cognito_identity_pool_id,
    region: awsconfig.aws_project_region,
    userPoolId: awsconfig.aws_user_pools_id,
    userPoolWebClientId: awsconfig.aws_user_pools_web_client_id,
    // cookieStorage: {
    //   domain: "lvh.me",
    //   secure: false,
    // },
    storage: new CustomStorage({
      domain: "lvh.me",
      secure: false,
    }),
  },
});

function App() {
  const [state, setState] = useState({ username: "", password: "" });

  useEffect(() => {
    Auth.currentAuthenticatedUser().then((user) => console.log(user));
  }, []);

  async function signIn() {
    await Auth.signOut();
    Auth.signIn(state.username, state.password);
  }

  function signOut() {
    Auth.signOut();
  }

  return (
    <div>
      <input
        placeholder="Username"
        onChange={(e) => setState({ ...state, username: e.target.value })}
      />
      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setState({ ...state, password: e.target.value })}
      />
      <button onClick={signIn}>Sign In</button>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}

export default App;
