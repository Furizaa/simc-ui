/* eslint react/jsx-props-no-spreading: off */
import React from 'react';
import { useRouter } from './modules/shared/context/RouterContext';

const LazySimulationApp = React.lazy(
  () => import(/* webpackChunkName: "SimulationApp" */ './modules/sim/views/SimulationHome'),
);
const LazySimulationWelcome = React.lazy(
  () => import(/* webpackChunkName: "SimulationWelcome" */ './modules/sim/views/Welcome'),
);
const LazySimulationCreate = React.lazy(
  () => import(/* webpackChunkName: "SimulationCreate" */ './modules/sim/views/CreateNewSimulation'),
);

const SimulationView = (props: Record<string, any>) => (
  <React.Suspense fallback={<h1>Loading...</h1>}>
    <LazySimulationApp {...props} />
  </React.Suspense>
);

const SimulationWelcomeView = (props: Record<string, any>) => (
  <React.Suspense fallback={<h1>Loading...</h1>}>
    <LazySimulationWelcome {...props} />
  </React.Suspense>
);

const SimulationCreate = (props: Record<string, any>) => (
  <React.Suspense fallback={<h1>Loading...</h1>}>
    <LazySimulationCreate {...props} />
  </React.Suspense>
);

export default function Routes() {
  const { currentRoute } = useRouter();
  return (
    <React.Suspense fallback={<h1>Loading...</h1>}>
      {currentRoute === 'SIM_HOME' && <SimulationView />}
      {currentRoute === 'SIM_NEW_USER_EXPERIENCE' && <SimulationWelcomeView />}
      {currentRoute === 'SIM_CREATE_NEW' && <SimulationCreate />}
    </React.Suspense>
  );
}
