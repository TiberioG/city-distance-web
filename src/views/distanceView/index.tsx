import * as React from 'react'
import {
  useQuery,

} from '@tanstack/react-query'
import {fetchDistance, getCityByName} from "./api";
import {Button} from "baseui/button";
import {Input} from "baseui/input";

const API_URL = import.meta.env.VITE_APP_API_URL;
import * as S from "./style";
import {Select, Value} from "baseui/select";
import {JSX} from "react";

const getAutosuggestion = (city: any) => {

  if (!city) return [];
  return [
    // todo use an api like googlemaps that also returns the id of the city
    // here assuming that the name is unique
    {id: city.name, label: city.name},
  ]
}

const DistanceView = () => {
  const [input1, setInput1] = React.useState('');
  const [input2, setInput2] = React.useState('');
  const [selected1, setSelected1] = React.useState<Value>([]);
  const [selected2, setSelected2] = React.useState<Value>([]);


  const {data: distanceData, refetch: refetchDistance} = useQuery(
    ['distance', selected1, selected2],
    () => fetchDistance(selected1?.[0].id, selected2?.[0].id),
    {enabled: false} // This means the query will not run automatically on mount
  );

  const {data: city1, isLoading: isLoading1} = useQuery(
    ['city', input1],
    () => getCityByName(input1),
  );

  const {data: city2, isLoading: isLoading2} = useQuery(
    ['city', input2],
    () => getCityByName(input2),
  );

  //
  const getDistance = () => {
    refetchDistance();
  };

  const readyToFetch = selected1 && selected2 && selected1.length === 1 && selected2.length === 1;

  return (
    <S.Container>
      <Select
        overrides={{
          ControlContainer: {
            style: {
              marginBottom: '20px', // Change this to the desired margin value
            },
          },
        }}

        noResultsMsg={input1 ? 'A city with this name does not exist.' : 'Type a city name.'}
        options={
          getAutosuggestion(city1)
        }
        isLoading={isLoading1}
        value={selected1}
        onSelectResetsInput
        onInputChange={event => setInput1(event.currentTarget.value)}
        placeholder="Select first city"
        onChange={params => {
          setSelected1(params.value)
          if (params.value.length === 0) {
            setInput1('');
          }
        }}
      />
      <Select
        noResultsMsg={input2 ? 'A city with this name does not exist.' : 'Type a city name.'}
        options={
          getAutosuggestion(city2)
        }
        overrides={{
          ControlContainer: {
            style: {
              marginBottom: '20px', // Change this to the desired margin value
            },
          },
        }}
        isLoading={isLoading2}
        value={selected2}
        onSelectResetsInput
        onInputChange={event => setInput2(event.currentTarget.value)}
        placeholder="Select second city"
        onChange={params => {
          setSelected2(params.value)
          if (params.value.length === 0) {
            setInput2('');
          }
        }}
      />
      <Button disabled={!readyToFetch} onClick={getDistance}>Get Distance</Button>
      {distanceData && <p>The distance is {new Intl.NumberFormat('en-US', { maximumSignificantDigits: 4 }).format(distanceData.distance)} km.</p>}

    </S.Container>
  );
}

export default DistanceView
