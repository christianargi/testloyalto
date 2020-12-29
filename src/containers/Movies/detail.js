import React, { useState, useEffect, useRef, useCallback, forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, Icon } from 'antd';
import {
    Textarea,
} from '@iso/components/uielements/input';
import InputNumber from '@iso/components/uielements/InputNumber';
import Select, { SelectOption } from '@iso/components/uielements/select';
import DatePicker from '@iso/components/uielements/datePicker';
import AutoComplete from '@iso/components/uielements/autocomplete';
import PageHeader from '@iso/components/utility/pageHeader';
import Box from '@iso/components/utility/box';
import LayoutWrapper from '@iso/components/utility/layoutWrapper.js';
import ContentHolder from '@iso/components/utility/contentHolder';
import IntlMessages from '@iso/components/utility/intlMessages';
import Input from '@iso/components/CustomComponent/CustomInput';
import actions from '@iso/redux/movies/actions';
import { useParams } from 'react-router';
import BlockUi from "react-block-ui";
import 'react-block-ui/style.css';

const {
    handleState,
    getDetail,
} = actions;

const Detail = () => {
    const movies = useSelector(state => state.movies);
    const dispatch = useDispatch();
    let params = useParams();

    useEffect(() => {
        dispatch(getDetail(params.id));
    }, []);

    const rowStyle = {
        width: '100%',
        display: 'flex',
        flexFlow: 'row wrap',
    };
    const colStyle = {
        marginBottom: '16px',
    };
    const gutter = 16;
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
                    Movie Detail : {movies.title}
                </PageHeader>
                <Row style={rowStyle} gutter={gutter} justify="start">
                    <Col md={24} sm={24} xs={24} style={colStyle}>
                        <Box>
                            <ContentHolder>
                                <Input
                                    id="title"
                                    name="title"
                                    label="Title"
                                    value={movies.title}
                                    onChange={(e) => handleState("title", e)}
                                    disabled={true}
                                />
                                <Input
                                    id="rating"
                                    name="rating"
                                    label="Rating"
                                    value={movies.rating}
                                    onChange={(e) => handleState("rating", e)}
                                    disabled={true}
                                />
                                <Input
                                    id="releaseDate"
                                    name="releaseDate"
                                    label="Release Date"
                                    value={movies.releaseDate}
                                    onChange={(e) => handleState("releaseDate", e)}
                                    disabled={true}
                                />
                                <h5>Overview</h5>
                                <Textarea rows={6} value={movies.overview} disabled={true} />
                            </ContentHolder>
                        </Box>
                    </Col>
                </Row>
            </LayoutWrapper>
        </BlockUi>
    );
}

export default Detail;

