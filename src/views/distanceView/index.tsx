import * as React from 'react'
import {
  useQuery,
} from '@tanstack/react-query'
import {fetchDistance, getCityByName} from "./api";
import {Button} from "baseui/button";
import * as S from "./style";
import {Select, Value} from "baseui/select";
import {Card, StyledBody} from "baseui/card";
import {Heading, HeadingLevel} from "baseui/heading";
import {useDebounce} from "use-debounce";


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

  const [debouncedInput1] = useDebounce(input1, 500);
  const [debouncedInput2] = useDebounce(input2, 500);
  const {
    data: distanceData,
    refetch: refetchDistance,
    isRefetching: refetchingDistance,
    isFetching: isFetchingDistance
  } = useQuery(
    ['distance', selected1, selected2],
    () => fetchDistance(selected1?.[0].id, selected2?.[0].id),
    {enabled: false} // This means the query will not run automatically on mount
  );

  const {data: city1, isFetching: isLoading1} = useQuery(
    ['city', debouncedInput1],
    () => getCityByName(debouncedInput1),
  );

  const {data: city2, isFetching: isLoading2} = useQuery(
    ['city', debouncedInput2],
    () => getCityByName(debouncedInput2),
  );

  const getDistance = () => {
    refetchDistance();
  };

  const readyToFetch = selected1 && selected2 && selected1.length === 1 && selected2.length === 1;

  return (
    <S.Container>

      <HeadingLevel>
        <Heading>Distance between two cities</Heading>
      </HeadingLevel>

      <S.Content>
      <Select
        overrides={{
          ControlContainer: {
            style: {
              marginBottom: '20px',
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
              marginBottom: '20px',
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
      <Button disabled={!readyToFetch} onClick={getDistance} isLoading={isFetchingDistance}>Get Distance</Button>
      {distanceData &&

        <Card overrides={{
          Root: {
            style: {
              marginTop: '20px',
            }
          }
        }}>
          <StyledBody>
            The distance
            is {new Intl.NumberFormat('en-US', {maximumSignificantDigits: 4}).format(distanceData.distance)} km
          </StyledBody>
        </Card>
      }
      </S.Content>
    </S.Container>
  );
}

export default DistanceView
