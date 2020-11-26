import React from 'react'
import { MemoList } from './components/MemoList';
import { MemoForm } from './components/MemoForm';
import { MemoContextProvider } from "./context/MemoContextProvider";
import "./App.css"

export default function App() {

  return (
    <div className="App">
      <header></header>
      <div className="content">
        <MemoContextProvider>
          <MemoForm />
          <MemoList />
        </MemoContextProvider>
      </div>
      <footer></footer>
    </div>
  );
}