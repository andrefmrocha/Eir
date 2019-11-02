rm -f db/database.db

sqlite3 -init db/schema.sql db/database.db