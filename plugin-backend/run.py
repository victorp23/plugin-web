from app import app
from app.cve import train_model
from flask_cors import CORS

CORS(app)

if __name__ == '__main__':
    with app.app_context():
        train_model()
    app.run(debug=True)
