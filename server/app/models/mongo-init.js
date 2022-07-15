// https://stackoverflow.com/questions/42912755/how-to-create-a-db-for-mongodb-container-on-start-up

db.createUser(
        {
            user: "mydbuser",
            pwd: "mydbpassword",
            roles: [
                {
                    role: "readWrite",
                    db: "mydb"
                }
            ]
        }
);
