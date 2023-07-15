import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    isEmpty: false,
    showBtn: false,
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      ImageService.getImages(query, page).then(({ photos, total_results }) => {
        if (photos.length === 0) {
          this.setState({ isEmpty: true });
          return;
        }
        this.setState(prevState => ({
          images: [...prevState.images, ...photos],
          showBtn: page < Math.ceil(total_results / 15),
        }));
      });
    }
  }

  onHandleSubmith = query => {
    this.setState({ query, page: 1, images: [], isEmpty: false });
  };

  handleClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, isEmpty, showBtn } = this.state;
    return (
      <>
        <SearchForm onHandleSubmit={this.onHandleSubmith} />
        <Grid>
          {images.map(({ id, src, alt, avg_color }) => (
            <GridItem key={id}>
              <CardItem color={avg_color}>
                <img src={src.large} alt={alt} />
              </CardItem>
            </GridItem>
          ))}
        </Grid>
        {isEmpty && (
          <Text textAlign="center">Sorry. There are no images ... 😭</Text>
        )}
        {showBtn && <Button onClick={this.handleClick}>Load more</Button>}
      </>
    );
  }
}
