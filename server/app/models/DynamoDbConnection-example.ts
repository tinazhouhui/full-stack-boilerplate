import {DynamoDBClient} from "@aws-sdk/client-dynamodb";
import AWSXRay from "aws-xray-sdk-core";
import {configurator} from './factories/ConfiguratorFactory';
import {fromEnv} from "@aws-sdk/credential-providers";
import {DynamoDBDocument} from "@aws-sdk/lib-dynamodb";

export class DynamoDbConnection {
	public readonly dynamo: DynamoDBClient;
	public readonly dynamoDoc: DynamoDBDocument;

	constructor() {
		const {region, endpoint} = configurator.parameters('dynamoDb') as Record<string, string>;

		const config = Object.assign({
			apiVersion: "2018-05-29",
			region,
			credentials: fromEnv(),
		}, endpoint && {endpoint});

		this.dynamo = AWSXRay.captureAWSv3Client(new DynamoDBClient(config) as any);

		this.dynamoDoc = DynamoDBDocument.from(this.dynamo);
	}
}
