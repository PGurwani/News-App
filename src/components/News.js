import React, { useEffect, useLayoutEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";



const News = (props) => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    


    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }



    const updateNews = async () => {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
        setLoading(true)
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
        setArticles(parsedData.articles)
        setLoading(false)
        setTotalResults(parsedData.totalResults)

        props.setProgress(100)
    }
    useEffect(() => {
        // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=b208bc8ce7df4476a11a96061b68b485&page=${state.page} &pageSize=${props.pageSize}`
        // setState({ loading: true })
        // let data = await fetch(url);
        // let parsedData = await data.json()
        // console.log(parsedData);
        // setState({
        //     articles: parsedData.articles,
        //     totalResults: parsedData.totalResults,
        //     loading: false
        // })
        document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`
        updateNews();
    }, [])
    const handleNext = async () => {
        // if (!(state.page + 1 > Math.ceil(state.totalResults / `${props.pageSize}`))) {
        //     let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=b208bc8ce7df4476a11a96061b68b485&page=${state.page - 1} &pageSize=${props.pageSize}`
        //     setState({loading : true})
        //     let data = await fetch(url);
        //     let parsedData = await data.json()
        //     console.log(parsedData);
        //     setState({
        //         articles: parsedData.articles,
        //         page: state.page + 1,
        //         loading : false

        //     })
        // }


        setPage(page + 1)
        updateNews()
    }
    const handlePrevious = async () => {
        // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=b208bc8ce7df4476a11a96061b68b485&page=${this.state.page - 1} &pageSize=${props.pageSize}`
        // this.setState({loading : true})
        // let data = await fetch(url);
        // let parsedData = await data.json()
        // console.log(parsedData);
        // this.setState({
        //     articles: parsedData.articles,
        //     page: this.state.page - 1,
        //     loading : false
        // })

        setPage(page - 1)
        updateNews()
    }

    const fetchMoreData = async () => {

        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1} &pageSize=${props.pageSize}`
        setPage(page + 1)   //setPage asynchronous function hai isliye so set hone me thoda sa time le raha hai 
        // this.setState({ loading: true })
        setLoading(true)
        let data = await fetch(url);
        let parsedData = await data.json()
        // console.log(parsedData);
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
        setLoading(false)
    };


    return (

        <>
            <h1 className="text-center" style={{ marginTop: '80px' }}>NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >  <div className="container"> <div className="row">
                {/* /*Ye div lagane se horizontal scroll bar chale jayega par aisa kyu hua vo nahi samja */}
                {articles.map((element) => {
                    return <div className="col-md-4" key={element.url}>
                        <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                        {/* idhar humne null ki jagah par blank space diya hai */}
                    </div>
                })}
            </div>
                </div>

            </InfiniteScroll>
            {/* <div className="container d-flex justify-content-between">
                    <button type="button" disabled={state.page <= 1} className="btn btn-dark" onClick={handlePrevious}>&laquo; Previous</button>
                    <button type="button" disabled={state.page + 1 > Math.ceil(state.totalResults / `${props.pageSize}`)} className="btn btn-dark" onClhandleNext}>Next &raquo;</button>
                </div> */}

        </>

    )


}

export default News
News.defaultProps = {
    country: 'in',
    pageSize: 6
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number
}