from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api
from flask_cors import CORS
from flask_migrate import Migrate

app = Flask(__name__)
app.config.from_object('config.Config')
db = SQLAlchemy(app)
migrate = Migrate(app, db)
api = Api(app)
CORS(app)

with app.app_context():
    from app import models
    from app.routes import bp as main_bp
    app.register_blueprint(main_bp)
    db.create_all()
