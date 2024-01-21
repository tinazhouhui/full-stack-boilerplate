import {DynamoDbConnection} from "./DynamoDbConnection";
import {
	AttributeDefinition,
	CreateGlobalTableCommandOutput,
	CreateTableCommand,
	CreateTableCommandInput,
	DeleteTableCommand,
	DeleteTableOutput,
	KeySchemaElement,
} from "@aws-sdk/client-dynamodb";
import {
	BatchWriteCommandOutput,
	GetCommandInput,
	GetCommandOutput,
	QueryCommandInput,
	QueryCommandOutput,
} from '@aws-sdk/lib-dynamodb';
import {tracer} from '../components/factories/TracerFactory';
import {Item} from '../types/Database';


export class DynamoDbModel {
	constructor(
		private readonly connection: DynamoDbConnection,
	) {
		super();
	}

	public createTable(tableName: string, keySchema: KeySchemaElement[], attrs: AttributeDefinition[], options?: Omit<CreateTableCommandInput, "TableName" | "KeySchema" | "AttributeDefinitions">): Promise<CreateGlobalTableCommandOutput> {
		const input = {
			TableName: tableName,
			KeySchema: keySchema,
			AttributeDefinitions: attrs,
			BillingMode: 'PAY_PER_REQUEST',
			...options,
		};
		const createTableCommand = new CreateTableCommand(input);
		return this.connection.dynamo.send(createTableCommand);
	}

	/**
	 * Function only used for integration tests.
	 * @returns {Promise<DeleteTableOutput>}
	 */
	public deleteTable(name: string): Promise<DeleteTableOutput> {
		const deleteTableCommand = new DeleteTableCommand({
			TableName: name,
		});
		return this.connection.dynamo.send(deleteTableCommand);
	}

	public saveItems(tableName: string, items: Item[]): Promise<BatchWriteCommandOutput> {
		const putRequests = items.map(item => {
			return {
				PutRequest: {
					Item: item,
				},
			};
		});

		const input = {
			RequestItems: {
				[tableName]: putRequests,
			},
		};
		return this.connection.dynamoDoc.batchWrite(input);
	}

	public deleteItems(tableName: string, ids: string[]): Promise<BatchWriteCommandOutput> {
		const deleteRequests = ids.map((id: any) => {
			return {
				DeleteRequest: {
					Key: {id},
				},
			};
		});

		const input = {
			RequestItems: {
				[tableName]: deleteRequests,
			},
		};
		return this.connection.dynamoDoc.batchWrite(input);
	}

	public query(tableName: string, options?: Omit<QueryCommandInput, "TableName">): Promise<QueryCommandOutput> {
		return this.connection.dynamoDoc.query({
			TableName: tableName,
			...options,
		});
	}

	public getItem(tableName: string, options: Omit<GetCommandInput, "TableName">): Promise<GetCommandOutput> {
		return this.connection.dynamoDoc.get({
			TableName: tableName,
			...options,
		});
	}
}
