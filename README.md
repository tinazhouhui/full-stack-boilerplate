# Full stack app boiler plate
For quick setup of a basic javascript app.

## Demo
https://user-images.githubusercontent.com/63497846/179226789-e4e0065d-f184-4944-9fd0-c1dd9340e9b5.mp4



## to run
```docker compose up```

## Tech stack
### Backend
- node express on port 5000

### Fronted
- React on port 3000

### Database
- mongoose
- mongo-express UI on port 8081


## API Endpoints
### List
GET http://localhost:5000/v1/orders
Accept: application/json

### Read
GET http://localhost:5000/v1/orders/123
Accept: application/json

### Create
POST http://localhost:5000/v1/orders/123
Content-Type: application/json
```json
{
  "items": [{
    "type": "sweater",
    "quantity": 1
  }, {
    "type": "shoes",
    "quantity": 1
  }, {
    "type": "hat",
    "quantity": 1
  }],
  "merchantId": "merchantuuid",
  "userId": "useruuid"
}
```

### Update 
PUT http://localhost:5000/v1/orders/123
Content-Type: application/json
```json
{
  "items": [{
    "type": "sweater",
    "quantity": 1
  }, {
    "type": "shoes",
    "quantity": 2
  }, {
    "type": "hat",
    "quantity": 3
  }],
  "merchantId": "merchantuuid",
  "userId": "useruuid"
}
```

## things that can be improved
- typescript
- FE form reuse can be handled more elegantly
- BE data returned can be improved
- openapi specification
- tests
