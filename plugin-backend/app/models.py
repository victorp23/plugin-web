from app import db

class Vulnerability(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(255), nullable=False)
    vulnerability_type = db.Column(db.String(255), nullable=False)
    severity = db.Column(db.String(50), nullable=False)
    details = db.Column(db.Text, nullable=False)
    __table_args__ = (
        db.UniqueConstraint('url', 'vulnerability_type', name='uq_vulnerability_url_type'),
    )
