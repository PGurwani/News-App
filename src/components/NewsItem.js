import React from 'react'

const NewsItem = (props) => {
        let { title, description, imageUrl, newsUrl, author, date, source, } = props;
        return (
            <div>
                <div className="card my-3" >
                    <div className="container" style={{display : 'flex', justifyContent : 'flex-end', position : 'absolute', right : '0px'}}>
                        <span className="badge rounded-pill bg-danger" style={{ left: "90%", zIndex: "1" }}>
                            {source}
                            <span className="visually-hidden">unread messages</span>
                        </span>
                    </div>
                    <img src={!imageUrl ? "https://smartcdn.gprod.postmedia.digital/financialpost/wp-content/uploads/2023/11/elon-musk-cybertruck.jpg" : imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">

                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-muted">By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</small></p>
                        <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-primary btn-sm bg-dark">Read More</a>

                    </div>
                </div>
            </div>
        )
    }

export default NewsItem
