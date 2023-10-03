CREATE TABLE users(
	"id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	"email" character varying(100) NOT NULL,
	"password" character varying(100) NOT NULL,
	"isActivate" bool NOT NULL DEFAULT false,
	"activationLink" character varying(100) NOT NULL
); 
CREATE TABLE refreshSessions (
    "id" SERIAL PRIMARY KEY,
    "userId" uuid REFERENCES users(id) ON DELETE CASCADE,
    "refreshToken" uuid NOT NULL,
    "ua" character varying(200) NULL,
    "fingerprint" character varying(200) NULL,
    "ip" character varying(15) NULL,
    "expiresIn" bigint NULL,
    "createdAt" timestamp with time zone NOT NULL DEFAULT now()
);
