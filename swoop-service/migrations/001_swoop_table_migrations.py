steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE swoops (
            pickup_id SERIAL PRIMARY KEY NOT NULL,
            swooper_id INT NULL,
            customer_id INT NULL,
            trash_type VARCHAR(100) NOT NULL,
            description VARCHAR(100) NOT NULL,
            picture_url VARCHAR(100) NOT NULL,
            hazards VARCHAR(100),
            size INTEGER NOT NULL,
            weight INTEGER NOT NULL,
            status INT DEFAULT 0
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE swoops;
        """
    ],

]
