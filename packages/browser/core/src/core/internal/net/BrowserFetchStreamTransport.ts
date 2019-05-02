/**
 * Copyright 2018-present MongoDB, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  BasicRequest,
  ContentTypes,
  EventStream,
  handleRequestError,
  Headers,
  Response,
  Transport
} from "mongodb-stitch-core-sdk";
import {fetch as fetch} from 'whatwg-fetch'
import BrowserFetchTransport from "./BrowserFetchTransport";
import EventSourceEventStream from "./EventSourceEventStream";

/** @hidden */
export default class BrowserFetchStreamTransport extends BrowserFetchTransport {

  public stream(request: BasicRequest, open = true, retryRequest?: () => Promise<EventStream>): Promise<EventStream> {
    const reqHeaders = { ...request.headers };
    reqHeaders[Headers.ACCEPT] = ContentTypes.TEXT_EVENT_STREAM;
    reqHeaders[Headers.CONTENT_TYPE] = ContentTypes.TEXT_EVENT_STREAM;
    // Check for PWA and bypass service worker onFetch specific to angular service-worker.js
    if ('ng' in window && 'serviceWorker' in navigator) {
      reqHeaders['ngsw-bypass'] = true;
    }

    // Verify we can start a request with current params and potentially
    // Force ourselves to refresh a token.
    return fetch(request.url + "&stitch_validate=true", {
      body: request.body,
      headers: reqHeaders,
      method: request.method,
      mode: 'cors'
    }).then(response => {
      const respHeaders: { [key: string]: string } = {};
      response.headers.forEach((value, key) => {
        respHeaders[key] = value;
      });
      if (response.status < 200 || response.status >= 300) {
        return response.text()
        .then(body => handleRequestError(new Response(respHeaders, response.status, body)));
      }

      return new Promise<EventStream>((resolve, reject) => 
        new EventSourceEventStream(
          new EventSource(request.url),
          stream => resolve(stream),
          error => reject(error),
          retryRequest ? 
            () => retryRequest().then(es => es as EventSourceEventStream)
            : undefined
          )
      );
    });
  }
}
