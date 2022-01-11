import axios from "axios";
import { useContext, useEffect, useState } from "react";
import FilePondDemo from "../components/FilePondDemo";
import UpdateUserImage from "../components/UpdateUserImage";
import { AuthContext } from "../providers/AuthProvider";
const Home = () => {
  const auth = useContext(AuthContext);

  return (
    <div>
      <h1>Home!</h1>
      <code>{JSON.stringify(auth)}</code>
      <hr />
      <h1>FilePondDemo 1</h1>
      <FilePondDemo />
      <h1>FilePondDemo 2</h1>
      <UpdateUserImage />
    </div>
  );
};
export default Home;
