import { gql } from 'graphql-request';

export const TopSalesItemsPerPage = 100;

export const getCollections = () => {
  return gql`
    query getCollections($uuid: String!, $page: Int!, $items: Int!, $search: GetCollectionSearch, $id: [Int], $filter: GetCollectionFilter) {
      getCollections(input: { uuid: $uuid, id: $id, items: $items, search: $search, filter: $filter, page: $page, sort: [{ field: rank, order: ASC }] }) {
        total_items
        total_pages
        favorites
        collections {
          id
          collection_name
          collection_address
          rank
          value
          symbol
          type
          banner_image_url
          description
          name
          slug
          marketplace
          one_hour_volume
          one_hour_change
          one_hour_sales
          one_hour_sales_change
          one_hour_average_price
          one_hour_difference
          six_hour_volume
          six_hour_change
          six_hour_sales
          six_hour_sales_change
          six_hour_average_price
          six_hour_difference
          one_day_volume
          one_day_change
          one_day_sales
          one_day_sales_change
          one_day_average_price
          one_day_difference
          seven_day_volume
          seven_day_change
          seven_day_sales
          seven_day_average_price
          seven_day_difference
          thirty_day_volume
          thirty_day_change
          thirty_day_sales
          thirty_day_average_price
          thirty_day_difference
          total_volume
          total_sales
          total_supply
          count
          num_owners
          average_price
          num_reports
          market_cap
          floor_price
          tokens_count
          createdAt
          discord_url
          twitter_username
        }
      }
    }
  `;
};
