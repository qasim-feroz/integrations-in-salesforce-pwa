/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-undef */
import * as contentstack from "contentstack";
import * as Utils from "@contentstack/utils";
import * as config from '../../../config/default';
import ContentstackLivePreview from "@contentstack/live-preview-utils";

// init content stack using values from .env config
const Stack = contentstack.Stack({
  api_key: `${config.app.contentStack.api_key}`,
  delivery_token: `${config.app.contentStack.delivery_token}`,
  environment: `${config.app.contentStack.environment}`,
  //@ts-ignore
  region: `${config.app.contentStack.region}`
    ? `${config.app.contentStack.region}`
    : "us",
  live_preview: {
    management_token: `${config.app.contentStack.management_token}`
      ? `${config.app.contentStack.management_token}`
      : "",
    enable: true,
    host: `${config.app.contentStack.api_host}`
      ? `${config.app.contentStack.api_host}`
      : "",
  },
});

/**
 * initialize live preview
 */

ContentstackLivePreview.init({
  enable: true,
  //@ts-ignore
  stackSdk: Stack,
  clientUrlParams: {
    host: `${config.app.contentStack.app_host}`
      ? `${config.app.contentStack.app_host}`
      : "",
  },
  ssr: false,
});


if (`${config.app.contentStack.api_host}`) {
  Stack.setHost(`${config.app.contentStack.api_host}`);
}

const renderOption = {
  ["span"]: (node, next) => {
    return next(node.children);
  },
};

export const onEntryChange = ContentstackLivePreview.onEntryChange;

export default {
  /**
   *
   * fetches all the entries from specific content-type
   * @param {* content-type uid} contentTypeUid
   * @param {* reference field name} referenceFieldPath
   * @param {* Json RTE path} jsonRtePath
   *
   */
  getEntry({ contentTypeUid, referenceFieldPath, jsonRtePath }) {
    return new Promise((resolve, reject) => {
      const query = Stack.ContentType(contentTypeUid).Query();
      if (referenceFieldPath) query.includeReference(referenceFieldPath);
      query
        .includeOwner()
        .toJSON()
        .find()
        .then(
          (result) => {
            jsonRtePath &&
              Utils.jsonToHTML({
                entry: result,
                paths: jsonRtePath,
                renderOption,
              });
            resolve(result);
          },
          (error) => {
            reject(error);
          }
        );
    });
  },

  /**
   *fetches specific entry from a content-type
   *
   * @param {* content-type uid} contentTypeUid
   * @param {* url for entry to be fetched} entryUrl
   * @param {* reference field name} referenceFieldPath
   * @param {* Json RTE path} jsonRtePath
   * @returns
   */
  getEntryByUrl({
    contentTypeUid,
    entryUrl,
    referenceFieldPath,
    jsonRtePath,
  }) {
    return new Promise((resolve, reject) => {
      const blogQuery = Stack.ContentType(contentTypeUid).Query();
      if (referenceFieldPath) blogQuery.includeReference(referenceFieldPath);
      blogQuery.includeOwner().toJSON();
      const data = blogQuery.where("url", `${entryUrl}`).find();
      data.then(
        (result) => {
          jsonRtePath &&
            Utils.jsonToHTML({
              entry: result,
              paths: jsonRtePath,
              renderOption,
            });
          resolve(result[0]);
        },
        (error) => {
          reject(error);
        }
      );
    });
  },

  /**
   *fetches specific entry from a content-type
   *
   * @param {* content-type uid} contentTypeUid
   * @param {* url for entry to be fetched} entryUrl
   * @param {* reference field name} referenceFieldPath
   * @param {* Json RTE path} jsonRtePath
   * @returns
   */
  searchEntry({
    contentTypeUid,
    field,
    fieldValue,
    referenceFieldPath,
    jsonRtePath,
  }) {
    return new Promise((resolve, reject) => {
      const blogQuery = Stack.ContentType(contentTypeUid).Query().includeContentType();
      if (referenceFieldPath) blogQuery.includeReference(referenceFieldPath);
      blogQuery.includeOwner().toJSON();
      const data = blogQuery.where(field, `${fieldValue}`).find();
      data.then(
        (result) => {
          jsonRtePath &&
            Utils.jsonToHTML({
              entry: result,
              paths: jsonRtePath,
              renderOption,
            });
          resolve(result[0]);
        },
        (error) => {
          reject(error);
        }
      );
    });
  },
};
