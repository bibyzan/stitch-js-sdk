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

import { MemoryStorage, StitchAppClientConfiguration } from "../src";
import { BasicRequest } from "../src/internal/net/BasicRequest";
import Response from "../src/internal/net/Response";
import Transport from "../src/internal/net/Transport";

describe("StitchAppClientConfigurationUnitTests", () => {
  it("should build", () => {
    const clientAppId = "foo";
    const localAppVersion = "bar";
    const localAppName = "baz";
    const baseUrl = "qux";
    const storage = new MemoryStorage("storage");
    const transport = new class implements Transport {
      public roundTrip(request: BasicRequest): Promise<Response> {
        return Promise.resolve({ statusCode: 200, headers: {}, body: "good" });
      }
    }();

    // A minimum of clientAppId, baseUrl, storage, and transport must be set; latter 3 tested
    // elsewhere
    const builder = new StitchAppClientConfiguration.Builder();
    expect(builder.build).toThrow();

    builder.withBaseURL(baseUrl);
    builder.withStorage(storage);
    builder.withTransport(transport);

    expect(builder.build).toThrow();

    builder.withClientAppId("");

    expect(builder.build).toThrow();

    builder.withClientAppId(clientAppId);

    expect(builder.build).toThrow();

    builder.build();

    builder.withLocalAppVersion(localAppVersion).withLocalAppName(localAppName);
    let config = builder.build();

    expect(config.clientAppId).toEqual(clientAppId);
    expect(config.localAppVersion).toEqual(localAppVersion);
    expect(config.localAppName).toEqual(localAppName);
    expect(config.baseURL).toEqual(baseUrl);
    expect(config.storage).toEqual(storage);
    expect(config.transport).toEqual(transport);

    config = builder.build();

    expect(config.clientAppId).toEqual(clientAppId);
    expect(config.localAppVersion).toEqual(localAppVersion);
    expect(config.localAppName).toEqual(localAppName);
    expect(config.baseURL).toEqual(baseUrl);
    expect(config.storage).toEqual(storage);
    expect(config.transport).toEqual(transport);
  });
});