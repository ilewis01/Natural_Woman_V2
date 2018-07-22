To Migrate:
	1. flask db migrate -m""
	2. flask db upgrade
	* The flask application must be imported to use these commands!

To Kill Server
	1. lsof -i :5000 (where 5000 is your current port in use)
	2. ps ax | grep <PID> (To see if it is the one using "flask run")
	3. kill -QUIT <PID>

li hover hex: #dadeb1 