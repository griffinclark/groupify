import json
import boto3

def handler(event, context):
  print('received event:')
  print(event)

  if event['httpMethod'] != 'POST':
    return {
      'statusCode': 501
    }

  sm = boto3.client('secretsmanager')
  key = eval(sm.get_secret_value(SecretId='twilio-api')['SecretString'])
  sid = key['sid']
  auth_token = key['auth_token']  

  return {
      'statusCode': 200,
      'headers': {
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
      },
      'body': ''
  }