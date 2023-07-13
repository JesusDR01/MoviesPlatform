Ideally you should just run setup.sh

If setup.sh doesn't work make sure:

- You have disabled Airplay (port 5000 in use)
- You have Docker installed

If front end not working (http://localhost:3000 is down):

1. 
```
cd frontend

docker build -t frontend .

docker run -p 3000:3000 frontend
```

2. 

```
cd frontend
npm run dev
```

If back end not working (https://localhost:5000 is down):

1. 
```
cd backend

docker compose up --build  
``` 

2. 

```
cd backend
pip3 install -r requirements.txt
python3 run.py
```



Demo:


https://github.com/JesusDR01/Cubos-Exclusivos/assets/15522791/d6d9da6a-0a04-4588-9d90-7aaaabe00d73


Features:

- Movies CRUD
- Movies filter
- Python + Flask backend
- NextJs front end

Special Features:

- Testing both front and backend
- Backend and Frontend containerized
- Pagination
- Infinite scroll
- Requests caching using React Query
- Translations using i18n
