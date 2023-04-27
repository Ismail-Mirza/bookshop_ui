import React from 'react';
import './SecondaryNav.css';
import { Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const SecondaryNav = () => {
    return (
        <div className="secondaryNav">
            <ul className="nav nav-pills">
                <li className="dropdown">
                    <Nav.Link data-toggle="dropdown">
                        <span>Shop by category </span><FontAwesomeIcon icon={faChevronDown} />
                    </Nav.Link>
                    <ul style={{ marginTop: "1px", width: "180px" }} className="dropdown-menu" id="menu1">
                        <li>
                            <Nav.Link>
                                <span>Top Categories </span><FontAwesomeIcon icon={faChevronRight} />
                            </Nav.Link>
                            <ul className="dropdown-menu sub-menu">
                                <li>
                                    <Nav.Link>
                                        <span>Action</span>
                                    </Nav.Link>
                                </li>
                                <li>
                                    <Nav.Link>
                                        <span>Action</span>
                                    </Nav.Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Nav.Link>
                                <span>Top Authors </span><FontAwesomeIcon icon={faChevronRight} />
                            </Nav.Link>
                            <ul style={{ marginTop: "42px" }} className="dropdown-menu sub-menu">
                                <li>
                                    <Nav.Link>
                                        <span>Action</span>
                                    </Nav.Link>
                                </li>
                                <li>
                                    <Nav.Link>
                                        <span>Action</span>
                                    </Nav.Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Nav.Link>
                                <span>Bestselling Series </span><FontAwesomeIcon icon={faChevronRight} />
                            </Nav.Link>
                            <ul style={{ marginTop: "84px" }} className="dropdown-menu sub-menu">
                                <li>
                                    <Nav.Link>
                                        <span>Action</span>
                                    </Nav.Link>
                                </li>
                                <li>
                                    <Nav.Link>
                                        <span>Action</span>
                                    </Nav.Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Nav.Link>
                                <span>Popular Features </span><FontAwesomeIcon icon={faChevronRight} />
                            </Nav.Link>
                            <ul style={{ marginTop: "126px" }} className="dropdown-menu sub-menu">
                                <li>
                                    <Nav.Link>
                                        <span>Action</span>
                                    </Nav.Link>
                                </li>
                                <li>
                                    <Nav.Link>
                                        <span>Action</span>
                                    </Nav.Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Nav.Link>
                                <span>More Categories </span><FontAwesomeIcon icon={faChevronRight} />
                            </Nav.Link>
                            <ul style={{ marginTop: "168px" }} className="dropdown-menu sub-menu">
                                <li>
                                    <Nav.Link>
                                        <span>Action</span>
                                    </Nav.Link>
                                </li>
                                <li>
                                    <Nav.Link>
                                        <span>Action</span>
                                    </Nav.Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
                {/* <li className="dropdown">
                    <Nav.Link><span>Menu</span></Nav.Link>
                </li>
                <li className="dropdown">
                    <Nav.Link><span>Menu</span></Nav.Link>
                </li> */}
            </ul>
        </div>
    );
};

export default SecondaryNav;