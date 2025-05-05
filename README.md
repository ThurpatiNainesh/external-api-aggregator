# External API Aggregation Service

## Setup
```bash
npm install
npm start
```

## Endpoint
`GET /aggregate-data`

## Test
```bash
npm test
```

## Features
- Aggregates 3 mock APIs
- In-memory caching (10 mins)
- Graceful error handling
- Unified response with status/timestamps
- 2 second timeout per API call
