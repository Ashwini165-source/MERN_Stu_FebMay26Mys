import { useState } from 'react'
// import ManangingApiState from './components/p1'
//import { UseEffectLifecycle } from './components/p2'
//import { AxiosLifecycle } from './components/P3';
//import { CRUDOperation } from './components/P4';
//import { PaginationCaching } from './components/P5';
import { UploadErrorBoundary } from './components/P6';

import './App.css'

function App() {
  return (
    <>
      {/* <ManangingApiState /> */}
      {/* <UseEffectLifecycle /> */}
      {/* <AxiosLifecycle/> */}
      {/* <CRUDOperation/> */}
      {/* <PaginationCaching/> */}
      <UploadErrorBoundary/>
      
    </>
  )
}

export default App;