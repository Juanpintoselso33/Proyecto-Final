import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import CardProduc from "../../styles/CardProduc.css";




export const CardProducts = () => {
    const { store, actions } = useContext(Context);
    const Fila_1 = { height: "250px" }



    return (
        <div className="home">
            <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="false" >
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item">
                        <div className="cards-wrapper">
                            <div className="card">
                                <div className="p1">
                                    <img src="https://nolosabia.net/wp-content/uploads/2014/05/rana.jpg" className="card-img-top" alt="..." />
                                </div>
                                <div className="card-body ">
                                    <h5 className="card-title"><strong>Completa casera</strong></h5>
                                    <p className="card-text">$90</p>

                                </div>
                            </div>
                            <div className="card">
                                <div className="p1">
                                    <img src="https://nolosabia.net/wp-content/uploads/2014/05/rana.jpg" className="card-img-top" alt="..." />
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title"><strong>Completa casera</strong></h5>
                                    <p className="card-text">$90</p>

                                </div>
                            </div>
                            <div className="card">
                                <div className="p1">
                                    <img src="https://nolosabia.net/wp-content/uploads/2014/05/rana.jpg" className="card-img-top" alt="..." />
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title"><strong>Completa casera</strong></h5>
                                    <p className="card-text">$90</p>

                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="carousel-item active">
                        <div className="cards-wrapper">
                            <div className="card">
                                <div className="p1">
                                    <img src="https://nolosabia.net/wp-content/uploads/2014/05/rana.jpg" className="card-img-top" alt="..." />
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title"><strong>Completa casera</strong></h5>
                                    <p className="card-text">$90</p>

                                </div>
                            </div>
                            <div className="card">
                                <div className="p1">
                                    <img src="https://nolosabia.net/wp-content/uploads/2014/05/rana.jpg" className="card-img-top" alt="..." />
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title"><strong>Completa casera</strong></h5>
                                    <p className="card-text">$90</p>

                                </div>
                            </div>
                            <div className="card">
                                <div className="p1">
                                    <img src="https://nolosabia.net/wp-content/uploads/2014/05/rana.jpg" className="card-img-top" alt="..." />
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title"><strong>Completa casera</strong></h5>
                                    <p className="card-text">$90</p>

                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="carousel-item">
                        <div className="cards-wrapper">
                            <div className="card">
                                <div className="p1">
                                    <img src="https://nolosabia.net/wp-content/uploads/2014/05/rana.jpg" className="card-img-top" alt="..." />
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title"><strong>Completa casera</strong></h5>
                                    <p className="card-text">$90</p>

                                </div>
                            </div>
                            <div className="card">
                                <div className="p1">
                                    <img src="https://nolosabia.net/wp-content/uploads/2014/05/rana.jpg" className="card-img-top" alt="..." />
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title"><strong>Completa casera</strong></h5>
                                    <p className="card-text">$90</p>

                                </div>
                            </div>
                            <div className="card">
                                <div className="p1">
                                    <img src="https://nolosabia.net/wp-content/uploads/2014/05/rana.jpg" className="card-img-top" alt="..." />
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title"><strong>Completa casera</strong></h5>
                                    <p className="card-text">$90</p>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

        </div>

    )



};
