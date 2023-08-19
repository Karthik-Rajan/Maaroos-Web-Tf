import { writeFileSync } from 'fs-extra';
import *  as path from 'path';
import { CloudFormation } from '@aws-sdk/client-cloudformation'
import * as dotenv from 'dotenv';
dotenv.config();

const identityPoolId = process.env.REACT_APP_USER_IDENDITY_POOL_ID!;
const identityPoolArray = identityPoolId.split(':');
const region = identityPoolArray[0];
const cloudformation = new CloudFormation({ region })

const outputs: any = {
  aws_project_region: region,
  aws_cognito_region : region,
  aws_cognito_identity_pool_id : identityPoolId,
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
}

export default cloudformation.describeStacks({ StackName: 'auth' }).then((res : any) => {
  res.Stacks[0].Outputs.forEach(({ ExportName, OutputValue } : any) => {
    
    if(ExportName === `userPoolId`){
      outputs['aws_user_pools_id'] = OutputValue;
    }
    else if(ExportName === `userPoolWebClientId`){
      outputs['aws_user_pools_web_client_id'] = OutputValue;
    }
  });

  const configFilePath = path.join(__dirname, 'awsConfig.json')
  return writeFileSync(configFilePath, JSON.stringify(outputs, null, 2))
})