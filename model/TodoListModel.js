const todoListSchema = `
        create TABLE todolist(
            userId INT,
            todoId INT AUTO_INCREMENT,
            title varchar(40) NOT NULL,
            description varchar(500),
            imageUri varchar(255),
            dueDate DATETIME NOT NULL,
	    status varchar(20) default 'left',
            issuedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            CONSTRAINT pk_todolist_todoId PRIMARY KEY(todoId),
            CONSTRAINT fk_todolist_userId FOREIGN KEY(userId) REFERENCES users(userid)
        );
`;
