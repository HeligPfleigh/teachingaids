#!/bin/bash
mongo teachingaidsman --eval 'db.dropDatabase()'
mongorestore --host localhost --port 27018 ./database/teachingaidsman --db teachingaidsman
