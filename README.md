# REST API

## Requests
* **Returns specific user**

```http
GET /users/?id=<user_id>
```

* **Returns created user**
```http
POST /users/

body: 
    username: string
    password: string
```

* **Returns created task**
```http
POST /todos/?userId=<user_id>

body:
    title: string
    description: string
    isCompleted: boolean
```

* **Works as switch. From false -> true and true -> false**
```http
PUT /todos/

body:
    id: int(id of task)
```

* **Deletes todo, returns deleted todo.**
```http
DELETE /todos/<int:id>
```
