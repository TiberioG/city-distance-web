import * as React from 'react'
import {Client as Styletron} from 'styletron-engine-atomic';
import {Provider as StyletronProvider} from 'styletron-react';
import {LightTheme, BaseProvider} from 'baseui';
import DistanceView from "./views/distanceView";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const engine = new Styletron();
const queryClient = new QueryClient()


const App = () => {

  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <QueryClientProvider client={queryClient}>
          <DistanceView/>
        </QueryClientProvider>
      </BaseProvider>
    </StyletronProvider>
  )
}

export default App
