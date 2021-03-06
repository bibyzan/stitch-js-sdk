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

import AdminFetchTransport from "./AdminFetchTransport";
import { AppResponse } from "./apps/AppsResources";
import { AuthProviderResponse } from "./authProviders/AuthProvidersResources";
import {
  Anon,
  Custom,
  ProviderConfig,
  Userpass
} from "./authProviders/ProviderConfigs";
import { FunctionCreator } from "./functions/FunctionsResources";
import {
  App,
  Apps,
  AuthProvider,
  AuthProviders,
  Function,
  Functions,
  Rule,
  Rules,
  Service,
  Services,
  User,
  UserRegistrations,
  Users
} from "./Resources";
import {
  AwsRuleCreator,
  AwsS3Actions,
  AwsS3RuleCreator,
  AwsSesActions,
  AwsSesRuleCreator,
  HttpActions,
  HttpRuleCreator,
  MongoDbRuleCreator,
  RuleCreator,
  RuleResponse,
  TwilioActions,
  TwilioRuleCreator
} from "./services/rules/RulesResources";
import {
  Aws,
  AwsConfig,
  AwsS3,
  AwsS3Config,
  AwsSes,
  AwsSesConfig,
  Http,
  Mongo,
  ServiceConfig,
  Twilio,
  TwilioConfig
} from "./services/ServiceConfigs";
import { ServiceResponse } from "./services/ServicesResources";
import StitchAdminClient from "./StitchAdminClient";
import { ConfirmationEmail } from "./userRegistrations/UserRegistrationsResources";

export {
  AdminFetchTransport,
  Anon,
  App,
  AppResponse,
  Apps,
  AuthProvider,
  AuthProviderResponse,
  AuthProviders,
  Aws,
  AwsConfig,
  AwsRuleCreator,
  AwsS3,
  AwsS3Actions,
  AwsS3Config,
  AwsS3RuleCreator,
  AwsSes,
  AwsSesActions,
  AwsSesConfig,
  AwsSesRuleCreator,
  ConfirmationEmail,
  Custom,
  Function,
  FunctionCreator,
  Functions,
  Http,
  HttpActions,
  HttpRuleCreator,
  Mongo,
  MongoDbRuleCreator,
  ProviderConfig,
  Rule,
  RuleCreator,
  RuleResponse,
  Rules,
  Service,
  ServiceConfig,
  ServiceResponse,
  Services,
  StitchAdminClient,
  Twilio,
  TwilioActions,
  TwilioConfig,
  TwilioRuleCreator,
  User,
  UserRegistrations,
  Userpass,
  Users,
};
