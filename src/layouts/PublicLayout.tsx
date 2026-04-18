import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import type { ReactElement } from 'react';

const Home      = lazy(() => import('../pages/Home'));
const Login     = lazy(() => import('../pages/Login'));
const About     = lazy(() => import('../pages/about/About'));
const Prereqs   = lazy(() => import('../pages/prereqs/Prereqs'));
const Intro     = lazy(() => import('../pages/intro/Intro'));
const Agents    = lazy(() => import('../pages/agents/Agents'));
const Patterns  = lazy(() => import('../pages/patterns/Patterns'));
const Skills    = lazy(() => import('../pages/skills/Skills'));
const Teams     = lazy(() => import('../pages/teams/Teams'));
const Memory    = lazy(() => import('../pages/memory/Memory'));
const Practice  = lazy(() => import('../pages/practice/Practice'));
const Tutorials = lazy(() => import('../pages/tutorials/Tutorials'));
const Build     = lazy(() => import('../pages/build/Build'));
const Resources = lazy(() => import('../pages/community/Resources'));
const QnA       = lazy(() => import('../pages/community/QnA'));
const FAQ       = lazy(() => import('../pages/community/FAQ'));
const Board     = lazy(() => import('../pages/community/Board'));
const NotFound  = lazy(() => import('../pages/NotFound'));

function LoadingFallback(): ReactElement {
  return (
    <div className="loading-page">
      <div className="loading-spinner" />
    </div>
  );
}

export default function PublicLayout(): ReactElement {
  return (
    <div className="site-wrapper">
      <Navbar />
      <main className="site-main">
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/"                      element={<Home />}      />
            <Route path="/login"                 element={<Login />}     />
            <Route path="/about"                 element={<About />}     />
            <Route path="/prereqs"               element={<Prereqs />}   />
            <Route path="/intro"                 element={<Intro />}     />
            <Route path="/agents"                element={<Agents />}    />
            <Route path="/patterns"              element={<Patterns />}  />
            <Route path="/skills"                element={<Skills />}    />
            <Route path="/teams"                 element={<Teams />}     />
            <Route path="/memory"                element={<Memory />}    />
            <Route path="/practice"              element={<Practice />}  />
            <Route path="/tutorials"             element={<Tutorials />} />
            <Route path="/build"                 element={<Build />}     />
            <Route path="/community/resources"   element={<Resources />} />
            <Route path="/community/qna"         element={<QnA />}       />
            <Route path="/community/faq"         element={<FAQ />}       />
            <Route path="/community/board"       element={<Board />}     />
            <Route path="*"                      element={<NotFound />}  />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
