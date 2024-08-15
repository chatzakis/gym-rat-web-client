import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import ExercisesPage from './pages/ExercisesPage';
import EntriesPage from './pages/EntriesPage';
import EntryPage from './pages/EntryPage';
import { Route, Routes } from 'react-router-dom';
import AuthProvider from './components/AuthProvider';
import PrivateRoute from './components/PrivateRoute';
import LastEntriesPage from './pages/LastEntriesPage';
import ProgramsPage from './pages/ProgramsPage';
import ProgramPage from './pages/ProgramPage';
import ProfilePage from './pages/ProfilePage';

function App() {

  return (
    <>
      <AuthProvider>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<MainPage />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/exercises/*" element={<ExercisesPage />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/entries/*" element={<EntriesPage />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/entry/*" element={<EntryPage />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/last-entries/" element={<LastEntriesPage />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/programs/" element={<ProgramsPage />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/program/*" element={<ProgramPage />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/profile/*" element={<ProfilePage />} />
          </Route>
          <Route path='/auth/*' element={<LoginPage />}></Route>
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App
