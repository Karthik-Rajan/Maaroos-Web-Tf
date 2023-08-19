"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_extra_1 = require("fs-extra");
var path = require("path");
var client_cloudformation_1 = require("@aws-sdk/client-cloudformation");
var dotenv = require("dotenv");
dotenv.config();
var identityPoolId = process.env.REACT_APP_USER_IDENDITY_POOL_ID;
var identityPoolArray = identityPoolId.split(':');
var region = identityPoolArray[0];
var cloudformation = new client_cloudformation_1.CloudFormation({ region: region });
var outputs = {
    aws_project_region: region,
    aws_cognito_region: region,
    aws_cognito_identity_pool_id: identityPoolId,
    aws_user_pools_id: "",
    aws_user_pools_web_client_id: "",
    oauth: {},
    aws_cognito_username_attributes: [],
    aws_cognito_social_providers: [],
    aws_cognito_signup_attributes: ["PHONE_NUMBER"],
    aws_cognito_mfa_configuration: "OFF",
    aws_cognito_mfa_types: ["SMS"],
    aws_cognito_password_protection_settings: {
        passwordPolicyMinLength: 8,
        passwordPolicyCharacters: [],
    },
    aws_cognito_verification_mechanisms: ["PHONE_NUMBER"],
};
exports.default = cloudformation.describeStacks({ StackName: 'auth' }).then(function (res) {
    res.Stacks[0].Outputs.forEach(function (_a) {
        var ExportName = _a.ExportName, OutputValue = _a.OutputValue;
        if (ExportName === "userPoolId") {
            outputs['aws_user_pools_id'] = OutputValue;
        }
        else if (ExportName === "userPoolWebClientId") {
            outputs['aws_user_pools_web_client_id'] = OutputValue;
        }
    });
    var configFilePath = path.join(__dirname, 'awsConfig.json');
    return (0, fs_extra_1.writeFileSync)(configFilePath, JSON.stringify(outputs, null, 2));
});
