console.log("object");
/* use EnglishPlis */

db.createCollection("roles");
db.createCollection("users");
db.createCollection("permisos");
db.roles.insertOne({
  name_rol: "Admin",
  status: "A",
});

db.users.insertOne({
  full_name: "John Doe",
  email: "john.doe@example.com",
  numero: "1234567890",
  image: "https://reedbarger.nyc3.digitaloceanspaces.com/default-avatar.png",
  password: "hashedpassword",
  status: "A",
  roles: [
    {
      role_id: ObjectId("666c48dcba444f806044943a"), // Usa el ObjectId real aquí
      role_name: "Admin",
      status: "A",
    },
  ],
});

db.permisos.insertMany([
  { name: "read", description: "Read permission" },
  { name: "write", description: "Write permission" },
  { name: "delete", description: "Delete permission" },
]);
