import * as React from 'react'
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import {fetchDistance, getCity} from "./api";
import {Button} from "baseui/button";
import {Input} from "baseui/input";
const API_URL = import.meta.env.VITE_APP_API_URL;
import * as S from "./style";
const DistanceView = () => {
  const [city1, setCity1] = React.useState('');
  const [city2, setCity2] = React.useState('');

  console.log(API_URL);
  // const { data: distance, refetch: refetchDistance } = useQuery(
  //   ['distance', city1, city2],
  //   () => fetchDistance(city1, city2),
  //   { enabled: false } // This means the query will not run automatically on mount
  // );

  const { data: city, refetch: refetchDistance } = useQuery(
    ['city'],
    () => getCity()
  );



  // const getDistance = () => {
  //   refetchDistance();
  // };



  return (
    <S.Container>
      <Input
        value={city1}
        onChange={(e) => setCity1(e.target.value)}
        placeholder="Enter the first city"
      />
      <Input
        value={city2}
        onChange={(e) => setCity2(e.target.value)}
        placeholder="Enter the second city"
      />
      {/*<Button onClick={getDistance}>Get Distance</Button>*/}
      {/*{distance && <p>The distance is {distance} km.</p>}*/}
      {city && <p>The city is {JSON.stringify(city)}</p>}
    </S.Container>
  );
}

export default DistanceView
