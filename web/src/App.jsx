import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Form from "./components/Form";
import FiltersAndOrderings from "./components/FiltersAndOrderings";
import SpendingList from "./components/SpendingList";
import Layout from "./components/Layout";

export default function App() {
  const [spendings, setSpendings] = useState([]);

  return (
    <Layout>
      <Form />
      <FiltersAndOrderings />
      <SpendingList spendings={spendings} setSpendings={setSpendings} />
      <ToastContainer />
    </Layout>
  );
}
