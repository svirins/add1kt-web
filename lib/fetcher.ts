import { request } from 'graphql-request';

const endpoint = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`;

const headers = {
  authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`
};

async function apiRequest(query, variables) {
  try {
    const data = await request({
      url: endpoint,
      document: query,
      variables: variables,
      requestHeaders: headers
    });
    return data;
  } catch (error) {
    console.error(JSON.stringify(error));
    return error;
  }
}
export default apiRequest;
