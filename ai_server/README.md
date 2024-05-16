## First-time set-up
### 1. Package installation

```sh
cd ai_server
pip install -r requirements.txt
```

### 2. Get Firebase authentication key

Go to Firebase project website, choose "Project settings" -> "Service accounts" -> "Python" -> "Generate new private key". Locate json file in the ai_server folder. Replace the path in function get_data_from_db() with json file path

Link: [Get private key](https://console.firebase.google.com/u/0/project/lexis-18c6c/settings/serviceaccounts/adminsdk "Get private keyt")

### 3. Install model

```sh
python model-install.py
```

## Run the server

```sh
python app.py
```
