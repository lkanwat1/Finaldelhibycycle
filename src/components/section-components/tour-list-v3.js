import React, { Component } from "react";
import ImageLazyLoad from "../section-components/ImageLazyLoad";
import { Link } from "react-router-dom";

class TourListV3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      locationFilter: "",
      priceFilter: 0,
      updatedContent: null,
    };
  }

  componentDidMount() {
    const updatedContent = this.renderFilteredData();
    this.setState({ updatedContent });
  }

  handleSearch = (e) => {
    this.setState({ query: e.target.value, updatedContent: null });
  };

  handleLocationFilter = (e) => {
    this.setState({ locationFilter: e.target.value, updatedContent: null });
  };

  handlePriceFilter = (e) => {
    const priceFilter = parseInt(e.target.value);
    this.setState({ priceFilter, updatedContent: null });
  };

  renderFilteredData() {
    const { query, locationFilter, priceFilter } = this.state;
    const filteredData = this.props.data.filter((singleContent) => {
      const lowercaseQuery = query.toLowerCase();
      const lowercaseLocation = singleContent.location.toLowerCase();

      return (
        (singleContent.name.toLowerCase().includes(lowercaseQuery) ||
          lowercaseQuery === "") &&
        (locationFilter === "" ||
          lowercaseLocation.includes(locationFilter.toLowerCase()))
      );
    });

    if (priceFilter === 0) {
      filteredData.sort((a, b) => {
        return (
          parseInt(a.price.replace(",", "")) -
          parseInt(b.price.replace(",", ""))
        );
      });
    } else if (priceFilter === 1) {
      filteredData.sort((a, b) => {
        return (
          parseInt(b.price.replace(",", "")) -
          parseInt(a.price.replace(",", ""))
        );
      });
    }

    return filteredData.map((singleContent) => {
      const {
        imagewebp,
        imagejpeg,
        alt,
        location,
        duration,
        name,
        link,
        price,
      } = singleContent;

      return (
        <div className="col-lg-4 col-sm-6" key={link}>
          <div className="single-destinations-list style-two">
            <Link to={link}>
              <div className="thumb">
                <ImageLazyLoad
                  imagejpeg={imagejpeg}
                  imagewebp={imagewebp}
                  alt={alt}
                />
              </div>

              <div className="details">
                <p className="location">
                  <img
                    src={
                      "https://delhibycycle.s3.ap-south-1.amazonaws.com/1.png"
                    }
                    alt="map"
                  />
                  {location}
                </p>
                <h4 className="title">
                  <Link to={link}>{name}</Link>
                </h4>
                <p className="content">{duration}</p>
                <div className="tp-price-meta">
                  <h2>INR {price}</h2>
                </div>
              </div>
            </Link>
          </div>
        </div>
      );
    });
  }

  render() {
    const { query, locationFilter, priceFilter, updatedContent } = this.state;

    return (
      <div className="tour-list-area pd-top-120 viaje-go-top">
        <div className="container">
          <div className="row">
            <div className="col-xl-9 col-lg-8 order-lg-12">
              <div className="row justify-content-center">
                {updatedContent ? updatedContent : this.renderFilteredData()}
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 order-lg-1">
              <div className="sidebar-area sidebar-area-inner-page">
                <div className="widget tour-list-widget">
                  <div className="widget-tour-list-search">
                    <form className="search-form">
                      <div className="form-group">
                        <input
                          type="text"
                          value={query}
                          onChange={this.handleSearch}
                          placeholder="Search"
                        />
                      </div>
                      <button className="submit-btn" type="submit">
                        <i className="ti-search" />
                      </button>
                    </form>
                  </div>
                  <div className="widget-tour-list-meta">
                    <div className="filter">
                      <i className="fa fa-plus-circle" /> Location
                    </div>
                    <div className="filter">
                      <select
                        className="select w-100 custom-select"
                        value={locationFilter}
                        onChange={this.handleLocationFilter}
                      >
                        <option value={""}>All Tours</option>
                        <option value={"Old Delhi"}>Old Delhi</option>
                        <option value={"New Delhi"}>New Delhi</option>
                        <option value={"Agra"}>Agra</option>
                        <option value={"Rajashthan"}>Rajasthan</option>
                        <option value={"Goa"}>Goa</option>
                      </select>
                    </div>

                    <div className="filter">
                      <i className="fa fa-plus-circle" /> Travel Type
                    </div>
                    <div className="filter">
                      <select className="select w-100 custom-select">
                        <option value={1}>Day Cycle Tour</option>
                        <option value={2}>Walking Tour</option>
                        <option value={3}>Cycling Holidays</option>
                      </select>
                    </div>

                    <div className="filter">
                      <i className="fa fa-usd" /> Price Filter
                    </div>
                    <div className="filter">
                      <select
                        className="select w-100 custom-select"
                        value={priceFilter}
                        onChange={this.handlePriceFilter}
                      >
                        <option value={0}>Low - High</option>
                        <option value={1}>High - Low</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TourListV3;
