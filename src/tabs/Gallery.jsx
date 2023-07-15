import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem, Loader } from 'components';

export class Gallery extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    isEmpty: false,
    showBtn: false,
    isError: '',
    isLoading: false,
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.setState({ isLoading: true })
      ImageService.getImages(query, page).then(({ photos, total_results }) => {
        if (photos.length === 0) {
          this.setState({ isEmpty: true });
          return;
        }
        this.setState(prevState => ({
          images: [...prevState.images, ...photos],
          showBtn: page < Math.ceil(total_results / 15),
        }));
      }).catch((error) => { this.setState({ isError: error.message }) }).finally(() => {
        this.setState({ isLoading: false })
      })
    }
  }

  onHandleSubmith = query => {
    this.setState({
      query, page: 1, images: [], isEmpty: false, showBtn: false,
      isError: '',
    });
  };

  handleClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, isEmpty, showBtn, isError, isLoading } = this.state;
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
        {isError && (
          <Text textAlign="center">Sorry. {isError} ... 😭</Text>
        )}
        {showBtn && <Button onClick={this.handleClick}>Load more</Button>}
        {isLoading && <Loader />}
      </>
    );
  }
}
