import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
  };
  onHandleSubmith = query => {
    this.setState({ query });
  };
  render() {
    return (
      <>
        <SearchForm onHandleSubmit={this.onHandleSubmith} />
        <Text textAlign="center">Sorry. There are no images ... 😭</Text>
      </>
    );
  }
}
