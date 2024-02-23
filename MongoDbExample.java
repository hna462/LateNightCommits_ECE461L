package mongoDB;
import org.bson.BsonDocument;
import org.bson.BsonInt64;
import org.bson.Document;
import org.bson.conversions.Bson;

import com.mongodb.MongoException;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.Updates;

public class MongoDbExample {
	private static MongoClient mongo;
	private static MongoDatabase database;
	private static MongoCollection<Document> collection;
	
	private static final String URI = "mongodb+srv://nrobledo:2dumb2live@cluster0.od1dgod.mongodb.net/?retryWrites=true&w=majority";
	private static final String DB = "Data";
	private static final String COLLECTION = "Users";

	public static void main(String[] args) {
		mongo = MongoClients.create(URI);
		database = mongo.getDatabase(DB);
		collection = database.getCollection(COLLECTION);
		create();
		readAll();
		mongo.close();
	}
	
	public static void create() {
		Document doc = new Document();
		doc.put("Username", "User 1");
		doc.put("Password", "Password1");
		String[][] projects = null;
		doc.put("Projects", projects);
		collection.insertOne(doc);
	}
	
	public static void findAndRead() {
		MongoCursor<Document> cursor = collection.find(
			Filters.eq("name", "Nike Air Max 270")
		).cursor();
		while(cursor.hasNext()) {
			System.out.println(cursor.next().toJson());
		}
	}
	
	public static void readAll() {
		MongoCursor<Document> cursor = collection.find(
			Filters.empty()
		).cursor();
		while(cursor.hasNext()) {
			System.out.println(cursor.next().toJson());
		}
	}
	
	public static void update() {
		collection.updateOne(
			Filters.eq("name", "Nike Air Max 270"), 
			Updates.combine(
		        Updates.set("winner", "Rifat"),
		        Updates.set("finalPrice", 100.0)
			)
		);
	}
	
	public static void delete() {
		collection.deleteOne(
			Filters.eq("name", "Nike Air Max 270")
		);
	}
	
	public static void ping() {
		try {
            Bson command = new BsonDocument("ping", new BsonInt64(1));
            Document commandResult = database.runCommand(command);
            System.out.println("Connected successfully to server.");
        } catch (MongoException me) {
            System.err.println("An error occurred while attempting to run a command: " + me);
        }
	}

}
