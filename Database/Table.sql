CREATE TABLE "client"(
	"id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	"surname" VARCHAR(20) NOT NULL,
	"firstname" VARCHAR(20) NOT NULL,
	"lastname" VARCHAR(20) NULL,
	"birth_date" DATE NOT NULL,
	"email" VARCHAR(30) NOT NULL,
	"phone" VARCHAR(20) NOT NULL
);

CREATE TABLE "authorization_client"(
	"id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	"client_id" UUID REFERENCES "client"("id"),
	"password" TEXT NOT NULL,
	"is_activated" BOOL DEFAULT FALSE
);

CREATE TABLE "photo"(
	"id" SERIAL PRIMARY KEY,
	"photo" bytea NOT NULL
);

CREATE TABLE "engine"(
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(30) NOT NULL
);

CREATE TABLE "car"(
	"id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	"client_id" UUID REFERENCES "client"("id"),
	"number" VARCHAR(20) NOT NULL,
	"name" VARCHAR(200) NOT NULL,
	"release_year" INT NULL,
	"mileage" BIGINT NULL,
	"vin" VARCHAR(17) NULL,
	"color" VARCHAR(20) NULL,
	"engine_id" INT REFERENCES "engine"("id")
);

CREATE TABLE "employee"(
	"id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	"surname" VARCHAR(20) NOT NULL,
	"firstname" VARCHAR(20) NOT NULL,
	"lastname" VARCHAR(20) NULL,
	"photo_id" INT REFERENCES "photo"("id")
);
CREATE TABLE "authorization_employee"(
	"id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	"employee_id" UUID REFERENCES "employee"("id"),
	"login" TEXT NOT NULL,
	"password" TEXT NOT NULL
);


CREATE TABLE "order"(
	"id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	"date" DATE DEFAULT CURRENT_DATE,
	"client_id" UUID REFERENCES "client"("id"),
	"employee_id" UUID REFERENCES "employee"("id")
);

CREATE TABLE "service"(
	"id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" VARCHAR(150) NOT NULL,
	"date_add" DATE DEFAULT CURRENT_DATE,
	"prise" DECIMAL NOT NULL,
	"is_hourly" BOOL DEFAULT FALSE
);

CREATE TABLE "list_services"(
	"id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	"order_id" UUID REFERENCES "order"("id"),
	"service_id" UUID REFERENCES "service"("id"),
	"time" DECIMAL NULL
);

CREATE TABLE "consumable_part"(
	"id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	"brand" VARCHAR(50) NOT NULL,
	"article" VARCHAR(50) NOT NULL,
	"name" VARCHAR(150) NOT NULL,
	"prise" DECIMAL NOT NULL,
	"measure_unit" VARCHAR(10) NOT NULL
);

CREATE TABLE "list_consumable_parts"(
	"id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	"order_id" UUID REFERENCES "order"("id"),
	"consumable_part_id" UUID REFERENCES "consumable_part"("id")
);
