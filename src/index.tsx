import './index.css';
import React from "react";
import { render } from "react-dom";
import { App } from "./App";
import { LanguageProvider } from './context/LanguageContext';

render(
  <LanguageProvider>
    <App />
  </LanguageProvider>,
  document.getElementById("root")
);