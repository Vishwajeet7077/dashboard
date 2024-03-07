# Import necessary libraries
import json
import mysql.connector

# Load JSON data from file
with open('jsondata.json', 'r') as file:
    json_data = json.load(file)

# Connect to MySQL database
db_connection = mysql.connector.connect(
    host="127.0.0.1",
    port=3306,
    user="vishwajeet",
    password="7077",
    database="dashboard"
)
cursor = db_connection.cursor()

# Create a table if not exists
cursor.execute('''CREATE TABLE IF NOT EXISTS data (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    end_year VARCHAR(255),
                    intensity INT,
                    sector VARCHAR(255),
                    topic VARCHAR(255),
                    insight TEXT,
                    url TEXT,
                    region VARCHAR(255),
                    start_year VARCHAR(255),
                    impact TEXT,
                    added VARCHAR(255),
                    published VARCHAR(255),
                    country VARCHAR(255),
                    relevance INT,
                    pestle VARCHAR(255),
                    source VARCHAR(255),
                    title TEXT,
                    likelihood INT
                )''')
db_connection.commit()

# Prepare and execute insert query
insert_query = '''INSERT INTO data (
                    end_year, intensity, sector, topic, insight,
                    url, region, start_year, impact, added,
                    published, country, relevance, pestle, source,
                    title, likelihood
                ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)'''

# Insert JSON data into the table
for obj in json_data:
    # Handle null values and different data types for each column
    data_values = (
        obj.get('end_year', None), 
        int(obj['intensity']) if obj['intensity'] else None, 
        obj.get('sector', None), 
        obj.get('topic', None), 
        obj.get('insight', None),
        obj.get('url', None), 
        obj.get('region', None), 
        obj.get('start_year', None), 
        obj.get('impact', None), 
        obj.get('added', None),
        obj.get('published', None), 
        obj.get('country', None), 
        int(obj['relevance']) if obj['relevance'] else None, 
        obj.get('pestle', None), 
        obj.get('source', None),
        obj.get('title', None), 
        int(obj['likelihood']) if obj['likelihood'] else None
    )

    # Execute the insert query
    cursor.execute(insert_query, data_values)
    db_connection.commit()

# Close the cursor and database connection
cursor.close()
db_connection.close()
