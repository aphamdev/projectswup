steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE users (
            user_id serial not null primary key,
            first_name varchar(100) not null,
            last_name varchar(100) not null,
            phone_number int not null,
            email varchar(50) not null,
            address varchar(50) not null,
            hashed_password varchar(200) not null,
            username varchar(20) not null,
            car varchar(100) default null,
            license_number varchar(100) default null,
            is_swooper bool default false
            );
        """,
        # "Down" SQL statement
        """
        DROP TABLE users;
        """
    ],
]
