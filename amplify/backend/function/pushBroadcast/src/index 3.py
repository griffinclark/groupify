import json
import boto3
import twilio.rest

def handler(event, context):
  print('received event:')
  print(event)

  if event['httpMethod'] != 'POST':
    return {
      'statusCode': 501
    }

  sm = boto3.client('secretsmanager')
  key = json.loads(sm.get_secret_value(SecretId='twilio-api')['SecretString'])
  sid = key['sid']
  auth_token = key['auth_token']
  tc = twilio.rest.Client(sid, auth_token)

  body = json.loads(event['body'])
  attendees = body['attendees']
  content = body['content']
  for item in attendees:
    tc.messages.create(to=item, from_='+19193646617', body=content)

  return {
      'statusCode': 200,
      'headers': {
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
      },
      'body': ''
  }