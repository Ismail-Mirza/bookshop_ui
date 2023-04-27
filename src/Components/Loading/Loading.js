import React from 'react';
import './Loading.css';
import { Button, Spinner } from 'react-bootstrap';
import FullHeight from 'react-full-height';

const Loading = () => {
    return (
        <FullHeight className="loading">
            <div>
                <Button
                    style={{
                        fontWeight: "800",
                        padding: "10px 40px",
                        backgroundColor: "#498EC5",
                        border: "none"
                    }}
                    variant="primary" disabled>
                    <Spinner
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    />
                    <span> Loading...</span>
                </Button>
            </div>
        </FullHeight>
    );
};

export default Loading;