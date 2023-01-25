import {createApi} from '@reduxjs/toolkit/query/react';
import {request, gql, ClientError} from 'graphql-request';

const graphqlBaseQuery =
  ({baseUrl}: {baseUrl: string}) =>
  async ({body}: {body: string}) => {
    try {
      const result = await request(baseUrl, body);
      return {data: result};
    } catch (error) {
      if (error instanceof ClientError) {
        return {error: {status: error.response.status, data: error}};
      }
      return {error: {status: 500, data: error}};
    }
  };

export const spacexApi = createApi({
  baseQuery: graphqlBaseQuery({
    baseUrl: 'https://spacex-production.up.railway.app/',
  }),
  endpoints: builder => ({
    getDragons: builder.query({
      query: () => ({
        body: gql`
          query {
            dragons {
              name
              first_flight
              diameter {
                feet
              }
              launch_payload_mass {
                lb
              }
            }
          }
        `,
      }),
      transformResponse: response => response.dragons,
    }),
  }),
});

export const {useGetDragonsQuery} = spacexApi;
