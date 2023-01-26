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
              id
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
    getDragon: builder.query({
      query: id => ({
        body: gql`
          query {
            dragon(id: ${id}) {
              active
              crew_capacity
              description
              diameter
              dry_mass_kg
              dry_mass_lb
              first_flight
              heat_shield {
                material
                size_meters
                temp_degrees
              }
              height_w_trunk {
                feet
                meters
              }
              launch_payload_mass {
                kg
                lb
              }
              name
              orbit_duration_yr
            }
          }
        `,
      }),
      transformResponse: response => response.dragon,
    }),
    getMissions: builder.query({
      query: () => ({
        body: gql`
          query {
            missions {
              name
              website
              manufacturers
              payloads {
                orbit
                nationality
                manufacturer
              }
            }
          }
        `,
      }),
      transformResponse: response => response.missions,
    }),
    getShips: builder.query({
      query: () => ({
        body: gql`
          query {
            ships {
              model
              name
              type
              status
            }
          }
        `,
      }),
      transformResponse: response => response.ships,
    }),
  }),
});

export const {useGetDragonsQuery, useGetMissionsQuery, useGetShipsQuery} =
  spacexApi;
