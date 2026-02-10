# Node.js Lambda Deployment

This is a simple Node.js Lambda function that automatically deploys to AWS Lambda using GitHub Actions on every push to `main`.

## Quick Setup

### 1. Create a Lambda Function in AWS

```bash
# Create an IAM role for Lambda
aws iam create-role --role-name lambda-exec-role \
  --assume-role-policy-document '{
    "Version": "2012-10-17",
    "Statement": [{
      "Effect": "Allow",
      "Principal": {"Service": "lambda.amazonaws.com"},
      "Action": "sts:AssumeRole"
    }]
  }'

# Attach basic execution policy
aws iam attach-role-policy --role-name lambda-exec-role \
  --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole

# Get the role ARN
aws iam get-role --role-name lambda-exec-role --query 'Role.Arn'
```

Create the function (replace `YOUR_ROLE_ARN`, `YOUR_REGION`):

```bash
zip -r function.zip . -x ".git/*" ".github/*"

aws lambda create-function \
  --function-name my-lambda0112 \
  --runtime nodejs18.x \
  --role YOUR_ROLE_ARN \
  --handler index.handler \
  --zip-file fileb://function.zip \
  --region YOUR_REGION
```

### 2. Create GitHub Secrets

Go to your GitHub repo → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

Add these secrets:
- `AWS_ACCESS_KEY_ID` — your AWS access key
- `AWS_SECRET_ACCESS_KEY` — your AWS secret key
- `AWS_REGION` — e.g., `us-east-1`
- `LAMBDA_FUNCTION_NAME` — e.g., `my-lambda0112`

### 3. Push and Deploy

```bash
git add .
git commit -m "Initial deploy setup"
git push origin main
```

Check **GitHub Actions** tab to watch the deployment. On success, your Lambda function code will be updated.

## Files

- `index.js` — Lambda handler (entry point)
- `package.json` — Node.js dependencies
- `.github/workflows/deploy.yml` — GitHub Actions workflow

## Testing the Lambda

After deployment, test it in the AWS Console or via CLI:

```bash
aws lambda invoke \
  --function-name my-lambda0112 \
  --payload '{"test": "data"}' \
  --region YOUR_REGION \
  response.json
cat response.json
```

## Troubleshooting

- **Workflow fails with "LAMBDA_FUNCTION_NAME not set"** → Check GitHub secrets are configured.
- **Lambda update fails** → Ensure IAM user has `lambda:UpdateFunctionCode` permission.
- **Large package error** → If zip >50MB, use S3 to upload first (see advanced setup).

## Handler

The handler in `index.js` receives Lambda events and returns responses:

```javascript
exports.handler = async (event) => {
  console.log('Received:', event);
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello from Lambda', input: event })
  };
};
```
