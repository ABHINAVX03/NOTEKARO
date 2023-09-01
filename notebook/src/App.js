import './App.css';
import NavBar from './Components/NavBar';
import Home from './Components/Home';
import About from './Components/About';
import NoteState from './context/notes/NoteState';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Alert from './Components/Alert';
import SignUp from './Components/SignUp';
import Login from './Components/Login';
import { useState } from 'react';
import Contact from './Components/Contact';
import LoadingBar from 'react-top-loading-bar'
import NotFound from './Components/NoteFound';

function App() {
  const [alert, setalert] = useState(null)
  const [progress, setProgress] = useState(0)

  const showalert = (message, type) => {
    setalert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setalert(null)
    }, 1500);
  }
  return (
    <>
      <NoteState setProgress={setProgress}>
        <BrowserRouter>
          <LoadingBar color='#f11946' progress={progress} />
          <NavBar showalert={showalert} setProgress={setProgress}/>
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route exact path='/' element={<Home setProgress={setProgress} showalert={showalert} title={"Home"} />}></Route>
              <Route exact path='about' element={<About title={"About"} />}></Route>
              <Route exact path='contact' element={<Contact title={"Contact"}/>}></Route>
              <Route exact path='login' element={<Login setProgress={setProgress} showalert={showalert} title={"Login"}/>}></Route>
              <Route exact path='signup' element={<SignUp setProgress={setProgress} showalert={showalert} title={"Signup"} />}></Route>
              <Route path='*' element={<NotFound />}/>
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
