DO
$$
BEGIN
    IF NOT EXISTS (
        SELECT FROM pg_database WHERE datname = 'auth_db'
    ) THEN
        CREATE DATABASE auth_db;
    END IF;

    IF NOT EXISTS (
        SELECT FROM pg_database WHERE datname = 'log_service_db'
    ) THEN
        CREATE DATABASE log_service_db;
    END IF;

    IF NOT EXISTS (
        SELECT FROM pg_database WHERE datname = 'user_service_db'
    ) THEN
        CREATE DATABASE user_service_db;
    END IF;
END
$$;
