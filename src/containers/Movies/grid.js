import React, { useState, useEffect, useRef, useCallback, forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useRouteMatch, useLocation } from 'react-router-dom';
import { Col, Row, Icon, Table } from 'antd';
import Button, { ButtonGroup } from '@iso/components/uielements/button';
import PageHeader from '@iso/components/utility/pageHeader';
import Box from '@iso/components/utility/box';
import LayoutWrapper from '@iso/components/utility/layoutWrapper.js';
import ContentHolder from '@iso/components/utility/contentHolder';
import actions from '@iso/redux/movies/actions';
import BlockUi from "react-block-ui";

const {
    getMovies,
} = actions;

const Movies = () => {
    const movies = useSelector(state => state.movies);
    const dispatch = useDispatch();
    const rowStyle = {
        width: '100%',
        display: 'flex',
        flexFlow: 'row wrap',
    };
    const colStyle = {
        marginBottom: '16px',
    };
    const gutter = 16;

    const columns = [
        {
            title: 'Title',
            dataIndex: 'original_title',
            key: 'original_title',
        },
        {
            title: 'Rating',
            dataIndex: 'vote_average',
            key: 'vote_average',
        },
        {
            title: 'Release Date',
            dataIndex: 'release_date',
            key: 'release_date',
        },
        {
            title: "Action",
            dataIndex: "action",
            key: "action",
            render: (text, data) => {
                return (
                    <Link to={`/dashboard/moviedetail/` + data.id}>
                        <ButtonGroup>
                            <Button>
                                <Icon type="eye" />
                            </Button>
                        </ButtonGroup>
                    </Link>


                )
            }
        }
    ];

    useEffect(() => {
        let pageNo = 1
        dispatch(getMovies(pageNo));
    }, []);

    const onChangeTable = (pagination) => {
        debugger
        dispatch(getMovies(pagination.current));
    }
    console.log(movies.loading)
    return (
        <BlockUi
            tag="div"
            blocking={movies.loading}
            message={
                <span>
                    <div className="sk-folding-cube">
                        <div className="sk-cube1 sk-cube" />
                        <div className="sk-cube2 sk-cube" />
                        <div className="sk-cube4 sk-cube" />
                        <div className="sk-cube3 sk-cube" />
                    </div>
                </span>
            }
        >
            <LayoutWrapper>
                <PageHeader>
                    Movies
            </PageHeader>
                <Row style={rowStyle} gutter={gutter} justify="start">
                    <Col md={24} sm={24} xs={24} style={colStyle}>
                        <Box>
                            <ContentHolder>
                                <Table
                                    columns={columns}
                                    dataSource={movies.movieList}
                                    pagination={{
                                        current: movies.pageNo,
                                        pageSize: 20,
                                        total: movies.totalRows
                                    }}
                                    onChange={onChangeTable}
                                />;
                        </ContentHolder>
                        </Box>
                    </Col>
                </Row>
            </LayoutWrapper>
        </BlockUi>

    );
}

export default Movies;
