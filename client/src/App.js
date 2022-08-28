import React from "react";
import LandingPage from "./screens/landingpage/LandingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import OfficeView from "./screens/officeview/OfficeView";
import NewOffice from "./screens/newoffice/NewOffice";
import EditOffice from "./screens/editoffice/EditOffice";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const App = () => {
  const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          offices: {
            merge(existing, incoming) {
              return incoming;
            },
          },
        },
      },
    },
  });

  //Connecting to apollo server
  const client = new ApolloClient({
    uri: `${process.env.REACT_APP_API_URL}`,
    cache,
  });

  return (
    <>
      <ApolloProvider client={client}>
        <div className="main-wrapper">
          <BrowserRouter>
            <Routes>
              <Route index path="/" element={<LandingPage />} />
              <Route path="/officeview/:id" element={<OfficeView />} />
              <Route path="/newoffice" element={<NewOffice />} />
              <Route path="/officeedit/:id" element={<EditOffice />} />
            </Routes>
          </BrowserRouter>
        </div>
      </ApolloProvider>
    </>
  );
};

export default App;
