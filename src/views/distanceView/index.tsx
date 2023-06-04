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


const getAutosuggestion = (cities: any) => {
  if (!cities) return [];
  return cities.map((city: any) => ({
    // todo use a better api that returns also an id
    // right now we use the name as id, assuming it is unique
    id: city.name,
    label: formatCity(city),
  }));
}

const getMessages = (input: string, fetching: boolean) => {
  if (!input) return 'Type a city name.'
  if (fetching) return 'Loading...'
  return 'Nothing found'
}

const getFlagEmoji =(countryCode : string) =>{
  return countryCode.toUpperCase().replace(/./g, char =>
    // @ts-ignore
    String.fromCodePoint(127397 + char.charCodeAt())
  );
}
const formatCity = (city: any) => {
  if (!city) return '';
  return  `${city.name} ${getFlagEmoji(city.country)}`

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


  const {data: city1, isFetching: isFetching1} = useQuery(
    ['city', debouncedInput1],
    () => getCityByName(debouncedInput1),
  );

  const {data: city2, isFetching: isFetching2} = useQuery(
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
        noResultsMsg={getMessages(input1, isFetching1)}
        options={
          getAutosuggestion(city1)
        }
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
        noResultsMsg={getMessages(input2, isFetching2)}
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
