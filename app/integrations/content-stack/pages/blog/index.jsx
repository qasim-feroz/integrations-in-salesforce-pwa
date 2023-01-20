/*
 * Copyright (c) 2022, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import React, { useEffect } from 'react'
import { useIntl, FormattedMessage } from 'react-intl'


import { getAllEntries, getPageRes, getBlogPostRes } from "../../content-stack-helper";
import { useParams } from "react-router-dom";
import { useState } from "react";
import BlogListItem from '../../components/BlogListItem';
import BlogDetail from '../../components/BlogDetail';
import BlogListSkeleton from '../../components/BlogListSkeleton';
import BlogDetailSkeleton from '../../components/BlogDetailSkeleton';
/**
 * This is the home page for Retail React App.
 * The page is created for demonstration purposes.
 * The page renders SEO metadata and a few promotion
 * categories and products, data is from local file.
 */
const Blog = () => {
    const intl = useIntl()
    const params = useParams();
    const entryUrl = params.blogId ? `/blog/${params.blogId}` : "/";

    const [getEntries, setEntries] = useState([]);
    const [getEntry, setEntry] = useState(null);

    async function fetchAllData() {
        try {
            const allEntry = await getAllEntries('blog_post');
            console.log(allEntry);
            setEntries(...allEntry);
        } catch (error) {
            console.error(error);
        }
    }

    async function fetchData() {
        try {
            const result = await getBlogPostRes(entryUrl);
            console.log(result);

            setEntry({ ...result });
            //   entry({ page: result });
        } catch (error) {
            console.error(error);
        }
    }

    // useEffect(() => {
    //     onEntryChange(fetchData);
    // }, []);

    useEffect(() => {
        if (entryUrl == "/") {
            fetchAllData();
        } else {
            fetchData();
        }
    }, [entryUrl]);

    if (entryUrl == "/") {
        return (getEntries.length > 0 ? (getEntries.map((blog, index) => {
            return (
                <BlogListItem key={index} data={blog} />
            )
        }))

            : <BlogListSkeleton />)
    }
    return (getEntry ? <BlogDetail data={getEntry} />
        : <BlogDetailSkeleton />)
}

Blog.getTemplateName = () => 'home'

Blog.shouldGetProps = ({ previousLocation, location }) =>
    !previousLocation || previousLocation.pathname !== location.pathname



export default Blog
