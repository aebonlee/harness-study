import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import type { ReactElement } from 'react';

const Home     = lazy(() => import('../pages/Home'));
const Login    = lazy(() => import('../pages/Login'));
const Intro    = lazy(() => import('../pages/intro/Intro'));
const Agents   = lazy(() => import('../pages/agents/Agents'));
const Patterns = lazy(() => import('../pages/patterns/Patterns'));
const Skills   = lazy(() => import('../pages/skills/Skills'));
const Teams    = lazy(() => import('../pages/teams/Teams'));
const Memory   = lazy(() => import('../pages/memory/Memory'));
const Practice  = lazy(() => import('../pages/practice/Practice'));
const Tutorials = lazy(() => import('../pages/tutorials/Tutorials'));
const Build      = lazy(() => import('../pages/build/Build'));
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
            <Route path="/"         element={<Home />} />
            <Route path="/login"    element={<Login />} />
            <Route path="/intro"    element={<Intro />} />
            <Route path="/agents"   element={<Agents />} />
            <Route path="/patterns" element={<Patterns />} />
            <Route path="/skills"   element={<Skills />} />
            <Route path="/teams"    element={<Teams />} />
            <Route path="/memory"   element={<Memory />} />
            <Route path="/practice"  element={<Practice />} />
            <Route path="/tutorials" element={<Tutorials />} />
            <Route path="/build"     element={<Build />} />
            <Route path="*"          element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
