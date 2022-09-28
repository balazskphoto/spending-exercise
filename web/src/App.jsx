import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SpendingForm from "./components/SpendingForm";
import FiltersAndOrderings from "./components/FiltersAndOrderings";
import SpendingList from "./components/SpendingList";
import Layout from "./components/Layout";

export default function App() {
  const [spendings, setSpendings] = useState([]);

  return (
    <Layout>
      <SpendingForm />
      <FiltersAndOrderings />
      <SpendingList spendings={spendings} setSpendings={setSpendings} />
      <ToastContainer />
    </Layout>
  );
}
