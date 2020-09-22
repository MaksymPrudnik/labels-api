BEGIN TRANSACTION;

INSERT INTO login (email, hash) values ('test@gmail.com', '$2a$10$mOHLZeGTyELziCJKA0BSEOrVFBlnJTe4A/l2rZRfAySns5w2KsDuG');

COMMIT;