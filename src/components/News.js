import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewMonkey`;
  }

  async updateNews() {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=57ee6015eae2440f810435a3c5d6ff9b&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json()
    this.props.setProgress(70);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    })
    this.props.setProgress(100);

  }

  async componentDidMount() {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=57ee6015eae2440f810435a3c5d6ff9b&page=1&pageSize=${this.props.pageSize}`;
    // this.setState({loading: true});
    // let data = await fetch(url);
    // let parsedData = await data.json()
    // this.setState({articles: parsedData.articles,
    //    totalResults: parsedData.totalResults,
    //    loading: false,

    //   })
    this.updateNews();
  }

  handlePrevClick = async () => {
    // console.log("Previous");
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=57ee6015eae2440f810435a3c5d6ff9b&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    // this.setState({loading: true});
    // let data = await fetch(url);
    // let parsedData = await data.json()
    // this.setState({
    //   page : this.state.page - 1,
    //   articles: parsedData.articles,
    //   loading: false,
    // })
    this.setState({ page: this.state.page - 1 })
    this.updateNews();
  }

  handleNextClick = async () => {
    // console.log("Next");
    // if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){

    // }
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=57ee6015eae2440f810435a3c5d6ff9b&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    // this.setState({loading: true});
    // let data = await fetch(url);
    // let parsedData = await data.json()

    // this.setState({
    //   page : this.state.page + 1,
    //   articles: parsedData.articles,
    //   loading: false,
    // })
    this.setState({ page: this.state.page - 1 })
    this.updateNews()
  }

   fetchMoreData = async () => {
  this.setState({page: this.state.page + 1 });
  const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=57ee6015eae2440f810435a3c5d6ff9b&page=${this.state.page}&pageSize=${this.props.pageSize}`;
  this.setState({ loading: true });
  let data = await fetch(url);
  let parsedData = await data.json()
  this.setState({
    articles: this.state.articles.concat(parsedData.articles),
    totalResults: parsedData.totalResults,
    // loading: false,

  })
  };



  render() {
    return (
      <div className="container my-3">
        <h3 className="text-center  " style={{ margin: "35px", marginTop:"90px", }}>NewsMonkey - Top Headlines  {this.capitalizeFirstLetter(this.props.category)}</h3>
        {/* {this.state.loading && <Spinner/>} */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          // loader={<h4>Loading...</h4>}>
          loader={<Spinner/>}>
           <div className="container">

          <div className="row">
            {/* {!this.state.loading && this.state.articles.map((element)=>{ */}
            {this.state.articles.map((element) => {
              return <div className="col-md-4 my-2" key={element.url}>
                <NewsItem title={element.title ? element.title : ""} describe={element.description ? element.description : ""}
                  imageUrl={element.urlToImage ? element.urlToImage : "https://bsmedia.business-standard.com/_media/bs/img/article/2022-12/15/full/1671089488-4756.jpg"}
                  newUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
              </div>
            })}
          </div>
          </div>

        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
            <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
            <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
          </div> */}
      </div>
    );
  }
}

export default News;
