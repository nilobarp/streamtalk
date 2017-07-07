HTTP Backend

Docker images:

postgres
--------
`docker run -d -e POSTGRES_USER=user -e POSTGRES_PASSWORD=password --name ht-db -p 5432:5432 --restart=always postgres:alpine`

redis
-----
`docker run -d --name ht-cache -p 6379:6379 --restart=always redis:alpine`

CLI symlink all commands:
`for f in $(ls -d *.js); do ln -sf $f ${f%.*};done;`

Token revocation:
Token issue:
1. Maintain a list of valid tokens issued per user

Logout:
1. Client must send a valid JWT with the logout request
2. We add the JWT to a black list with expiration set to JWT's expiration (exp: 7 days)

Password change:
1. Black list all JWTs for the user with expiration set to JWT's expiration