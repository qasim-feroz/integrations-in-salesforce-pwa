import Stack from './init-sdk';
import HeroBanner from './components/HeroBanner';
import React from 'react'


export const componentMapping = {
  hero_banner: HeroBanner
}

export const getAllEntries = async (contentType) => {
  const response = (await Stack.getEntry({
    contentTypeUid: contentType,
    jsonRtePath: ['body'],
    referenceFieldPath: undefined,
  }));
  return response;
};

export const getPageRes = async (entryUrl) => {
  const response = (await Stack.getEntryByUrl({
    contentTypeUid: "blog_post",
    entryUrl,
    referenceFieldPath: ["page_components.from_blog.featured_blogs"],
    jsonRtePath: [
      "page_components.from_blog.featured_blogs.body",
      "page_components.section_with_buckets.buckets.description",
      "page_components.section_with_html_code.description",
    ],
  }));
  return response[0];
};

export const getBlogPostRes = async (entryUrl) => {
  console.log(entryUrl);
  const response = (await Stack.getEntryByUrl({
    contentTypeUid: "blog_post",
    entryUrl,
    referenceFieldPath: ["author", "related_post"],
    jsonRtePath: ["body", "related_post.body"],
  }));
  return response[0];
};




export class ContentStackAPI {

  /**
 * Create the ContentStack API.
 */
  constructor() {

  }


  async getProductDetail(productId) {
    const response = (await Stack.searchEntry({
      contentTypeUid: "product",
      field: 'sfcc_product.data.id',
      fieldValue: productId,
      referenceFieldPath: [],
      jsonRtePath: [],
    }));
    return response[0];
  };
}

/**
 * The default Amplience client.
 */
export const defaultcsClient = new ContentStackAPI()