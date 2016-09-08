#!/usr/bin/env bash 
echo "Removing any existing database file"
rm -f ../cangjie.db

echo "Importing data to new database"
sqlite3 ../cangjie.db '.read importfile.sql' 

echo "  * All done"
